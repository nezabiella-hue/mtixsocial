import SearchIcon from "./SearchIcon";

export default function SearchBar({
  value,
  onChange,
  placeholder = "Search",
  className = "",
}) {
  return (
    <div className={["relative w-full", className].join(" ")}>
      <SearchIcon
        className="
    pointer-events-none absolute left-3 top-1/2
    h-4 w-4 -translate-y-1/2
    text-white
    z-10
  "
      />

      <input
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder={placeholder}
        className="
          h-10 w-full rounded-full
          bg-green-soft/60
          border border-stroke-soft
          pl-10 pr-4
          text-sm text-white
          placeholder:text-white/70
          backdrop-blur
          outline-none
          transition
          focus:border-stroke-focus
          focus:bg-green-soft/75
        "
      />
    </div>
  );
}
