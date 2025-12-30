import AddList from "./AddListButton";

export default function Header() {
  return (
    <div>
      <div className="px-4 py-2 md:py-4 md:px-8 flex items-center justify-between mx-auto">
        <div className="flex items-center gap-x-6">
          <img src="/apple.svg" className="size-6" />
          <p className="text font-mono">my-kanban</p>
        </div>
        <AddList />
      </div>
    </div>
  );
}
