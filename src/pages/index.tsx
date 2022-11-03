import Head from "next/head";

import CreateModal from "../components/CreateModal";
import { prisma } from "../server/utils/prisma";
import { trpc } from "../utils/trpc";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import type { TodoOutput } from "@/server/routers/_app";
import { inferAsyncReturnType } from "@trpc/server";
import TodoItem from "@/components/TodoItem";
import { HashLoader } from "react-spinners";

export type Todo = {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  createdAt: Date;
};

export default function Home({
  todos,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { data, isLoading, error } = trpc.getTodos.useQuery();

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
          <CreateModal />
        </nav>
      </header>
      <section className="w-full max-w-[1400px] flex p-5 bg-gray-900 mx-auto my-10">
        {data?.map((todo: Todo) => {
          return <TodoItem key={todo.id} {...todo} />;
        })}
      </section>
    </main>
  );
}

async function getTodos() {
  return await prisma.todoItem.findMany({});
}

type TodosQueryResult = inferAsyncReturnType<typeof getTodos>;

export const getServerSideProps: GetServerSideProps = async () => {
  const response = await getTodos();
  const todos = JSON.parse(JSON.stringify(response));

  return {
    props: { todos },
  };
};
