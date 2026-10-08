import BlogCard from "@/components/BlogCard";
import { Stagger } from "@/components/motion";
import type { BlogNewsData, BlogPost } from "@/types/hair-atelier.types";

type BlogGridProps = {
  posts: BlogPost[];
  readMoreLabel: string;
  emptyMessage: string;
};

export function BlogGrid({ posts, readMoreLabel, emptyMessage }: BlogGridProps) {
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

export default function BlogList({ data }: { data: BlogNewsData }) {
  return <BlogGrid posts={data.posts} readMoreLabel={data.readMoreLabel} emptyMessage={data.emptyMessage} />;
}
