import { createFileRoute } from "@tanstack/react-router";
import { AlertCircle, Loader2, Sparkles } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { ImageUploader } from "@/components/ImageUploader";
import { ModelStatusBanner } from "@/components/ModelStatusBanner";
import { PredictionResultCard } from "@/components/PredictionResultCard";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ACADEMIC_DISCLAIMER } from "@/lib/diseases";
import { predictionRepository } from "@/lib/historyStore";
import { fileToDataUrl, validateImageFile } from "@/lib/imageValidation";
import { predictDisease } from "@/lib/predictionService";
import { PredictionError } from "@/lib/types";
import type { PredictionResult } from "@/lib/types";

export const Route = createFileRoute("/detect")({
  head: () => ({
    meta: [
      { title: "Detect Maize Leaf Disease | MaizeScan AI" },
      {
        name: "description",
        content:
          "Upload or capture a maize leaf image and run deep learning classification for rust, gray leaf spot and northern corn leaf blight.",
      },
      { property: "og:title", content: "Detect Maize Leaf Disease | MaizeScan AI" },
      {
        property: "og:description",
        content: "Run a maize leaf image through the deep learning classifier and get a confidence-scored result.",
      },
    ],
  }),
  component: DetectPage,
});

const PIPELINE = [
  "Image input",
  "Preprocessing (resize · normalise)",
  "CNN feature extraction",
  "Classification",
  "Confidence score",
];

function DetectPage() {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<PredictionResult | null>(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const reset = () => {
    setFile(null);
    setPreviewUrl(null);
    setResult(null);
    setError(null);
    setSaved(false);
  };

  const handleSelect = async (selected: File) => {
    const validationError = validateImageFile(selected);
    if (validationError) {
      setError(validationError);
      return;
    }
    try {
      const dataUrl = await fileToDataUrl(selected);
      setFile(selected);
      setPreviewUrl(dataUrl);
      setResult(null);
      setSaved(false);
      setError(null);
    } catch {
      setError("Could not read the selected image. Please try another file.");
    }
  };

  const handleAnalyze = async () => {
    if (!file) {
      setError("Please select a maize leaf image before running the analysis.");
      return;
    }
    setLoading(true);
    setError(null);
    setResult(null);
    setSaved(false);
    try {
      const prediction = await predictDisease(file);
      setResult(prediction);
    } catch (err) {
      setError(
        err instanceof PredictionError
          ? err.message
          : "The analysis could not be completed. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!result || !file) return;
    setSaving(true);
    try {
      await predictionRepository.save({
        id: crypto.randomUUID(),
        imageUrl: previewUrl,
        imageName: file.name,
        predictedClass: result.prediction,
        confidence: result.confidence,
        probabilities: result.probabilities,
        isDemo: result.isDemo,
        createdAt: result.createdAt,
      });
      setSaved(true);
      toast.success("Prediction saved to history.");
    } catch {
      toast.error("The prediction could not be saved. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6">
      <header className="max-w-2xl">
        <h1 className="font-display text-3xl font-semibold sm:text-4xl">Maize Leaf Disease Detection</h1>
        <p className="mt-3 text-muted-foreground">
          Upload or capture a maize leaf image. The image is preprocessed and passed through the deep
          learning classifier, which returns a predicted class with a confidence score.
        </p>
      </header>

      <div className="mt-6">
        <ModelStatusBanner />
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Leaf image</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <ImageUploader
              previewUrl={previewUrl}
              fileName={file?.name}
              disabled={loading}
              onSelect={handleSelect}
              onClear={reset}
            />

            {error ? (
              <Alert variant="destructive">
                <AlertCircle className="size-4" />
                <AlertTitle>We couldn't complete that</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            ) : null}

            <Button className="w-full" size="lg" onClick={handleAnalyze} disabled={!file || loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 size-4 animate-spin" /> Analyzing maize leaf…
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 size-4" /> Analyze Leaf
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Classification pipeline</CardTitle>
          </CardHeader>
          <CardContent>
            <ol className="space-y-3">
              {PIPELINE.map((step, index) => (
                <li key={step} className="flex items-start gap-3">
                  <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                    {index + 1}
                  </span>
                  <span className="text-sm text-muted-foreground">{step}</span>
                </li>
              ))}
            </ol>
            <p className="mt-6 text-xs text-muted-foreground">{ACADEMIC_DISCLAIMER}</p>
          </CardContent>
        </Card>
      </div>

      {loading ? (
        <Card className="mt-6">
          <CardContent className="flex items-center gap-3 py-8">
            <Loader2 className="size-5 animate-spin text-primary" />
            <p className="text-sm text-muted-foreground">
              Analyzing maize leaf… preprocessing the image and running classification.
            </p>
          </CardContent>
        </Card>
      ) : null}

      {result ? (
        <div className="mt-6">
          <PredictionResultCard
            result={result}
            onAnalyzeAnother={reset}
            onSave={handleSave}
            saving={saving}
            saved={saved}
          />
        </div>
      ) : null}
    </div>
  );
}