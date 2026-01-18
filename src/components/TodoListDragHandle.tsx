import type { SyntheticListenerMap } from "@dnd-kit/core/dist/hooks/utilities";
import { GripHorizontal } from "lucide-react";

export default function TodoListDragHandle({
  listeners,
}: {
  listeners: SyntheticListenerMap | undefined;
}) {
  return (
    <button
      className="text-lg hover:bg-neutral-100 rounded-sm p-0.5 cursor-pointer transition-all duration-200 w-10 hover:cursor-move"
      {...listeners}
    >
      <GripHorizontal className="mx-auto" />
    </button>
  );
}
