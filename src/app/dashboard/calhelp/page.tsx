"use client";

import Search from "@/components/dashboard/calhelp/Search";
import CalorieDisplay from "@/components/dashboard/calhelp/CalorieDisplay";
import foodItems from "@/lib/indianFoodCalories.json";
import { useState } from 'react';

export default function CalHelpPage() {
  const [selectedFood, setSelectedFood] = useState<{ name: string; calories: number } | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = (foodName: string) => {
    const foundFood = foodItems.find(item => item.name.toLowerCase() === foodName.toLowerCase());
    setSelectedFood(foundFood || null);
    setHasSearched(true);
  };

  return (
    <div className="flex flex-col h-full items-center justify-center p-6">
      <Search onSearch={handleSearch} />
      {hasSearched && (
        <CalorieDisplay 
          foodName={selectedFood?.name || ""}
          calories={selectedFood?.calories || 0}
        />
      )}
    </div>
  );
}
