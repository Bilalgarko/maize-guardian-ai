import { FlaskConical, ServerCog } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { API_URL, DEMO_MODE } from "@/lib/config";

export function ModelStatusBanner() {
  if (!DEMO_MODE) {
    return (
      <Alert>
        <ServerCog className="size-4" />
        <AlertTitle>Model connected</AlertTitle>
        <AlertDescription>
          Predictions are served by the inference endpoint at {API_URL}/predict.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <Alert className="border-warning/40 bg-warning/10">
      <FlaskConical className="size-4" />
      <AlertTitle>Demo Prediction — AI model not connected</AlertTitle>
      <AlertDescription>
        The trained MobileNetV2 model is not connected yet, so results shown are controlled demo
        output for interface testing only. They do not reflect model performance. Set{" "}
        <code className="rounded bg-muted px-1 py-0.5 text-xs">VITE_API_URL</code> and{" "}
        <code className="rounded bg-muted px-1 py-0.5 text-xs">VITE_DEMO_MODE=false</code> to use the
        real model.
      </AlertDescription>
    </Alert>
  );
}