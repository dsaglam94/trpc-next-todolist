import React from "react";
import type { Todo } from "@/pages/index";
import dayjs from "dayjs";
import { trpc } from "@/utils/trpc";

const TodoItem = ({ id, title, description, createdAt, completed }: Todo) => {
  const createDate = dayjs(createdAt).format("MMM D, h:mm A");

  const mutation = trpc.deleteTodo.useMutation({
    onSuccess: (deleted) => {
      console.log("item deleted:", deleted);
    },
  });

  const deleteTodo = async () => {
    await mutation.mutate({
      id,
    });
  };

  return (
    <div
      className={
        completed
          ? "max-w-[350px] bg-white/10 flex flex-col gap-5 p-5 rounded-md opacity-50"
          : "max-w-[350px] bg-white/10 flex flex-col gap-5 p-5 rounded-md"
      }
    >
      <div className="w-full flex items-center justify-between gap-10">
        <h2 className="capitalize">{title}</h2>
        <span>{createDate}</span>
      </div>
      <div>
        <p>{description}</p>
      </div>
      <div className="w-full flex items-center justify-between mt-5">
        <button>Done</button>
        <div className="flex items-center gap-2 justify-end">
          <button
            onClick={deleteTodo}
            className="py-2 px-4 border border-gray-500 rounded-md text-xs text-gray-500 hover:border-gray-400 hover:text-gray-400"
          >
            Delete
          </button>
          <button
            // onClick={createTodo}
            className="py-2 px-4 border border-orange-500 rounded-md text-xs text-orange-500  hover:border-orange-400 hover:text-orange-400"
          >
            Edit
          </button>
        </div>
      </div>
    </div>
  );
};

export default TodoItem;
