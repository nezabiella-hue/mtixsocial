import { useLocation } from "react-router-dom";
import { useMemo, useState } from "react";

import BackButton from "../Component/Buttons/BackButton";
import SearchBar from "../Component/Header/SearchBar";
import HeroCarousel from "../Component/Header/HeroCarousel";
import Navbar from "../Component/UI/Navbar";

const PERIODS = ["Today", "This Week", "This Month"];
const TOP_FILTERS = ["Takes", "Movies", "Reviews"];
const FEED_FILTERS = ["Following", "Movies", "Group"];

const DEMO_TOP_MOVIES = [
  { id: "m1", title: "Everything Everywhere All at Once", views: "125.5k" },
  { id: "m2", title: "Sore : Istri dari Masa Depan", views: "75.5k" },
  { id: "m3", title: "Demon Slayer: Kimetsu no Yaiba", views: "25.5k" },
  { id: "m4", title: "Interstellar", views: "22.1k" },
  { id: "m5", title: "Oppenheimer", views: "19.8k" },
  { id: "m6", title: "Spider-Man: Across the Spider-Verse", views: "18.4k" },
  { id: "m7", title: "Suzume", views: "16.7k" },
];

function Icon({ name, className = "" }) {
  switch (name) {
    case "bookmark":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          <path
            d="M6.5 4.5h11v16l-5.5-3-5.5 3v-16Z"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "share":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          <path
            d="M16.5 6.8a2.7 2.7 0 1 0 0-5.4 2.7 2.7 0 0 0 0 5.4Z"
            stroke="currentColor"
            strokeWidth="2.2"
          />
          <path
            d="M7.5 14.7a2.7 2.7 0 1 0 0 5.4 2.7 2.7 0 0 0 0-5.4Z"
            stroke="currentColor"
            strokeWidth="2.2"
          />
          <path
            d="M16.5 22.6a2.7 2.7 0 1 0 0-5.4 2.7 2.7 0 0 0 0 5.4Z"
            stroke="currentColor"
            strokeWidth="2.2"
          />
          <path
            d="M14.4 6.8 9.6 12.2"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
          <path
            d="M9.6 17.8 14.4 20.2"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
        </svg>
      );
    case "eye":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          <path
            d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinejoin="round"
          />
          <path
            d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
            stroke="currentColor"
            strokeWidth="2.2"
          />
        </svg>
      );
    case "chevDown":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          <path
            d="M6 9l6 6 6-6"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    default:
      return null;
  }
}

