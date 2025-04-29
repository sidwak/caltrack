"use client";

import { SignupForm } from "@/components/auth/signup-form";
import { useThemeStore } from "@/stores/useThemeStore";
import { useEffect } from "react";

export default function Page() {
  const { initTheme } = useThemeStore();

  useEffect(() => {
    initTheme();
  }, [initTheme]);

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <SignupForm />
      </div>
    </div>
  );
}
