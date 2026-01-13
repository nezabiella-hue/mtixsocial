import { MOVIES } from "./movies-source";

const AVA = (n) => `https://i.pravatar.cc/80?img=${n}`;
const NOW = Date.now();
const hours = (h) => NOW - h * 60 * 60 * 1000;

function makeReview({
  id,
  movieId,
  authorName,
  authorHandle,
  authorAvatar,
  title,
  body,
  stars = 4,
  createdAt,
  feedTag,
  coverImg,
  stats,
}) {
  return {
    id,
    kind: "review",
    movieId,
    authorName,
    authorHandle,
    authorAvatar,
    title,
    body,
    stars: Math.max(1, Math.min(5, stars)),
    coverImg: coverImg ?? null,
    createdAt,
    feedTag,
    stats: stats ?? { likes: 12, comments: 7, views: 800 },
  };
}

export const REVIEWS = (() => {
  const out = [];

  MOVIES.forEach((m, idx) => {
    out.push(
      makeReview({
        id: `r_${m.id}_1`,
        movieId: m.id,
        authorName: idx % 2 === 0 ? "Roger Ebert" : "Film Notes",
        authorHandle: idx % 2 === 0 ? "@therealrogerebert" : "@filmnotes",
        authorAvatar: AVA(60 - idx),
        createdAt: hours(18 + idx),
        feedTag:
          idx % 3 === 0 ? "movies" : idx % 3 === 1 ? "following" : "group",
        stars: m.ratingStars ?? 4,
        title: m.id === "eeaao" ? "EEAAO: GOAT?" : `${m.title}: why it works`,
        body:
          m.id === "eeaao"
            ? `Surrealism meets heartfelt realism at its best.\n\nThe multiverse is loud, but the heart is quiet: being understood, being forgiven, being loved. Absurdity becomes a delivery system for sincerity.\n\nCame for action, stayed for feelings.`
            : `Dummy long-form review.\n\nTalk about pacing, themes, and standout moments.\n\n(Replace later.)`,
        coverImg: "https://picsum.photos/seed/reviewcover/700/700",
      })
    );
  });

  out.sort((a, b) => b.createdAt - a.createdAt);
  return out;
})();
