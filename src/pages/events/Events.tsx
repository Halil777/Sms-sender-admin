import React, { useEffect, useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa";
import Notifications from "./Notifications";
import AddEvent from "./AddEvent";
import { AxiosInstance } from "../../api/AxiosInstance";

interface Day {
  date?: Date;
  isCurrentMonth?: boolean;
}

export interface UserEvent {
  id: number;
  title: string;
  text: string;
  reminderDate: string;
}

const Calendar: React.FC = () => {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [addEvent, setAddEvent] = useState(false);
  const [events, setEvents] = useState<UserEvent[]>([]);
  const [clickedDay, setClickedDay] = useState<Date | null>(null);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await AxiosInstance.get("/scheduler");
      setEvents(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  const deleteEvent = (id: string) => {
    AxiosInstance.delete(`/scheduler/${id}`)
      .then((res) => {
        // handle success
        console.log(res.data);
        fetchEvents();
      })
      .catch((error) => {
        // handle error
        console.error(error);
      });
  };

  const handleOpenEventAdd = (date: Date | null) => {
    setClickedDay(date);
    setAddEvent(!addEvent);
  };

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

  const getDisplayedDays = (): Day[] => {
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();

    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

    const days: Day[] = [];

    const firstDay = new Date(currentYear, currentMonth, 1).getDay();

    for (let i = 0; i < firstDay; i++) {
      days.push({ isCurrentMonth: false });
    }

    for (let i = 1; i <= daysInMonth; i++) {
      days.push({
        date: new Date(currentYear, currentMonth, i),
        isCurrentMonth: true,
      });
    }

    const remainingDays = (7 - (days.length % 7)) % 7;
    for (let i = 1; i <= remainingDays; i++) {
      days.push({ isCurrentMonth: false });
    }

    return days;
  };

  return (
    <div>
      <div className="flex gap-10">
        <div className="calendar container mx-auto mt-8 flex w-[70%] flex-col dark:text-white">
          <div className="flex gap-5 justify-center  w-full mb-4 ">
            <button
              title={new Date(
                currentDate.getFullYear(),
                currentDate.getMonth() - 1
              ).toLocaleDateString("en-US", { month: "long" })}
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
                onClick={() =>
                  handleOpenEventAdd(day.date === undefined ? null : day.date)
                }
                key={day.date?.getTime() || Math.random()}
                className={`border border-gray-200 py-5 text-center cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-600 ${
                  day.isCurrentMonth
                    ? day.date?.getDate() === new Date().getDate()
                      ? "bg-blue-200 text-blue-700"
                      : ""
                    : "text-gray-400 opacity-50"
                }`}
              >
                {day.date ? day.date.getDate() : ""}
              </div>
            ))}
          </div>
        </div>
        <div className="w-[30%]">
          <div className="w-full">
            <Notifications events={events} deleteEvent={deleteEvent} />
          </div>
        </div>
      </div>
      {addEvent && (
        <>
          <AddEvent
            clickedDay={clickedDay}
            fetchEvents={fetchEvents}
            setAddEvent={setAddEvent}
          />
        </>
      )}
    </div>
  );
};

export default Calendar;
