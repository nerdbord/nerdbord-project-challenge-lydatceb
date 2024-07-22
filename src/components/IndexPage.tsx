"use client";
import { SanityDocument, createClient } from "next-sanity";
import { useState, useEffect } from "react";
import imageUrlBuilder from "@sanity/image-url";
import Image from "next/image";
import Link from "next/link";

const client = createClient({
  projectId: "1zf5e9r5",
  dataset: "production",
  apiVersion: "2024-01-01",
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

const builder = imageUrlBuilder(client);

function urlFor(source: any) {
  return source
    ? builder.image(source).url()
    : "https://via.placeholder.com/50x50";
}

export default function IndexPage() {
  const [posts, setPosts] = useState<SanityDocument[]>([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const query = `*[_type == "post"] | order(publishedAt desc) [${page * 5}...${(page + 1) * 5}]`;
        const newPosts = await client.fetch(query);
        setPosts((prevPosts) => [...prevPosts, ...newPosts]);
      } catch (error) {
        console.error("Failed to fetch posts:", error);
      }
      setLoading(false);
    };

    fetchPosts();
  }, [page]);

  const loadMorePosts = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <div className="flex flex-col mt-10 items-center">
      <h1 className="text-4xl font-bold tracking-tighter mb-10">
        ⚽️  EURO 2024  ⚽️
      </h1>
      <div className="flex flex-col bg-gray-200 bg-opacity-50 rounded-lg">
        {posts.map((post) => (
          <div key={post._id} className="flex m-1 rounded-lg gap-2 p-2 hover:bg-gray-300">
            <Link
              className="bg-opacity-50 flex flex-row"
              href={`/posts/${post.slug.current}`}
            >
              <Image
                src={urlFor(post.image) || "https://via.placeholder.com/50x50"}
                alt={post.title || "Blog post"}
                className="mx-auto aspect-square overflow-hidden rounded-xl object-contain object-center sm:h-full mr-3"
                height="50"
                width="50"
              />
              <div className="flex flex-col">
                <h2 className="text-xl font-semibold">{post?.title}</h2>
                <p className="text-gray-500">
                  {new Date(post?.publishedAt).toLocaleDateString()}
                </p>
              </div>
            </Link>
          </div>
        ))}
      </div>
      {loading && <p>Loading...</p>}
      {!loading && (
        <button onClick={loadMorePosts} disabled={loading} className="text-2xl font-bold mt-5 mb-5 hover:underline">
          Load More Posts
        </button>
      )}
    </div>
  );
}
