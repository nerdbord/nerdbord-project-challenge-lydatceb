"use client";
import { SanityDocument } from "next-sanity";
import { useState, useEffect } from "react";
import imageUrlBuilder from "@sanity/image-url";
import Image from "next/image";
import Link from "next/link";

export default function IndexPage() {
  const [posts, setPosts] = useState<SanityDocument[]>([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `/api/fetchPosts?start=${page * 5}&end=${(page + 1) * 5}`
        );
        const newPosts = await response.json();
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
      <h1 className="text-4xl font-bold tracking-tighter mb-10">POSTY</h1>
      <div className="flex flex-col items-start">
        {posts.map((post) => (
          <div key={post._id} className="flex m-2">
            <Image
              src={
                imageUrlBuilder({
                  projectId: "1zf5e9r5",
                  dataset: "production",
                })
                  .image(post.image)
                  .width(50)
                  .height(50)
                  .url() || "https://via.placeholder.com/50x50"
              }
              alt={post.title || "Blog post"}
              className="mx-auto aspect-square overflow-hidden rounded-xl object-contain object-center sm:h-full"
              height="50"
              width="50"
            />
            <Link
              className="hover:underline ml-3"
              href={`/posts/${post.slug.current}`}
            >
              <h2 className="text-xl font-semibold">{post?.title}</h2>
              <p className="text-gray-500">
                {new Date(post?.publishedAt).toLocaleDateString()}
              </p>
            </Link>
          </div>
        ))}
      </div>
      {loading && <p>Loading...</p>}
      {!loading && (
        <button onClick={loadMorePosts} disabled={loading}>
          Load More Posts
        </button>
      )}
    </div>
  );
}
