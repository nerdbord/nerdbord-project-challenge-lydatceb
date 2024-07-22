import { NextApiRequest, NextApiResponse } from 'next';
import { createPost } from '../../../scripts/createPost.mjs'

const cronSecretToken = process.env.CRON_ENDPOINT_TOKEN

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        
        const {token} = req.query;

        if (!token || token !== cronSecretToken) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

         const today = new Date().getDay()
         if (today === 0 || today === 6) {
             //don't generate posts on weekend
             return
         }

        const postResult = await createPost();
        if (postResult) {
            res.status(200).json(postResult);
        } else {
            res.status(500).json({ message: "Failed to create post. Incomplete generated content from GPT." });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error." });
    }
}