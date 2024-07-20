import { defineField, defineType } from "sanity";

export const emailType = defineType({
  name: "emailAddress",
  title: "Email Address",
  type: "document",
  fields: [
    defineField({
      name: "emailAddress",
      title: "Email Address",
      type: "string",
      validation: (rule) => rule.required().email(),
    }),
    defineField({
      name: "subscribedAt",
      title: "Subscribed At",
      type: "datetime",
    }),
  ],
});
