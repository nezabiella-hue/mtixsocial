// Component/Header/FilterSwitch.jsx
const OPTIONS = [
  { value: "takes", label: "Takes" },
  { value: "movies", label: "Movies" },
  { value: "reviews", label: "Reviews" },
];

export default function FilterSwitch({ value, onChange }) {
  return (
    <div className="mx-auto flex max-w-[520px] gap-2 rounded-full border border-white/15 bg-white/5 p-1">
      {OPTIONS.map((opt) => {
        const active = opt.value === value;
        return (
          <button
            key={opt.value}
            type="button"
            onClick={() => onChange?.(opt.value)}
            className={[
              "flex-1 rounded-full px-4 py-2 text-sm transition",
              active
                ? "bg-cyan-200/90 text-black"
                : "text-white/70 hover:bg-white/10",
            ].join(" ")}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}
