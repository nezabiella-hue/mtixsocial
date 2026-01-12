import { useMemo, useState } from "react";
import { formatCount } from "../../Data/selector-trending";
import { Link } from "react-router-dom";

function EyeIcon() {
  return <span className="text-white/60">👁</span>;
}
function TakesIcon() {
  return <span className="text-white/60">🎬</span>;
}
function LikeIcon() {
  return <span className="text-white/60">👏</span>;
}
function CommentIcon() {
  return <span className="text-white/60">💬</span>;
}

export default function TrendingRank({ items = [] }) {
  const [expanded, setExpanded] = useState(false);

  // show 3 collapsed, show up to 7 expanded
  const visibleItems = useMemo(() => {
    const max = expanded ? 7 : 3;
    return items.slice(0, max);
  }, [items, expanded]);

  const canToggle = items.length > 3;

  return (
    <div className="mt-4 rounded-2xl border border-white/10 bg-black/20 p-3">
      <div className="mb-2 text-sm font-semibold text-white/80">
        Top watched
      </div>

      <div className="space-y-2">
        {visibleItems.map((it) => {
          // Review row
          if (it.type === "review") {
            return (
              <Link
                key={it.id}
                to={`/review/${it.id}`}
                className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-4 py-3 hover:bg-white/10"
              >
                <div className="min-w-0">
                  <div className="truncate text-sm text-white/90">
                    {it.title}
                  </div>
                </div>

                <div className="ml-3 flex items-center gap-3 text-xs text-white/70">
                  <span className="flex items-center gap-1">
                    <LikeIcon /> {formatCount(it.metrics.likes)}
                  </span>
                  <span className="flex items-center gap-1">
                    <CommentIcon /> {formatCount(it.metrics.comments)}
                  </span>
                </div>
              </Link>
            );
          }

          // Movie row
          const icon = it.metricKey === "takes" ? <TakesIcon /> : <EyeIcon />;

          return (
            <Link
              key={it.id}
              to={`/movie/${it.id}`}
              className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-4 py-3 hover:bg-white/10"
            >
              <div className="min-w-0 truncate text-sm text-white/90">
                {it.title}
              </div>

              <div className="ml-3 flex items-center gap-2 text-xs text-white/70">
                {icon}
                {formatCount(it.metricValue)}
              </div>
            </Link>
          );
        })}
      </div>

      {/* dropdown */}
      {canToggle && (
        <div className="mt-3 flex justify-center">
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2 text-xs text-white/80 hover:bg-white/10"
          >
            {expanded ? "Show less" : "Show more"}
            <span
              className={["transition", expanded ? "rotate-180" : ""].join(" ")}
            >
              ▾
            </span>
          </button>
        </div>
      )}
    </div>
  );
}
