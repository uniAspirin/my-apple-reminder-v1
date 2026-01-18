import { Plus } from "lucide-react";
import { useTodoStore } from "../hooks/useTodoStore";

export default function AddListButton() {
  const addList = useTodoStore((state) => state.addList);
  return (
    <button
      className="text-lg hover:bg-neutral-100 rounded-sm p-0.5 cursor-pointer transition-all duration-200"
      onClick={() => addList("New List")}
    >
      <Plus />
    </button>
  );
}
