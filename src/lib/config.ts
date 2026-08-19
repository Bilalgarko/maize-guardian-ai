/**
 * Runtime configuration for the inference backend.
 *
 * VITE_API_URL   base URL of the FastAPI inference server exposing POST /predict
 * VITE_DEMO_MODE "true" to use the clearly-labelled demo simulator
 */
const rawApiUrl = (import.meta.env['VITE_API_URL'] as string | undefined)?.trim();
const rawDemo = (import.meta.env['VITE_DEMO_MODE'] as string | undefined)?.trim();

export const API_URL = rawApiUrl && rawApiUrl.length > 0 ? rawApiUrl.replace(/\/$/, "") : null;

/** Demo mode is on when explicitly requested, or when no model endpoint is configured. */
export const DEMO_MODE = rawDemo === "true" || API_URL === null;

export const PREDICT_ENDPOINT = API_URL ? `${API_URL}/predict` : null;

export const MAX_IMAGE_BYTES = 8 * 1024 * 1024; // 8 MB
export const ACCEPTED_MIME_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
export const ACCEPTED_EXTENSIONS = ".jpg,.jpeg,.png,.webp";