import { NextApiRequest, NextApiResponse } from "next";
import { createPost } from "../../../scripts/createPost.mjs";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const today = new Date().getDay();
    if (today === 0 || today === 6) {
      //don't generate posts on weekend
      return;
    }

    const postResult = await createPost();
    if (postResult) {
      res.status(200).json(postResult);
    } else {
      res
        .status(500)
        .json({
          message:
            "Failed to create post. Incomplete generated content from GPT.",
        });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error." });
  }
}
