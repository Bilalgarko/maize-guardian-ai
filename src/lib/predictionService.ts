import { DEMO_MODE } from "./config";
import { requestPrediction } from "./predictionApi";
import { DISEASE_CLASSES } from "./types";
import type { DiseaseClass, PredictionResult } from "./types";

/**
 * Single abstraction used by the UI. Swapping in the trained MobileNetV2
 * model only requires setting VITE_API_URL (and VITE_DEMO_MODE=false).
 */
export async function predictDisease(file: File, signal?: AbortSignal): Promise<PredictionResult> {
  if (DEMO_MODE) {
    return simulatePrediction(file);
  }
  const result = await requestPrediction(file, signal);
  return { ...result, isDemo: false, createdAt: new Date().toISOString() };
}

/**
 * DEMO MODE ONLY — deterministic, clearly-labelled placeholder output used to
 * exercise the interface before the trained model is connected. These values
 * are NOT model predictions and must always be displayed as demo output.
 */
async function simulatePrediction(file: File): Promise<PredictionResult> {
  await new Promise((resolve) => setTimeout(resolve, 1400));

  let hash = 0;
  const seed = `${file.name}${file.size}`;
  for (let i = 0; i < seed.length; i += 1) {
    hash = (hash * 31 + seed.charCodeAt(i)) % 100000;
  }

  const predicted = DISEASE_CLASSES[hash % DISEASE_CLASSES.length] as DiseaseClass;
  const confidence = 0.82 + ((hash % 150) / 1000);
  const remainder = 1 - confidence;

  const probabilities = {} as Record<DiseaseClass, number>;
  DISEASE_CLASSES.forEach((cls, index) => {
    probabilities[cls] =
      cls === predicted ? Number(confidence.toFixed(4)) : Number(((remainder / 3) * (0.7 + (index % 3) * 0.2)).toFixed(4));
  });

  return {
    prediction: predicted,
    confidence: Number(confidence.toFixed(4)),
    probabilities,
    isDemo: true,
    createdAt: new Date().toISOString(),
  };
}