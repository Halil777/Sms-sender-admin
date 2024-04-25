import { FC, useEffect, useState } from "react";
import HomeTable from "../../components/home/HomeTable";
import AddClient from "../../components/home/AddClient";
import FilterRegion from "../../components/home/FilterRegion";
import SortType from "../../components/home/SortType";
import { AxiosInstance } from "../../api/AxiosInstance";
import { User } from "../../type/type";

const Home: FC = () => {
  const [users, setUsers] = useState<User[]>([]);

  const fetchData = async () => {
    try {
      const response = await AxiosInstance.get<User[]>("/user");
      setUsers(response.data);
      console.log("Data fetched successfully:", response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-10">
          <FilterRegion />
          <SortType />
        </div>
        <AddClient />
      </div>
      <HomeTable users={users} />
    </div>
  );
};

export default Home;
