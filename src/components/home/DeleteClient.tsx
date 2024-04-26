import { FC, useState } from "react";
import { FiTrash } from "react-icons/fi";
import { AxiosInstance } from "../../api/AxiosInstance";

type DeleteTableProps = {
  fetchData: () => void;
  userId: number;
};

const DeleteClient: FC<DeleteTableProps> = ({ userId, fetchData }) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleDelete = async () => {
    if (userId) {
      try {
        await AxiosInstance.delete(`/user/${userId}`); // DELETE request with user ID
        console.log("User deleted successfully!");
        setShowDeleteModal(false);
        fetchData(); // Call the function to refresh data after deletion
      } catch (error) {
        console.error("Error deleting user:", error);
      } finally {
        setShowDeleteModal(false); // Close the modal after deletion attempt
      }
    } else {
      console.error("User not found");
    }
  };

  return (
    <div>
      <button
        onClick={() => setShowDeleteModal(true)}
        className="text-red-700 dark:text-red-500 ml-3"
      >
        <FiTrash />
      </button>
      {showDeleteModal && (
        <>
          <div className="fixed dark:text-gray-800  left-0 w-full h-full flex items-start top-0 pt-52 justify-center">
            <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50"></div>
            <div className="z-10 bg-white p-10 w-2/5 h-48  rounded-md">
              <p className="text-xl">
                Are you sure you want to delete this item?
              </p>
              <div className="mt-16 flex justify-end">
                <button
                  onClick={handleDelete}
                  className="bg-red-500 text-white px-3 py-1 rounded mr-2"
                >
                  Delete
                </button>
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="bg-gray-300 px-3 py-1 rounded"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default DeleteClient;
