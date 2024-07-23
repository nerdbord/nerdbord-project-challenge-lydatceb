import axios from 'axios';
import { createClient } from 'next-sanity';
import config from "./config";
import sharp from 'sharp';

const client = createClient({
  projectId: "1zf5e9r5",
  dataset: "production",
  apiVersion: "2024-01-01",
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

const baseURL = "https://training.nerdbord.io/api/v1/openai/images/generations"

export async function generateImage(description: string) {
  try {
    const response = await axios.post(baseURL, 
      {
      prompt: description,
      n: 1,
      size: '1024x1024'
    }, {
      headers: {
        Authorization:  `Bearer ${config.API_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    if (response.status !== 200 || !response.data || !response.data.data || !response.data.data[0]) {
      throw new Error('Failed to generate image.');
    }

    const imageUrl = response.data.data[0].url;

    const imageResponse = await axios.get(imageUrl, { responseType: 'arraybuffer' });

    const compressedImage = await sharp(imageResponse.data)
    .resize(1024, 512)
    .webp({ quality: 80 })
    .toBuffer();
 
    const imageAsset = await client.assets.upload('image', compressedImage, {
      filename: `${description}.webp`
    });

    return imageAsset._id; 
  } catch (error) {
    console.error('Error generating image:', error);
    return null;
  }
}
