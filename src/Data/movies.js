import { MOVIES } from "./movies-source";

/**
 * Movie tags used by:
 * - MakeATake.jsx
 * - Feed filtering
 * - Take / Review → Movie linking
 *
 * IMPORTANT RULE:
 * - id MUST match MOVIES.id exactly
 * - label can be shortened / pretty
 */

export const MOVIE_TAGS = MOVIES.map((m) => {
  // optional: shorten long titles nicely
  let label = m.title;

  if (label.length > 22) {
    label = label.slice(0, 22).trim() + "…";
  }

  return {
    id: m.id,
    label,
  };
});

/**
 * Optional helper
 */
export const MOVIE_TAG_BY_ID = Object.fromEntries(
  MOVIE_TAGS.map((t) => [t.id, t])
);
