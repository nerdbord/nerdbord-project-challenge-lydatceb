import { createClient } from "next-sanity";
import dotenv from "dotenv";
import { fetchChatCompletion } from '@/apiService';
import { generateImage } from '@/imageService';

dotenv.config();

const client = createClient({
  projectId: "1zf5e9r5",
  dataset: "production",
  apiVersion: "2024-01-01",
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

export async function createPost() {

  const previousTitles = await client.fetch(`*[_type == 'post']{title}`)
  const titlesArray = previousTitles.map(item => item.title)


  const generatedContent = await fetchChatCompletion(titlesArray);

  if (!generatedContent) {
    console.error("Failed to generate content from GPT.");
    return null; // Zwróć null w przypadku błędu
  }

    const parsedContent = JSON.parse(generatedContent)
    const title = parsedContent.title
    const content = parsedContent.body
    const imageDescription = parsedContent.imageDescription

    
  if (!title || !content || !imageDescription) {
    console.error("Incomplete generated content from GPT.");
    return null; // Zwróć null w przypadku niekompletnej zawartości
  }

  // Generowanie obrazu na podstawie opisu
  const imageID = await generateImage(imageDescription);


  const newPost = {
    _type: "post",
    title: title || "Default Title",
    slug: {
      _type: "slug",
      current: title ? title.toLowerCase().replace(/\W+/g, '-') : "default-title",
    },
    publishedAt: new Date().toISOString(),
    body: [
      {
        _type: "block",
        children: [
          {
            _type: "span",
            text: content || "Default content",
          },
        ],
      },
    ],
    image: {
      _type: "image",
      asset: {
        _type: "reference",
        _ref: imageID,
      },
    },
    imageDescription: imageDescription || "Default image description",
  };

  try {
    const result = await client.create(newPost);
    console.log("Post created:", result);
    return result; // Zwróć utworzony post
  } catch (error) {
    console.error("Error creating post:", error);
    return null; // Zwróć null w przypadku błędu
  }
}
