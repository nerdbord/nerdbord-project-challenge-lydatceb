import { MetadataRoute } from "next";

import { sanityFetch } from "@/sanity/client";
import { Languages } from "next/dist/lib/metadata/types/alternative-urls-types";

interface SitemapItem {
  url: string;
  lastModified?: string | Date;
  changeFrequency?:
    | "always"
    | "hourly"
    | "daily"
    | "weekly"
    | "monthly"
    | "yearly"
    | "never";
  priority?: number;
  alternates?: {
    languages?: Languages<string>;
  };
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const previousSlugs = (await sanityFetch({
    query: `*[_type == 'post']{slug}`,
  })) as [];
  const slugsArray = previousSlugs.map(
    (item: { current: string }) => item.current
  );
  return [
    {
      url: "https://automated-blog.vercel.app/",
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    ...slugsArray.map((slug) => {
      return {
        url: `https://automated-blog.vercel.app/posts/${slug}`,
        lastModified: new Date(),
        changeFrequency: "daily",
        priority: 1,
      } as SitemapItem;
    }),
  ];
}