import { Link, useParams } from "react-router-dom";
import { MOVIE_BY_ID } from "../Data/movies-source";
import { getPostById, getRepliesForTake } from "../Data/selector-post";
import { TAKE_LIMIT } from "../Data/takes-source";

export default function TakesPage() {
  const { id } = useParams();
  const post = getPostById(id);

  if (!post || post.kind !== "take") {
    return <div className="p-4 text-white/70">Take not found.</div>;
  }

  const movie = MOVIE_BY_ID[post.movieId];
  const replies = getRepliesForTake(post.id);
  const text = (post.text ?? "").slice(0, TAKE_LIMIT);

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
              #{movie?.id ?? post.movieId}
            </Link>
          </div>
        </div>

        <p className="mt-3 text-white/90 whitespace-pre-wrap">{text}</p>

        {post.images?.length > 0 && (
          <div className="mt-3 grid grid-cols-2 gap-2">
            {post.images.map((src) => (
              <img
                key={src}
                src={src}
                alt=""
                className="h-44 w-full rounded-xl object-cover"
              />
            ))}
          </div>
        )}
      </div>

      <div className="mt-4 text-white/70 text-sm font-semibold">Replies</div>
      <div className="mt-2 space-y-2">
        {replies.map((r) => (
          <div
            key={r.id}
            className="rounded-2xl border border-white/10 bg-black/15 p-3"
          >
            <div className="text-white/80 text-sm">
              <span className="font-semibold text-white">{r.authorName}</span>{" "}
              <span className="text-white/50">{r.authorHandle}</span>
            </div>
            <div className="mt-1 text-white/80 text-sm">{r.text}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
