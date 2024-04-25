import React, { useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa";
import Notifications from "./Notifications";

interface Day {
  date?: Date; // Optional property for date
  isCurrentMonth?: boolean; // Flag indicating if it's from the current month
}

const Calendar: React.FC = () => {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());

  // Function to navigate to previous or next month
  const handlePrevMonth = () => {
    const prevMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() - 1
    );
    setCurrentDate(prevMonth);
  };
  const handleNextMonth = () => {
    const nextMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1
    );
    setCurrentDate(nextMonth);
  };

  // Get all days of the current month
  const getDisplayedDays = (): Day[] => {
    const currentMonth = currentDate.getMonth(); // 0 (January) to 11 (December)
    const currentYear = currentDate.getFullYear();

    // Get the number of days in the current month (accounting for leap years)
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate(); // 0 in the next month gives us the last day of current month

    // Create an array to store the days of the month
    const days: Day[] = [];

    // Get the day of the week for the first day of the month
    const firstDay = new Date(currentYear, currentMonth, 1).getDay(); // 0 (Sunday) to 6 (Saturday)

    // Add empty days before the first day of the month (if needed)
    for (let i = 0; i < firstDay; i++) {
      days.push({ isCurrentMonth: false }); // Placeholder for days from previous month
    }

    // Add days for the current month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push({
        date: new Date(currentYear, currentMonth, i),
        isCurrentMonth: true,
      });
    }

    // Optionally, add empty days after the last day of the month (to fill the grid)
    const remainingDays = (7 - (days.length % 7)) % 7; // Calculate remaining days to fill the last week
    for (let i = 1; i <= remainingDays; i++) {
      days.push({ isCurrentMonth: false }); // Placeholder for days from next month
    }

    return days;
  };

  return (
    <div className="flex gap-10">
      <div className="calendar container mx-auto mt-8 flex w-[70%] flex-col dark:text-white">
        <div className="flex gap-5 justify-center  w-full mb-4 ">
          <button
            title={new Date(
              currentDate.getFullYear(),
              currentDate.getMonth() - 1
            ).toLocaleDateString("en-US", { month: "long" })} // Get previous month name
            onClick={handlePrevMonth}
            className="text-gray-600 dark:text-gray-200 hover:text-gray-400"
          >
            <FaArrowLeft />
          </button>
          <h2 className="text-xl font-semibold">
            {currentDate.toLocaleDateString("en-US", {
              month: "long",
              year: "numeric",
            })}
          </h2>
          <button
            title={new Date(
              currentDate.getFullYear(),
              currentDate.getMonth() + 1
            ).toLocaleDateString("en-US", { month: "long" })}
            onClick={handleNextMonth}
            className="text-gray-600 dark:text-gray-200 hover:text-gray-400"
          >
            <FaArrowRight />
          </button>
        </div>
        <div className="grid grid-cols-7 w-full">
          <span className="text-center font-semibold">Sun</span>
          <span className="text-center font-semibold">Mon</span>
          <span className="text-center font-semibold">Tue</span>
          <span className="text-center font-semibold">Wed</span>
          <span className="text-center font-semibold">Thu</span>
          <span className="text-center font-semibold">Fri</span>
          <span className="text-center font-semibold">Sat</span>
          {getDisplayedDays().map((day) => (
            <div
              key={day.date?.getTime() || Math.random()} // Key for days without date
              className={`border border-gray-200 py-5 text-center ${
                day.isCurrentMonth
                  ? day.date?.getDate() === new Date().getDate()
                    ? "bg-blue-200 text-blue-700" // Current day style (blue background, blue text)
                    : "" // No style for other days in current month
                  : "text-gray-400 opacity-50" // Style days from previous/next month
              }`}
            >
              {day.date ? day.date.getDate() : ""}
            </div>
          ))}
        </div>
      </div>
      <div className="w-[30%]">
        <div className="w-full">
          <Notifications />
        </div>
      </div>
    </div>
  );
};

export default Calendar;
