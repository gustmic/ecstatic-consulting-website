import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import logo from "@/assets/logo.webp";

const SetupAdmin = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const { toast } = useToast();

  const handleSetup = async () => {
    setLoading(true);
    setResult(null);

    try {
      const { data, error } = await supabase.functions.invoke('setup-admin');

      if (error) throw error;

      setResult(data);
      toast({
        title: "Success!",
        description: "Admin user has been configured successfully.",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to setup admin user.",
      });
      setResult({ success: false, error: error.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center px-6">
      <Card className="w-full max-w-md p-8">
        <div className="flex justify-center mb-8">
          <img src={logo} alt="Ecstatic Consulting" className="h-12" />
        </div>

        <h2 className="font-serif text-3xl font-bold text-center mb-6">
          Admin Setup
        </h2>

        <p className="text-muted-foreground text-center mb-6">
          Click the button below to initialize the admin user with the configured credentials.
        </p>

        <Button 
          onClick={handleSetup} 
          className="w-full mb-4" 
          disabled={loading}
        >
          {loading ? "Setting up..." : "Setup Admin User"}
        </Button>

        {result && (
          <div className={`p-4 rounded-lg ${result.success ? 'bg-accent/10' : 'bg-destructive/10'}`}>
            <p className={`font-semibold ${result.success ? 'text-accent' : 'text-destructive'}`}>
              {result.success ? 'Success!' : 'Error'}
            </p>
            <p className="text-sm mt-2">
              {result.message || result.error}
            </p>
          </div>
        )}

        <p className="text-xs text-muted-foreground text-center mt-6">
          This is a one-time setup process. Once complete, you can login at /admin
        </p>
      </Card>
    </div>
  );
};

export default SetupAdmin;
