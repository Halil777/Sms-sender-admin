import { FC, useEffect, useState } from "react";
import { MdClear } from "react-icons/md";
import { AxiosInstance } from "../../api/AxiosInstance";
import { Params } from "../../type/type";

interface AddClientProps {
  fetchData: () => void;
}

const AddClient: FC<AddClientProps> = ({ fetchData }) => {
  const [showDrawer, setShowDrawer] = useState(false);
  const [fullName, setFullName] = useState("");
  const [phone, setPhoneNumber] = useState("+993");
  const [region, setRegion] = useState("ChooseRegion");
  const [type, setType] = useState("choose");
  const [description, setDescription] = useState("");
  const [params, setParams] = useState<Params>({ regions: [], userTypes: [] });

  const handleClick = () => {
    setShowDrawer(!showDrawer);
  };

  useEffect(() => {
    const fetchParams = async () => {
      try {
        const response = await AxiosInstance.get("/user/params");
        setParams(response.data);
      } catch (error) {
        console.error("Error fetching params:", error);
      }
    };

    fetchParams();
  }, []);

  const handleSubmit = async () => {
    try {
      const response = await AxiosInstance.post("/user", {
        fullName,
        phone,
        region,
        type,
        description,
      });
      console.log(response.data);
      setFullName("");
      setPhoneNumber("");
      setRegion("ChooseRegion");
      setType("choose");
      setDescription("");
      fetchData();
      setShowDrawer(!showDrawer);
    } catch (error) {
      console.error("Error adding user:", error);
    }
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
          <div className="w-full fixed top-0 right-0">
            <div className="dark:bg-gray-700 top-0 p-5 w-[50%] z-30  absolute right-0 h-screen rounded-xl bg-gray-200 ">
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
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
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
                    type="text"
                    name="phone_number"
                    id="phone_number"
                    value={phone}
                    onChange={(e) => setPhoneNumber(e.target.value)}
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
                    value={region}
                    onChange={(e) => setRegion(e.target.value)}
                    className="mt-1 block w-full pl-3 pr-10 dark:text-gray-400 text-base py-3 border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                  >
                    <option value="ChooseRegion">Choose Region</option>
                    {params.regions.map((region) => (
                      <option key={region} value={region}>
                        {region}
                      </option>
                    ))}
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
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    className="mt-1 block w-full pl-3 pr-10 dark:text-gray-400 text-base py-3 border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                  >
                    <option value="choose">Choose Category</option>
                    {params.userTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
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
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="mt-1 focus:ring-indigo-500 outline-none h-[150px] py-3 px-3 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
              </div>
              <div className="flex justify-end mt-3">
                <button
                  onClick={handleSubmit}
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

export default AddClient;
