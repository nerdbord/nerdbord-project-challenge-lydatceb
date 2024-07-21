import { defineField, defineType } from "sanity";

export const postType = defineType({
  name: "post",
  title: "Blog post",
  type: "document",
  fields: [
    defineField({
      name: "title",
      type: "string",
      validation: (rule) => rule.required().min(10).max(80),
    }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "title" },
      validation: (rule) =>
        rule.required().error("Required to generate a page on the website."),
      hidden: ({ document }) => !document?.title,
    }),
    {
      name: "publishedAt",
      title: "Published at",
      type: "datetime",
      validation: (rule) => rule.required().error("Required to publish the post."),
    },
    defineField({
      name: "image",
      type: "image",
    }),
    defineField({
      name: "imageDescription",
      type: "string",
    }),
    defineField({
      name: "body",
      title: "Post body",
      type: "array",
      of: [{ type: "block" }],
    }),
  ],
});
