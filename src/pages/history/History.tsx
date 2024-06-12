import { FC, useState, useEffect } from "react";
import { FiTrash } from "react-icons/fi";
import { AxiosInstance } from "../../api/AxiosInstance";
import FilterRegion from "../../components/home/FilterRegion";
import SortType from "../../components/home/SortType";
import { User } from "../../type/type";
// import SearchUserMessage from "./SearchUserMessage";
import HomeLoading from "../../components/loading/HomeLoading";
import EmptyPage from "../../components/common/empty/EmptyPage";

interface Message {
  id: number;
  message: string;
  scheduledDate: string;
  phone: string;
  isScheduled: boolean;
  status: string;
  userId: number;
  uuid: string;
  region: string;
  type: string;
  created_at: string;
  updated_at: string;
}

const History: FC = () => {
  const [filteredMessages, setFilteredMessages] = useState<Message[]>([]);
  const [regionFilter, setRegionFilter] = useState<string | null>(null);
  const [typeFilter, setTypeFilter] = useState<string | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [openMessageId, setOpenMessageId] = useState<number | null>(null);

  useEffect(() => {
    if (!loading) {
      setDataLoaded(users.length > 0);
    }
  }, [loading, users]);

  const fetchData = async () => {
    setLoading(true);
    try {
      let url = "/history/filter";

      if (regionFilter && typeFilter) {
        url = `/history/filter?region=${regionFilter}&type=${typeFilter}`;
      } else if (typeFilter) {
        url = `/history/filter?type=${typeFilter}`;
      } else if (regionFilter) {
        url = `/history/filter?region=${regionFilter}`;
      }

      const [messagesResponse, usersResponse] = await Promise.all([
        AxiosInstance.get<Message[]>(url),
        AxiosInstance.get<User[]>("/user"),
      ]);

      setFilteredMessages(messagesResponse.data);
      setUsers(usersResponse.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [regionFilter, typeFilter]);

  const handleOpenMessage = (id: number) => {
    setOpenMessageId(openMessageId === id ? null : id);
  };

  // const handleSearchChange = (name: string) => {
  //   // Filter messages based on selected user name
  //   const filtered = filteredMessages.filter((message) => {
  //     const user = users.find((user) => user.id === message.userId);
  //     return user?.fullName?.toLowerCase().includes(name.toLowerCase());
  //   });
  //   setFilteredMessages(filtered);
  // };

  const handleRegionFilterChange = (region: string) => {
    setRegionFilter(region === "all" ? null : region);
  };

  const handleTypeFilterChange = (type: string) => {
    setTypeFilter(type === "all" ? null : type);
  };

  const handleDeleteMessage = async (id: number) => {
    try {
      await AxiosInstance.delete(`/history/${id}`);
      setFilteredMessages((prevMessages) =>
        prevMessages.filter((message) => message.id !== id)
      );
    } catch (error) {
      console.error("Error deleting message:", error);
    }
  };

  return (
    <>
      {loading ? (
        <HomeLoading />
      ) : dataLoaded ? (
        <div className="overflow-x-auto">
          <div className="flex justify-between items-center mb-5 mt-5">
            <div className="flex items-center gap-4">
              <FilterRegion onRegionChange={handleRegionFilterChange} />
              <SortType onTypeChange={handleTypeFilterChange} />
            </div>
            {/* <SearchUserMessage
              suggestions={users.map((user) => user.fullName)}
              onChange={handleSearchChange}
            /> */}
          </div>
          <table className="table-auto w-full dark:text-white">
            <thead>
              <tr>
                <th className="px-4 border py-2">ID</th>
                <th className="px-4 border py-2">Full Name</th>
                <th className="px-4 border py-2">Message</th>
                <th className="px-4 border py-2">Phone Number</th>
                <th className="px-4 border py-2">Region</th>
                <th className="px-4 border py-2">Type</th>
                <th className="px-4 border py-2">Date</th>
                <th className="px-4 border py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredMessages.map((message) => {
                const user = users.find((user) => user.id === message.userId);
                return (
                  <tr key={message.id}>
                    <td className="border px-4 py-2">{message.id}</td>
                    <td className="border px-4 py-2">
                      {user ? user.fullName : "-"}
                    </td>
                    <td
                      className="border px-4 py-2 cursor-pointer"
                      onClick={() => handleOpenMessage(message.id)}
                    >
                      {openMessageId === message.id
                        ? message.message
                        : message.message.slice(7, 19)}
                      ...
                    </td>
                    <td className="border px-4 py-2">{message.phone}</td>
                    <td className="border px-4 py-2">{message.region}</td>
                    <td className="border px-4 py-2">{message.type}</td>
                    <td className="border px-4 py-2 ">
                      {message.created_at.substring(0, 10)}
                    </td>
                    <td className="border px-4 py-2 text-center">
                      <button
                        className="text-red-700 dark:text-red-500"
                        onClick={() => handleDeleteMessage(message.id)}
                      >
                        <FiTrash />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <EmptyPage />
      )}
    </>
  );
};

export default History;
