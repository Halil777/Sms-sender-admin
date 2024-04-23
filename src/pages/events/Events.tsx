import { FC } from "react";

const Events: FC = () => {
  return (
    <div className="container mx-auto mt-8 flex dark:text-white">
      {/* Calendar Grid */}
      <div className="flex-grow mr-8">
        <h2 className="text-xl font-semibold mb-4">April 2024</h2>
        <div className="grid grid-cols-7 gap-4">
          {/* Calendar Days */}
          {Array.from({ length: 30 }, (_, i) => (
            <div key={i} className="p-2 border border-gray-200 text-center">
              {i + 1}
            </div>
          ))}
        </div>
      </div>
      {/* Event Notifications */}
      <div className="w-64">
        <h2 className="text-xl font-semibold mb-4">Events</h2>
        <div className="border border-gray-200 p-4">
          <div className="mb-2">
            <h3 className="font-semibold">Event 1</h3>
            <p className="text-sm text-gray-600">April 5th, 2024</p>
          </div>
          <div className="mb-2">
            <h3 className="font-semibold">Event 2</h3>
            <p className="text-sm text-gray-600">April 12th, 2024</p>
          </div>
          {/* Add more event notifications as needed */}
        </div>
      </div>
    </div>
  );
};

export default Events;
