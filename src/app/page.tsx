"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Sparkles, Flame, Apple, SunMoon } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useThemeStore } from "@/stores/useThemeStore";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { User } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const { darkMode, toggleDarkMode } = useThemeStore();
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const getUser = async () => {
      const { data, error } = await supabase.auth.getUser();

      if (error) {
        console.log("Error getting user:", error.message);
      } else {
        setUser(data.user);
      }
    };
    getUser();
  }, []);

  return (
    <main className="min-h-screen bg-white dark:bg-gray-950">
      {/* 🔹 Header / Navbar */}
      <header className="w-full flex justify-between items-center px-6 py-3 absolute top-0 z-50">
        <Link href="/" className="text-xl font-bold">
          CalorieTrack
        </Link>
        <nav className="flex gap-4 items-center">
          <Link href="/about" className="text-sm">
            Features
          </Link>
          <Link href="/about" className="text-sm">
            About
          </Link>
          {user && (
            <Link href="/dashboard" className="text-sm">
              Dashboard
            </Link>
          )}
          {user ? (
            <div className="flex gap-4 items-center">
              <p className="text-sm">Hello, {user.email}</p>
              <Button
                variant="outline"
                size="sm"
                onClick={async () => {
                  await supabase.auth.signOut();
                  window.location.reload();
                }}
              >
                Logout
              </Button>
            </div>
          ) : (
            <Link href="/login">
              <Button variant="outline" size="sm">
                Log In
              </Button>
            </Link>
          )}
          <Button variant="outline" size="sm">
            Demo
          </Button>
          <Button variant="outline" size="icon_sm" onClick={toggleDarkMode}>
            <SunMoon />
          </Button>
        </nav>
      </header>

      {/* 🔸 Hero Section */}
      <section className="">
        <div className="h-150 bg-gray-400 dark:bg-gray-800 flex flex-col items-center justify-center text-center">
          <motion.div
            className=""
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl font-bold tracking-tight mb-4">
              Track Your Calories, <br /> Fuel Your Goals
            </h1>
            <p className="text-lg">
              A simple yet powerful calorie tracker to help you eat smarter,
              stay on track, and hit your goals every day.
            </p>

            <div className="flex gap-4 mt-4 justify-center">
              <Link href="/signup">
                <Button size="lg">Get Started</Button>
              </Link>
              <Link href="/about">
                <Button variant="outline" size="lg">
                  View Demo
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 🔸 Feature Cards */}
      <section className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto px-4">
        {[
          {
            icon: <Flame className="text-red-500 w-8 h-8" />,
            title: "Smart Calorie Logging",
            desc: "Effortlessly log meals and snacks with our smart food database.",
          },
          {
            icon: <Apple className="text-green-500 w-8 h-8" />,
            title: "Nutrient Breakdown",
            desc: "Get detailed insights on your macros and nutrition trends.",
          },
          {
            icon: <Sparkles className="text-yellow-500 w-8 h-8" />,
            title: "Goal Tracking",
            desc: "Set daily goals and let us help you stay consistent over time.",
          },
        ].map((item, index) => (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            key={index}
          >
            <Card key={index} className="rounded-2xl shadow-md p-6">
              <CardContent className="flex flex-col items-center text-center">
                <div className="mb-4">{item.icon}</div>
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p className="text-sm text-muted-foreground mt-2">
                  {item.desc}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </section>
    </main>
  );
}
