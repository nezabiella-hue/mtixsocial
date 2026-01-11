import { Link, useLocation } from "react-router-dom";
import { useEffect, useMemo, useRef, useState } from "react";

import BackButton from "../Component/Buttons/BackButton";
import SearchBar from "../Component/Header/SearchBar";

/**
 * TrendsHome.jsx
 * Dummy visual page for routing + layout validation (mobile -> tablet)
 * Tailwind required.
 */

const PERIODS = ["Today", "This Week", "This Month"];
const TOP_FILTERS = ["Takes", "Movies", "Reviews"];
const FEED_FILTERS = ["Following", "Movies", "Group"];

const DEMO_POSTERS = [
  {
    id: "eeaao",
    title: "Everything Everywhere\nAll at Once",
    subtitle: "Multiverse chaos, but wholesome.",
  },
  {
    id: "demon-slayer-mugen-train",
    title: "Demon Slayer:\nKimetsu no Yaiba",
    subtitle: "Breath styles + hype fights.",
  },
  {
    id: "sore-istri-dari-masa-depan",
    title: "Sore:\nIstri dari Masa Depan",
    subtitle: "Romance meets time-bending.",
  },
];

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
    case "back":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          <path
            d="M15 18l-6-6 6-6"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "search":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          <path
            d="M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15Z"
            stroke="currentColor"
            strokeWidth="2.2"
          />
          <path
            d="M16.5 16.5 21 21"
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
    case "user":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          <path
            d="M12 12a4.5 4.5 0 1 0-4.5-4.5A4.5 4.5 0 0 0 12 12Z"
            stroke="currentColor"
            strokeWidth="2.2"
          />
          <path
            d="M4 20c1.7-4 14.3-4 16 0"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
        </svg>
      );
    case "mail":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          <path
            d="M4.5 6.5h15A2 2 0 0 1 21.5 8.5v9A2 2 0 0 1 19.5 19.5h-15A2 2 0 0 1 2.5 17.5v-9A2 2 0 0 1 4.5 6.5Z"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinejoin="round"
          />
          <path
            d="M3.5 8.2 12 13.2l8.5-5"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "clapperPlus":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          <path
            d="M5 9h14v10a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V9Z"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinejoin="round"
          />
          <path
            d="M5 9 7 4h14l-2 5H5Z"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinejoin="round"
          />
          <path
            d="M12 13v6"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
          <path
            d="M9 16h6"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
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

