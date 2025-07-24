import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowUp } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import foodItems from "@/lib/indianFoodCalories.json";

interface SearchProps {
  onSearch: (foodName: string) => void;
}

export default function Search({ onSearch }: SearchProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredSuggestions, setFilteredSuggestions] = useState<
    { name: string; calories: number }[]
  >([]);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (searchTerm.length > 0) {
      const filtered = foodItems.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredSuggestions(filtered);
      if (filtered.length > 0 && !isPopoverOpen) {
        setIsPopoverOpen(true);
      }
    } else {
      setFilteredSuggestions([]);
      setIsPopoverOpen(false);
    }
  }, [searchTerm, isPopoverOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        inputRef.current &&
        !inputRef.current.contains(event.target as Node) &&
        popoverRef.current &&
        !popoverRef.current.contains(event.target as Node)
      ) {
        setIsPopoverOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [inputRef, popoverRef]);

  const handleSearch = () => {
    const selected = foodItems.find(
      (item) => item.name.toLowerCase() === searchTerm.toLowerCase()
    );
    if (selected) {
      onSearch(selected.name);
    } else {
      onSearch(searchTerm);
    }
    setSearchTerm(""); // Clear search term after search
    setIsPopoverOpen(false);
  };

  const handleSelectSuggestion = (name: string) => {
    setSearchTerm(""); // Clear search term after selection
    onSearch(name);
    setIsPopoverOpen(false);
  };

  return (
    <div className="relative w-full max-w-3xl">
      <div className="flex w-full items-center space-x-4 p-4 rounded-xl border border-input bg-background shadow">
        <Input
          ref={inputRef}
          type="search"
          placeholder="Enter food..."
          className="flex-1 bg-transparent border-none px-0 py-0 text-2xl shadow-none focus-visible:ring-0 focus-visible:ring-offset-0"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => {
            if (filteredSuggestions.length > 0) {
              setIsPopoverOpen(true);
            }
          }}
        />
        <Button
          type="submit"
          className="rounded-full bg-gray-100 p-4 text-gray-800 hover:bg-gray-200"
          onClick={handleSearch}
        >
          <ArrowUp className="h-8 w-8" />
        </Button>
      </div>
      {isPopoverOpen && filteredSuggestions.length > 0 && (
        <div
          ref={popoverRef}
          className="absolute z-50 mt-2 w-full rounded-md border bg-popover p-0 text-popover-foreground shadow-md outline-none animate-in data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2"
          
        >
          <div className="max-h-60 overflow-y-auto">
            {filteredSuggestions.map((item) => (
              <div
                key={item.name}
                className="cursor-pointer p-2 hover:bg-accent hover:text-accent-foreground"
                onMouseDown={() => handleSelectSuggestion(item.name)}
              >
                {item.name}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
