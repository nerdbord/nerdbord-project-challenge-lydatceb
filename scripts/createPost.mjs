import { createClient } from "next-sanity";
import dotenv from "dotenv";
import { fetchChatCompletion } from '@/apiService';

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
    return;
  }

  const contentLines = generatedContent.split("\n");
  const titleLine = contentLines.find(line => line.startsWith("Title:"));
  const contentLine = contentLines.find(line => line.startsWith("Content:"));
  const imageDescriptionLine = contentLines.find(line => line.startsWith("Image Description:"));

  const title = titleLine ? titleLine.replace("Title:", "").trim() : null;
  const content = contentLine ? contentLine.replace("Content:", "").trim() : null;
  const imageDescription = imageDescriptionLine ? imageDescriptionLine.replace("Image Description:", "").trim() : null;

  if (!title || !content || !imageDescription) {
    console.error("Incomplete generated content from GPT.");
    return;
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
        children: [
          {
            _type: "span",
            text: content || "Default content",
          },
        ],
      },
    ],
    imageDescription: imageDescription || "Default image description",
  };

  try {
    const result = await client.create(newPost);
    console.log("Post created:", result);
    return result;
  } catch (error) {
    console.error("Error creating post:", error);
  }
}
