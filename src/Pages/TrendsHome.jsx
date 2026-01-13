import { useLocation } from "react-router-dom";
import { useEffect, useMemo, useRef, useState } from "react";

import BackButton from "../Component/Buttons/BackButton";
import SearchBar from "../Component/Header/SearchBar";
import HeroCarousel from "../Component/Header/HeroCarousel";
import Navbar from "../Component/UI/Navbar";

// trending
import TrendingTab from "../Component/Header/TrendingTab";
import FilterSwitch from "../Component/Header/FilterSwitch";
import TrendingRank from "../Component/Header/TrendingRank";
import { getTrendingList } from "../Data/selector-trending";

// feed
import { getFeedPage } from "../Data/selector-feed";
import TakePreviewCard from "../Component/Cards/TakePreviewCard";
import ReviewPreviewCard from "../Component/Cards/ReviewPreviewCard";
import TakesFilterTabs from "../Component/UI/TakesFilterTab";

const PAGE_SIZE = 10;

export default function TrendsHome() {
  const location = useLocation();

  const [query, setQuery] = useState("");

  // trending states
  const [period, setPeriod] = useState("today"); // today | week | month
  const [mode, setMode] = useState("movies"); // movies | takes | reviews

  // feed tabs (IMPORTANT: these are ids used by selector-feed.js)
  // must be: "following" | "movies" | "group"
  const [feedTab, setFeedTab] = useState("movies");

  // infinite feed state
  const [feedItems, setFeedItems] = useState([]);
  const [cursor, setCursor] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const sentinelRef = useRef(null);

  const trendingItems = useMemo(() => {
    return getTrendingList({ period, mode, limit: 7 });
  }, [period, mode]);

  const cyclePeriod = () => {
    const order = ["today", "week", "month"];
    const idx = order.indexOf(period);
    setPeriod(order[(idx + 1) % order.length]);
  };

  // first page on tab change
  useEffect(() => {
    const first = getFeedPage({ tab: feedTab, cursor: 0, limit: PAGE_SIZE });
    setFeedItems(first.items);
    setCursor(first.nextCursor);
    setHasMore(first.hasMore);
  }, [feedTab]);

  // infinite scroll
  useEffect(() => {
    if (!hasMore) return;
    const el = sentinelRef.current;
    if (!el) return;

    const io = new IntersectionObserver((entries) => {
      if (!entries[0]?.isIntersecting) return;

      const next = getFeedPage({ tab: feedTab, cursor, limit: PAGE_SIZE });
      setFeedItems((prev) => [...prev, ...next.items]);
      setCursor(next.nextCursor);
      setHasMore(next.hasMore);
    });

    io.observe(el);
    return () => io.disconnect();
  }, [feedTab, cursor, hasMore]);

  // refresh after posting (MakeATake dispatches mtix:feed-updated)
  useEffect(() => {
    const onUpdate = () => {
      const first = getFeedPage({ tab: feedTab, cursor: 0, limit: PAGE_SIZE });
      setFeedItems(first.items);
      setCursor(first.nextCursor);
      setHasMore(first.hasMore);
    };

    window.addEventListener("mtix:feed-updated", onUpdate);
    return () => window.removeEventListener("mtix:feed-updated", onUpdate);
  }, [feedTab]);

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

        {/* Trending list */}
        <TrendingRank key={`${period}-${mode}`} items={trendingItems} />

        {/* Feed filter tabs (Following / Movies / Group) */}
        <div className="mt-5">
          <TakesFilterTabs value={feedTab} onChange={setFeedTab} />
        </div>

        {/* REAL feed */}
        <div className="mt-4 space-y-3">
          {feedItems.map((it) =>
            it.kind === "take" ? (
              <TakePreviewCard key={it.id} item={it} />
            ) : (
              <ReviewPreviewCard key={it.id} item={it} />
            )
          )}
        </div>

        {/* sentinel */}
        {hasMore && <div ref={sentinelRef} className="h-10" />}
        {!hasMore && (
          <div className="py-6 text-center text-white/40 text-sm">
            end of feed
          </div>
        )}
      </div>

      <Navbar
        onProfileClick={() => console.log("profile")}
        onMessageClick={() => console.log("messages")}
        makeATakeTo="/makeatake"
      />
    </main>
  );
}
