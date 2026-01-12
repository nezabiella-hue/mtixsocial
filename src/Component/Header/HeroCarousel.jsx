import { useEffect, useMemo, useRef, useState } from "react";
import BannerCard from "../Cards/BannerCard";

const DEFAULT_POSTERS = [
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

export default function HeroCarousel({
  posters = DEFAULT_POSTERS,
  backgroundLocation,
  intervalMs = 4200,
}) {
  const items = useMemo(() => posters, [posters]);
  const [slide, setSlide] = useState(0);
  const timerRef = useRef(null);

  const start = () => {
    stop();
    timerRef.current = window.setInterval(() => {
      setSlide((s) => (s + 1) % items.length);
    }, intervalMs);
  };

  const stop = () => {
    if (timerRef.current) window.clearInterval(timerRef.current);
    timerRef.current = null;
  };

  useEffect(() => {
    if (!items.length) return;
    start();
    return stop;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items.length, intervalMs]);

  if (!items.length) return null;

  return (
    <div className="relative">
      <div
        className="overflow-hidden rounded-3xl"
        onMouseEnter={stop}
        onMouseLeave={start}
        onTouchStart={stop}
        onTouchEnd={start}
      >
        <div
          className="flex transition-transform duration-700 ease-out"
          style={{ transform: `translateX(-${slide * 100}%)` }}
        >
          {items.map((p) => (
            <div key={p.id} className="w-full shrink-0">
              <BannerCard item={p} backgroundLocation={backgroundLocation} />
            </div>
          ))}
        </div>
      </div>

      {/* dots */}
      <div className="mt-3 flex items-center justify-center gap-2">
        {items.map((_, i) => (
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
  );
}
