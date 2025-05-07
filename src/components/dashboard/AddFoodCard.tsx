"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GetDefinedFoods } from "@/lib/db/dashboard/GetDefinedFoods";
import { InsertNewFoodEntry } from "@/lib/db/dashboard/InsertNewFoodEntry";
import { useFoodInsertStore } from "@/stores/dashboard/useFoodInsertStore";
import { DefinedFood } from "@/types/food";
import { useEffect, useRef, useState } from "react";

const today = new Date().toISOString().split("T")[0];

export default function AddFoodCard() {
  const { triggerRefreshTodaysFoodCard } = useFoodInsertStore();

  const [foodNameValue, setFoodNameValue] = useState("");
  const [filteredList, setFilteredList] = useState<DefinedFood[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [quantityValue, setQuantityValue] = useState("");
  const [quantityMultiplier, setQuantityMultiplier] = useState(1);
  const [caloriesValue, setCaloriesValue] = useState(0);
  const [totalCalories, setTotalCalories] = useState(0);
  const [definedFoodList, setDefinedFoodList] = useState<DefinedFood[]>([]);
  const [loading, setLoading] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (!quantityValue) return;
    // Regex to capture the numeric part and unit part
    const match = quantityValue.match(/^(\d+)([a-zA-Z]+)$/);
    if (match) {
      const [, number, unit] = match;
      console.log("Number:", number);
      console.log("Unit:", unit);
      switch (unit.toLowerCase()) {
        case "u":
          console.log("Format: unit count");
          setTotalCalories(Number(number) * caloriesValue);
          setQuantityMultiplier(Number(number));
          break;
        case "g":
          console.log("Format: grams");
          setTotalCalories(caloriesValue);
          break;
        case "ml":
          console.log("Format: milliliters");
          setTotalCalories(caloriesValue);
          break;
        default:
          console.log("Unknown format");
      }
    } else {
      console.log("Invalid format");
    }
  }, [quantityValue]);

  useEffect(() => {
    setTotalCalories(quantityMultiplier * caloriesValue);
  }, [caloriesValue]);

  useEffect(() => {
    const fetchDefinedFoodList = async () => {
      const data = await GetDefinedFoods();
      setDefinedFoodList(data);
    };
    fetchDefinedFoodList();
  }, []);

  const handleInputChange = (value: string) => {
    setFoodNameValue(value);
    if (value.trim() === "") {
      setFilteredList([]);
      setShowDropdown(false);
    } else {
      const filtered = definedFoodList
        .filter((item: DefinedFood) =>
          item.name.toLowerCase().includes(value.toLowerCase())
        )
        .slice(0, 5);
      setFilteredList(filtered);
      setShowDropdown(true);
    }
  };

  const handleItemClick = (item: DefinedFood) => {
    setFoodNameValue(item.name);
    setCaloriesValue(item.total_cal);
    setQuantityValue(item.quantity);
    setShowDropdown(false);
  };

  const handleAddFoodClick = async () => {
    try {
      setLoading(true);
      await InsertNewFoodEntry({
        food_name: foodNameValue,
        total_cal: totalCalories,
        quantity: quantityValue,
        entry_date: today,
      });
      setFoodNameValue("");
      setCaloriesValue(0);
      setQuantityValue("");
    } catch (error: any) {
      alert(error.message);
    } finally {
      triggerRefreshTodaysFoodCard();
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add Food</CardTitle>
        <CardDescription>Add new Food you ate today</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-3">
          <div className="grid gap-2 relative" ref={containerRef}>
            <Label htmlFor="foodName">Food Name</Label>
            <Input
              id="foodName"
              type="text"
              placeholder="Pizza"
              value={foodNameValue}
              onChange={(e) => handleInputChange(e.target.value)}
              onFocus={() => {
                if (filteredList.length > 0) setShowDropdown(true);
              }}
              required
            />
            {showDropdown && filteredList.length > 0 && (
              <div className="absolute top-full mt-1 w-full rounded-md border bg-[var(--card)] shadow z-50 max-h-60 overflow-auto">
                {filteredList.map((item: DefinedFood, index: number) => (
                  <div
                    key={index}
                    className="px-4 py-2 hover:bg-[var(--accent)] cursor-pointer"
                    onClick={() => handleItemClick(item)}
                  >
                    {item.name}
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="flex gap-3 items-end">
            <div className="grow grid gap-2">
              <Label htmlFor="foodQuan">Quantity (u, g, ml)</Label>
              <Input
                id="foodQuan"
                type="text"
                placeholder="100g"
                value={quantityValue}
                onChange={(e) => setQuantityValue(e.target.value)}
                required
              />
            </div>
            <div className="grow grid gap-2">
              <div className="flex justify-between">
                <Label htmlFor="foodCal">Calories</Label>
                <Label
                  className={`text-muted-foreground blo ${
                    totalCalories === 0 ? "hidden" : ""
                  }`}
                >
                  Total: {totalCalories}
                </Label>
              </div>
              <Input
                id="foodCal"
                type="number"
                placeholder="300"
                value={caloriesValue}
                onChange={(e) => setCaloriesValue(Number(e.target.value))}
                required
              />
            </div>
          </div>
        </div>
        <div className="flex w-full mt-4 items-center justify-between">
          <div className="tt text-sm text-muted-foreground">
            <div>Total Calories</div>
            <div>{totalCalories} kcal</div>
          </div>
          <Button
            variant="default"
            size="lg"
            disabled={loading}
            onClick={handleAddFoodClick}
          >
            {loading ? "Logging..." : "Add Food"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

function useFoodEntryStore(): { triggerRefresh: any } {
  throw new Error("Function not implemented.");
}
