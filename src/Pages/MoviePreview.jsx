import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

// PoC data (later replace with MOVIES lookup)
const MOVIE = {
  id: "everything-everywhere",
  title: "Everything Everywhere All at Once",
  genres: ["Action", "Sci-Fi", "Adventure"],
  duration: "2h 50m",
  ageRating: "R13",
  reviews: 125,
  watched: "9.999",
  trailerUrl: "https://www.youtube.com/watch?v=wxN1T1uxQ2g",
  synopsis:
    "A Chinese immigrant gets unwillingly embroiled in an epic adventure where she must connect different versions of herself in the parallel universe... (longer text) Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  theaters: [
    { name: "Gandaria City XXI", distanceKm: 1.5 },
    { name: "Kota Kasablanka XXI", distanceKm: 2.2 },
    { name: "Plaza Senayan XXI", distanceKm: 4.8 },
    { name: "Pondok Indah Mall XXI", distanceKm: 5.5 },
    { name: "Ciputra World XXI", distanceKm: 7.0 },
  ],
  cast: [
    { name: "Michelle Yeoh", img: "https://i.pravatar.cc/80?img=32" },
    { name: "Ke Huy Quan", img: "https://i.pravatar.cc/80?img=12" },
    { name: "Stephanie Hsu", img: "https://i.pravatar.cc/80?img=5" },
    { name: "Jamie Lee Curtis", img: "https://i.pravatar.cc/80?img=45" },
    { name: "Harry Shum Jr.", img: "https://i.pravatar.cc/80?img=18" },
  ],
};

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
  const { id } = useParams(); // ready for later: use id to fetch movie data

  const [synExpanded, setSynExpanded] = useState(false);
  const [kmFilter, setKmFilter] = useState(5);

  // NEW: video only sticky after play
  const [isPlaying, setIsPlaying] = useState(false);

  const videoId = useMemo(() => getYouTubeId(MOVIE.trailerUrl), []);
  const embedUrl = useMemo(() => {
    if (!videoId) return null;
    // autoplay only after user presses play
    return `https://www.youtube.com/embed/${videoId}?autoplay=1&modestbranding=1&rel=0`;
  }, [videoId]);

  const filteredTheaters = useMemo(() => {
    return MOVIE.theaters.filter((t) => t.distanceKm <= kmFilter);
  }, [kmFilter]);

  const close = () => navigate(-1);

  return (
    <div className="fixed inset-0 z-[999]">
      {/* Overlay behind sheet (LESS DARK) */}
      {/* Adjust darkness here: bg-black/35, /40, /50 etc */}
      <button
        type="button"
        onClick={close}
        className="absolute inset-0 bg-black/35"
        aria-label="Close movie preview"
      />

      {/* bottom sheet */}
      <section
        role="dialog"
        aria-modal="true"
        className="
          absolute left-1/2 top-[6%] w-[min(560px,92vw)] -translate-x-1/2
          rounded-[28px] border border-white/10 bg-[#0E2A25]/95 shadow-2xl
          overflow-hidden
          animate-[sheetIn_.22s_ease-out]
        "
      >
        {/* handle + close */}
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

        {/* scroll container */}
        <div className="max-h-[86vh] overflow-y-auto">
          {/* Trailer: becomes sticky ONLY after play */}
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
                    {/* thumbnail preview */}
                    <img
                      src={ytThumb(videoId)}
                      alt="Trailer preview"
                      className="h-full w-full object-cover opacity-90"
                      loading="lazy"
                    />

                    {/* gradient for contrast */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-black/25" />

                    {/* play button */}
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

                    {/* hint */}
                    <div className="absolute bottom-3 left-3 rounded-full bg-black/40 px-3 py-1 text-xs text-white/80 backdrop-blur">
                      Tap to play • Trailer
                    </div>
                  </>
                ) : (
                  <iframe
                    className="h-full w-full"
                    src={embedUrl}
                    title="Movie trailer"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                )}
              </div>
            </div>
          </div>

          {/* content */}
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
              <Stars value={4} />
              <div className="text-[13px] text-white/70">
                {MOVIE.reviews} reviews
              </div>
              <div className="text-[13px] text-white/70">
                <span className="font-semibold text-white/90">
                  {MOVIE.watched}
                </span>{" "}
                Watched
              </div>
            </div>

            {/* Synopsis */}
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
                className={`text-[14px] leading-relaxed text-white/80 ${
                  synExpanded ? "" : "line-clamp-3"
                }`}
              >
                {MOVIE.synopsis}
              </p>
            </div>

            {/* Nearby theaters */}
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

            {/* Cast & Crew */}
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

          {/* Sticky bottom CTA */}
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
        @keyframes sheetIn {
          from { transform: translate(-50%, 24px); opacity: .4; }
          to { transform: translate(-50%, 0); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
