import dynamic from "next/dynamic";

const TodoPage = dynamic(() => import("@/features/todos/components/TodoPage"), {
  ssr: false,
});

export default function Todo() {
  return <TodoPage />;
}
