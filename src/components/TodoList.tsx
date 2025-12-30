import { useTodoStore } from "../hooks/useTodoStore";
import TodoItem from "./TodoItem";
import { type TodoList } from "../types/todo";
import AddItem from "./AddItem";
import RemoveListButton from "./RemoveListButton";
import { useDroppable } from "@dnd-kit/core";
import CopyListButton from "./CopyListButton";
import { useMemo } from "react";

export default function TodoList({ list }: { list: TodoList }) {
  const { listName, id: listId } = list;
  const items = useTodoStore((state) => state.items);
  const sortedListItems = useMemo(() => {
    return items
      .filter((item) => item.listId === listId)
      .sort((a, b) => {
        return Number(b.isFinished) - Number(a.isFinished);
      });
  }, [items, listId]);

  const editListName = useTodoStore((state) => state.editListName);

  const { isOver, setNodeRef } = useDroppable({ id: listId });
  const style =
    "flex flex-col items-start justify-start border border-neutral-200 bg-white shadow rounded-xl p-4 gap-2";
  const overStyle =
    "flex flex-col items-start justify-start border border-green-400 bg-white shadow rounded-xl p-4 gap-2";

  return (
    <div ref={setNodeRef} className={isOver ? overStyle : style}>
      <div className="flex items-center justify-between w-full">
        <input
          className="font-semibold text-2xl outline-none min-w-40"
          value={listName}
          onChange={(e) => editListName({ name: e.target.value, listId })}
        />
        <div className="flex gap-4">
          <CopyListButton listName={listName} listItems={sortedListItems} />
          <RemoveListButton listId={listId} />
        </div>
      </div>

      {sortedListItems.map((item) => (
        <TodoItem key={item.id} todoItem={item} />
      ))}

      <AddItem listId={listId} />
    </div>
  );
}
