import { MOVIE_BY_ID } from "./movies-source";

export function getMovieById(id) {
  if (!id) return null;
  return MOVIE_BY_ID[id] ?? null;
}

export function getMoviePreviewData(id) {
  const m = getMovieById(id);
  if (!m) return null;

  return {
    id: m.id,
    title: m.title,
    genres: m.genres ?? [],
    duration: m.duration ?? "",
    ageRating: m.ageRating ?? "",
    reviews: Number(m.reviews ?? 0),
    watched: Number(m.watched ?? 0),
    watchedLabel: formatWatched(m.watched),
    trailerUrl: m.trailerUrl ?? "",
    synopsis: m.synopsis ?? "",
    theaters: Array.isArray(m.theaters) ? m.theaters : [],
    cast: Array.isArray(m.cast) ? m.cast : [],
    ratingStars: Number(m.ratingStars ?? 4),

    // keep for later (carousel/list)
    poster: m.poster ?? null,
    backdrop: m.backdrop ?? null,
    tagline: m.tagline ?? "",
  };
}

function formatWatched(n) {
  const num = Number(n);
  if (!Number.isFinite(num)) return "0";
  return num.toLocaleString("id-ID");
}
