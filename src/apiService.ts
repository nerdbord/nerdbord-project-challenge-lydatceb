import axios from "axios";
import config from "./config";

const baseURL = "https://training.nerdbord.io/api/v1/openai/chat/completions";

const prompt = `You run an online blog about the UEFA European Football Championship EURO 2024.
  Your task is to prepare a new post for your blog. The post must be related to the blog's theme, but you should not repeat topics that are already on the blog.
  Each post consists of three parts: the title, the body, and an image.
  Contents of the post should be easily understandable by any football fan.
  The title should accurately describe the body of the post.
  The image should be loosely related to the topic of the post.
  The body of the post should be at least three paragraphs long.
  You will be provided with a list of previous blog post titles.
  Respond ONLY by correctly filling out the following JSON structure, where each field must be a string. The imageURL field has a maximum length of 299 characters:
  {
  "title": "<title>",
  "body": "<content>",
  "imageDescription": "<imageDescription>"
  }`;

export const fetchChatCompletion = async (previousTitles: string[]) => {
  try {
    const response = await axios.post(
      baseURL,
      {
        model: "gpt-4o",
        messages: [
          { role: "system", content: prompt },
          { role: "user", content: previousTitles.join(", ") },
        ],
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${config.API_KEY}`,
        },
      }
    );

    if (response.status !== 200) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const responseData = response.data;

    if (
      responseData &&
      responseData.choices &&
      responseData.choices.length > 0
    ) {
      return responseData.choices[0].message.content;
    } else {
      console.error("No choices found in response.");
    }
  } catch (error) {
    console.error("Error calling GPT API:", error);
  }
  return null;
};