function Segmented({ options, value, onChange }) {
  return (
    <div className="relative w-full rounded-full border border-white/15 bg-white/10 p-1 backdrop-blur">
      <div className="grid grid-cols-3 gap-1">
        {options.map((opt) => {
          const active = opt === value;
          return (
            <button
              key={opt}
              type="button"
              onClick={() => onChange(opt)}
              className={[
                "rounded-full py-2 text-sm font-semibold transition",
                "active:scale-[0.99]",
                active
                  ? "bg-cyan-200/95 text-slate-900 shadow"
                  : "bg-emerald-950/35 text-white/70 hover:text-white hover:bg-emerald-950/45",
              ].join(" ")}
            >
              {opt}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function PillGroup({ options, value, onChange, className = "" }) {
  return (
    <div
      className={[
        "inline-flex w-full items-center justify-between rounded-full border border-white/15 bg-white/10 p-1 backdrop-blur",
        className,
      ].join(" ")}
    >
      {options.map((opt) => {
        const active = opt === value;
        return (
          <button
            key={opt}
            type="button"
            onClick={() => onChange(opt)}
            className={[
              "flex-1 rounded-full px-4 py-2 text-sm font-semibold transition",
              "active:scale-[0.99]",
              active
                ? "bg-cyan-200/95 text-slate-900 shadow"
                : "text-white/70 hover:text-white",
            ].join(" ")}
          >
            {opt}
          </button>
        );
      })}
    </div>
  );
}

export default function TrendsHome() {
  const location = useLocation();

  const [query, setQuery] = useState("");
  const [period, setPeriod] = useState("Today");
  const [topFilter, setTopFilter] = useState("Movies");
  const [feedFilter, setFeedFilter] = useState("Movies");
  const [expanded, setExpanded] = useState(false);

  const topMovies = useMemo(() => {
    return expanded ? DEMO_TOP_MOVIES : DEMO_TOP_MOVIES.slice(0, 3);
  }, [expanded]);

  const cyclePeriod = () => {
    const idx = PERIODS.indexOf(period);
    setPeriod(PERIODS[(idx + 1) % PERIODS.length]);
  };

  return (
    <main className="min-h-dvh bg-[linear-gradient(-25deg,#000000,#134e4a)] text-white">
      <div className="mx-auto max-w-[520px] px-4 pb-28 pt-5 md:max-w-[760px] md:px-6">
        <div className="flex items-center gap-3">
          <BackButton />
          <div className="min-w-0 flex-1">
            <SearchBar value={query} onChange={setQuery} />
          </div>
        </div>

        <div className="mt-4">
          <HeroCarousel backgroundLocation={location} />
        </div>

        <div className="relative mt-5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              type="button"
              className="grid h-9 w-9 place-items-center rounded-full bg-white/10 text-white/85 backdrop-blur transition hover:bg-white/15 active:scale-[0.98]"
              aria-label="Share"
            >
              <Icon name="share" className="h-5 w-5" />
            </button>

            <button
              type="button"
              className="grid h-9 w-9 place-items-center rounded-full bg-white/10 text-white/85 backdrop-blur transition hover:bg-white/15 active:scale-[0.98]"
              aria-label="Bookmark"
            >
              <Icon name="bookmark" className="h-5 w-5" />
            </button>
          </div>

          <div className="absolute left-1/2 flex -translate-x-1/2 items-center gap-3">
            <div className="text-lg font-extrabold leading-none">Trending</div>

            <button
              type="button"
              onClick={cyclePeriod}
              className="rounded-full border border-white/15 bg-white/10 px-6 py-2 text-sm font-semibold text-white/90 backdrop-blur transition hover:bg-white/15 active:scale-[0.98]"
              aria-label="Change period"
              title="Tap to change"
            >
              {period}
            </button>
          </div>

          <div className="w-[80px]" />
        </div>

        <div className="mt-5">
          <Segmented
            options={TOP_FILTERS}
            value={topFilter}
            onChange={setTopFilter}
          />
        </div>

        <div className="mt-5 rounded-3xl border border-white/10 bg-black/20 p-4 backdrop-blur">
          <div className="text-sm font-bold text-white/80">Top watched</div>

          <div className="mt-3 space-y-3">
            {topMovies.map((m) => (
              <button
                key={m.id}
                type="button"
                className="flex w-full items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-left transition hover:bg-white/10 active:scale-[0.995]"
              >
                <div className="min-w-0">
                  <div className="truncate text-sm font-semibold">
                    {m.title}
                  </div>
                </div>
                <div className="ml-3 flex items-center gap-1 text-xs text-white/60">
                  <Icon name="eye" className="h-4 w-4" />
                  {m.views}
                </div>
              </button>
            ))}
          </div>

          <div className="mt-3 flex justify-center">
            <button
              type="button"
              onClick={() => setExpanded((v) => !v)}
              className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-semibold text-white/80 transition hover:bg-white/15 active:scale-[0.99]"
            >
              {expanded ? "Show less" : "Show more"}
              <Icon
                name="chevDown"
                className={[
                  "h-4 w-4 transition-transform duration-300",
                  expanded ? "rotate-180" : "",
                ].join(" ")}
              />
            </button>
          </div>
        </div>

        <div className="mt-5">
          <PillGroup
            options={FEED_FILTERS}
            value={feedFilter}
            onChange={setFeedFilter}
          />
        </div>

        <div className="mt-4 space-y-3">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="rounded-3xl border border-white/10 bg-black/20 p-4 backdrop-blur"
            >
              <div className="flex items-center justify-between">
                <div className="text-sm font-semibold">
                  @{feedFilter.toLowerCase()}_demo_{i}
                </div>
                <div className="text-xs text-white/55">just now</div>
              </div>
              <div className="mt-2 text-sm text-white/70">
                Dummy {feedFilter} content (scroll feed later). This is just
                route + layout visual.
              </div>
            </div>
          ))}
        </div>
      </div>

      <Navbar
        onProfileClick={() => console.log("profile")}
        onMessageClick={() => console.log("messages")}
        makeATakeTo="/makeatake"
      />
    </main>
  );
}
