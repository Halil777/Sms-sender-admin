import { FC } from "react";
import HomeTable from "../../components/home/HomeTable";
import AddClient from "../../components/home/AddClient";
import FilterRegion from "../../components/home/FilterRegion";
import SortType from "../../components/home/SortType";

const Home: FC = () => {
  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-10">
          <FilterRegion />
          <SortType />
        </div>
        <AddClient />
      </div>
      <HomeTable />
    </div>
  );
};

export default Home;