function PosterCard({ item, backgroundLocation }) {
  return (
    <div
      className={[
        "relative h-[240px] w-full overflow-hidden rounded-3xl border border-white/10",
        "bg-[linear-gradient(-25deg,#000000,#134e4a)]",
        "shadow-[0_20px_60px_rgba(0,0,0,0.35)]",
      ].join(" ")}
    >
      <div className="absolute inset-0 opacity-95">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,rgba(255,255,255,0.14),transparent_40%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_70%,rgba(0,255,255,0.12),transparent_45%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.0),rgba(0,0,0,0.60))]" />
      </div>

      <div className="absolute left-5 right-5 top-6">
        <div className="whitespace-pre-line text-[30px] font-black leading-[0.95] tracking-tight text-white drop-shadow">
          {item.title.toUpperCase()}
        </div>
        <div className="mt-3 max-w-[70%] text-xs text-white/70">
          {item.subtitle}
        </div>
      </div>

      {/* keep MoviePreview as modal */}
      <Link
        to={`/movie/${item.id}`}
        state={{ backgroundLocation }}
        className="absolute right-5 top-5 rounded-full bg-white/85 px-4 py-2 text-xs font-bold text-slate-900 shadow-sm transition hover:bg-white active:scale-[0.99]"
      >
        View Details
      </Link>

      <div className="absolute bottom-4 left-4 rounded-full bg-black/35 px-3 py-2 text-xs font-semibold text-white/80 backdrop-blur">
        Featured • Poster {item.id}
      </div>
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

  const [slide, setSlide] = useState(0);
  const timerRef = useRef(null);

  const posters = useMemo(() => DEMO_POSTERS, []);
  const topMovies = useMemo(() => {
    const base = DEMO_TOP_MOVIES;
    return expanded ? base : base.slice(0, 3);
  }, [expanded]);

  const cyclePeriod = () => {
    const idx = PERIODS.indexOf(period);
    setPeriod(PERIODS[(idx + 1) % PERIODS.length]);
  };

  useEffect(() => {
    timerRef.current = window.setInterval(() => {
      setSlide((s) => (s + 1) % posters.length);
    }, 4200);
    return () => window.clearInterval(timerRef.current);
  }, [posters.length]);

  const pauseCarousel = () => {
    if (timerRef.current) window.clearInterval(timerRef.current);
  };
  const resumeCarousel = () => {
    timerRef.current = window.setInterval(() => {
      setSlide((s) => (s + 1) % posters.length);
    }, 4200);
  };

  return (
    <main className="min-h-dvh bg-[linear-gradient(-25deg,#000000,#134e4a)] text-white">
      <div className="mx-auto max-w-[520px] px-4 pb-28 pt-5 md:max-w-[760px] md:px-6">
        <div className="flex items-center gap-3">
          <BackButton />

          {/* Search bar expands cleanly on phone & tablet */}
          <div className="min-w-0 flex-1">
            <SearchBar value={query} onChange={setQuery} />
          </div>
        </div>

        {/* Carousel (HORIZONTAL) */}
        <div className="mt-4">
          <div className="relative">
            <div className="overflow-hidden rounded-3xl">
              <div
                className="flex transition-transform duration-700 ease-out"
                style={{ transform: `translateX(-${slide * 100}%)` }}
                onMouseEnter={pauseCarousel}
                onMouseLeave={resumeCarousel}
              >
                {posters.map((p) => (
                  <div key={p.id} className="w-full shrink-0">
                    <PosterCard item={p} backgroundLocation={location} />
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-3 flex items-center justify-center gap-2">
              {posters.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setSlide(i)}
                  className={[
                    "h-2 rounded-full transition-all",
                    i === slide ? "w-7 bg-cyan-200/90" : "w-2 bg-white/25",
                  ].join(" ")}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="mt-5 relative flex items-center justify-between">
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

          <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-3">
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

      <nav className="fixed bottom-0 left-0 right-0 z-50">
        <div className="mx-auto max-w-[520px] px-4 pb-4 md:max-w-[760px] md:px-6">
          <div className="relative rounded-[28px] border border-white/10 bg-black/35 px-6 py-4 backdrop-blur">
            <div className="flex items-center justify-between">
              <button
                type="button"
                className="grid h-10 w-10 place-items-center rounded-2xl bg-white/10 text-white/85 transition hover:bg-white/15 active:scale-[0.98]"
                aria-label="Profile"
              >
                <Icon name="user" className="h-5 w-5" />
              </button>

              {/* ✅ MakeATake should be a FULL PAGE (no modal state) */}
              <Link
                to="/makeatake"
                className="relative -mt-10 grid h-16 w-16 place-items-center rounded-full bg-[linear-gradient(-25deg,#a5f3fc,#22d3ee)] text-slate-900 shadow-[0_20px_50px_rgba(0,0,0,0.45)] transition active:scale-95"
                aria-label="Make a take"
              >
                <Icon name="clapperPlus" className="h-7 w-7" />
              </Link>

              <button
                type="button"
                className="grid h-10 w-10 place-items-center rounded-2xl bg-white/10 text-white/85 transition hover:bg-white/15 active:scale-[0.98]"
                aria-label="Messages"
              >
                <Icon name="mail" className="h-5 w-5" />
              </button>
            </div>

            <div className="h-[env(safe-area-inset-bottom)]" />
          </div>
        </div>
      </nav>
    </main>
  );
}
