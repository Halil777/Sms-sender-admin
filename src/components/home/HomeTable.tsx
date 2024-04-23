import { FC, useState } from "react";
import { FiEdit, FiTrash } from "react-icons/fi"; // Importing edit and delete icons from react-icons library
import { useSpring, animated } from "react-spring";

const HomeTable: FC = () => {
  const [selectAll, setSelectAll] = useState(false);
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [text, setText] = useState(false);

  // Function to handle select all checkbox
  const handleSelectAll = () => {
    setSelectAll(!selectAll);
    if (!selectAll) {
      const allRowIndexes = Array.from({ length: 10 }, (_, i) => i + 1); // Assuming you have 10 rows, you can replace this with the actual number of rows
      setSelectedRows(allRowIndexes);
    } else {
      setSelectedRows([]);
    }
  };

  //   function for opening write message modal

  const handleMessage = () => {
    setText(!text);
  };

  // Function to handle individual row checkbox
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
    delay: 1000, // Optional delay for animation
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
              <tr key={i}>
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
                <td className="border px-4 py-2 text-center">
                  <button className="mr-5 text-green-600 dark:text-green-400">
                    <FiEdit />
                  </button>
                  <button className="text-red-700 dark:text-red-500 ml-3">
                    <FiTrash />
                  </button>
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
            <div className="dark:bg-white border px-5 py-5 fixed top-[30%] rounded-[6px] text-white dark:text-black left-[30%] w-[50%]  bg-green-950">
              <h1 className="mb-4">Write your message for your clients</h1>
              <textarea
                name=""
                className="border rounded-xl w-full h-[200px] outline-none pl-5 pt-3"
                id=""
              ></textarea>
              <div className="flex mt-3 justify-end">
                <button className=" bg-green-900 text-white px-4 py-2 rounded-[8px] ">
                  Send Message
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default HomeTable;
