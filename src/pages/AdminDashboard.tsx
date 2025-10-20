import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { User } from "@supabase/supabase-js";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Plus, FileText } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const AdminDashboard = () => {
  const [user, setUser] = useState<User | null>(null);
  const [posts, setPosts] = useState<any[]>([]);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        navigate("/admin");
      } else {
        setUser(session.user);
        fetchPosts(session.user.id);
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (!session) {
        navigate("/admin");
      } else {
        setUser(session.user);
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const fetchPosts = async (userId: string) => {
    const { data, error } = await supabase
      .from("blog_posts")
      .select("*")
      .eq("author_id", userId)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching posts:", error);
    } else {
      setPosts(data || []);
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    toast({
      title: "Signed out",
      description: "You have been successfully signed out.",
    });
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-6 pt-32 pb-20">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="font-serif text-4xl font-bold mb-2">Admin Dashboard</h1>
            <p className="text-muted-foreground">
              Welcome back, {user?.email}
            </p>
          </div>
          
          <div className="flex gap-4">
            <Link to="/admin/new-post">
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                New Post
              </Button>
            </Link>
            <Button variant="outline" onClick={handleSignOut}>
              Sign Out
            </Button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card className="p-6">
            <h3 className="font-semibold mb-2">Total Posts</h3>
            <p className="text-3xl font-bold text-primary">{posts.length}</p>
          </Card>
          <Card className="p-6">
            <h3 className="font-semibold mb-2">Published</h3>
            <p className="text-3xl font-bold text-accent">
              {posts.filter(p => p.published).length}
            </p>
          </Card>
          <Card className="p-6">
            <h3 className="font-semibold mb-2">Drafts</h3>
            <p className="text-3xl font-bold text-muted-foreground">
              {posts.filter(p => !p.published).length}
            </p>
          </Card>
        </div>

        <h2 className="font-serif text-2xl font-semibold mb-6">Your Posts</h2>
        
        <div className="grid gap-4">
          {posts.length === 0 ? (
            <Card className="p-12 text-center">
              <FileText className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-muted-foreground mb-4">
                You haven't created any posts yet
              </p>
              <Link to="/admin/new-post">
                <Button>Create Your First Post</Button>
              </Link>
            </Card>
          ) : (
            posts.map((post) => (
              <Card key={post.id} className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-serif text-xl font-semibold mb-2">
                      {post.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      Category: {post.category.replace("-", " ").toUpperCase()} •{" "}
                      {post.published ? "Published" : "Draft"}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Created: {new Date(post.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  <Link to={`/admin/edit-post/${post.id}`}>
                    <Button variant="outline">Edit</Button>
                  </Link>
                </div>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
