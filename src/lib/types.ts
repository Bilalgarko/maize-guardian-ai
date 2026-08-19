export const DISEASE_CLASSES = [
  "Healthy",
  "Common Rust",
  "Gray Leaf Spot",
  "Northern Corn Leaf Blight",
] as const;

export type DiseaseClass = (typeof DISEASE_CLASSES)[number];

/** Raw response contract of the inference server: POST /predict */
export interface PredictApiResponse {
  prediction: string;
  confidence: number;
  probabilities: Record<string, number>;
}

export interface PredictionResult {
  prediction: DiseaseClass;
  confidence: number;
  probabilities: Record<DiseaseClass, number>;
  /** true when produced by the local demo simulator, not the trained model */
  isDemo: boolean;
  createdAt: string;
}

export interface PredictionRecord {
  id: string;
  imageUrl: string | null;
  imageName: string;
  predictedClass: DiseaseClass;
  confidence: number;
  probabilities: Record<DiseaseClass, number>;
  isDemo: boolean;
  createdAt: string;
}

export interface DiseaseInfo {
  name: DiseaseClass;
  scientificName: string;
  healthy: boolean;
  description: string;
  symptoms: string[];
  visualCharacteristics: string[];
  management: string[];
  prevention: string[];
}

export class PredictionError extends Error {
  constructor(
    message: string,
    public readonly kind:
      | "network"
      | "model_unavailable"
      | "invalid_response"
      | "prediction_failed",
  ) {
    super(message);
    this.name = "PredictionError";
  }
}