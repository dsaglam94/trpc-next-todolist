import React from "react";
import type { TodoItemProps } from "@/pages/index";
import dayjs from "dayjs";
import { trpc } from "@/utils/trpc";
import DeleteModal from "./DeleteModal";
import useDisclosure from "@/hooks/useDisclosure";

const TodoItem = ({
  id,
  title,
  description,
  createdAt,
  completed,
  onDeleteTodo,
}: TodoItemProps) => {
  const deleteTodoModal = useDisclosure();
  const createDate = dayjs(createdAt).format("MMM D, h:mm A");

  const mutation = trpc.deleteTodo.useMutation({
    onSuccess: () => {
      onDeleteTodo();
    },
  });

  const deleteTodo = () => {
    mutation.mutate({
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
            onClick={deleteTodoModal.onOpen}
            className="py-2 px-4 border border-gray-500 rounded-md text-xs text-gray-500 hover:border-gray-400 hover:text-gray-400"
          >
            Delete
          </button>
          <button className="py-2 px-4 border border-orange-500 rounded-md text-xs text-orange-500  hover:border-orange-400 hover:text-orange-400">
            Edit
          </button>
        </div>
      </div>
      {deleteTodoModal.isOpen && (
        <DeleteModal
          onClose={deleteTodoModal.onClose}
          deleteTodo={deleteTodo}
        />
      )}
    </div>
  );
};

export default TodoItem;
