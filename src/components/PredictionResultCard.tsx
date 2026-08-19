import { AlertTriangle, CheckCircle2, FlaskConical, RotateCcw, Save } from "lucide-react";
import { Link } from "@tanstack/react-router";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { DISEASE_INFO } from "@/lib/diseases";
import { DISEASE_CLASSES } from "@/lib/types";
import type { PredictionResult } from "@/lib/types";

interface Props {
  result: PredictionResult;
  onAnalyzeAnother?: () => void;
  onSave?: () => void;
  saving?: boolean;
  saved?: boolean;
  showActions?: boolean;
}

export function PredictionResultCard({
  result,
  onAnalyzeAnother,
  onSave,
  saving,
  saved,
  showActions = true,
}: Props) {
  const info = DISEASE_INFO[result.prediction];
  const healthy = info.healthy;

  return (
    <Card>
      <CardHeader className="gap-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <CardTitle className="text-lg">Prediction Result</CardTitle>
          {result.isDemo ? (
            <Badge variant="outline" className="border-warning/50 bg-warning/10 text-warning-foreground">
              <FlaskConical className="mr-1 size-3" /> Demo Prediction — AI model not connected
            </Badge>
          ) : (
            <Badge variant="secondary">Model prediction</Badge>
          )}
        </div>
        <p className="text-xs text-muted-foreground">
          Generated {new Date(result.createdAt).toLocaleString()}
        </p>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-lg border border-border p-4">
            <p className="text-xs uppercase tracking-wide text-muted-foreground">Disease</p>
            <p className="mt-1 font-display text-lg font-semibold">{result.prediction}</p>
            <p className="text-xs italic text-muted-foreground">{info.scientificName}</p>
          </div>
          <div className="rounded-lg border border-border p-4">
            <p className="text-xs uppercase tracking-wide text-muted-foreground">Confidence</p>
            <p className="mt-1 font-display text-lg font-semibold">
              {(result.confidence * 100).toFixed(1)}%
            </p>
            <Progress value={result.confidence * 100} className="mt-2 h-2" />
          </div>
          <div className="rounded-lg border border-border p-4">
            <p className="text-xs uppercase tracking-wide text-muted-foreground">Status</p>
            <p
              className={`mt-1 flex items-center gap-2 font-display text-lg font-semibold ${
                healthy ? "text-success" : "text-destructive"
              }`}
            >
              {healthy ? <CheckCircle2 className="size-5" /> : <AlertTriangle className="size-5" />}
              {healthy ? "Healthy Leaf" : "Disease Detected"}
            </p>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold">Description</h3>
          <p className="mt-1 text-sm text-muted-foreground">{info.description}</p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <h3 className="text-sm font-semibold">Common Symptoms</h3>
            <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
              {info.symptoms.map((s) => (
                <li key={s} className="flex gap-2">
                  <span aria-hidden="true">•</span>
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold">Recommended Management</h3>
            <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
              {info.management.map((s) => (
                <li key={s} className="flex gap-2">
                  <span aria-hidden="true">•</span>
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Separator />

        <div>
          <h3 className="text-sm font-semibold">Class probabilities</h3>
          <div className="mt-3 space-y-3">
            {DISEASE_CLASSES.map((cls) => (
              <div key={cls}>
                <div className="flex items-center justify-between text-xs">
                  <span className={cls === result.prediction ? "font-semibold" : "text-muted-foreground"}>
                    {cls}
                  </span>
                  <span className="text-muted-foreground">
                    {((result.probabilities[cls] ?? 0) * 100).toFixed(1)}%
                  </span>
                </div>
                <Progress value={(result.probabilities[cls] ?? 0) * 100} className="mt-1 h-1.5" />
              </div>
            ))}
          </div>
        </div>

        {showActions ? (
          <div className="flex flex-wrap gap-2">
            {onAnalyzeAnother ? (
              <Button variant="outline" onClick={onAnalyzeAnother}>
                <RotateCcw className="mr-2 size-4" /> Analyze Another Image
              </Button>
            ) : null}
            <Button asChild variant="outline">
              <Link to="/diseases" hash={info.name.toLowerCase().replace(/\s+/g, "-")}>
                View Details
              </Link>
            </Button>
            {onSave ? (
              <Button onClick={onSave} disabled={saving || saved}>
                <Save className="mr-2 size-4" />
                {saved ? "Saved to History" : saving ? "Saving…" : "Save Result"}
              </Button>
            ) : null}
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
}