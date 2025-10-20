import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import Navigation from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { Link, useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";

interface BlogPost {
  id: string;
  title: string;
  content: string;
  category: string;
  created_at: string;
  author_id: string;
}

const BlogList = () => {
  const { category } = useParams<{ category: string }>();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPosts();
  }, [category]);

  const fetchPosts = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("blog_posts")
      .select("*")
      .eq("category", category)
      .eq("published", true)
      .order("created_at", { ascending: false });

    if (!error && data) {
      setPosts(data);
    }
    setLoading(false);
  };

  const getCategoryTitle = () => {
    if (category === "strategy") return "Strategic Insights";
    if (category === "data-analytics") return "Data Analytics Perspectives";
    if (category === "technology") return "Technology Innovations";
    return "Blog";
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-6 pt-32 pb-20 max-w-4xl">
        <h1 className="font-serif text-5xl font-bold mb-4">{getCategoryTitle()}</h1>
        <p className="text-muted-foreground text-lg mb-12">
          Expert perspectives and practical insights from our consulting team
        </p>

        {loading ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Loading posts...</p>
          </div>
        ) : posts.length === 0 ? (
          <Card className="p-12 text-center">
            <p className="text-muted-foreground">No posts published yet. Check back soon!</p>
          </Card>
        ) : (
          <div className="space-y-8">
            {posts.map((post) => (
              <Link key={post.id} to={`/${category}/blog/${post.id}`}>
                <Card className="p-8 hover:shadow-lg transition-shadow cursor-pointer">
                  <h2 className="font-serif text-3xl font-semibold mb-3 hover:text-primary transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-sm text-muted-foreground mb-4">
                    {new Date(post.created_at).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                  <div className="prose prose-slate max-w-none line-clamp-3">
                    <ReactMarkdown>
                      {post.content.substring(0, 200) + "..."}
                    </ReactMarkdown>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogList;
