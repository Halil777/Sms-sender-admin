import { FC } from "react";
import "./smooth.css";

const SmoothButton: FC = () => {
  return (
    <>
      <div className="w-full">
        <div className="w-[200px] relative h-11 rounded-md flex items-center justify-center bg-gray-400 text-white">
          <p className="sidebar_fourth_item">Test</p>
        </div>
      </div>
    </>
  );
};

export default SmoothButton;
