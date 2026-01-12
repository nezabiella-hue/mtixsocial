import { useLocation } from "react-router-dom";
import { useMemo, useState } from "react";

import BackButton from "../Component/Buttons/BackButton";
import SearchBar from "../Component/Header/SearchBar";
import HeroCarousel from "../Component/Header/HeroCarousel";
import Navbar from "../Component/UI/Navbar";

// NEW: trending components + selector
import TrendingTab from "../Component/Header/TrendingTab";
import FilterSwitch from "../Component/Header/FilterSwitch";
import TrendingRank from "../Component/Header/TrendingRank";
import { getTrendingList } from "../Data/selector-trending";

const FEED_FILTERS = ["Following", "Movies", "Group"];

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

  // NEW: trending states (normalized keys)
  const [period, setPeriod] = useState("today"); // today | week | month
  const [mode, setMode] = useState("movies"); // movies | takes | reviews

  // feed pills (keep your old feed section)
  const [feedFilter, setFeedFilter] = useState("Movies");

  const items = useMemo(() => {
    return getTrendingList({ period, mode, limit: 7 });
  }, [period, mode]);

  const cyclePeriod = () => {
    const order = ["today", "week", "month"];
    const idx = order.indexOf(period);
    setPeriod(order[(idx + 1) % order.length]);
  };

  return (
    <main className="min-h-dvh bg-[linear-gradient(-25deg,#000000,#134e4a)] text-white">
      <div className="mx-auto max-w-130 px-4 pb-28 pt-5 md:max-w-190 md:px-6">
        {/* Top bar */}
        <div className="flex items-center gap-3">
          <BackButton />
          <div className="min-w-0 flex-1">
            <SearchBar value={query} onChange={setQuery} />
          </div>
        </div>

        {/* Hero */}
        <div className="mt-3">
          <HeroCarousel backgroundLocation={location} />
        </div>

        {/* Trending header (centered) */}
        <div className="relative mt-2">
          <TrendingTab period={period} onCyclePeriod={cyclePeriod} />
        </div>

        {/* Takes / Movies / Reviews */}
        <div className="mt-2">
          <FilterSwitch value={mode} onChange={setMode} />
        </div>

        {/* Trending list (dropdown inside component) */}
        <TrendingRank key={`${period}-${mode}`} items={items} />

        {/* Feed pills */}
        <div className="mt-5">
          <PillGroup
            options={FEED_FILTERS}
            value={feedFilter}
            onChange={setFeedFilter}
          />
        </div>

        {/* Dummy feed */}
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
