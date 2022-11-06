import React from "react";
import type { TodoItemProps } from "@/pages/index";
import dayjs from "dayjs";
import { trpc } from "@/utils/trpc";
import DeleteModal from "./DeleteModal";
import EditModal from "./EditModal";
import useDisclosure from "@/hooks/useDisclosure";

import { AiOutlineCheck, AiOutlineClose } from "react-icons/ai";

const TodoItem = ({
  id,
  title,
  description,
  createdAt,
  completed,
  onUpdateTodo,
}: TodoItemProps) => {
  const deleteTodoModal = useDisclosure();
  const editModal = useDisclosure();
  const createDate = dayjs(createdAt).format("MMM D, h:mm A");

  const todoDeleteMutation = trpc.deleteTodo.useMutation({
    onSuccess: () => {
      onUpdateTodo();
    },
  });

  const todoCompleteMutation = trpc.completeTodo.useMutation({
    onSuccess: () => {
      onUpdateTodo();
    },
  });

  const todoEditMutation = trpc.editTodo.useMutation({
    onSuccess: (editedTodo) => {
      editModal.onClose();
      onUpdateTodo();
      console.log(editedTodo);
    },
  });

  const deleteTodo = () => {
    todoDeleteMutation.mutate({
      id,
    });
  };

  const completeTodo = () => {
    todoCompleteMutation.mutate({
      id,
      completed,
    });
  };

  const editTodo = (editedTitle: string, editedDescription: string) => {
    todoEditMutation.mutate({
      id,
      title: editedTitle,
      description: editedDescription,
    });
  };

  return (
    <div
      className={"max-w-[350px] bg-white/10 flex flex-col gap-5 p-5 rounded-md"}
    >
      <div
        className={
          completed
            ? "w-full flex items-center justify-between gap-10 line-through"
            : "w-full flex items-center justify-between gap-10"
        }
      >
        <h2 className="capitalize">{title}</h2>
        <span>{createDate}</span>
      </div>
      <div>
        <p>{description}</p>
      </div>
      <div className="w-full flex items-center justify-between mt-5">
        <button onClick={completeTodo} aria-label="complete todo">
          {completed ? <AiOutlineClose /> : <AiOutlineCheck />}
        </button>
        <div className="flex items-center gap-2 justify-end">
          <button
            onClick={deleteTodoModal.onOpen}
            className="py-2 px-4 border border-gray-500 rounded-md text-xs text-gray-500 hover:border-gray-400 hover:text-gray-400"
          >
            Delete
          </button>
          <button
            onClick={editModal.onOpen}
            className="py-2 px-4 border border-orange-500 rounded-md text-xs text-orange-500  hover:border-orange-400 hover:text-orange-400"
          >
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
      {editModal.isOpen && (
        <EditModal onClose={editModal.onClose} editTodo={editTodo} />
      )}
    </div>
  );
};

export default TodoItem;
