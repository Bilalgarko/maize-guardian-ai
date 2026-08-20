import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { AlertCircle, FlaskConical, ImageOff, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { PredictionResultCard } from "@/components/PredictionResultCard";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { HISTORY_QUERY_KEY, predictionRepository } from "@/lib/historyStore";
import type { PredictionRecord } from "@/lib/types";

export const Route = createFileRoute("/history")({
  head: () => ({
    meta: [
      { title: "Prediction History | MaizeScan AI" },
      {
        name: "description",
        content: "Review, inspect and delete previously saved maize leaf disease predictions with confidence scores and timestamps.",
      },
      { property: "og:title", content: "Prediction History | MaizeScan AI" },
      { property: "og:description", content: "Saved maize leaf predictions with class, confidence and timestamp." },
    ],
  }),
  component: HistoryPage,
});

function HistoryPage() {
  const queryClient = useQueryClient();
  const [active, setActive] = useState<PredictionRecord | null>(null);

  const { data, isPending, isError } = useQuery({
    queryKey: HISTORY_QUERY_KEY,
    queryFn: () => predictionRepository.list(),
  });

  const handleDelete = async (id: string) => {
    try {
      await predictionRepository.remove(id);
      await queryClient.invalidateQueries({ queryKey: HISTORY_QUERY_KEY });
      toast.success("Prediction deleted.");
    } catch {
      toast.error("The prediction could not be deleted. Please try again.");
    }
  };

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6">
      <header className="max-w-2xl">
        <h1 className="font-display text-3xl font-semibold sm:text-4xl">Prediction History</h1>
        <p className="mt-3 text-muted-foreground">
          Only predictions you explicitly saved are stored. Each record keeps the image reference,
          predicted class, confidence and timestamp.
        </p>
      </header>

      <div className="mt-8">
        {isPending ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[0, 1, 2].map((i) => (
              <Skeleton key={i} className="h-64 w-full rounded-xl" />
            ))}
          </div>
        ) : isError ? (
          <Alert variant="destructive">
            <AlertCircle className="size-4" />
            <AlertTitle>History unavailable</AlertTitle>
            <AlertDescription>Saved predictions could not be loaded. Please refresh the page.</AlertDescription>
          </Alert>
        ) : !data || data.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center gap-3 py-14 text-center">
              <ImageOff className="size-8 text-muted-foreground" />
              <p className="font-medium">No saved predictions yet</p>
              <p className="max-w-sm text-sm text-muted-foreground">
                Run an analysis on the detection page and choose “Save Result” to keep a record here.
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {data.map((record) => (
              <Card key={record.id} className="overflow-hidden">
                <div className="aspect-video w-full bg-muted">
                  {record.imageUrl ? (
                    <img
                      src={record.imageUrl}
                      alt={`Maize leaf analysed on ${new Date(record.createdAt).toLocaleString()}`}
                      className="size-full object-cover"
                    />
                  ) : (
                    <div className="flex size-full items-center justify-center text-muted-foreground">
                      <ImageOff className="size-6" />
                    </div>
                  )}
                </div>
                <CardHeader className="gap-2 pb-2">
                  <CardTitle className="text-base">{record.predictedClass}</CardTitle>
                  <p className="text-xs text-muted-foreground">
                    {new Date(record.createdAt).toLocaleString()}
                  </p>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge variant="secondary">{(record.confidence * 100).toFixed(1)}% confidence</Badge>
                    {record.isDemo ? (
                      <Badge variant="outline" className="border-warning/50 bg-warning/10">
                        <FlaskConical className="mr-1 size-3" /> Demo
                      </Badge>
                    ) : null}
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" onClick={() => setActive(record)}>
                      Open details
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-destructive"
                      onClick={() => handleDelete(record.id)}
                      aria-label={`Delete prediction from ${new Date(record.createdAt).toLocaleString()}`}
                    >
                      <Trash2 className="size-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      <Dialog open={active !== null} onOpenChange={(open) => !open && setActive(null)}>
        <DialogContent className="max-h-[85vh] max-w-3xl overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Prediction details</DialogTitle>
          </DialogHeader>
          {active ? (
            <div className="space-y-4">
              {active.imageUrl ? (
                <img
                  src={active.imageUrl}
                  alt="Saved maize leaf"
                  className="max-h-72 w-full rounded-lg object-contain"
                />
              ) : null}
              <PredictionResultCard
                showActions={false}
                result={{
                  prediction: active.predictedClass,
                  confidence: active.confidence,
                  probabilities: active.probabilities,
                  isDemo: active.isDemo,
                  createdAt: active.createdAt,
                }}
              />
            </div>
          ) : null}
        </DialogContent>
      </Dialog>
    </div>
  );
}