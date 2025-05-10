"use client";

import * as React from "react";
import { addDays, format, subDays } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { DateRange } from "react-day-picker";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";

export function DatePickerWithRange({
  className,
}: React.HTMLAttributes<HTMLDivElement>) {
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: subDays(new Date(), 9),
    to: new Date(),
  });
  const [startDate, setStartDate] = useState<Date | null>(null);

  // Handle start date selection
  const handleStartDateClick = (date: Date) => {
    setStartDate(date);
    setDate({ from: date, to: undefined }); // Clear the "to" date when a new "from" date is selected
  };

  const handleEndDateClick = (date: Date) => {
    if (startDate) {
      // Check if the "from" date is greater than the "to" date
      const newRange = { from: startDate, to: date };

      // If the "from" date is greater than the "to" date, reverse them
      if (newRange.from > newRange.to) {
        setDate({ from: newRange.to, to: newRange.from });
      } else {
        setDate(newRange); // Otherwise, just set the range as is
      }
    }
  };

  // Disable dates after the selected start date until the end date is selected
  const disableAfterStartDate = (sdate: Date): boolean => {
    if (startDate && !date?.to) {
      // Disable dates after the selected start date (before the end date is picked)
      if (
        sdate.getTime() !== addDays(startDate, 10).getTime() &&
        sdate.getTime() !== subDays(startDate, 10).getTime()
      ) {
        if (sdate.getTime() === startDate.getTime()) {
          return false;
        } else {
          return true;
        }
      }
    }
    return false; // Otherwise, don't disable any date
  };

  // Modifiers object to apply the disable logic
  const modifiers: { [key: string]: (date: Date) => boolean } = {
    disabled: disableAfterStartDate,
  };

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-full justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} -{" "}
                  {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            autoFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            modifiers={modifiers}
            onDayClick={(sdate: Date) => {
              if (!startDate || date?.to) {
                // If no start date or if end date is already selected, start selecting the new range
                handleStartDateClick(sdate);
              } else {
                // If the start date is selected, choose the end date
                handleEndDateClick(sdate);
              }
            }}
            onSelect={setDate}
            numberOfMonths={2}
            min={10}
            max={10}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
