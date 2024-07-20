import { createClient } from "next-sanity";
import "dotenv/config";
import { fetchChatCompletion } from '@/apiService'


const client = createClient({
  projectId: "1zf5e9r5",
  dataset: "production",
  apiVersion: "2024-01-01",
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

async function createPost() {
  const prompt = "Generate a blog post title, content, and image description.";
  const generatedContent = await fetchChatCompletion(prompt);

  if (!generatedContent) {
    console.error("Failed to generate content from GPT.");
    return;
  }

  const [title, content, imageDescription] = generatedContent.split("\n");

  const newPost = {
    _type: "post",
    title: title || "Default Title",
    slug: {
      _type: "slug",
      current: title ? title.toLowerCase().replace(/\s+/g, '-') : "default-title",
    },
    publishedAt: new Date().toISOString(),
    /*
    image: {
      _type: 'image',
      asset: {
        _type: 'reference',
        _ref: 'yourImageAssetReferenceId', // you need to have an image uploaded in sanity and get its reference ID
      },
    },
    */
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
  };

  try {
    const result = await client.create(newPost);
    console.log("Post created:", result);
  } catch (error) {
    console.error("Error creating post:", error);
  }
}
