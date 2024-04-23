import { FC, useState } from "react";
import { MdClear } from "react-icons/md";

const EditClient: FC = () => {
  const [showDrawer, setShowDrawer] = useState(false);

  const handleClick = () => {
    setShowDrawer(!showDrawer);
  };
  return (
    <div>
      <button
        onClick={handleClick}
        className="bg-green-700 text-white py-2 px-3 rounded-[8px] shadow-2xl "
      >
        + Add Client
      </button>

      {showDrawer && (
        <>
          <div className="w-full">
            <div className="dark:bg-gray-700 top-10 p-5 w-[65%]  absolute right-5 rounded-xl bg-gray-200 ">
              <div className="flex justify-between items-center">
                <h1 className="font-bold dark:text-gray-100">Add Client</h1>
                <MdClear
                  title="Close"
                  onClick={handleClick}
                  className="text-[22px] cursor-pointer dark:text-gray-100"
                />
              </div>
              <div className="bg-gray-400 w-full h-[1px] mt-2" />
              <div className="flex justify-between items-center mt-4">
                <div className="w-1/2 pr-2">
                  <label
                    htmlFor="full_name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="full_name"
                    id="full_name"
                    placeholder="Write Your Full Name"
                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full py-3 px-2 outline-none shadow-sm sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
                <div className="w-1/2 pl-2">
                  <label
                    htmlFor="phone_number"
                    className="block text-sm font-medium  text-gray-700"
                  >
                    Phone Number
                  </label>
                  <input
                    placeholder="Write Your Phone Number"
                    type="number"
                    name="phone_number"
                    id="phone_number"
                    className="mt-1 focus:ring-indigo-500 py-3 px-2 outline-none focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
              </div>
              <div className="flex justify-between items-center mt-4">
                <div className="w-1/2 pr-2">
                  <label
                    htmlFor="region"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Region
                  </label>
                  <select
                    id="region"
                    name="region"
                    className="mt-1 block w-full pl-3 pr-10  text-base py-3 border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                  >
                    <option value="ChooseRegion">Choose Region</option>
                    <option value="Ashgabat">Ashgabat</option>
                    <option value="Ahal">Ahal</option>
                    <option value="Lebap">Lebap</option>
                    <option value="Mary">Mary</option>
                    <option value="Balkan">Balkan</option>
                    <option value="Dashoguz">Dashoguz</option>
                  </select>
                </div>
                <div className="w-1/2 pl-2">
                  <label
                    htmlFor="category"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Category
                  </label>
                  <select
                    id="category"
                    name="category"
                    className="mt-1 block w-full pl-3 pr-10 py-3 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                  >
                    <option value="choose">Choose Category</option>
                    <option value="greenHouse">Green House</option>
                    <option value="companies">Companies</option>
                  </select>
                </div>
              </div>
              <div className="w-full mt-7">
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700"
                >
                  Message
                </label>
                <textarea
                  name="description"
                  placeholder="Write Your Message"
                  id="description"
                  className="mt-1 focus:ring-indigo-500 outline-none h-[150px] py-3 px-3 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
              </div>
              <div className="flex justify-end mt-3">
                <button
                  type="submit"
                  className="mt-1 bg-green-800 hover:bg-green-900  text-white font-semibold py-2 px-8 rounded"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default EditClient;
