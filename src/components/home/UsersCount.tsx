import { FC } from "react";

interface UsersCountProps {
  count: number;
}

const UsersCount: FC<UsersCountProps> = ({ count }) => {
  return (
    <div className="border px-5 py-2 flex items-center justify-center rounded-md dark:text-gray-700 text-[16px]  dark:bg-gray-100">
      Users Count: <span className="font-bold mr-2 ml-2">{count}</span>
    </div>
  );
};

export default UsersCount;
