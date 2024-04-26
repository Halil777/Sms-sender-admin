import React, { useState } from "react";
import { AxiosInstance } from "../../api/AxiosInstance";

interface AddEventProps {
  clickedDay: Date | null;
  fetchEvents: () => Promise<void>;
  setAddEvent: (value: boolean) => void;
}

const AddEvent: React.FC<AddEventProps> = ({
  clickedDay,
  fetchEvents,
  setAddEvent,
}) => {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");

  console.log(clickedDay);

  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();
  };

  const handleSaveEvent = async () => {
    try {
      const event = {
        reminderDate: clickedDay ? clickedDay.toISOString() : "",
        title: title,
        text: text ? text : "",
      };
      const response = await AxiosInstance.post("/scheduler", event);
      console.log("Event saved!", response.data);
      fetchEvents();
      setAddEvent(false);
    } catch (error) {
      console.error("Error saving event:", error);
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-500 bg-opacity-75 z-50">
      <div className="bg-white rounded-lg shadow-md p-8 max-w-md">
        <h2 className="text-xl font-semibold mb-4">Add Event</h2>
        <form onSubmit={handleFormSubmit}>
          <div className="mb-4">
            <label
              htmlFor="reminderDate"
              className="block text-gray-700 font-bold mb-2"
            >
              Title
            </label>
            <input
              type="text"
              name="reminderDate"
              id="reminderDate"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            <label
              htmlFor="reminderDate"
              className="block text-gray-700 font-bold mb-2"
            >
              Message
            </label>
            <input
              type="text"
              name="reminderDate"
              id="reminderDate"
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          {/* Submit button */}
          <button
            type="submit"
            onClick={handleSaveEvent}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Save Event
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddEvent;
