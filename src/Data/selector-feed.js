import { TAKES } from "./takes-source";
import { REVIEWS } from "./reviews-source";
import { loadUserTakes, loadUserReviews } from "./feed-store";

export function getMergedFeed() {
  const userT = loadUserTakes();
  const userR = loadUserReviews();

  const all = [...userT, ...userR, ...TAKES, ...REVIEWS];
  all.sort((a, b) => (b.createdAt ?? 0) - (a.createdAt ?? 0));
  return all;
}

export function getFeedPage({ tab = "movies", cursor = 0, limit = 10 } = {}) {
  const all = getMergedFeed().filter((x) => x.feedTag === tab);

  const items = all.slice(cursor, cursor + limit);
  const nextCursor = cursor + items.length;
  const hasMore = nextCursor < all.length;

  return { items, nextCursor, hasMore, total: all.length };
}
