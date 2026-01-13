const K_TAKES = "mtix_user_takes";
const K_REVIEWS = "mtix_user_reviews";

function safeParse(json, fallback) {
  try {
    const v = JSON.parse(json);
    return Array.isArray(v) ? v : fallback;
  } catch {
    return fallback;
  }
}

export function loadUserTakes() {
  return safeParse(localStorage.getItem(K_TAKES) ?? "[]", []);
}
export function loadUserReviews() {
  return safeParse(localStorage.getItem(K_REVIEWS) ?? "[]", []);
}

function save(key, arr) {
  localStorage.setItem(key, JSON.stringify(arr));
}

export function addUserTake(take) {
  const prev = loadUserTakes();
  const next = [take, ...prev];
  save(K_TAKES, next);
  return next;
}

export function addUserReview(review) {
  const prev = loadUserReviews();
  const next = [review, ...prev];
  save(K_REVIEWS, next);
  return next;
}
