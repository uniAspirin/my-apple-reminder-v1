import { Circle } from "lucide-react";
import type { TodoItem } from "../types/todo";
import { useTodoStore } from "../hooks/useTodoStore";
import { useDraggable } from "@dnd-kit/core";

export default function TodoItem({ todoItem }: { todoItem: TodoItem }) {
  const { id, content, isFinished, listId } = todoItem;
  const toggleIsFinished = useTodoStore((state) => state.toggleIsFinished);
  const editItemContent = useTodoStore((state) => state.editItemContent);

  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id,
    data: { listId },
  });
  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  return (
    <div
      className="flex items-center gap-2 w-full"
      style={style}
      ref={setNodeRef}
      {...listeners}
      {...attributes}
    >
      <button onClick={() => toggleIsFinished(id)}>
        {isFinished ? (
          <Circle className="text-neutral-300" fill="#d4d4d4" />
        ) : (
          <Circle className="text-neutral-300" />
        )}
      </button>
      <input
        className="border-b w-full border-neutral-300 text-neutral-800 outline-none px-1 py-0.5 truncate"
        value={content}
        onChange={(e) =>
          editItemContent({ content: e.target.value, itemId: id })
        }
      />
    </div>
  );
}
