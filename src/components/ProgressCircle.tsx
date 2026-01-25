import type { TodoItem } from "@/types/todo";

interface ProgressCircleProps {
  todoItems: TodoItem[];
  size: number; // px
}

export default function ProgressCircle({
  todoItems,
  size,
}: ProgressCircleProps) {
  const total = todoItems.length;
  const finished = todoItems.filter((t) => t.isFinished).length;

  // ratio: 0 ~ 1
  const ratio = total === 0 ? 0 : finished / total;
  // percentage for display: 0 ~ 100 (integer)
  const percentage = Math.round(ratio * 100);

  // Stroke width scales with size (feel free to tweak)
  const strokeWidth = Math.max(4, Math.round(size * 0.12));
  const center = size / 2;
  const radius = center - strokeWidth / 2;

  const circ = 2 * Math.PI * radius;
  const strokeDashoffset = circ * (1 - ratio);

  // Tailwind color class by percentage
  const colorClass =
    percentage >= 75
      ? "text-green-500"
      : percentage >= 50
        ? "text-blue-500"
        : percentage >= 25
          ? "text-yellow-500"
          : "text-red-500";

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <g transform={`rotate(-90 ${center} ${center})`}>
        {/* Track */}
        <circle
          r={radius}
          cx={center}
          cy={center}
          fill="transparent"
          stroke="currentColor"
          className="text-gray-200 transition-all duration-75"
          strokeWidth={strokeWidth}
        />

        {/* Progress */}
        <circle
          r={radius}
          cx={center}
          cy={center}
          fill="transparent"
          stroke="currentColor"
          className={`${colorClass} transition-all duration-500`}
          strokeWidth={strokeWidth}
          strokeDasharray={circ}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
        />
      </g>
    </svg>
  );
}
