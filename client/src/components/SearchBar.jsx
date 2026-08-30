const SearchBar = ({ value, onChange, placeholder = 'Search courses...' }) => (
  <div className="relative">
    <svg
      className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-brand"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
    <input
      type="search"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="input-field pl-12"
      aria-label={placeholder}
    />
  </div>
);

export default SearchBar;
