"use client";

import BlogCard from "@/components/BlogCard";
import { Stagger } from "@/components/motion";
import siteData from "@/data/hair-atelier.json";
import { blogPosts } from "@/lib/blogs";

const { readMoreLabel, emptyMessage, clearFiltersLabel } = siteData.blogs;

export function BlogGrid({ posts = blogPosts }: { posts?: typeof blogPosts }) {
  if (posts.length === 0) {
    return (
      <p className="mt-12 rounded-2xl border border-white/10 bg-white/[0.03] py-16 text-center text-white/70">
        {emptyMessage}
      </p>
    );
  }

  return (
    <Stagger className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {posts.map((post) => (
        <BlogCard key={post.id} post={post} readMoreLabel={readMoreLabel} />
      ))}
    </Stagger>
  );
}

export default function BlogList() {
  return <BlogGrid />;
}
