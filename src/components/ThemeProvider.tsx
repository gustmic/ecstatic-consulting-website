import { useEffect } from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { useUserPreferences } from "@/hooks/useUserPreferences";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { preferences, loading } = useUserPreferences();

  useEffect(() => {
    if (!loading && preferences?.theme) {
      const root = window.document.documentElement;
      root.classList.remove("light", "dark");
      
      if (preferences.theme === "system") {
        const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
        root.classList.add(systemTheme);
      } else {
        root.classList.add(preferences.theme);
      }
    }
  }, [preferences?.theme, loading]);

  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </NextThemesProvider>
  );
}
