import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

const cronSecretToken = process.env.CRON_ENDPOINT_TOKEN;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const response = await axios.get('https://automated-blog.vercel.app/api/cron', {
            headers: {
                Authorization: `Bearer ${cronSecretToken}`,
            },
        });
        res.status(response.status).json(response.data);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error.' });
    }
}
