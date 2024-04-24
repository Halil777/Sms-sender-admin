import { FC } from "react";

const FilterRegion: FC = () => {
  return (
    <div className="flex   flex-col gap-3">
      <label htmlFor="region" className="mr-2 dark:text-white font-medium">
        Filter by Region:
      </label>
      <select
        id="region"
        className="border  border-gray-300 rounded-md p-2 focus:outline-none w-52 focus:border-blue-500 flex items-start left-0 mb-5"
      >
        <option value="all">Choose Region</option>
        <option value="Ashgabat">Ashgabat</option>
        <option value="Ahal">Ahal</option>
        <option value="Lebap">Lebap</option>
        <option value="Balkan">Balkan</option>
        <option value="Mary">Mary</option>
        <option value="Dashoguz">Dashoguz</option>
      </select>
    </div>
  );
};

export default FilterRegion;
