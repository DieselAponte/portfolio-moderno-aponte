import BlogContainer from "../../features/blog/BlogContainer";
import { fetchArticles } from "../../features/blog/services/blog.service";

export default async function BlogPage() {
  const articles = await fetchArticles();
  const featuredArticles = articles.filter(a => a.is_featured);
  return <BlogContainer articles={articles} featuredArticles={featuredArticles} />;
}
