import React from "react";
import { AiOutlineClose } from "react-icons/ai";

const SuccessModal = ({ onClose }: any) => {
  return (
    <section className="absolute top-0 bottom-0 left-0 right-0 bg-black/50 flex items-center justify-center">
      <div className="relative border border-gray-700 bg-gray-800 rounded-md p-10">
        <AiOutlineClose
          onClick={onClose}
          className="absolute top-5 right-9 text-gray-400 cursor-pointer hover:text-gray-200"
        />
        <p>Your Todo was created!</p>
      </div>
    </section>
  );
};

export default SuccessModal;
