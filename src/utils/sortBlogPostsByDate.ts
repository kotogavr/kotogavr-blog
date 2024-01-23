import { z } from "zod";

const blogPostSchema = z.object({
  data: z.object({
    publishDate: z.string(),
    // add other fields as necessary
  }),
});

type BlogPost = z.infer<typeof blogPostSchema>;

export function sortBlogPostsByDate(blogPosts: BlogPost[]) {
  // Function to convert date from DD/MM/YYYY to MM/DD/YYYY
  function convertDateFormat(dateStr: string): string {
    const [day, month, year] = dateStr.split("/");
    return `${month}/${day}/${year}`;
  }

  // Sort the blog posts by date in descending order
  blogPosts.sort((a, b) => {
    const dateA = new Date(convertDateFormat(a.data.publishDate));
    const dateB = new Date(convertDateFormat(b.data.publishDate));

    if (dateA > dateB) {
      return -1;
    } else if (dateA < dateB) {
      return 1;
    } else {
      return 0;
    }
  });

  return blogPosts;
}
