import { Check, Circle } from "lucide-react";
import type { TodoItem } from "../types/todo";
import { useTodoStore } from "../hooks/useTodoStore";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useEffect } from "react";
import toast from "react-hot-toast";

export default function TodoItem({ todoItem }: { todoItem: TodoItem }) {
  const { id, content, isFinished, listId, position } = todoItem;
  const toggleIsFinished = useTodoStore((state) => state.toggleIsFinished);
  const editItemContent = useTodoStore((state) => state.editItemContent);
  const items = useTodoStore((state) => state.items);

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id, data: { role: "item", listId, position } });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      className="flex items-center gap-2 w-full"
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
    >
      <button onClick={() => toggleIsFinished(id)}>
        {isFinished ? (
          <div className="size-6 rounded-full overflow-clip bg-neutral-300 flex items-center justify-center">
            <Check size={13} strokeWidth={5} className="text-neutral-50" />
          </div>
        ) : (
          <Circle className="text-neutral-300" />
        )}
      </button>
      <input
        className={`border-b w-full border-neutral-300 outline-none px-1 py-0.5 ${
          isFinished ? "text-neutral-600" : ""
        }`}
        value={content}
        onChange={(e) =>
          editItemContent({ content: e.target.value, itemId: id })
        }
      />
    </div>
  );
}
