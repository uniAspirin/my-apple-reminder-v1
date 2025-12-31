import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragStartEvent,
} from "@dnd-kit/core";
import Header from "./components/Header";
import TodoList from "./components/TodoList";
import { useTodoStore } from "./hooks/useTodoStore";
import DeleteArea from "./components/DeleteArea";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import TodoItem from "./components/TodoItem";

function App() {
  const items = useTodoStore((state) => state.items);
  const lists = useTodoStore((state) => state.lists);
  const moveItem = useTodoStore((state) => state.moveItem);
  const removeItem = useTodoStore((state) => state.removeItem);

  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [activeId, setActiveId] = useState<string | number>("");

  function handleDragStart(e: DragStartEvent) {
    setIsDragging(true);
    setActiveId(e.active.id);
  }
  function handleDragEnd(e: DragEndEvent) {
    setIsDragging(false);
    setActiveId("");
    const { active, over } = e;
    if (!over) return;
    if (over.id === "delete") {
      removeItem(active.id as string);
    }
    if (active.data.current?.listId !== active.id)
      if (over.id !== active.id)
        moveItem({ itemId: active.id as string, newListId: over.id as string });
  }
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 5 },
    })
  );

  if (lists.length === 0) toast("add a new list first :)");

  return (
    <DndContext
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      sensors={sensors}
    >
      <div className="h-screen flex flex-col">
        <Header />
        <div className="grow bg-neutral-100 overflow-scroll">
          <main className="h-full flex flex-col px-1 py-3 gap-4 md:flex-row md:p-6 mx-auto">
            {lists.map((list) => (
              <TodoList key={list.id} list={list} />
            ))}

            {isDragging && <DeleteArea />}
          </main>
        </div>
      </div>
      <DragOverlay>
        {activeId ? (
          <TodoItem
            todoItem={items.filter((item) => item.id === activeId)[0]}
          />
        ) : null}
      </DragOverlay>
      <Toaster />
    </DndContext>
  );
}

export default App;
