import type { TodoStatus } from "@/types/todo";

type TodoTabProps = {
  currentStatus: TodoStatus;
  onChangeStatus: (status: TodoStatus) => void;
};

function TodoTab({ currentStatus, onChangeStatus }: TodoTabProps) {
  const base = "block text-center font-bold p-4 border-b-2";
  const active = "border-[#333333] text-[#333333]";
  const inactive = "border-[#efefef] text-[#9F9A91]";

  const tabs: { key: TodoStatus; label: string }[] = [
    { key: "all", label: "全部" },
    { key: "pending", label: "待完成" },
    { key: "completed", label: "已完成" },
  ];

  return (
    <ul className="flex bg-white">
      {tabs.map((tab) => (
        <li key={tab.key} className="flex-1">
          <a
            href="#"
            className={`${base} ${
              currentStatus === tab.key ? active : inactive
            }`}
            onClick={(e) => {
              e.preventDefault();
              onChangeStatus(tab.key);
            }}
          >
            {tab.label}
          </a>
        </li>
      ))}
    </ul>
  );
}

export default TodoTab;