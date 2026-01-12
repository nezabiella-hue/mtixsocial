import { periodLabel } from "../../Data/selector-trending";

export default function TrendingTab({ period, onCyclePeriod }) {
  return (
    <div className="flex items-center justify-center gap-3 py-2">
      <h2 className="text-lg font-semibold text-white/90">Trending</h2>

      <button
        type="button"
        onClick={onCyclePeriod}
        className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm text-white/90 backdrop-blur hover:bg-white/15"
      >
        {periodLabel(period)}
      </button>
    </div>
  );
}
