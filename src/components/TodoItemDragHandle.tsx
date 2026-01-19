import type { SyntheticListenerMap } from "@dnd-kit/core/dist/hooks/utilities";

export default function TodoItemDragHandle({
  listeners,
}: {
  listeners: SyntheticListenerMap | undefined;
}) {
  return (
    <button
      className="text-lg hover:bg-neutral-100 rounded-sm cursor-pointer transition-all duration-200 w-5 h-6 hover:cursor-move"
      {...listeners}
    ></button>
  );
}
