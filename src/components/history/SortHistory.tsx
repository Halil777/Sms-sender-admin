import { FC } from "react";

const SortHistory: FC = () => {
  return (
    <div className="flex  flex-col gap-3">
      <label htmlFor="region" className="mr-2 font-medium">
        Filter by Type:
      </label>
      <select
        id="region"
        className="border  border-gray-300 rounded-md p-2 focus:outline-none w-52 focus:border-blue-500 flex items-start left-0 mb-5"
      >
        <option value="all">Choose Type</option>
        <option value="GreeenHouse">Green House</option>
        <option value="Company">Company</option>
      </select>
    </div>
  );
};

export default SortHistory;
