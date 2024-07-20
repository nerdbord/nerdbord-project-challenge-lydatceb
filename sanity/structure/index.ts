import type { StructureResolver } from "sanity/structure";
import { CalendarIcon } from "@sanity/icons";

export const structure: StructureResolver = (S) =>
  S.list()
    .id("root")
    .title("Content")
    .items([
      S.documentTypeListItem("post").title("Blog posts").icon(CalendarIcon),
    ]);
