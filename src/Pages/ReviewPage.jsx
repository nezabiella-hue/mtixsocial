import { Link, useParams } from "react-router-dom";
import { MOVIE_BY_ID } from "../Data/movies-source";
import { getPostById } from "../Data/selector-post";

function StarsRow({ value = 4 }) {
  const full = Math.max(0, Math.min(5, value));
  return (
    <div className="flex gap-1 text-white/70">
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i}>{i < full ? "★" : "☆"}</span>
      ))}
    </div>
  );
}

export default function ReviewPage() {
  const { id } = useParams();
  const post = getPostById(id);

  if (!post || post.kind !== "review") {
    return <div className="p-4 text-white/70">Review not found.</div>;
  }

  const movie = MOVIE_BY_ID[post.movieId];

  return (
    <div className="p-4">
      <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
        <div className="flex items-center gap-3">
          <img
            src={post.authorAvatar}
            alt=""
            className="h-10 w-10 rounded-full"
          />
          <div>
            <div className="text-white font-semibold">{post.authorName}</div>
            <div className="text-white/60 text-sm">{post.authorHandle}</div>
          </div>

          <div className="ml-auto">
            <Link
              to={`/movie/${post.movieId}`}
              className="rounded-full bg-white/10 px-3 py-1 text-xs text-white/80 hover:bg-white/15"
            >
              {movie?.title ?? "Movie"}
            </Link>
          </div>
        </div>

        <div className="mt-3">
          <StarsRow value={post.stars} />
        </div>

        <div className="mt-2 text-white text-lg font-semibold">
          {post.title}
        </div>

        {post.coverImg && (
          <img
            src={post.coverImg}
            alt=""
            className="mt-3 h-56 w-full rounded-xl object-cover"
          />
        )}

        <div className="mt-4 whitespace-pre-wrap text-white/85 leading-relaxed">
          {post.body}
        </div>
      </div>
    </div>
  );
}
