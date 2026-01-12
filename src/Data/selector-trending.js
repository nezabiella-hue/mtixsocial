import { MOVIE_BY_ID } from "./movies-source";
import {
  TRENDING_MOVIES,
  TRENDING_TAKES,
  TRENDING_REVIEWS,
} from "./trending-source";

export function getTrendingList({
  period = "today",
  mode = "movies",
  limit = 7,
}) {
  if (mode === "reviews") {
    const rows = TRENDING_REVIEWS[period] ?? [];
    return rows.slice(0, limit).map((r) => {
      const m = MOVIE_BY_ID[r.movieId] ?? null;
      return {
        type: "review",
        id: r.id,
        title: r.title,
        movieId: r.movieId,
        movieTitle: m?.title ?? "",
        metrics: {
          likes: Number(r.likes ?? 0),
          comments: Number(r.comments ?? 0),
        },
      };
    });
  }

  if (mode === "takes") {
    const rows = TRENDING_TAKES[period] ?? [];
    return rows.slice(0, limit).map((r) => {
      const m = MOVIE_BY_ID[r.movieId] ?? null;
      return {
        type: "movie",
        id: r.movieId,
        title: m?.title ?? "",
        metricKey: "takes",
        metricValue: Number(r.takes ?? 0),
      };
    });
  }

  // default: movies by watched
  const rows = TRENDING_MOVIES[period] ?? [];
  return rows.slice(0, limit).map((r) => {
    const m = MOVIE_BY_ID[r.movieId] ?? null;
    return {
      type: "movie",
      id: r.movieId,
      title: m?.title ?? "",
      metricKey: "watched",
      metricValue: Number(r.watched ?? 0),
    };
  });
}

export function formatCount(n) {
  const num = Number(n);
  if (!Number.isFinite(num)) return "0";
  // 125500 -> 125.5k (optional; if you want)
  if (num >= 1000) return `${(num / 1000).toFixed(1)}k`;
  return String(num);
}

export function periodLabel(period) {
  if (period === "today") return "Today";
  if (period === "week") return "This Week";
  if (period === "month") return "This Month";
  return period;
}
