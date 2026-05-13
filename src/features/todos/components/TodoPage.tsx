import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import type { TodoStatus } from "@/types/todo";
import TodoNav from "./TodoNav";
import TodoInput from "./TodoInput";
import TodoTab from "./TodoTab";
import TodoList from "./TodoList";
import { useAuth } from "@/hooks/useAuth";
import { useTodos } from "@/features/todos/useTodos";

function TodoPage() {
  const { token, isLoggedIn } = useAuth();
  const router = useRouter();
  const [status, setStatus] = useState<TodoStatus>("all");
  const inputRef = useRef<HTMLInputElement>(null);
  const {
    todos,
    filteredTodos,
    pendingCount,
    isLoading,
    error,
    handleAdd,
    handleToggle,
    handleDelete,
    handleEdit,
    handleClearCompleted,
  } = useTodos({ token, status, inputRef });

  useEffect(() => {
    if (!isLoggedIn && !token) {
      const timer = setTimeout(() => {
        if (!token) router.push("/login");
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isLoggedIn, token, router]);

  return (
    <div id="todoListPage" className="bg-[#FFD370] min-h-screen">
      <TodoNav />
      <div className="mx-auto px-8 py-4 sm:py-12">
        <div className="w-full sm:w-125 mx-auto">
          <TodoInput onAdd={handleAdd} inputRef={inputRef} />
          <div className="bg-white rounded-[10px] shadow-lg overflow-hidden">
            <TodoTab currentStatus={status} onChangeStatus={setStatus} />
            <div className="p-6 sm:p-8">
              {isLoading && (
                <p className="mb-4 text-center text-sm text-[#9F9A91]">讀取中...</p>
              )}
              {error && (
                <p className="mb-4 text-center text-sm text-[#d87355] font-bold">{error}</p>
              )}
              {todos.length === 0 && !isLoading ? (
                <p className="text-center text-[#9F9A91] py-8">目前無待辦事項</p>
              ) : (
                <TodoList
                  todos={filteredTodos}
                  onToggle={handleToggle}
                  onDelete={handleDelete}
                  onEdit={handleEdit}
                />
              )}
              <div className="flex justify-between items-center mt-6">
                <p className="text-[#333333] text-sm font-bold">
                  {pendingCount} 個待完成項目
                </p>
                <button
                  type="button"
                  className="text-[#9F9A91] text-sm hover:text-[#333333]"
                  onClick={handleClearCompleted}
                >
                  清除已完成項目
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TodoPage;
