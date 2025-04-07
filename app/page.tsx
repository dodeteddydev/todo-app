"use client";

import { Background } from "@/components/Background";
import { BodySection } from "@/components/BodySection";
import { HeaderSection } from "@/components/HeaderSection";
import { Theme, useTheme } from "@/hooks/useTheme";
import { useEffect } from "react";

export default function Home() {
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const storedTheme = (localStorage.getItem("theme") as Theme) || theme;
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(storedTheme);
    setTheme(storedTheme);
  }, [theme]);

  return (
    <main>
      <Background>
        <HeaderSection />

        <BodySection />

        <footer className="mt-10">
          <p className="dark:text-dark-veryDarkGrayishBlue text-light-darkGrayishBlue text-center font-medium">
            Drag and drop to reorder list
          </p>
        </footer>
      </Background>
    </main>
  );
}
