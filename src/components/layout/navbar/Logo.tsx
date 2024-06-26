import { FC } from "react";
import logo from "./images/logo.jpg";

const Logo: FC = () => {
  return (
    <nav className="border-gray-200 px-2 py-2.5 rounded dark:bg-gray-800">
      <div className="flex items-center">
        <img src={logo} className="h-7 mr-3 " alt="medium.ia logo" />
        <span className="text-xl font-medium whitespace-nowrap dark:text-white">
          Admin Panel
        </span>
      </div>
    </nav>
  );
};

export default Logo;
