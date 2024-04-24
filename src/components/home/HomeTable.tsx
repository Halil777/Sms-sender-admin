import { FC, useState } from "react";
import { useSpring, animated } from "react-spring";
import EditClient from "./EditClient";
import DeleteClient from "./DeleteClient";

const HomeTable: FC = () => {
  const [selectAll, setSelectAll] = useState(false);
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [text, setText] = useState(false);

  const handleSelectAll = () => {
    setSelectAll(!selectAll);
    if (!selectAll) {
      const allRowIndexes = Array.from({ length: 10 }, (_, i) => i + 1);
      setSelectedRows(allRowIndexes);
    } else {
      setSelectedRows([]);
    }
  };

  const handleMessage = () => {
    setText(!text);
  };

  const handleRowCheckbox = (rowIndex: number) => {
    const index = selectedRows.indexOf(rowIndex);
    if (index === -1) {
      setSelectedRows([...selectedRows, rowIndex]);
    } else {
      setSelectedRows(selectedRows.filter((row) => row !== rowIndex));
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
              <th className="flex items-center gap-3 pl-5 border py-2">
                <input
                  type="checkbox"
                  checked={selectAll}
                  onChange={handleSelectAll}
                />
                ID
              </th>
              <th className="px-4 border py-2">Full Name</th>
              <th className="px-4 border py-2">Phone Number</th>
              <th className="px-4 border py-2">Description</th>
              <th className="px-4 border py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 10 }, (_, i) => (
              <tr key={i} className="hover:bg-gray-100 dark:hover:bg-gray-700">
                <td className="border flex items-center gap-3 pl-5 py-2">
                  <input
                    type="checkbox"
                    checked={selectedRows.includes(i + 1)}
                    onChange={() => handleRowCheckbox(i + 1)}
                  />
                  {i + 1}
                </td>
                <td className="border px-4 py-2">John Doe</td>
                <td className="border px-4 py-2 text-center ">
                  +993 61 000000
                </td>
                <td className="border px-4 py-2">Lorem ipsum</td>
                <td className="border flex items-center  pl-[30%] py-2">
                  <EditClient />
                  <DeleteClient />
                </td>
              </tr>
            ))}
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
            <div className="dark:bg-gray-800 border px-5 py-5 fixed top-[30%] rounded-[6px] text-gray-700 font-bold dark:text-gray-300 left-[30%] w-[50%]  bg-gray-200">
              <h1 className="mb-4">Write your message for your clients</h1>
              <textarea
                name=""
                className="border rounded-xl w-full h-[130px] outline-none pl-5 pt-3 text-black"
                id=""
              ></textarea>
              <div className="flex justify-end">
                <animated.button
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
