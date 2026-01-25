import type { SyntheticListenerMap } from "@dnd-kit/core/dist/hooks/utilities";
import { EllipsisVertical } from "lucide-react";

export default function TodoItemDragHandle({
  listeners,
}: {
  listeners: SyntheticListenerMap | undefined;
}) {
  return (
    <button
      className="hover:bg-neutral-100 rounded-sm cursor-pointer transition-all duration-200 hover:cursor-move"
      {...listeners}
    >
      <EllipsisVertical className="mx-auto text-neutral-200" />
    </button>
  );
}
