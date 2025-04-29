"use client";

import { BarProgressChart } from "@/components/dashboard/BarProgressChart";
import { RadialProgressChart } from "@/components/dashboard/RadialProgressChart";
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
import { useEffect, useRef, useState } from "react";

const foodItems = [
  {
    name: "Chapatis",
    quantity: 3,
    calories: 300,
  },
  {
    name: "Chapatis1",
    quantity: 3,
    calories: 300,
  },
  {
    name: "Chapatis2",
    quantity: 3,
    calories: 300,
  },
  {
    name: "Chapatis3",
    quantity: 3,
    calories: 300,
  },
];

const foodList = [
  "Pizza",
  "Burger",
  "Pasta",
  "Salad",
  "Sushi",
  "Sandwich",
  "Taco",
  "Fries",
  "Steak",
];

export default function DashboardPage() {
  const [inputValue, setInputValue] = useState("");
  const [filteredList, setFilteredList] = useState<string[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);

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

  const handleInputChange = (value: string) => {
    setInputValue(value);
    if (value.trim() === "") {
      setFilteredList([]);
      setShowDropdown(false);
    } else {
      const filtered = foodList
        .filter((item) => item.toLowerCase().includes(value.toLowerCase()))
        .slice(0, 5);
      setFilteredList(filtered);
      setShowDropdown(true);
    }
  };

  const handleItemClick = (item: string) => {
    setInputValue(item);
    setShowDropdown(false);
  };

  return (
    <div>
      <div className="responsive-grid gap-6 p-6">
        <Card>
          <CardHeader>
            <CardTitle>Todays Items</CardTitle>
            <CardDescription>Food you eaten today</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-1 h-[183px] overflow-y-auto">
              {foodItems.map((item) => (
                <div
                  key={item.name}
                  className="flex border-1 rounded-lg py-2 px-4 text-sm text-gray-500"
                >
                  <div className="grow">
                    <p>{item.name}</p>
                    <p>{item.quantity}</p>
                  </div>
                  <div className="">{item.calories}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
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
                  value={inputValue}
                  onChange={(e) => handleInputChange(e.target.value)}
                  onFocus={() => {
                    if (filteredList.length > 0) setShowDropdown(true);
                  }}
                  required
                />
                {showDropdown && filteredList.length > 0 && (
                  <div className="absolute top-full mt-1 w-full rounded-md border bg-white shadow z-50 max-h-60 overflow-auto">
                    {filteredList.map((item: any, index: number) => (
                      <div
                        key={index}
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => handleItemClick(item)}
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className="flex gap-3">
                <div className="grid gap-2">
                  <Label htmlFor="foodQuan">Quantity</Label>
                  <Input id="foodQuan" type="number" placeholder="1" required />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="foodCal">Calories</Label>
                  <Input
                    id="foodCal"
                    type="number"
                    placeholder="300"
                    required
                  />
                </div>
              </div>
            </div>
            <div className="flex w-full mt-4 items-center justify-center">
              <Button variant="outline" size="lg">
                Add Item
              </Button>
            </div>
          </CardContent>
        </Card>
        <RadialProgressChart />
        <BarProgressChart />
      </div>
    </div>
  );
}
