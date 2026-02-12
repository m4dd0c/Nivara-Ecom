"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function ModeToggle() {
  const [mounted, setMounted] = React.useState(false);
  const { setTheme, theme } = useTheme();
  const setThemeForSun = () => {
    setTheme("light");
  };

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <>
      {theme === "light" ? (
        <Moon
          className="text-foreground size-[1.2rem] rotate-0 scale-100 cursor-pointer transition-all"
          onClick={() => setTheme("dark")}
        />
      ) : (
        <Sun
          className="text-foreground size-[1.2rem] rotate-0 scale-100 cursor-pointer transition-all"
          onClick={setThemeForSun}
        />
      )}
    </>
  );
}
