import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Activity, AlertCircle, Bug, Leaf, TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { HISTORY_QUERY_KEY, predictionRepository } from "@/lib/historyStore";
import { DISEASE_CLASSES } from "@/lib/types";
import type { DiseaseClass, PredictionRecord } from "@/lib/types";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Analysis Dashboard | MaizeScan AI" },
      {
        name: "description",
        content: "Summary statistics of saved maize leaf analyses: totals, healthy vs diseased leaves and the most frequently detected disease.",
      },
      { property: "og:title", content: "Analysis Dashboard | MaizeScan AI" },
      { property: "og:description", content: "Totals, class distribution and recent maize leaf predictions." },
    ],
  }),
  component: DashboardPage,
});

function summarise(records: PredictionRecord[]) {
  const counts = Object.fromEntries(DISEASE_CLASSES.map((c) => [c, 0])) as Record<DiseaseClass, number>;
  records.forEach((r) => {
    counts[r.predictedClass] = (counts[r.predictedClass] ?? 0) + 1;
  });
  const healthy = counts["Healthy"];
  const diseased = records.length - healthy;
  const diseaseEntries = DISEASE_CLASSES.filter((c) => c !== "Healthy").map((c) => ({ name: c, count: counts[c] }));
  const top = diseaseEntries.reduce(
    (best, current) => (current.count > best.count ? current : best),
    { name: "—" as string, count: 0 },
  );
  return {
    total: records.length,
    healthy,
    diseased,
    top: top.count > 0 ? top : null,
    chartData: DISEASE_CLASSES.map((c) => ({ name: c, count: counts[c] })),
  };
}

function DashboardPage() {
  const { data, isPending, isError } = useQuery({
    queryKey: HISTORY_QUERY_KEY,
    queryFn: () => predictionRepository.list(),
  });

  if (isPending) {
    return (
      <div className="mx-auto grid w-full max-w-6xl gap-4 px-4 py-10 sm:px-6 md:grid-cols-4">
        {[0, 1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-32 w-full rounded-xl" />
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6">
        <Alert variant="destructive">
          <AlertCircle className="size-4" />
          <AlertTitle>Dashboard unavailable</AlertTitle>
          <AlertDescription>Saved analyses could not be loaded. Please refresh the page.</AlertDescription>
        </Alert>
      </div>
    );
  }

  const stats = summarise(data ?? []);
  const recent = (data ?? []).slice(0, 5);

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-semibold sm:text-4xl">Dashboard</h1>
          <p className="mt-2 text-muted-foreground">Overview of all saved maize leaf analyses.</p>
        </div>
        <Button asChild>
          <Link to="/detect">New analysis</Link>
        </Button>
      </header>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={<Activity className="size-4" />} label="Total analyses" value={String(stats.total)} />
        <StatCard icon={<Leaf className="size-4" />} label="Healthy leaves" value={String(stats.healthy)} />
        <StatCard icon={<Bug className="size-4" />} label="Diseased leaves" value={String(stats.diseased)} />
        <StatCard
          icon={<TrendingUp className="size-4" />}
          label="Most frequent disease"
          value={stats.top ? stats.top.name : "—"}
          hint={stats.top ? `${stats.top.count} detection${stats.top.count === 1 ? "" : "s"}` : "No diseases recorded"}
        />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1.3fr_1fr]">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Class distribution</CardTitle>
          </CardHeader>
          <CardContent className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stats.chartData} margin={{ left: -20, right: 8 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                <XAxis dataKey="name" tick={{ fontSize: 11 }} interval={0} height={50} angle={-15} textAnchor="end" />
                <YAxis allowDecimals={false} tick={{ fontSize: 11 }} />
                <Tooltip cursor={{ fill: "var(--muted)" }} />
                <Bar dataKey="count" fill="var(--primary)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Recent predictions</CardTitle>
          </CardHeader>
          <CardContent>
            {recent.length === 0 ? (
              <p className="py-8 text-center text-sm text-muted-foreground">
                No saved predictions yet. Run an analysis and save the result.
              </p>
            ) : (
              <ul className="divide-y divide-border">
                {recent.map((record) => (
                  <li key={record.id} className="flex items-center justify-between gap-3 py-3">
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium">{record.predictedClass}</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(record.createdAt).toLocaleString()}
                      </p>
                    </div>
                    <Badge variant="secondary">{(record.confidence * 100).toFixed(1)}%</Badge>
                  </li>
                ))}
              </ul>
            )}
            <Button asChild variant="outline" className="mt-4 w-full">
              <Link to="/history">View full history</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function StatCard({
  icon,
  label,
  value,
  hint,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  hint?: string;
}) {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-center gap-2 text-muted-foreground">
          <span className="text-primary">{icon}</span>
          <span className="text-xs uppercase tracking-wide">{label}</span>
        </div>
        <p className="mt-2 font-display text-2xl font-semibold">{value}</p>
        {hint ? <p className="mt-1 text-xs text-muted-foreground">{hint}</p> : null}
      </CardContent>
    </Card>
  );
}