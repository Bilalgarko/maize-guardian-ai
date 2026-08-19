import type { PredictionRecord } from "./types";

/**
 * Persistence layer for saved predictions.
 *
 * Records are only written when the user explicitly saves a result, so
 * analysed images are never stored automatically. The repository interface is
 * deliberately narrow so it can be re-implemented against a hosted database
 * (e.g. a `predictions` table with row-level security) without touching UI code.
 */
export interface PredictionRepository {
  list(): Promise<PredictionRecord[]>;
  save(record: PredictionRecord): Promise<void>;
  remove(id: string): Promise<void>;
  get(id: string): Promise<PredictionRecord | null>;
}

const STORAGE_KEY = "maize-predictions";

function read(): PredictionRecord[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as PredictionRecord[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function write(records: PredictionRecord[]) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
  } catch {
    throw new Error("Could not save the prediction. Local storage may be full or unavailable.");
  }
}

export const localPredictionRepository: PredictionRepository = {
  async list() {
    return read().sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  },
  async save(record) {
    write([record, ...read()].slice(0, 200));
  },
  async remove(id) {
    write(read().filter((r) => r.id !== id));
  },
  async get(id) {
    return read().find((r) => r.id === id) ?? null;
  },
};

export const predictionRepository = localPredictionRepository;

export const HISTORY_QUERY_KEY = ["predictions"] as const;