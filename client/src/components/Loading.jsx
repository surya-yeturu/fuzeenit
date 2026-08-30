const Loading = ({ message = 'Loading...' }) => (
  <div className="flex flex-col items-center justify-center py-20" role="status" aria-live="polite">
    <div className="h-8 w-8 animate-spin rounded-full border-2 border-gray-light border-t-brand-red" />
    <p className="mt-4 text-sm text-secondary">{message}</p>
  </div>
);

export const SkeletonCard = () => (
  <div className="animate-pulse rounded-lg border border-gray-100 bg-white p-6 dark:border-white/10 dark:bg-surface-100">
    <div className="mb-4 h-40 rounded-lg bg-gray-light dark:bg-surface-200" />
    <div className="mb-2 h-5 w-3/4 rounded bg-gray-light dark:bg-surface-200" />
    <div className="mb-4 h-4 w-full rounded bg-gray-light dark:bg-surface-200" />
    <div className="flex gap-2">
      <div className="h-4 w-16 rounded bg-gray-light dark:bg-surface-200" />
      <div className="h-4 w-16 rounded bg-gray-light dark:bg-surface-200" />
    </div>
  </div>
);

export const SkeletonGrid = ({ count = 6 }) => (
  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
    {Array.from({ length: count }).map((_, i) => (
      <SkeletonCard key={i} />
    ))}
  </div>
);

export default Loading;
