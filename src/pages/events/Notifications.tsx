import { FC } from "react";

const Notifications: FC = () => {
  return (
    <div className="dark:text-gray-200 text-gray-800 flex   flex-col h-screen">
      <span className="text-2xl font-bold mb-10">Events</span>
      <div className="border w-[90%] h-[70%] overflow-auto"></div>
    </div>
  );
};

export default Notifications;
