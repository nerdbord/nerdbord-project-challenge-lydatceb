import { NextApiRequest, NextApiResponse } from 'next';
import { sanityPost } from "@/sanity/client";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
      const { email } = req.body;
  
      try {
        const document = {
          _type: 'emailAddress',
          emailAddress: email,
          subscribedAt: new Date().toISOString(),
        };
        await sanityPost(document);
        res.status(200).json({ message: 'Email saved successfully!' });
      } catch (error) {
        res.status(500).json({ error: 'Failed to save email.' });
      }
    } else {
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  }
  