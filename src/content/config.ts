// 1. Import utilities from `astro:content`
import { z, reference, defineCollection } from "astro:content";
// 2. Define your collection(s)
const Tags = z.enum(["Ruby on Rails", "indie making", "Tag3"]);
const blogCollection = defineCollection({
  type: "content",
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      tags: z.array(Tags),
      image: z
        .object({
          src: image().refine((img) => img.width > 1080, {
            message: "Image width must be at least 1080px",
          }),
          alt: z.string().optional(),
        })
        .optional(),
      publishDate: z.string(),
      relatedPosts: z.array(reference("blog")).optional(),
    }),
});
// 3. Export a single `collections` object to register your collection(s)
//    This key should match your collection directory name in "src/content"
export const collections = { blog: blogCollection };
