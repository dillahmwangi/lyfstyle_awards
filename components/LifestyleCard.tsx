"use client";

type LifestyleCardProps = {
  icon: string;
  name: string;
  description: string;
  selected: boolean;
   disabled?: boolean;
  onClick: () => void;
};

export default function LifestyleCard({
  icon,
  name,
  description,
  selected,
   disabled = false,
  onClick,
}: LifestyleCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      disabled={disabled}
aria-disabled={disabled}
      className={`group w-full rounded-2xl border p-4 text-left transition-all duration-200 disabled:cursor-not-allowed active:scale-[0.98] sm:p-5 ${
        selected
          ? "border-purple-600 bg-purple-50 shadow-md"
          : "border-gray-200 bg-white hover:-translate-y-0.5 hover:border-purple-300 hover:shadow-md"
      }`}
    >
      <div className="flex items-center gap-4">
        <div
          className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl text-2xl transition-colors ${
            selected
              ? "bg-purple-600 text-white"
              : "bg-purple-100 text-purple-700 group-hover:bg-purple-200"
          }`}
        >
          {icon}
        </div>

        <div className="min-w-0 flex-1">
          <h3 className="text-base font-bold text-gray-900 sm:text-lg">
            {name}
          </h3>

          <p className="mt-1 text-sm leading-5 text-gray-500">
            {description}
          </p>
        </div>

        <div
          className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 transition-colors ${
            selected
              ? "border-purple-600 bg-purple-600 text-white"
              : "border-gray-300 bg-white"
          }`}
        >
          {selected && <span className="text-xs font-bold">✓</span>}
        </div>
      </div>
    </button>
  );
}