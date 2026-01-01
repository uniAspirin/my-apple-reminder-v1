import { useDroppable } from "@dnd-kit/core";
import { Trash } from "lucide-react";

export default function DeleteArea() {
  const { setNodeRef, isOver } = useDroppable({
    id: "delete",
    data: { role: "delete" },
  });
  return (
    <div
      ref={setNodeRef}
      className={`fixed bottom-0 left-0 w-full h-50 z-500 flex items-center justify-center border-4 border-dashed rounded-2xl transition-all duration-200 ${
        isOver
          ? "border-red-500 text-red-500 bg-red-200 scale-95"
          : "border-neutral-400 scale-90 opacity-80 bg-neutral-50"
      }`}
    >
      <Trash size={100} />
    </div>
  );
}
