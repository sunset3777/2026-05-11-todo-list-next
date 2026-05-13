import { useState } from "react";
import type { Todo } from "@/types/todo";

type TodoListProps = {
  todos: Todo[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, nextContent: string) => void;
};

function TodoList({ todos, onToggle, onDelete, onEdit }: TodoListProps) {
  const [editingId, setEditingId] = useState < string | null>(null);
  const [draft, setDraft] = useState("");

  const startEdit = (todo: Todo) => {
    setEditingId(todo.id);
    setDraft(todo.content);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setDraft("");
  };

  const saveEdit = (todo: Todo) => {
    const next = draft.trim();
    if (!next) {
      // 不允許空字串
      cancelEdit();
      return;
    }
    onEdit(todo.id, next);
    setEditingId(null);
    setDraft("");
  };

  return (
    <ul className="mb-4">
      {todos.map((todo) => {
        const isEditing = editingId === todo.id;

        return (
          <li key={todo.id} className="group flex items-center mb-[17px]">
            <label className="flex flex-1 items-center border-b border-[#e5e5e5] pb-[15px] text-[#333333] leading-[20.27px]">
              <input
                className="peer w-[20px] h-[20px] border border-[#9F9A91] rounded-[5px] mr-4"
                type="checkbox"
                checked={todo.checked}
                onChange={() => onToggle(todo.id)}
                disabled={isEditing} 
              />

              {isEditing ? (
                <input
                  className="w-full bg-transparent outline-none border-b border-[#333333] pb-1"
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") saveEdit(todo);
                    if (e.key === "Escape") cancelEdit();
                  }}
                  onBlur={() => saveEdit(todo)} // 失焦即存
                />
              ) : (
                <span
                  className="transition-all duration-300 peer-checked:text-[#9F9A91] peer-checked:line-through"
                  onDoubleClick={() => startEdit(todo)} // 雙擊進入編輯
                  title="雙擊編輯"
                >
                  {todo.content}
                </span>
              )}
            </label>

            {!isEditing && (
              <a
                href="#"
                className="ml-[12px] text-sm text-[#333333] opacity-0 group-hover:opacity-100"
                onClick={(e) => {
                  e.preventDefault();
                  startEdit(todo);
                }}
                aria-label="編輯待辦"
              >
                <i className="fa-solid fa-pen" />
              </a>
            )}

            {/* 刪除按鈕 */}
            <a
              href="#"
              className="ml-[17px] text-sm text-[#333333] opacity-0 group-hover:opacity-100"
              onClick={(e) => {
                e.preventDefault();
                if (isEditing) cancelEdit();
                onDelete(todo.id);
              }}
              aria-label="刪除待辦"
            >
              <i className="fa-solid fa-times"></i>
            </a>
          </li>
        );
      })}
    </ul>
  );
}

export default TodoList;
