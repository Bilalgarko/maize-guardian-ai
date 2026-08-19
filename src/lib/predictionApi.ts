import { PREDICT_ENDPOINT } from "./config";
import { DISEASE_CLASSES, PredictionError } from "./types";
import type { DiseaseClass, PredictApiResponse } from "./types";

function isDiseaseClass(value: string): value is DiseaseClass {
  return (DISEASE_CLASSES as readonly string[]).includes(value);
}

function normaliseProbabilities(raw: Record<string, unknown>): Record<DiseaseClass, number> {
  const out = {} as Record<DiseaseClass, number>;
  for (const cls of DISEASE_CLASSES) {
    const value = raw[cls];
    out[cls] = typeof value === "number" && Number.isFinite(value) ? value : 0;
  }
  return out;
}

/**
 * Calls the trained model inference server.
 *   POST {VITE_API_URL}/predict   multipart/form-data  field: image
 */
export async function requestPrediction(
  file: File,
  signal?: AbortSignal,
): Promise<{ prediction: DiseaseClass; confidence: number; probabilities: Record<DiseaseClass, number> }> {
  if (!PREDICT_ENDPOINT) {
    throw new PredictionError(
      "The AI model endpoint is not configured. Set VITE_API_URL to your inference server.",
      "model_unavailable",
    );
  }

  const body = new FormData();
  body.append("image", file);

  let response: Response;
  try {
    response = await fetch(PREDICT_ENDPOINT, { method: "POST", body, signal });
  } catch {
    throw new PredictionError(
      "Could not reach the AI model server. Please check your connection and try again.",
      "network",
    );
  }

  if (!response.ok) {
    throw new PredictionError(
      response.status >= 500
        ? "The AI model server is currently unavailable. Please try again shortly."
        : "The model could not process this image. Please try a different maize leaf photo.",
      response.status >= 500 ? "model_unavailable" : "prediction_failed",
    );
  }

  let payload: PredictApiResponse;
  try {
    payload = (await response.json()) as PredictApiResponse;
  } catch {
    throw new PredictionError("The model returned an unreadable response.", "invalid_response");
  }

  if (!payload || typeof payload.prediction !== "string" || !isDiseaseClass(payload.prediction)) {
    throw new PredictionError(
      "The model returned a class that this application does not recognise.",
      "invalid_response",
    );
  }

  return {
    prediction: payload.prediction,
    confidence: typeof payload.confidence === "number" ? payload.confidence : 0,
    probabilities: normaliseProbabilities(payload.probabilities ?? {}),
  };
}