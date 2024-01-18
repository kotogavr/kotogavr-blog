// 1. Import utilities from `astro:content`
import { z, reference, defineCollection } from "astro:content";
// 2. Define your collection(s)
const blogCollection = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    tags: z.array(z.string()),
    image: z
      .object({
        src: z.string().optional(),
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
