import ViewDetailsButton from "../Buttons/ViewDetailsButton";

export default function BannerCard({ item, backgroundLocation }) {
  return (
    <div
      className={[
        "relative h-60 w-full overflow-hidden rounded-3xl border border-white/10",
        "bg-[linear-gradient(-25deg,#000000,#134e4a)]",
        "shadow-[0_20px_60px_rgba(0,0,0,0.35)]",
      ].join(" ")}
    >
      {/* fancy overlay */}
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

      {/* top-right CTA */}
      <ViewDetailsButton
        to={`/movie/${item.id}`}
        backgroundLocation={backgroundLocation}
        className="absolute right-5 top-5"
      />

      <div className="absolute bottom-4 left-4 rounded-full bg-black/35 px-3 py-2 text-xs font-semibold text-white/80 backdrop-blur">
        Featured • Poster {item.id}
      </div>
    </div>
  );
}
