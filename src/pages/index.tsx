import Head from "next/head";

import CreateModal from "../components/CreateModal";
import TodoItem from "@/components/TodoItem";

import { trpc } from "../utils/trpc";
import { HashLoader } from "react-spinners";
import { UseQueryResult } from "@tanstack/react-query";

export type Todo = {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  createdAt: Date;
};

export type TodoItemProps = Todo & {
  onUpdateTodo: () => Promise<UseQueryResult>;
};

export default function Home() {
  const { data, isLoading, error, refetch } = trpc.getTodos.useQuery();

  if (isLoading) {
    return (
      <section className="w-screen h-screen flex items-center justify-center">
        <HashLoader
          color="orange"
          loading={isLoading}
          size={50}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </section>
    );
  }

  if (error) {
    return <div>Something happened:{error.message}</div>;
  }

  return (
    <main className="min-h-screen w-full relative">
      <Head>
        <title>TS Todolist</title>
        <meta
          name="description"
          content="built with tRPC and TypeScript to bring type safety"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className="w-full max-w-[1400px] p-5 bg-gray-900 mx-auto">
        <nav className="w-full flex items-center justify-between">
          <h1>Todolist</h1>
          <CreateModal onCreateTodo={refetch} />
        </nav>
      </header>
      <section className="w-full max-w-[1400px] flex flex-wrap items-center justify-center gap-5 p-5 bg-gray-900 mx-auto my-10">
        {data?.map((todo: Todo) => {
          return <TodoItem key={todo.id} {...todo} onUpdateTodo={refetch} />;
        })}
      </section>
    </main>
  );
}
