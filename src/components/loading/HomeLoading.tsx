import { FC } from "react";

const HomeLoading: FC = () => {
  return (
    <div>
      <div role="status" className="w-full animate-pulse mt-10">
        <div className="h-10 bg-gray-200  dark:bg-gray-700 w-full mb-4"></div>
        <div className="h-8 bg-gray-200  dark:bg-gray-700 w-full mb-1"></div>
        <div className="h-8 bg-gray-200  dark:bg-gray-700 w-full mb-1"></div>
        <div className="h-8 bg-gray-200  dark:bg-gray-700 w-full mb-1"></div>
        <div className="h-8 bg-gray-200  dark:bg-gray-700 w-full mb-1"></div>
        <div className="h-8 bg-gray-200  dark:bg-gray-700 w-full mb-1"></div>
        <div className="h-8 bg-gray-200  dark:bg-gray-700 w-full mb-1"></div>
        <div className="h-8 bg-gray-200  dark:bg-gray-700 w-full mb-1"></div>
        <div className="h-8 bg-gray-200  dark:bg-gray-700 w-full"></div>
      </div>
    </div>
  );
};

export default HomeLoading;
