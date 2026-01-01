import { Circle } from "lucide-react";
import type { TodoItem } from "../types/todo";
import { useTodoStore } from "../hooks/useTodoStore";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export default function TodoItem({ todoItem }: { todoItem: TodoItem }) {
  const { id, content, isFinished, listId, position } = todoItem;
  const toggleIsFinished = useTodoStore((state) => state.toggleIsFinished);
  const editItemContent = useTodoStore((state) => state.editItemContent);

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
          <Circle className="text-neutral-300" fill="#d4d4d4" />
        ) : (
          <Circle className="text-neutral-300" />
        )}
      </button>
      <input
        className={`border-b w-full border-neutral-300 outline-none px-1 py-0.5 truncate ${
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
