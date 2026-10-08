import siteData from "@/data/hair-atelier.json";

export type BlogPost = (typeof siteData.blogs.posts)[number];

export const blogPosts: BlogPost[] = siteData.blogs.posts;

export const blogHref = (post: Pick<BlogPost, "slug">) => `/blogs/${post.slug}`;

export function getBlogPost(slug: string) {
  return blogPosts.find((post) => post.slug === slug);
}

export function getRecentPosts(count: number, excludeSlug?: string) {
  return [...blogPosts]
    .filter((post) => post.slug !== excludeSlug)
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, count);
}

export function getCategorySlug(category: string) {
  return category.toLowerCase().replace(/ /g, '-');
}

export function getCategoryBySlug(slug: string) {
  return siteData.blogSidebar.categories.find(c => getCategorySlug(c) === slug);
}

export function getPostsByCategory(category: string) {
  return blogPosts.filter((post) => post.category === category);
}

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "2-digit",
  year: "numeric",
  timeZone: "UTC",
});

export const formatBlogDate = (date: string) => dateFormatter.format(new Date(date));
