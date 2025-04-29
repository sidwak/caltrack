"use client";

import { useThemeStore } from "@/stores/useThemeStore";
import "./globals.css";
import { useEffect } from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { darkMode, toggleDarkMode, initTheme } = useThemeStore();

  useEffect(() => {
    initTheme();
  }, [initTheme]);

  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
