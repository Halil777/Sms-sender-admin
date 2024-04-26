import { FC, useState } from "react";
import { useSpring, animated } from "react-spring";
import EditClient from "./EditClient";
import DeleteClient from "./DeleteClient";
import { MdClear } from "react-icons/md";
import { User } from "../../type/type";
import { AxiosInstance } from "../../api/AxiosInstance";

type HomeTableProps = {
  users: User[];
  fetchData: () => void;
};

const HomeTable: FC<HomeTableProps> = ({ users, fetchData }) => {
  const [selectAll, setSelectAll] = useState(false);
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [text, setText] = useState(false);
  const [messageContent, setMessageContent] = useState("");

  // Function to generate sequential numbers starting from 1
  const generateSequentialNumbers = (userList: User[]) => {
    return userList.map((user, index) => ({
      ...user,
      sequentialNumber: index + 1,
    }));
  };

  const usersWithNumbers = generateSequentialNumbers(users);

  // const handleSelectAll = () => {
  //   setSelectAll(!selectAll);
  //   setSelectedRows(!selectAll ? users.map((user) => user.id) : []);
  // };

  const handleSelectAll = () => {
    setSelectAll(!selectAll);
    setSelectedRows(
      !selectAll ? [] : usersWithNumbers.map((user) => user.sequentialNumber)
    ); // Empty array when deselecting
  };

  const handleRowCheckbox = (rowIndex: number) => {
    const newSelectedRows = [...selectedRows];
    const index = newSelectedRows.indexOf(rowIndex);

    if (index === -1) {
      newSelectedRows.push(rowIndex);
    } else {
      newSelectedRows.splice(index, 1);
    }

    setSelectedRows(newSelectedRows);
  };

  const handleMessage = () => {
    const hasSelectedUsers = selectedRows.length > 0;

    if (hasSelectedUsers) {
      setText(!text);
      setMessageContent(""); // Clear message content when opening
    } else {
      alert("Please select a user first before opening the dialog box");
    }
  };
  const sendSMS = async () => {
    try {
      const data = {
        message: messageContent,
        scheduledDate: null,
        isScheduled: false,
        ids: selectedRows,
      };

      await AxiosInstance.post("/sms/send-sms", data);
      console.log("Message sent successfully!");
      setText(false);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const buttonAnimation = useSpring({
    from: { bottom: -50, opacity: 0 },
    to: { bottom: 20, opacity: 1 },
    delay: 1000,
  });

  return (
    <>
      <div className="overflow-x-auto ">
        <table className="table-auto w-full dark:text-white">
          <thead>
            <tr>
              <th className="border px-4 py-2 text-center">
                <input
                  type="checkbox"
                  checked={selectAll}
                  onChange={handleSelectAll}
                />
              </th>
              <th className="px-4 border py-2">ID</th>
              <th className="px-4 border py-2">Full Name</th>
              <th className="px-4 border py-2">Phone Number</th>
              <th className="px-4 border py-2">Description</th>
              <th className="px-4 border py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {usersWithNumbers.map(
              (user: {
                id: number;
                fullName: string;
                phone: string;
                description: string;
                sequentialNumber?: number;
              }) => (
                <tr
                  key={user.id}
                  className="hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <td className="border px-4 py-2 text-center">
                    <input
                      type="checkbox"
                      checked={selectedRows.includes(user.id)}
                      onChange={() => handleRowCheckbox(user.id)}
                    />
                  </td>
                  <td className="border px-4 py-2">
                    <h1>{user.sequentialNumber}</h1>
                  </td>
                  <td className="border px-4 py-2">{user.fullName}</td>
                  <td className="border px-4 py-2 text-center ">
                    {user.phone}
                  </td>
                  <td className="border px-4 py-2">{user.description}</td>
                  <td className="border flex items-center  pl-[30%] py-2">
                    <EditClient user={user} fetchData={fetchData} />
                    <DeleteClient userId={user.id} fetchData={fetchData} />
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
        <animated.button
          onClick={handleMessage}
          style={buttonAnimation}
          className="fixed bg-green-900 text-white px-4 py-2 rounded-[8px] bottom-3 right-3"
        >
          Write Message
        </animated.button>
        {text && (
          <>
            <div className="dark:bg-gray-700 px-5 py-5 fixed top-[30%] rounded-[6px] text-gray-700 font-bold dark:text-gray-300 left-[30%] w-[35%]  bg-gray-200">
              <div className="flex justify-between items-center mb-3">
                <h1 className="mb-4">Write your message for your clients</h1>
                <button
                  title="Close Message Area"
                  onClick={() => setText(false)}
                >
                  <MdClear />
                </button>
              </div>
              <textarea
                name=""
                placeholder="Write your Message ..."
                className="border rounded-xl mb-5 dark:bg-gray-200 w-full h-[130px] outline-none pl-5 pt-3 text-gray-800"
                id=""
                value={messageContent}
                onChange={(e) => setMessageContent(e.target.value)}
              ></textarea>
              <div className="flex justify-end">
                <animated.button
                  onClick={sendSMS}
                  style={buttonAnimation}
                  className="bg-green-800 text-white px-4 py-2 rounded-[8px] outline-none "
                >
                  Send Message
                </animated.button>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default HomeTable;
