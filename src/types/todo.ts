interface TodoItem {
  id: string;
  content: string;
  listId: string;
  isFinished: boolean;
}

interface TodoList {
  id: string;
  listName: string;
}

interface TodoState {
  lists: TodoList[];
  items: TodoItem[];

  addList: (name: string) => void;
  editListName: (params: { name: string; listId: string }) => void;
  removeList: (listId: string) => void;

  addItem: (params: { content: string; listId: string }) => void;
  editItemContent: (params: { content: string; itemId: string }) => void;
  toggleIsFinished: (itemId: string) => void;
  moveItem: (params: { itemId: string; newListId: string }) => void;
  removeItem: (itemId: string) => void;
}

export type { TodoItem, TodoList, TodoState };
