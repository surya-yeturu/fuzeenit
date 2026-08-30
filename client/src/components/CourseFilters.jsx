const CourseFilters = ({ filters, activeFilter, onFilterChange }) => (
  <div className="flex flex-wrap gap-2" role="group" aria-label="Filter courses by category">
    {filters.map((filter) => (
      <button
        key={filter.value}
        onClick={() => onFilterChange(filter.value)}
        className={`rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200 ${
          activeFilter === filter.value
            ? 'bg-surface text-white dark:bg-brand-red'
            : 'bg-gray-light text-gray-brand hover:text-primary dark:bg-surface-200 dark:text-white/70 dark:hover:text-white'
        }`}
        aria-pressed={activeFilter === filter.value}
      >
        {filter.label}
      </button>
    ))}
  </div>
);

export default CourseFilters;
