import { MOVIES } from "./movies-source";

export const TAKE_LIMIT = 240;

const AVA = (n) => `https://i.pravatar.cc/80?img=${n}`;
const NOW = Date.now();
const hours = (h) => NOW - h * 60 * 60 * 1000;

const AUTHORS = [
  { name: "Samantha Wong", handle: "@samanthaw", avatar: AVA(32) },
  { name: "Ryan Zhao", handle: "@ryaaaaannnn", avatar: AVA(13) },
  { name: "Wibu Lokal", handle: "@LuffyUzumaki", avatar: AVA(59) },
  { name: "Nadia Putri", handle: "@nadia_putri", avatar: AVA(21) },
  { name: "Kevin Tan", handle: "@kevintan", avatar: AVA(12) },
  { name: "Rizky A", handle: "@rizkyap", avatar: AVA(6) },
];

const PICK = (arr, i) => arr[i % arr.length];

const IMG = {
  couple: "https://picsum.photos/seed/couple/900/600",
  dune: "https://picsum.photos/seed/dune/900/600",
  space: "https://picsum.photos/seed/space/900/600",
  train: "https://picsum.photos/seed/train/900/600",
};

function makeTake({
  id,
  movieId,
  authorIndex,
  text,
  images = [],
  createdAt,
  feedTag,
  stats,
}) {
  const a = PICK(AUTHORS, authorIndex);
  return {
    id,
    kind: "take",
    movieId,
    authorName: a.name,
    authorHandle: a.handle,
    authorAvatar: a.avatar,
    text: (text ?? "").slice(0, TAKE_LIMIT),
    images: images.slice(0, 5),
    createdAt,
    feedTag, // "following" | "movies" | "group"
    stats: stats ?? { likes: 23, reposts: 12, comments: 12, views: 1200 },
  };
}

export const TAKES = (() => {
  const out = [];

  MOVIES.forEach((m, idx) => {
    out.push(
      makeTake({
        id: `t_${m.id}_1`,
        movieId: m.id,
        authorIndex: idx,
        createdAt: hours(2 + idx),
        feedTag: "movies",
        text: `Just watched #${m.id}. ${m.tagline} I’m not okay 😭`,
        images: idx % 3 === 0 ? [IMG.space] : [],
      }),
      makeTake({
        id: `t_${m.id}_2`,
        movieId: m.id,
        authorIndex: idx + 1,
        createdAt: hours(6 + idx),
        feedTag: "following",
        text:
          m.id === "eeaao"
            ? "The plot twists kept me on the edge of my seat. Definitely recommend! #eeaao"
            : `This movie made me stare at the credits in silence. #${m.id}`,
        images: idx % 4 === 0 ? [IMG.couple, IMG.space] : [],
      }),
      makeTake({
        id: `t_${m.id}_3`,
        movieId: m.id,
        authorIndex: idx + 2,
        createdAt: hours(10 + idx),
        feedTag: "group",
        text:
          m.id === "demon-slayer-mugen-train"
            ? "BAGUS BANGET WOII! NONTON! 🔥 #demon-slayer-mugen-train"
            : `Group watch idea: ${m.title} weekend ini? siapa ikut 👀 #${m.id}`,
        images: idx % 5 === 0 ? [IMG.train] : [],
      })
    );
  });

  // extra spice
  out.push(
    makeTake({
      id: "t_mix_1",
      movieId: "your-name",
      authorIndex: 2,
      createdAt: hours(1.2),
      feedTag: "following",
      text: "Nonton #your-name tadi… ada satu scene yg pas lagu keluar, langsung berasa sesak. YTTA 😭",
      images: [IMG.couple],
    }),
    makeTake({
      id: "t_mix_2",
      movieId: "dune-part-two",
      authorIndex: 4,
      createdAt: hours(3.5),
      feedTag: "movies",
      text: "#dune-part-two in IMAX itu kayak ibadah. Sound design-nya gila.",
      images: [IMG.dune],
    })
  );

  out.sort((a, b) => b.createdAt - a.createdAt);
  return out;
})();
