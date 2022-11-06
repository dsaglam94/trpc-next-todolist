import React from "react";
import useDisclosure from "../hooks/useDisclosure";
import { AiOutlineClose } from "react-icons/ai";
import dayjs from "dayjs";
import { trpc } from "../utils/trpc";
import { useFormik } from "formik";
import { TodoInput } from "../server/routers/_app";
import SuccessModal from "./SuccessModal";

const EditModal = ({ editTodo, onClose }: any) => {
  const now = Date.now();
  const currentDate = dayjs(now).format("MMM D, h:mm A");

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
    },
    onSubmit: (values: TodoInput, { resetForm }) => {
      editTodo(values.title, values.description);
      resetForm();
    },
  });

  return (
    <>
      <section className="absolute top-0 bottom-0 left-0 right-0 bg-black/50 flex items-center justify-center">
        <div className="relative border border-gray-700 bg-gray-800 rounded-md p-10">
          <AiOutlineClose
            onClick={onClose}
            className="absolute top-5 right-9 text-gray-400 cursor-pointer hover:text-gray-200"
          />
          <form
            onSubmit={formik.handleSubmit}
            className="flex flex-col gap-4 items-start w-full"
          >
            <div className="flex items-center justify-between gap-10">
              <div className="space-x-2">
                <label htmlFor="title">Title:</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formik.values.title}
                  onChange={formik.handleChange}
                  className="rounded-md p-2"
                />
              </div>
              <span>{currentDate}</span>
            </div>
            <div className="w-full flex flex-col items-start gap-2">
              <label htmlFor="description">What's next?</label>
              <textarea
                name="description"
                id="description"
                value={formik.values.description}
                onChange={formik.handleChange}
                cols={30}
                rows={10}
                className="p-2 w-full rounded-md"
              />
            </div>
            <button
              type="submit"
              className="self-end py-2 px-4 border border-green-600 rounded-md text-xs text-green-600  hover:border-green-500 hover:text-green-500"
            >
              Edit
            </button>
          </form>
        </div>
      </section>
    </>
  );
};

export default EditModal;
