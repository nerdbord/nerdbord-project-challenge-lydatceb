import { createClient } from "next-sanity";
import "dotenv/config";

const client = createClient({
  projectId: "1zf5e9r5",
  dataset: "production",
  apiVersion: "2024-01-01",
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

// function to create a new post
async function createPost() {
  const newPost = {
    _type: "post",
    title: "Sample Blog Post",
    slug: {
      _type: "slug",
      current: "sample-blog-post",
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
            text: "This is the body of the blog post.",
          },
        ],
      },
    ],
  };

  try {
    // create the post in Sanity
    const result = await client.create(newPost);
    console.log("Post created:", result);
  } catch (error) {
    console.error("Error creating post:", error);
  }
}

// run the function to create the post
createPost();
