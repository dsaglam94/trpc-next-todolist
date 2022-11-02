import Head from "next/head";

import CreateModal from "../components/CreateModal";

import { DateTime } from "luxon";
import { trpc } from "../utils/trpc";

export default function Home() {
  const currentDate = DateTime.now().toLocaleString(DateTime.DATE_MED);

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
        <div className="max-w-[350px] bg-white/10 flex flex-col gap-5 p-5 rounded-md">
          <div className="w-full flex items-center justify-between">
            <h2>My first todo</h2>
            <span>{currentDate}</span>
          </div>
          <div>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque
              officia, asperiores ipsa nobis quidem sunt distinctio sequi
              quisquam amet quae!
            </p>
          </div>
          <div className="w-full flex items-center justify-between">
            <button>Done</button>
            <div className="flex items-center gap-2 justify-end">
              <button className="py-2 px-4 border border-gray-500 rounded-md text-xs text-gray-500 hover:border-gray-400 hover:text-gray-400">
                Delete
              </button>
              <button className="py-2 px-4 border border-orange-500 rounded-md text-xs text-orange-500  hover:border-orange-400 hover:text-orange-400">
                Edit
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
