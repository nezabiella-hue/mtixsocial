import { Link } from "react-router-dom";
import { TAKE_LIMIT } from "../../Data/takes-source";

export default function TakePreviewCard({ item }) {
  const text = (item.text ?? "").slice(0, TAKE_LIMIT);

  return (
    <Link
      to={`/take/${item.id}`}
      className="block rounded-2xl border border-white/10 bg-black/20 p-4 hover:bg-black/25 transition"
    >
      <div className="flex gap-3">
        <img
          src={item.authorAvatar}
          alt=""
          className="h-10 w-10 rounded-full object-cover"
        />

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <div className="font-semibold text-white">{item.authorName}</div>
            <div className="text-white/60 text-sm">{item.authorHandle}</div>
            <div className="ml-auto text-white/40 text-xs">just now</div>
          </div>

          <p className="mt-2 whitespace-pre-wrap text-white/90 text-sm">
            {text}
          </p>

          {item.images?.length > 0 && (
            <div className="mt-3 grid grid-cols-3 gap-2">
              {item.images.slice(0, 3).map((src, i) => (
                <div key={src} className="relative overflow-hidden rounded-xl">
                  <img src={src} alt="" className="h-24 w-full object-cover" />
                  {i === 2 && item.images.length > 3 && (
                    <div className="absolute inset-0 grid place-items-center bg-black/60 text-white font-semibold">
                      +{item.images.length - 2}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          <div className="mt-3 flex items-center gap-3 text-xs text-white/60">
            <span>👏 {item.stats?.likes ?? 0}</span>
            <span>↩ {item.stats?.reposts ?? 0}</span>
            <span>💬 {item.stats?.comments ?? 0}</span>
            <span className="ml-auto text-white/50">#{item.movieId}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
