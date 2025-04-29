"use client";

import { LoginForm } from "@/components/auth/login-form";
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
        <LoginForm />
      </div>
    </div>
  );
}
