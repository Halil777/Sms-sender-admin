import { FC, useState } from "react";
import { FiTrash } from "react-icons/fi";
import FilterHistory from "../../components/history/FilterHistory";
import SortHistory from "../../components/history/SortHistory";

interface Message {
  id: number;
  name: string;
  region: string;
  type: string;
  date: string;
  message: string;
}

const History: FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      name: "John Doe",
      region: "Ashgabat",
      type: "Tiplissa",
      date: "2024-04-25",
      message: "Lorem ipsum dolor sit amet.",
    },
    {
      id: 2,
      name: "John Doe",
      region: "Ashgabat",
      type: "Tiplissa",
      date: "2024-04-25",
      message: "Lorem ipsum dolor sit amet.",
    },
    {
      id: 3,
      name: "John Doe",
      region: "Ashgabat",
      type: "Tiplissa",
      date: "2024-04-25",
      message: "Lorem ipsum dolor sit amet.",
    },
  ]);

  // Function to handle delete message
  const handleDeleteMessage = (id: number) => {
    setMessages(messages.filter((message) => message.id !== id));
  };

  return (
    <>
      <div className="flex justify-between items-center">
        <h1 className="text-2xl dark:text-white font-bold mb-4">
          History Page
        </h1>
        <div className="flex items-center gap-4">
          <FilterHistory />
          <SortHistory />
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="table-auto w-full dark:text-white">
          <thead>
            <tr>
              <th className="px-4 border py-2">ID</th>
              <th className="px-4 border py-2">Name</th>
              <th className="px-4 border py-2">Region</th>
              <th className="px-4 border py-2">Type</th>
              <th className="px-4 border py-2">Date</th>
              <th className="px-4 border py-2">Message</th>
              <th className="px-4 border py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {messages.map((message) => (
              <tr key={message.id}>
                <td className="border px-4 py-2">{message.id}</td>
                <td className="border px-4 py-2">{message.name}</td>
                <td className="border px-4 py-2">{message.region}</td>
                <td className="border px-4 py-2">{message.type}</td>
                <td className="border px-4 py-2">{message.date}</td>
                <td className="border px-4 py-2">{message.message}</td>
                <td className="border px-4 py-2 text-center">
                  <button
                    className="text-red-700 dark:text-red-500"
                    onClick={() => handleDeleteMessage(message.id)}
                  >
                    <FiTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default History;
