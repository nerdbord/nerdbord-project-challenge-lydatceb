import { createClient } from "next-sanity";
import dotenv from "dotenv";
import { fetchChatCompletion } from '@/apiService';
import { generateImage } from '@/imageService'; // Przyjmujemy, że masz taki moduł

dotenv.config();

const client = createClient({
  projectId: "1zf5e9r5",
  dataset: "production",
  apiVersion: "2024-01-01",
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

export async function createPost() {
  const prompt = `
    Generate a blog post related to the EURO 2024 topic with the following format:
    Title: <title>
    Content: <content>
    Image Description: <imageDescription>
  `;

  const generatedContent = await fetchChatCompletion(prompt);

  if (!generatedContent) {
    console.error("Failed to generate content from GPT.");
    return null; // Zwróć null w przypadku błędu
  }

  console.log("Generated Content:", generatedContent);

  const contentLines = generatedContent.split("\n");

  const titleLine = contentLines.find(line => line.includes("Title:"));
  const contentStartIndex = contentLines.findIndex(line => line.includes("Content:"));
  const imageDescriptionStartIndex = contentLines.findIndex(line => line.includes("Image Description:"));

  const title = titleLine ? titleLine.replace("Title:", "").trim() : null;
  const content = contentStartIndex !== -1
    ? contentLines.slice(contentStartIndex + 1, imageDescriptionStartIndex).join("\n").trim()
    : null;
  const imageDescription = imageDescriptionStartIndex !== -1
    ? contentLines.slice(imageDescriptionStartIndex + 1).join("\n").trim()
    : null;

  if (!title || !content || !imageDescription) {
    console.error("Incomplete generated content from GPT.");
    return null; // Zwróć null w przypadku niekompletnej zawartości
  }

  // Generowanie obrazu na podstawie opisu
  const imageUrl = await generateImage(imageDescription);

  if (!imageUrl) {
    console.error("Failed to generate image.");
    return null; // Zwróć null w przypadku błędu generowania obrazu
  }

  const imageAsset = await client.assets.upload('image', await axios.get(imageUrl, { responseType: 'arraybuffer' }), {
    filename: `${title}.png`
  });

  function generateUniqueKey() {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  }

  const newPost = {
    _type: "post",
    title: title || "Default Title",
    slug: {
      _type: "slug",
      current: title ? title.toLowerCase().replace(/\s+/g, '-') : "default-title",
    },
    publishedAt: new Date().toISOString(),
    body: [
      {
        _type: "block",
        _key: generateUniqueKey(),
        children: [
          {
            _type: "span",
            _key: generateUniqueKey(),
            text: content || "Default content",
          },
        ],
      },
    ],
    image: {
      _type: "image",
      asset: {
        _type: "reference",
        _ref: imageAsset._id,
      },
    },
    imageDescription: imageDescription || "Default image description",
  };

  try {
    const result = await client.create(newPost);
    console.log("Post created:", result);
    return result; 
  } catch (error) {
    console.error("Error creating post:", error);
    return null; 
  }
}
