import { NextApiRequest, NextApiResponse } from 'next';
import { createPost } from '../../../scripts/createPost.mjs'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        // const today = new Date().getDay()
        // if (today === 0 || today === 6) {
        //     //don't generate posts on weekend
        //     return
        // }

        const postResult = await createPost()
        res.status(200).end(postResult);
    }
    catch (error) {
        console.log(error);
    }
}