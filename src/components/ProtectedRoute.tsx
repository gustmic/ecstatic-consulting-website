import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const navigate = useNavigate();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        navigate("/admin");
        return;
      }

      // Check if session is older than 8 hours
      const sessionStart = localStorage.getItem('session_start_time');
      if (!sessionStart) {
        localStorage.setItem('session_start_time', Date.now().toString());
      } else {
        const loginTime = parseInt(sessionStart);
        const currentTime = Date.now();
        const eightHours = 8 * 60 * 60 * 1000;

        if (currentTime - loginTime > eightHours) {
          localStorage.removeItem('session_start_time');
          await supabase.auth.signOut();
          navigate("/admin");
          return;
        }
      }

      setIsChecking(false);
    };

    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_OUT' || !session) {
        navigate("/admin");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  if (isChecking) {
    return null;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
