import "server-only";

import { createClient, type QueryParams } from "next-sanity";

export const client = createClient({
  projectId: "1zf5e9r5",
  dataset: "production",
  token: process.env.SANITY_API_TOKEN,
  apiVersion: "2024-01-01",
  useCdn: false,
});

export async function sanityFetch<QueryResponse>({
  query,
  params = {},
  tags,
}: {
  query: string;
  params?: QueryParams;
  tags?: string[];
}) {
  return client.fetch<QueryResponse>(query, params, {
    next: {
      revalidate: process.env.NODE_ENV === 'development' ? 30 : 3600,
      tags,
    },
  });
}

export async function sanityPost(document: any) {
  try {
    return await client.create(document);
  } catch (error) {
    console.error('Error creating document:', error);
    throw error; // Rethrow error to handle it in the calling context
  }
}
