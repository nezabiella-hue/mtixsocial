import { getFeedPage } from "./selector-feed";

/**
 * Backward-compat helper:
 * Older code expects getMergedFeed() to return a flat list.
 * Our new system is paged, so we “merge” a few pages into one list.
 */
export function getMergedFeed({
  tab = "movies",
  cursor = 0,
  limit = 50, // big enough so getPostById works
} = {}) {
  const page = getFeedPage({ tab, cursor, limit });
  return page.items ?? [];
}

export function getPostById(id) {
  // search across the merged list
  return (
    getMergedFeed({ tab: "movies", limit: 200 }).find((x) => x.id === id) ??
    null
  );
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
