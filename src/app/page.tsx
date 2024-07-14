import Link from "next/link";
import { SanityDocument } from "next-sanity";
import Image from "next/image";
import { sanityFetch } from "@/sanity/client";
import imageUrlBuilder from "@sanity/image-url";

const EVENTS_QUERY = `*[
  _type == "post"
  && defined(slug.current)
]{_id, title, slug, publishedAt, body, image}|order(publishedAt desc)`;

export default async function IndexPage() {
  const posts = await sanityFetch<SanityDocument[]>({ query: EVENTS_QUERY });

  return (
    <main className="flex bg-gray-100 min-h-screen flex-col p-24 gap-12">
      <h1 className="text-4xl font-bold tracking-tighter">Posts</h1>
      <ul className="grid grid-cols-1 gap-12 lg:grid-cols-2">
        {posts.map((post) => {
          return (
            <li className="bg-white p-4 rounded-lg" key={post._id}>
              <div className="flex">
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
            </li>
          );
        })}
      </ul>
    </main>
  );
}
