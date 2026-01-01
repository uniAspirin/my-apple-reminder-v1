import { useTodoStore } from "../hooks/useTodoStore";
import TodoItem from "./TodoItem";
import { type TodoList } from "../types/todo";
import AddItem from "./AddItem";
import RemoveListButton from "./RemoveListButton";
import { useDroppable } from "@dnd-kit/core";
import CopyListButton from "./CopyListButton";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

export default function TodoList({ list }: { list: TodoList }) {
  const { listName, id: listId, position } = list;
  const items = useTodoStore((state) => state.items);
  const sortedListItems = items
    .filter((item) => item.listId === listId)
    .sort((a, b) => {
      return a.position - b.position;
    });

  const editListName = useTodoStore((state) => state.editListName);

  const { isOver, setNodeRef } = useDroppable({
    id: listId,
    data: { role: "list", listId, position },
  });
  const style =
    "flex flex-col items-start justify-start border border-neutral-200 bg-white shadow rounded-xl p-4 gap-2 max-h-190";
  const overStyle =
    "flex flex-col items-start justify-start border border-green-400 bg-white shadow rounded-xl p-4 gap-2";

  console.log(sortedListItems);

  return (
    <div ref={setNodeRef} className={isOver ? overStyle : style}>
      <div className="flex items-center justify-between w-full">
        <input
          className="font-semibold text-2xl outline-none min-w-40"
          value={listName}
          onChange={(e) => editListName({ name: e.target.value, listId })}
        />
        <div className="flex gap-4">
          <CopyListButton listItems={sortedListItems} />
          <RemoveListButton listId={listId} />
        </div>
      </div>
      <SortableContext
        items={sortedListItems}
        strategy={verticalListSortingStrategy}
      >
        <div className="overflow-scroll w-full gap-2 flex flex-col">
          {sortedListItems.map((item) => (
            <TodoItem key={item.id} todoItem={item} />
          ))}
          <AddItem listId={listId} />
        </div>
      </SortableContext>
    </div>
  );
}
