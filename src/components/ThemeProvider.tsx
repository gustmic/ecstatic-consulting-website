import { useEffect } from "react";
import { ThemeProvider as NextThemesProvider, useTheme } from "next-themes";
import { useUserPreferences } from "@/hooks/useUserPreferences";

function ThemeSync() {
  const { setTheme } = useTheme();
  const { preferences, loading } = useUserPreferences();

  useEffect(() => {
    if (!loading && preferences?.theme) {
      setTheme(preferences.theme);
    }
  }, [preferences?.theme, loading, setTheme]);

  return null;
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <ThemeSync />
      {children}
    </NextThemesProvider>
  );
}
