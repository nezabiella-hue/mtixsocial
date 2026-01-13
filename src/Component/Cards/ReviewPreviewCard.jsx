import { Link } from "react-router-dom";
import { MOVIE_BY_ID } from "../../Data/movies-source";

function StarsRow({ value = 4 }) {
  const full = Math.max(0, Math.min(5, value));
  return (
    <div className="flex gap-1 text-white/60">
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i}>{i < full ? "★" : "☆"}</span>
      ))}
    </div>
  );
}

export default function ReviewPreviewCard({ item }) {
  const movie = MOVIE_BY_ID[item.movieId];

  return (
    <Link
      to={`/review/${item.id}`}
      className="block rounded-2xl border border-white/10 bg-black/20 p-4 hover:bg-black/25 transition"
    >
      <div className="flex items-center gap-3">
        <img
          src={item.authorAvatar}
          alt=""
          className="h-10 w-10 rounded-full object-cover"
        />
        <div className="min-w-0">
          <div className="font-semibold text-white">{item.authorName}</div>
          <div className="text-white/60 text-sm">{item.authorHandle}</div>
        </div>
      </div>

      <div className="mt-3 grid grid-cols-[1fr_auto] gap-3 items-center">
        <div>
          <div className="text-white font-semibold">
            {movie?.title ?? "Review"}
          </div>
          <div className="text-white/70 text-sm line-clamp-2">{item.title}</div>
          <div className="mt-2">
            <StarsRow value={item.stars} />
          </div>
        </div>

        <div className="h-20 w-20 overflow-hidden rounded-xl bg-white/5">
          {item.coverImg ? (
            <img
              src={item.coverImg}
              alt=""
              className="h-full w-full object-cover"
            />
          ) : null}
        </div>
      </div>

      <div className="mt-3 flex items-center gap-3 text-xs text-white/60">
        <span>👏 {item.stats?.likes ?? 0}</span>
        <span>💬 {item.stats?.comments ?? 0}</span>
        <span className="ml-auto">Read</span>
      </div>
    </Link>
  );
}
