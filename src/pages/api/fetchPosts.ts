import { NextApiRequest, NextApiResponse } from 'next';
import { sanityFetch } from '@/sanity/client';


const EVENTS_QUERY = (start: number, end: number) => `*[
  _type == "post"
  && defined(slug.current)
]|order(publishedAt desc)[${start}...${end}]{_id, title, slug, publishedAt, body, image}`;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { start, end } = req.query;

  if (typeof start !== 'string' || typeof end !== 'string') {
    return res.status(400).json({ error: 'Invalid query parameters' });
  }

  try {
    const posts = await sanityFetch({query: EVENTS_QUERY(Number(start), Number(end))});
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch posts' });
  }
}
