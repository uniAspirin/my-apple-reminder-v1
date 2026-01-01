import {
  closestCenter,
  DndContext,
  DragOverlay,
  PointerSensor,
  TouchSensor,
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
  const removeItem = useTodoStore((state) => state.removeItem);
  const changeItemOrder = useTodoStore((state) => state.changeItemOrder);

  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [activeId, setActiveId] = useState<string | number>("");

  function handleDragStart(e: DragStartEvent) {
    setIsDragging(true);
    setActiveId(e.active.id);
  }
  function handleDragEnd(e: DragEndEvent) {
    // update OverLay
    setIsDragging(false);
    setActiveId("");

    // base on role
    const { active, over } = e;
    // 1. same place, return
    if (!over) return;
    // 2. delete area, delete it
    if (over.id === "delete") {
      removeItem(active.id as string);
    }
    const overData = over?.data.current;
    // disable: drag over an item in another list
    if (
      active.data.current?.listId !== over.data.current?.listId &&
      over.data.current?.role === "item"
    ) {
      return;
    }
    // 3. handle item order change
    const targetListId = overData?.listId;
    changeItemOrder({ activeId: active.id, overId: over.id, targetListId });
  }
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 5 },
    }),
    useSensor(TouchSensor, {
      // Press delay of 250ms, with tolerance of 5px of movement
      activationConstraint: {
        delay: 250,
        tolerance: 5,
      },
    })
  );

  if (lists.length === 0) toast("add a new list first :)");

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="h-screen flex flex-col">
        <Header />
        <div className="grow bg-neutral-100 overflow-scroll">
          <main className="h-full flex flex-col px-1.5 py-3 gap-4 md:flex-row md:p-6 mx-auto">
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
