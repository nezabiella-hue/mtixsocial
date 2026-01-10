import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MOVIE_TAGS } from "../Data/movies";

const MODELS = ["Take", "Review"];
const TAKE_LIMIT = 240;

function Icon({ name, className = "" }) {
  switch (name) {
    case "close":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          <path
            d="M6 6l12 12M18 6 6 18"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
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
    case "img":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          <path
            d="M5 19h14a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2Z"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinejoin="round"
          />
          <path
            d="M8 10a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z"
            stroke="currentColor"
            strokeWidth="2.2"
          />
          <path
            d="M21 16l-5-5-4 4-2-2-5 5"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "gif":
      return <div className={`${className} font-black tracking-wide`}>GIF</div>;
    case "plus":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          <path
            d="M12 5v14M5 12h14"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
        </svg>
      );
    case "pin":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          <path
            d="M12 22s6-5.2 6-11a6 6 0 1 0-12 0c0 5.8 6 11 6 11Z"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinejoin="round"
          />
          <path
            d="M12 13.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z"
            stroke="currentColor"
            strokeWidth="2.2"
          />
        </svg>
      );
    default:
      return null;
  }
}

function Segmented({ options, value, onChange }) {
  return (
    <div className="mx-auto w-[min(320px,88vw)] rounded-full border border-white/15 bg-white/10 p-1">
      <div className="grid grid-cols-2 gap-1">
        {options.map((opt) => {
          const active = opt === value;
          return (
            <button
              key={opt}
              type="button"
              onClick={() => onChange(opt)}
              className={[
                "rounded-full py-2 text-sm font-semibold transition active:scale-[0.99]",
                active
                  ? "bg-cyan-200/95 text-slate-900 shadow"
                  : "text-white/70 hover:text-white hover:bg-white/5",
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

function Stars({ value, onChange }) {
  return (
    <div className="flex items-center justify-center gap-2">
      {Array.from({ length: 5 }).map((_, i) => {
        const n = i + 1;
        const active = n <= value;
        return (
          <button
            key={n}
            type="button"
            onClick={() => onChange(n)}
            className={[
              "text-2xl leading-none transition active:scale-95",
              active ? "text-amber-200" : "text-white/30",
            ].join(" ")}
            aria-label={`${n} stars`}
          >
            ★
          </button>
        );
      })}
    </div>
  );
}

export default function MakeATake() {
  const nav = useNavigate();

  const [mode, setMode] = useState("Take");
  const [query, setQuery] = useState("");
  const [selectedTagId, setSelectedTagId] = useState(null);

  const [text, setText] = useState("");
  const [stars, setStars] = useState(0);

  // keyboard-aware bottom bar
  const [kbOffset, setKbOffset] = useState(0);

  const recommended = useMemo(() => MOVIE_TAGS.slice(0, 3), []);
  const filteredTags = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return MOVIE_TAGS;
    return MOVIE_TAGS.filter((t) => t.label.toLowerCase().includes(q));
  }, [query]);

  const selectedTag = useMemo(
    () => MOVIE_TAGS.find((m) => m.id === selectedTagId) || null,
    [selectedTagId]
  );

  const limit = mode === "Take" ? TAKE_LIMIT : 2000;
  const remaining = limit - text.length;

  const canSend =
    Boolean(selectedTagId) &&
    text.trim().length > 0 &&
    (mode === "Take" ? text.length <= TAKE_LIMIT : true) &&
    (mode === "Review" ? stars > 0 : true);

  const onSend = () => {
    if (!canSend) return;

    const payload = {
      type: mode.toLowerCase(),
      movieId: selectedTagId,
      text: text.trim(),
      stars: mode === "Review" ? stars : null,
      createdAt: new Date().toISOString(),
    };

    console.log("SEND TAKE/REVIEW:", payload);

    setText("");
    setStars(0);
    nav(-1);
  };

  useEffect(() => {
    const vv = window.visualViewport;
    if (!vv) return;

    const onResize = () => {
      const offset = Math.max(
        0,
        window.innerHeight - vv.height - (vv.offsetTop || 0)
      );
      setKbOffset(offset);
    };

    vv.addEventListener("resize", onResize);
    vv.addEventListener("scroll", onResize);
    onResize();

    return () => {
      vv.removeEventListener("resize", onResize);
      vv.removeEventListener("scroll", onResize);
    };
  }, []);

  const onChangeText = (v) => {
    if (mode === "Take") setText(v.slice(0, TAKE_LIMIT));
    else setText(v);
  };

  useEffect(() => {
    if (mode === "Take") {
      setStars(0);
      setText((t) => t.slice(0, TAKE_LIMIT));
    }
  }, [mode]);

  return (
    <main className="min-h-dvh bg-[linear-gradient(-25deg,#000000,#134e4a)] text-white">
      {/* content wrapper: give room for bottom toolbar */}
      <div className="mx-auto max-w-[520px] px-4 pb-[140px] pt-4 md:max-w-[760px] md:px-6">
        {/* header */}
        <div className="relative flex items-center justify-center pb-3 pt-1">
          <button
            type="button"
            onClick={() => nav(-1)}
            className="absolute left-0 grid h-10 w-10 place-items-center rounded-full bg-white/10 text-white/90 hover:bg-white/15 active:scale-[0.98]"
            aria-label="Back"
          >
            <Icon name="close" className="h-5 w-5" />
          </button>

          <div className="text-[13px] font-semibold text-white/70">Create</div>

          <button
            type="button"
            onClick={onSend}
            disabled={!canSend}
            className={[
              "absolute right-0 rounded-full px-4 py-2 text-xs font-bold shadow-sm transition",
              canSend
                ? "bg-cyan-200/95 text-slate-900 hover:bg-cyan-200 active:scale-[0.98]"
                : "bg-white/10 text-white/35 cursor-not-allowed",
            ].join(" ")}
          >
            Send
          </button>
        </div>

        {/* mode toggle */}
        <Segmented options={MODELS} value={mode} onChange={setMode} />

        {/* search tag */}
        <div className="mt-4">
          <div className="relative">
            <Icon
              name="search"
              className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/55"
            />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for a #Tag"
              className="h-11 w-full rounded-full border border-white/15 bg-white/10 pl-10 pr-4 text-sm text-white placeholder:text-white/55 outline-none transition focus:border-white/25 focus:bg-white/15"
            />
          </div>

          {selectedTag && (
            <div className="mt-3">
              <button
                type="button"
                onClick={() => setSelectedTagId(null)}
                className="inline-flex items-center gap-2 rounded-full border border-cyan-200/40 bg-cyan-200/10 px-4 py-2 text-[12px] text-white/90"
                title="Tap to unselect"
              >
                <span className="font-semibold">#{selectedTag.label}</span>
                <span className="text-white/60">✓ chosen</span>
              </button>
            </div>
          )}

          <div className="mt-3 flex gap-2 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {recommended.map((t) => {
              const active = t.id === selectedTagId;
              return (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setSelectedTagId(t.id)}
                  className={[
                    "shrink-0 rounded-full border px-4 py-2 text-[12px] transition active:scale-[0.99]",
                    active
                      ? "border-cyan-200/60 bg-cyan-200/15 text-white"
                      : "border-white/15 bg-white/5 text-white/70 hover:text-white hover:bg-white/10",
                  ].join(" ")}
                >
                  {t.label}
                  {active ? " ✓" : ""}
                </button>
              );
            })}
          </div>

          {query.trim().length > 0 && (
            <div className="mt-2 rounded-2xl border border-white/10 bg-black/30 p-2">
              <div className="max-h-[180px] overflow-y-auto">
                {filteredTags.slice(0, 8).map((t) => {
                  const active = t.id === selectedTagId;
                  return (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => setSelectedTagId(t.id)}
                      className={[
                        "w-full rounded-xl px-3 py-2 text-left text-sm transition",
                        active
                          ? "bg-cyan-200/15 text-white"
                          : "text-white/70 hover:bg-white/5 hover:text-white",
                      ].join(" ")}
                    >
                      #{t.label} {active ? "✓" : ""}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* input card */}
        <div className="mt-4 rounded-3xl border border-white/10 bg-black/30 p-4">
          <div className="flex items-start gap-3">
            <img
              src="https://i.pravatar.cc/64?img=3"
              alt="user"
              className="h-10 w-10 rounded-full border border-white/10 object-cover"
            />

            <div className="min-w-0 flex-1">
              <div className="mb-1 flex items-center justify-between">
                <div className="text-[12px] text-white/55">
                  {mode === "Take"
                    ? `${text.length}/${TAKE_LIMIT}`
                    : `${text.length}/2000`}
                </div>

                <div
                  className={[
                    "text-[12px] font-semibold",
                    remaining < 0
                      ? "text-red-300"
                      : remaining <= 20 && mode === "Take"
                      ? "text-amber-200"
                      : "text-white/55",
                  ].join(" ")}
                >
                  {mode === "Take" ? remaining : ""}
                </div>
              </div>

              <textarea
                value={text}
                onChange={(e) => onChangeText(e.target.value)}
                placeholder={
                  mode === "Take"
                    ? "Tell us about the movie!"
                    : "What does the movie mean to you?"
                }
                className="w-full resize-none bg-transparent text-[15px] leading-relaxed text-white placeholder:text-white/35 outline-none min-h-[120px]"
              />

              {mode === "Review" && (
                <div className="mt-4">
                  <Stars value={stars} onChange={setStars} />
                  <div className="mt-2 text-center text-[12px] text-white/55">
                    {stars > 0 ? `${stars}/5` : "Tap to rate"}
                  </div>
                </div>
              )}

              {!selectedTagId && (
                <div className="mt-3 text-[12px] text-white/45">
                  Choose a movie tag above to post.
                </div>
              )}

              {selectedTagId && (
                <div className="mt-3 text-[12px] text-cyan-200/90">
                  #{selectedTag?.label || selectedTagId}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* bottom toolbar (keyboard-aware) */}
      <div
        className="fixed left-0 right-0 z-50 bg-[#0E2A25] border-t border-white/10"
        style={{ bottom: `calc(env(safe-area-inset-bottom) + ${kbOffset}px)` }}
      >
        <div className="mx-auto max-w-[520px] px-4 py-4 md:max-w-[760px] md:px-6">
          <div className="rounded-[22px] border border-white/10 bg-black/30 px-5 py-4">
            <div className="flex items-center justify-between text-white/70">
              <button
                type="button"
                className="grid h-10 w-10 place-items-center rounded-2xl bg-white/5 hover:bg-white/10"
                aria-label="Add image"
                title="Add image"
              >
                <Icon name="img" className="h-6 w-6" />
              </button>

              <button
                type="button"
                className="grid h-10 w-10 place-items-center rounded-2xl bg-white/5 hover:bg-white/10"
                aria-label="Add"
                title="Add"
              >
                <Icon name="plus" className="h-6 w-6" />
              </button>

              <button
                type="button"
                className="grid h-10 w-10 place-items-center rounded-2xl bg-white/5 hover:bg-white/10"
                aria-label="GIF"
                title="GIF"
              >
                <Icon name="gif" className="text-[12px]" />
              </button>

              <button
                type="button"
                className="grid h-10 w-10 place-items-center rounded-2xl bg-white/5 hover:bg-white/10"
                aria-label="Location"
                title="Location"
              >
                <Icon name="pin" className="h-6 w-6" />
              </button>
            </div>
          </div>

          <div className="h-[env(safe-area-inset-bottom)]" />
        </div>
      </div>
    </main>
  );
}
