export default function TakesFilterTabs({ value = "movies", onChange }) {
  const tabs = [
    { id: "following", label: "Following" },
    { id: "movies", label: "Movies" },
    { id: "group", label: "Group" },
  ];

  return (
    <div className="mt-4 rounded-full border border-white/10 bg-black/20 p-1">
      <div className="grid grid-cols-3 gap-1">
        {tabs.map((t) => {
          const active = t.id === value;
          return (
            <button
              key={t.id}
              type="button"
              onClick={() => onChange?.(t.id)}
              className={[
                "rounded-full py-2 text-xs font-semibold transition active:scale-[0.99]",
                active
                  ? "bg-cyan-200/95 text-slate-900 shadow"
                  : "text-white/70 hover:text-white hover:bg-white/5",
              ].join(" ")}
            >
              {t.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
