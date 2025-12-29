import { create } from "zustand";
import type { TodoState } from "../types/todo";
import { persist, createJSONStorage } from "zustand/middleware";

export const useTodoStore = create<TodoState>()(
  persist(
    (set) => ({
      lists: [{ id: "all", listName: "All" }],
      items: [],
      addList(name) {
        set((state) => ({
          lists: [
            ...state.lists,
            { id: Date.now().toString(), listName: name },
          ],
        }));
      },
      editListName({ name, listId }) {
        {
          set((state) => ({
            lists: state.lists.map((list) =>
              list.id === listId ? { ...list, listName: name } : list
            ),
          }));
        }
      },
      removeList(listId) {
        set((state) => ({
          lists: state.lists.filter((list) => list.id !== listId),
          items: state.items.filter((item) => item.listId !== listId),
        }));
      },
      addItem({ content, listId }) {
        set((state) => ({
          items: [
            ...state.items,
            {
              id: Math.random().toString(36).substring(2, 9),
              content,
              listId,
              isFinished: false,
            },
          ],
        }));
      },
      editItemContent({ content, itemId }) {
        set((state) => ({
          items: state.items.map((item) =>
            item.id === itemId ? { ...item, content } : item
          ),
        }));
      },
      moveItem({ itemId, newListId }) {
        set((state) => ({
          items: state.items.map((item) =>
            item.id === itemId ? { ...item, listId: newListId } : item
          ),
        }));
      },
      toggleIsFinished(itemId) {
        set((state) => ({
          items: state.items.map((item) =>
            item.id === itemId
              ? { ...item, isFinished: !item.isFinished }
              : item
          ),
        }));
      },
      removeItem(itemId) {
        set((state) => ({
          items: state.items.filter((item) => item.id !== itemId),
        }));
      },
    }),
    { name: "todo-storage", storage: createJSONStorage(() => localStorage) }
  )
);
