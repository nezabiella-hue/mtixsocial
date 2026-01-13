import { getMergedFeed } from "./selector-feed";

export function getPostById(id) {
  return getMergedFeed().find((x) => x.id === id) ?? null;
}

export function getRepliesForTake(takeId) {
  return [
    {
      id: `rep_${takeId}_1`,
      authorName: "Anon",
      authorHandle: "@anon",
      text: "Agree banget.",
    },
    {
      id: `rep_${takeId}_2`,
      authorName: "MovieGuy",
      authorHandle: "@movieguy",
      text: "Ini masuk top 5 tahun ini sih.",
    },
  ];
}
