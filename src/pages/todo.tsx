import dynamic from "next/dynamic";
import Head from "next/head";

const TodoPage = dynamic(() => import("@/features/todos/components/TodoPage"), {
  ssr: false,
});

export default function Todo() {
  return (
    <>
      <Head>
        <title>我的待辦事項 | Online Todo List</title>
        <meta name="robots" content="noindex,nofollow" />
      </Head>

      <TodoPage />
    </>
  );
}
