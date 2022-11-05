import React from "react";

const DeleteModal = ({ deleteTodo, onClose }: any) => {
  return (
    <section className="absolute top-0 bottom-0 left-0 right-0 flex flex-col items-center justify-center">
      <div className="bg-gray-700 p-6 rounded-md flex flex-col gap-4">
        <h2 className="text-lg">Delete Todo</h2>
        <p className="text-white/70">Are you sure to delete your todo?</p>
        <div className="flex items-center gap-2">
          <button
            className="px-4 py-2 border border-gray-700 bg-gray-600 rounded-md text-sm text-white hover:opacity-80"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 border border-gray-700 bg-gray-600 rounded-md text-sm text-white hover:text-red-600"
            onClick={deleteTodo}
          >
            Delete
          </button>
        </div>
      </div>
    </section>
  );
};

export default DeleteModal;
