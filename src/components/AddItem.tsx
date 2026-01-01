import { Circle } from "lucide-react";
import { useTodoStore } from "../hooks/useTodoStore";
import { useState } from "react";

export default function AddItem({ listId }: { listId: string }) {
  const [content, setContent] = useState("");
  const addItem = useTodoStore((state) => state.addItem);
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && content) {
      addItem({ content, listId });
      setContent("");
    }
  };
  return (
    <div className="flex items-center gap-2 w-full">
      <button>
        <Circle className="text-neutral-300" />
      </button>
      <input
        className="border-b border-dashed w-full placeholder:text-neutral-300 border-neutral-300 text-neutral-800 outline-none px-1 py-0.5"
        placeholder="new todo"
        onKeyDown={handleKeyDown}
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
    </div>
  );
}
