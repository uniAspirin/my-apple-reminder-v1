import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Trash } from "lucide-react";
import { useTodoStore } from "../hooks/useTodoStore";

export default function RemoveListButton({ listId }: { listId: string }) {
  const removeList = useTodoStore((state) => state.removeList);

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button className="hover:bg-neutral-100 rounded-sm p-0.5 cursor-pointer transition-all duration-200">
          <Trash size={20} className="text-red-600" />
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Delete list and all todos in this list?
          </AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => removeList(listId)}>
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
