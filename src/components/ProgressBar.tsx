interface ProgressBarProps {
  value: number;
  max: number;
}

export default function ProgressBar({ value, max }: ProgressBarProps) {
  const pastDays = value - 1;
  const remainingDays = max - value;

  return (
    <div className="flex gap-1 flex-wrap">
      {Array.from({ length: pastDays }).map((num, index) => (
        <Block key={index} type="past" />
      ))}
      <Block type="current" />
      {Array.from({ length: remainingDays }).map((num, index) => (
        <Block key={index} type="" />
      ))}
    </div>
  );
}

function Block({ type }: { type: string }) {
  let color;
  if (type === "past") {
    color = "bg-neutral-700";
  } else if (type === "current") {
    color = "bg-yellow-500";
  } else {
    color = "bg-neutral-200";
  }

  return <div className={`${color} size-3 rounded-xs`}></div>;
}
