export function ListSkeleton({ rows = 4 }: { rows?: number }) {
  return (
    <div className="bg-white rounded-2xl border border-[#DCE0E8] overflow-hidden">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className={`flex items-center gap-4 px-6 py-4 ${i !== 0 ? "border-t border-[#DCE0E8]" : ""}`}>
          <div className="w-10 h-10 rounded-full bg-[#EEF1F6] animate-pulse shrink-0" />
          <div className="flex-1 min-w-0 flex flex-col gap-2">
            <div className="h-3.5 w-1/3 rounded bg-[#EEF1F6] animate-pulse" />
            <div className="h-3 w-1/5 rounded bg-[#F3F5F9] animate-pulse" />
          </div>
          <div className="h-6 w-20 rounded-full bg-[#EEF1F6] animate-pulse shrink-0" />
        </div>
      ))}
    </div>
  );
}

export function EmptyState({
  icon,
  title,
  description,
  action,
}: {
  icon: React.ReactNode;
  title: string;
  description?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="bg-white rounded-2xl border border-dashed border-[#DCE0E8] p-12 flex flex-col items-center text-center gap-3">
      <span className="w-12 h-12 rounded-full bg-[#EAF3FB] flex items-center justify-center text-[#0066FF]">{icon}</span>
      <p className="text-[#1A274F] text-sm font-semibold">{title}</p>
      {description && <p className="text-[#6B7280] text-sm max-w-xs">{description}</p>}
      {action}
    </div>
  );
}

export function ErrorState({ message, onRetry }: { message: string; onRetry: () => void }) {
  return (
    <div className="bg-red-50 border border-red-200 rounded-2xl p-6 flex items-center justify-between gap-4 flex-wrap">
      <p className="text-red-700 text-sm">{message}</p>
      <button
        onClick={onRetry}
        className="px-4 py-2 rounded-full bg-white border border-red-200 text-red-700 text-sm font-semibold hover:bg-red-100 transition-colors cursor-pointer shrink-0"
      >
        Try again
      </button>
    </div>
  );
}
