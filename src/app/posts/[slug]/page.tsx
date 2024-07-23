import { PortableText, type SanityDocument } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { client, sanityFetch } from "@/sanity/client";
import Link from "next/link";
import Image from "next/image";
import PopupWrapper from "./popupWrapper";

const EVENT_QUERY = `*[
    _type == "post" &&
    slug.current == $slug
  ][0]{
  ...,
}`;

const { projectId, dataset } = client.config();
const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).image(source)
    : null;

export default async function EventPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = await sanityFetch<SanityDocument>({
    query: EVENT_QUERY,
    params,
  });

  if (!post) {
    return (
      <main className="container mx-auto grid gap-12 p-12">
        <div className="mb-4">
          <Link href="/" className="text-l hover:underline">← Back to events</Link>
        </div>
        <div className="flex flex-col justify-center space-y-4">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold tracking-tighter mb-8">
              Post not found
            </h1>
          </div>
        </div>
      </main>
    );
  }

  const { title, publishedAt, image, body, imageDescription } = post;
  const eventImageUrl = image ? urlFor(image)?.url() : null;
  const postDate = new Date(publishedAt).toDateString();

  return (
    <main className="container mx-auto grid gap-12 p-12">
      <div className="mb-4">
        <Link href="/" className="text-l hover:underline" >← Back to events</Link>
      </div>
      <div className="flex-col items-start bg-gray-200 bg-opacity-50 rounded-lg mx-auto grid gap-12 p-12">
        <div className="space-y-4">
          {title ? (
            <h1 className="text-4xl font-bold tracking-tighter mb-8">
              {title}
            </h1>
          ) : null}
          <dl className="grid grid-cols-2 gap-1 text-sm font-medium sm:gap-2 lg:text-base">
            <div className="font-semibold">Published at: 
            {postDate && <dt className=" text-left">{postDate}</dt>}
            </div>
          </dl>
          <div className="relative object-center">
          <Image
            src={eventImageUrl || "https://via.placeholder.com/550x310"}
            alt={imageDescription || title || "blog image"}
            className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center"
            height="312"
            width="824"
            quality={80}
          />
          </div>
        </div>
        {body && body.length > 0 && (
          <div className="drop-cap max-w-none text-justify">
            <PortableText value={body} />
          </div>
        )}
      </div>
      <PopupWrapper />
      <Link href="#" scroll={true} className="text-l hover:underline">
        ↑ Back to top
      </Link>
    </main>
  );
}
