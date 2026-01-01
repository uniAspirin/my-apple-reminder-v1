import { create } from "zustand";
import type { TodoState } from "../types/todo";
import { persist, createJSONStorage } from "zustand/middleware";
import toast from "react-hot-toast";

export const useTodoStore = create<TodoState>()(
  persist(
    (set) => ({
      lists: [
        {
          id: "1767241298345",
          listName: "Hello there 😉",
          position: 1767241298345,
        },
      ],
      items: [
        {
          id: "lfhvnrr",
          position: 1767241299777,
          content: "新建列表：点击右上角按钮开始。",
          listId: "1767241298345",
          isFinished: false,
        },
        {
          id: "ueovqut",
          position: 1767241299777,
          content: "快速添加：输入任务并按 Enter。",
          listId: "1767241298345",
          isFinished: false,
        },
        {
          id: "eiwi67m",
          position: 1767241299777,
          content: "完成任务：点击左侧圆圈标记已完成。",
          listId: "1767241298345",
          isFinished: false,
        },
        {
          id: "mtg8czr",
          position: 1767241299777,
          content: "灵活排序：自由拖拽任务调整优先级。",
          listId: "1767241298345",
          isFinished: false,
        },
        {
          id: "2k8nljr",
          position: 1767241299777,
          content: "快速删除：将任务拖到屏幕底部即可删除。",
          listId: "1767241298345",
          isFinished: false,
        },
        {
          id: "wui3yv9",
          position: 1767241299777,
          content: "批量创建：支持一次粘贴多行文字（格式：一行一个任务）。",
          listId: "1767241298345",
          isFinished: false,
        },
        {
          id: "ofi2gkc",
          position: 1767241299777,
          content: "一键导出：点击右上角复制图标，即可将纯文本复制到剪切板",
          listId: "1767241298345",
          isFinished: false,
        },
        {
          id: "juns732",
          position: 1767241299777,
          content:
            "⚠️ 旧版用户注意：若拖拽失效，请利用特性 6 和 7 重新创建列表，并删除旧列表即可恢复正常。",
          listId: "1767241298345",
          isFinished: false,
        },
      ],
      addList(name) {
        set((state) => ({
          lists: [
            ...state.lists,
            {
              id: Date.now().toString(),
              listName: name,
              position: Date.now(),
            },
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
              position: Date.now(),
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
      changeItemOrder({ activeId, overId, targetListId }) {
        set((state) => {
          const sortedItems = state.items
            .filter((i) => i.listId === targetListId)
            .sort((a, b) => a.position - b.position);

          let calculatedPosition: number;

          // 1) over is a list
          if (overId === targetListId) {
            calculatedPosition = Date.now();
          }
          // 2) over is an item
          else {
            const activeIndex = sortedItems.findIndex((i) => i.id === activeId);
            const overIndex = sortedItems.findIndex((i) => i.id === overId);

            if (overIndex === 0) {
              // insert in the head
              calculatedPosition = sortedItems[0].position / 2;
            } else if (overIndex === sortedItems.length - 1) {
              // insert in the end
              calculatedPosition = Date.now();
            } else {
              // insert in the middle
              // move downwards
              if (activeIndex < overIndex) {
                const curPosition = sortedItems[overIndex].position;
                const nextPosition = sortedItems[overIndex + 1].position;
                calculatedPosition = (curPosition + nextPosition) / 2;
              } else {
                // move upwards
                const curPosition = sortedItems[overIndex].position;
                const nextPosition = sortedItems[overIndex - 1].position;
                calculatedPosition = (curPosition + nextPosition) / 2;
              }
            }
          }

          return {
            items: state.items.map((item) =>
              item.id === activeId
                ? {
                    ...item,
                    listId: targetListId,
                    position: calculatedPosition,
                  }
                : item
            ),
          };
        });
      },
      toggleIsFinished(itemId) {
        set((state) => {
          const currentItem = state.items.find((item) => item.id === itemId);
          // 1) true => false
          if (currentItem?.isFinished === true) {
            return {
              items: state.items.map((item) =>
                item.id === itemId
                  ? {
                      ...item,
                      isFinished: !item.isFinished,
                    }
                  : item
              ),
            };
          }
          // 2) false => true, move it to the top: set position to the smallest
          const sortedItems = state.items
            .filter((item) => item.listId === currentItem?.listId)
            .sort((a, b) => a.position - b.position);
          const newPosition = sortedItems[0].position / 2;
          const newItems = state.items.map((item) =>
            item.id === itemId
              ? {
                  ...item,
                  isFinished: !item.isFinished,
                  position: newPosition,
                }
              : item
          );
          // show toast if all todos in list are finished
          const allFinished = sortedItems
            .filter((item) => item.id !== itemId)
            .every((item) => item.isFinished);
          if (allFinished) {
            toast("Good Job!!!!!!", {
              icon: "👏",
            });
          }
          return { items: newItems };
        });
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
