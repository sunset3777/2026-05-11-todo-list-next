import { useState, type ChangeEvent, type KeyboardEvent, type RefObject } from "react";

type TodoInputProps = {
  onAdd: (text: string) => void;
  inputRef: RefObject<HTMLInputElement | null>;
};

function TodoInput({ onAdd, inputRef }: TodoInputProps) {
  const [value, setValue] = useState("");

  const submit = () => {
    onAdd(value);
    setValue("");
  };

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") submit();
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return (
    <div className="w-full flex relative mb-8 shadow-md">
      <input
        className="w-full h-[47px] rounded-[10px] bg-white border-0 pl-4 outline-none"
        type="text"
        placeholder="請輸入待辦事項"
        value={value}
        onChange={handleChange}
        onKeyDown={onKeyDown}
        ref={inputRef}
      />
      <button
        type="button"
        className="absolute top-1 right-1 w-10 h-[39px] bg-[#333333] text-white rounded-[10px] flex items-center justify-center"
        onClick={submit}
        aria-label="新增待辦"
      >
        <i className="fa-solid fa-plus" />
      </button>
    </div>
  );
}

export default TodoInput;
