import { createClient } from "next-sanity";
import dotenv from "dotenv";
import axios from "axios"; 
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
  const generatedContent = await fetchChatCompletion();

  if (!generatedContent) {
    console.error("Failed to generate content from GPT.");
    return null;
  }

  console.log("Generated Content:", generatedContent);

  // Parsowanie wygenerowanego JSON
  let parsedContent;
  try {
    parsedContent = JSON.parse(generatedContent);
  } catch (error) {
    console.error("Failed to parse generated content:", error);
    return null;
  }

  console.log("Parsed Content:", parsedContent);

  const { title, body: content, imageURL: imageDescription } = parsedContent;

  console.log("Title:", title);
  console.log("Content:", content);
  console.log("Image Description:", imageDescription);

  if (!title || !content || !imageDescription) {
    console.error("Incomplete generated content from GPT.");
    return null;
  }

  // Pobieranie obrazu z URL
  let imageAsset;
  try {
    console.log("Fetching image from URL:", imageDescription);
    const imageResponse = await axios.get(imageDescription, { responseType: 'arraybuffer' });
    imageAsset = await client.assets.upload('image', imageResponse.data, {
      filename: `${title}.png`
    });
    console.log("Image uploaded, asset ID:", imageAsset._id);
  } catch (error) {
    console.error("Failed to fetch or upload image:", error.message);
    console.error("Error details:", error);
    return null;
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
