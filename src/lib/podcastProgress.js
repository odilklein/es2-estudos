const KEY = "es2-podcast-progress";
const LAST_KEY = "es2-podcast-last";

function readAll() {
  try {
    return JSON.parse(localStorage.getItem(KEY) || "{}") || {};
  } catch {
    return {};
  }
}

export function loadProgress(id) {
  const all = readAll();
  return all[id] || null;
}

export function saveProgress(id, data) {
  try {
    const all = readAll();
    all[id] = { ...data, updatedAt: Date.now() };
    localStorage.setItem(KEY, JSON.stringify(all));
  } catch {
    /* localStorage indisponível */
  }
}

export function clearProgress(id) {
  try {
    const all = readAll();
    delete all[id];
    localStorage.setItem(KEY, JSON.stringify(all));
  } catch {
    /* localStorage indisponível */
  }
}

export function loadLastTrackId() {
  try {
    return localStorage.getItem(LAST_KEY) || null;
  } catch {
    return null;
  }
}

export function saveLastTrackId(id) {
  try {
    localStorage.setItem(LAST_KEY, id);
  } catch {
    /* localStorage indisponível */
  }
}

export function formatTime(seconds) {
  let s = Number(seconds);
  if (!Number.isFinite(s) || s < 0) s = 0;
  s = Math.floor(s);
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = s % 60;
  const mm = h > 0 ? String(m).padStart(2, "0") : String(m);
  return `${h > 0 ? `${h}:` : ""}${mm}:${String(sec).padStart(2, "0")}`;
}
