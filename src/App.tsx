import {
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
import {
  horizontalListSortingStrategy,
  SortableContext,
} from "@dnd-kit/sortable";

function App() {
  const items = useTodoStore((state) => state.items);
  const lists = useTodoStore((state) => state.lists);
  const removeItem = useTodoStore((state) => state.removeItem);
  const changeItemOrder = useTodoStore((state) => state.changeItemOrder);
  const changeListOrder = useTodoStore((state) => state.changeListOrder);

  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [activeId, setActiveId] = useState<string | number>("");
  const [activeRole, setActiveRole] = useState<string>("");

  function handleDragStart(e: DragStartEvent) {
    console.log(e.active.data);
    setIsDragging(true);
    setActiveId(e.active.id);
    setActiveRole(e.active.data.current?.role);
  }
  function handleDragEnd(e: DragEndEvent) {
    // update OverLay
    setIsDragging(false);
    setActiveId("");
    setActiveRole("");

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
    // move list to another list
    if (
      over.data.current?.role === "list" &&
      over.data.current?.role === "list"
    ) {
      changeListOrder({
        activeId: active.id as string,
        overId: over.id as string,
      });
    }

    // 3. handle item order change
    const targetListId = overData?.listId;
    changeItemOrder({
      activeId: active.id as string,
      overId: over.id as string,
      targetListId,
    });
  }

  function handleOverlay() {
    if (activeRole === "list") {
      return <TodoList list={lists.find((list) => list.id === activeId)!} />;
    } else if (activeRole === "item") {
      return (
        <TodoItem todoItem={items.filter((item) => item.id === activeId)[0]} />
      );
    } else {
      return null;
    }
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
    }),
  );

  if (lists.length === 0) toast("add a new list first :)");

  return (
    <DndContext
      sensors={sensors}
      // collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="h-screen flex flex-col">
        <Header />
        <div className="grow bg-neutral-100 overflow-scroll">
          <main className="h-full flex flex-col items-start px-1.5 py-3 gap-4 md:flex-row md:p-6 mx-auto">
            <SortableContext
              items={lists}
              strategy={horizontalListSortingStrategy}
            >
              {lists
                .sort((a, b) => a.position - b.position)
                .map((list) => (
                  <TodoList key={list.id} list={list} />
                ))}
            </SortableContext>
            {isDragging && <DeleteArea />}
          </main>
        </div>
      </div>
      <DragOverlay>{handleOverlay()}</DragOverlay>
      <Toaster />
    </DndContext>
  );
}

export default App;
