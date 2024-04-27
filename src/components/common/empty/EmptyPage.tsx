import { FC, useContext } from "react";
import { ThemeContext } from "../theme/ThemeContext";

const EmptyPage: FC = () => {
  const context = useContext(ThemeContext);

  if (!context) {
    return null;
  }

  const { theme } = context;

  return (
    <div className="flex justify-center items-center w-full h-[60vh]">
      <div className="flex flex-col items-center gap-4">
        <span className="dark:text-gray-200">
          Sorry , there's nothing to show here.
        </span>
        <img
          src={
            theme === "dark" ? "./images/empty (2).gif" : "./images/empty.gif"
          }
          className="w-[200px]"
          alt="empty animation"
        />
      </div>
    </div>
  );
};

export default EmptyPage;
