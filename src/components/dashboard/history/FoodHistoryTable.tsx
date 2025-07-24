"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { AnimatePresence, motion } from "framer-motion";
import React from "react";

type FoodEntry = {
  id: string;
  food_name: string;
  quantity: string;
  total_cal: number;
  entry_date: string;
};

type GroupedEntries = {
  date: string;
  entries: FoodEntry[];
  totalCals: number;
};

const groupByDate = (entries: FoodEntry[]): GroupedEntries[] => {
  const grouped = entries.reduce((acc, entry) => {
    const date = entry.entry_date;
    if (!acc[date]) {
      acc[date] = { date, entries: [], totalCals: 0 };
    }
    acc[date].entries.push(entry);
    acc[date].totalCals += entry.total_cal || 0;
    return acc;
  }, {} as Record<string, GroupedEntries>);
  console.log(grouped);
  return Object.values(grouped).sort((a, b) => b.date.localeCompare(a.date));
};

export default function FoodHistoryTable({
  entries,
}: {
  entries: FoodEntry[];
}) {
  const grouped = groupByDate(entries);
  const [openDates, setOpenDates] = useState<string[]>([]);

  const toggleDate = (date: string) => {
    setOpenDates((prev) =>
      prev.includes(date) ? prev.filter((d) => d !== date) : [...prev, date]
    );
  };

  return (
    <Table className="text-center">
      <TableHeader>
        <TableRow>
          <TableHead className="text-center text-muted-foreground">
            Date
          </TableHead>
          <TableHead className="text-center text-muted-foreground">
            Summary
          </TableHead>
          <TableHead className="text-center text-muted-foreground">
            Total Calories
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {grouped.map(({ date, entries, totalCals }) => (
          <React.Fragment key={date}>
            {/* Summary row */}
            <TableRow
              key={date}
              onClick={() => toggleDate(date)}
              className="cursor-pointer hover:bg-muted/50"
            >
              <TableCell>{new Date(date).toDateString()}</TableCell>
              <TableCell>{entries.length} items</TableCell>
              <TableCell>{totalCals} cal</TableCell>
            </TableRow>

            {/* Expanded detail rows */}
            {openDates.includes(date) &&
              entries.map((entry) => (
                <TableRow key={entry.id} className="bg-muted/10">
                  <TableCell></TableCell>
                  <TableCell>
                    {entry.food_name} ({entry.quantity})
                  </TableCell>
                  <TableCell>{entry.total_cal}</TableCell>
                </TableRow>
              ))}
          </React.Fragment>
        ))}
      </TableBody>
    </Table>
  );
}
