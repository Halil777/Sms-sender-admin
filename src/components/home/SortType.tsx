import { FC, ChangeEvent } from "react";

interface SortTypeProps {
  onTypeChange: (type: string) => void;
}

const SortType: FC<SortTypeProps> = ({ onTypeChange }) => {
  const handleTypeChange = (e: ChangeEvent<HTMLSelectElement>) => {
    onTypeChange(e.target.value);
  };

  return (
    <div className="flex flex-col gap-3">
      <label htmlFor="type" className="mr-2 dark:text-white font-medium">
        Filter by Type:
      </label>
      <select
        id="type"
        className="border border-gray-300 rounded-md p-2 focus:outline-none w-52 focus:border-blue-500 flex items-start left-0 mb-5"
        onChange={handleTypeChange}
      >
        <option value="all">Choose Type</option>
        <option value="parnik">Green House</option>
        <option value="zawod">Company</option>
      </select>
    </div>
  );
};

export default SortType;
