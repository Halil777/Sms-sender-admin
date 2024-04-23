import { FC, useState } from "react";
import { FiEdit, FiTrash } from "react-icons/fi"; // Importing edit and delete icons from react-icons library
import { useSpring, animated } from "react-spring";

const HomeTable: FC = () => {
  const [selectAll, setSelectAll] = useState(false);
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [text, setText] = useState(false);

  // const [isClicked, setClicked] = useState(false);
  // const [messageSent, setMessageSent] = useState(false);

  // // Animation for button moving from left to right
  // const buttonAnimationMessage = useSpring({
  //   from: { bottom: -50, opacity: 0 },
  //   to: { right: 10, opacity: 1 },
  //   delay: 2000,
  // });

  // Animation for send icon flying from left to right
  // const sendIconAnimation = useSpring({
  //   from: { transform: "translateX(-100%)", opacity: 0 },
  //   to: async (next) => {
  //     await next({ opacity: 1 });
  //     await next({ transform: "translateX(100%)" });
  //   },
  // });

  // // Function to handle click on the send message button
  // const handleClick = () => {
  //   setClicked(true);
  //   // Simulate sending message
  //   setTimeout(() => {
  //     setMessageSent(true);
  //     // Reset message sent state after 3 seconds
  //     setTimeout(() => {
  //       setMessageSent(false);
  //       setText(false); // Reset text modal state after sending the message
  //     }, 3000);
  //   }, 1000);
  // };

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
            <div className="dark:bg-gray-800 border px-5 py-5 fixed top-[30%] rounded-[6px] text-gray-700 font-bold dark:text-gray-300 left-[30%] w-[50%]  bg-gray-200">
              <h1 className="mb-4">Write your message for your clients</h1>
              <textarea
                name=""
                className="border rounded-xl w-full h-[200px] outline-none pl-5 pt-3 text-black"
                id=""
              ></textarea>
              {/* <div className="relative">
                <animated.button
                  onClick={handleClick}
                  style={buttonAnimationMessage}
                  className="bg-green-900 text-white px-4 py-2 rounded-[8px] outline-none"
                >
                  {!isClicked ? "Send Message" : "Your message sent"}
                  {isClicked && (
                    <animated.span style={sendIconAnimation}>
                      <FiSend />
                    </animated.span>
                  )}
                </animated.button>
                {messageSent && (
                  <div className="absolute bg-green-900 text-white px-4 py-2 rounded-[8px] bottom-3 right-3">
                    Your message sent
                  </div>
                )}
              </div> */}
              <div className="flex">
                <animated.button
                  style={buttonAnimation}
                  className="bg-green-800 text-white px-4 py-2 rounded-[8px] outline-none "
                >
                  {/* {!isClicked ? "Send Message" : "Your message sent"} */}
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
