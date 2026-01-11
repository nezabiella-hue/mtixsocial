import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { getMoviePreviewData } from "../Data/selector-movie.js";

function getYouTubeId(url) {
  try {
    const u = new URL(url);

    // watch?v=xxxx
    const v = u.searchParams.get("v");
    if (v) return v;

    // youtu.be/xxxx
    if (u.hostname.includes("youtu.be")) {
      return u.pathname.replace("/", "");
    }

    // /embed/xxxx
    const m = u.pathname.match(/\/embed\/([^/]+)/);
    return m?.[1] ?? null;
  } catch {
    return null;
  }
}

function ytThumb(id) {
  return `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
}

function Stars({ value = 4 }) {
  const full = Math.max(0, Math.min(5, value));
  return (
    <div
      className="flex items-center gap-1"
      aria-label={`${full} out of 5 stars`}
    >
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} className={i < full ? "text-white/90" : "text-white/30"}>
          ★
        </span>
      ))}
    </div>
  );
}

export default function MoviePreview() {
  const navigate = useNavigate();
  const { id } = useParams();

  const MOVIE = useMemo(() => getMoviePreviewData(id), [id]);

  const [synExpanded, setSynExpanded] = useState(false);
  const [kmFilter, setKmFilter] = useState(5);

  // video only sticky after play
  const [isPlaying, setIsPlaying] = useState(false);

  // reset per movie
  useEffect(() => {
    setSynExpanded(false);
    setKmFilter(5);
    setIsPlaying(false);
  }, [id]);

  const videoId = useMemo(
    () => getYouTubeId(MOVIE?.trailerUrl || ""),
    [MOVIE?.trailerUrl]
  );

  const embedUrl = useMemo(() => {
    if (!videoId) return null;
    return `https://www.youtube.com/embed/${videoId}?autoplay=1&modestbranding=1&rel=0`;
  }, [videoId]);

  const filteredTheaters = useMemo(() => {
    if (!MOVIE) return [];
    return MOVIE.theaters.filter((t) => t.distanceKm <= kmFilter);
  }, [MOVIE, kmFilter]);

  const close = () => {
    if (window.history.length > 1) navigate(-1);
    else navigate("/", { replace: true });
  };

  // handle invalid id
  if (!MOVIE) {
    return (
      <div className="fixed inset-0 z-999 grid place-items-center bg-black/60 text-white">
        <div className="w-[min(560px,92vw)] rounded-[28px] border border-white/10 bg-[#0E2A25]/95 p-6 text-center shadow-2xl">
          <div className="text-lg font-extrabold">Movie not found</div>
          <div className="mt-2 text-sm text-white/70">
            No data for id:{" "}
            <span className="font-mono text-white/90">{String(id)}</span>
          </div>
          <button
            type="button"
            onClick={() => navigate("/", { replace: true })}
            className="mt-5 rounded-full bg-white/10 px-5 py-2 text-sm font-semibold text-white/90 hover:bg-white/15"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-999">
      <button
        type="button"
        onClick={close}
        className="absolute inset-0 bg-black/30"
        aria-label="Close movie preview"
      />

      <section
        role="dialog"
        aria-modal="true"
        className={[
          "absolute left-1/2 bottom-4 w-[min(560px,92vw)] -translate-x-1/2",
          "rounded-[28px] border border-white/10 bg-[#0E2A25]/95 shadow-2xl overflow-hidden",
          "animate-[sheetUp_.28s_cubic-bezier(.2,.9,.2,1)]",
        ].join(" ")}
      >
        <div className="relative flex items-center justify-center py-3">
          <div className="h-1 w-10 rounded-full bg-white/20" />
          <button
            onClick={close}
            className="absolute right-3 top-2 grid h-10 w-10 place-items-center rounded-full bg-white/10 text-white/90 hover:bg-white/15"
            aria-label="Close"
            type="button"
          >
            ✕
          </button>
        </div>

        <div className="max-h-[86vh] overflow-y-auto">
          <div
            className={
              isPlaying ? "sticky top-0 z-10 bg-[#0E2A25]/95 backdrop-blur" : ""
            }
          >
            <div className="px-4 pb-3">
              <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-white/10 bg-black">
                {!videoId ? (
                  <a
                    href={MOVIE.trailerUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="grid h-full w-full place-items-center text-white/80 underline"
                  >
                    Open trailer
                  </a>
                ) : !isPlaying ? (
                  <>
                    <img
                      src={ytThumb(videoId)}
                      alt="Trailer preview"
                      className="h-full w-full object-cover opacity-90"
                      loading="lazy"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-black/25" />

                    <button
                      type="button"
                      onClick={() => setIsPlaying(true)}
                      className="absolute inset-0 grid place-items-center"
                      aria-label="Play trailer"
                    >
                      <div className="grid h-16 w-16 place-items-center rounded-full bg-white/85 text-slate-900 shadow-lg transition active:scale-95">
                        ▶
                      </div>
                    </button>

                    <div className="absolute bottom-3 left-3 rounded-full bg-black/40 px-3 py-1 text-xs text-white/80 backdrop-blur">
                      Tap to play • Trailer
                    </div>
                  </>
                ) : (
                  <iframe
                    className="h-full w-full"
                    src={embedUrl || undefined}
                    title="Movie trailer"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                )}
              </div>
            </div>
          </div>

          <div className="px-5 pb-28 pt-2 text-white">
            <h1 className="text-[22px] font-extrabold leading-tight sm:text-[24px]">
              {MOVIE.title}
            </h1>

            <div className="mt-2 flex flex-wrap items-center gap-2 text-[13px] text-white/70">
              <div className="flex flex-wrap items-center gap-2">
                {MOVIE.genres.map((g) => (
                  <span key={g} className="rounded-full bg-white/10 px-3 py-1">
                    {g}
                  </span>
                ))}
              </div>

              <span className="text-white/35">•</span>
              <span>{MOVIE.duration}</span>
              <span className="text-white/35">•</span>
              <span className="rounded-full border border-white/15 bg-white/5 px-2 py-[2px] text-[12px]">
                {MOVIE.ageRating}
              </span>
            </div>

            <div className="mt-4 grid gap-1">
              <Stars value={MOVIE.ratingStars ?? 4} />
              <div className="text-[13px] text-white/70">
                {MOVIE.reviews} reviews
              </div>
              <div className="text-[13px] text-white/70">
                <span className="font-semibold text-white/90">
                  {MOVIE.watchedLabel}
                </span>{" "}
                Watched
              </div>
            </div>

            <div className="mt-7">
              <div className="mb-2 flex items-center justify-between">
                <h2 className="text-[18px] font-bold">Synopsis</h2>
                <button
                  type="button"
                  onClick={() => setSynExpanded((v) => !v)}
                  className="rounded-full bg-white/10 px-3 py-1 text-[12px] text-white/80 hover:bg-white/15"
                >
                  {synExpanded ? "Less" : "More"}
                </button>
              </div>

              <p
                className={[
                  "text-[14px] leading-relaxed text-white/80",
                  synExpanded ? "" : "line-clamp-3",
                ].join(" ")}
              >
                {MOVIE.synopsis}
              </p>
            </div>

            <div className="mt-8">
              <div className="mb-3 flex items-center justify-between">
                <h2 className="text-[18px] font-bold">Nearby theaters</h2>

                <div className="flex items-center gap-2">
                  <label className="text-[12px] text-white/70">Within</label>
                  <select
                    value={kmFilter}
                    onChange={(e) => setKmFilter(Number(e.target.value))}
                    className="rounded-full bg-white/10 px-3 py-1 text-[12px] text-white/90 outline-none ring-1 ring-white/10"
                  >
                    <option value={3}>3 km</option>
                    <option value={5}>5 km</option>
                    <option value={10}>10 km</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-3 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                {filteredTheaters.map((t) => (
                  <div
                    key={t.name}
                    className="min-w-[220px] rounded-2xl border border-teal-200/30 bg-white/5 p-4"
                  >
                    <div className="text-[14px] font-semibold">{t.name}</div>
                    <div className="mt-1 text-[12px] text-white/70">
                      {t.distanceKm} km
                    </div>
                  </div>
                ))}

                {filteredTheaters.length === 0 && (
                  <div className="text-[13px] text-white/70">
                    No theaters within {kmFilter} km.
                  </div>
                )}
              </div>
            </div>

            <div className="mt-8">
              <div className="mb-3 flex items-center justify-between">
                <h2 className="text-[18px] font-bold">Cast & Crew</h2>
              </div>

              <div className="flex gap-3 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                {MOVIE.cast.map((c) => (
                  <div
                    key={c.name}
                    className="min-w-[92px] rounded-2xl bg-white/5 p-3 text-center"
                  >
                    <img
                      src={c.img}
                      alt={c.name}
                      className="mx-auto h-14 w-14 rounded-full border border-white/10 object-cover"
                      loading="lazy"
                    />
                    <div className="mt-2 text-[12px] font-medium leading-tight">
                      {c.name}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="sticky bottom-0 z-10 bg-[#0E2A25]/95 backdrop-blur">
            <div className="px-5 pb-5 pt-3">
              <button
                type="button"
                className="w-full rounded-2xl bg-teal-200 px-4 py-4 text-[16px] font-semibold text-[#06302A]"
              >
                Buy Ticket
              </button>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes sheetUp {
          from { transform: translate(100%, 56px); opacity: .4; }
          to   { transform: translate(0%, 0); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
