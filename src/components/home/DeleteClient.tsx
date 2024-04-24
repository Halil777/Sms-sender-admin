import { FC, useState } from "react";
import { FiTrash } from "react-icons/fi";

const DeleteClient: FC = () => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleDelete = () => {
    setShowDeleteModal(!showDeleteModal);
  };
  return (
    <div>
      <button
        onClick={handleDelete}
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
                <button className="bg-red-500 text-white px-3 py-1 rounded mr-2">
                  Delete
                </button>
                <button
                  onClick={handleDelete}
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
