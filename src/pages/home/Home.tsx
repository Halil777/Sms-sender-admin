import { FC, useEffect, useState } from "react";
import HomeTable from "../../components/home/HomeTable";
import AddClient from "../../components/home/AddClient";
import FilterRegion from "../../components/home/FilterRegion";
import SortType from "../../components/home/SortType";
import { AxiosInstance } from "../../api/AxiosInstance";
import { User } from "../../type/type";

const Home: FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [regionFilter, setRegionFilter] = useState<string | null>(null);
  const [typeFilter, setTypeFilter] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      let url = "/user/";
      if (regionFilter && typeFilter) {
        url = `/user/filter-users?region=${regionFilter}&type=${typeFilter}`;
      } else if (regionFilter) {
        url = `/user/filter-users?region=${regionFilter}`;
      } else if (typeFilter) {
        url = `/user/filter-users?type=${typeFilter}`;
      }

      const response = await AxiosInstance.get<User[]>(url);
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [regionFilter, typeFilter]);

  const handleRegionFilterChange = (region: string) => {
    setRegionFilter(region === "all" ? null : region);
  };

  const handleTypeFilterChange = (type: string) => {
    setTypeFilter(type === "all" ? null : type);
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-10 ">
          <FilterRegion onRegionChange={handleRegionFilterChange} />
          <SortType onTypeChange={handleTypeFilterChange} />
        </div>
        <AddClient fetchData={fetchData} />
      </div>
      <HomeTable users={users} fetchData={fetchData} loading={loading} />
    </div>
  );
};

export default Home;
