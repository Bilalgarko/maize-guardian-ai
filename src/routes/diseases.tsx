import { createFileRoute } from "@tanstack/react-router";
import { Leaf, ShieldCheck, Sprout, Stethoscope } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ACADEMIC_DISCLAIMER, DISEASE_LIST } from "@/lib/diseases";

export const Route = createFileRoute("/diseases")({
  head: () => ({
    meta: [
      { title: "Maize Leaf Disease Information | MaizeScan AI" },
      {
        name: "description",
        content:
          "Reference notes on healthy maize leaves, common rust, gray leaf spot and northern corn leaf blight: symptoms, visual traits, management and prevention.",
      },
      { property: "og:title", content: "Maize Leaf Disease Information | MaizeScan AI" },
      {
        property: "og:description",
        content: "Symptoms, visual characteristics, management and prevention for four maize leaf classes.",
      },
    ],
  }),
  component: DiseasesPage,
});

function slugify(value: string) {
  return value.toLowerCase().replace(/\s+/g, "-");
}

function DiseasesPage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6">
      <header className="max-w-2xl">
        <h1 className="font-display text-3xl font-semibold sm:text-4xl">Supported Maize Leaf Classes</h1>
        <p className="mt-3 text-muted-foreground">
          The classifier distinguishes four classes. Each entry summarises the agronomic signs used by
          field scouts alongside the visual traits the model learns from leaf imagery.
        </p>
      </header>

      <div className="mt-8 space-y-6">
        {DISEASE_LIST.map((disease) => (
          <Card key={disease.name} id={slugify(disease.name)} className="scroll-mt-24">
            <CardHeader>
              <div className="flex flex-wrap items-center gap-3">
                <CardTitle className="text-xl">{disease.name}</CardTitle>
                <Badge variant={disease.healthy ? "secondary" : "outline"}>
                  {disease.healthy ? "No disease" : "Fungal disease"}
                </Badge>
              </div>
              <p className="text-sm italic text-muted-foreground">{disease.scientificName}</p>
            </CardHeader>
            <CardContent className="space-y-5">
              <p className="text-sm text-muted-foreground">{disease.description}</p>
              <div className="grid gap-6 md:grid-cols-2">
                <Section icon={<Stethoscope className="size-4" />} title="Common symptoms" items={disease.symptoms} />
                <Section icon={<Leaf className="size-4" />} title="Visual characteristics" items={disease.visualCharacteristics} />
                <Section icon={<Sprout className="size-4" />} title="Management practices" items={disease.management} />
                <Section icon={<ShieldCheck className="size-4" />} title="Prevention" items={disease.prevention} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <p className="mt-8 rounded-lg border border-border bg-secondary/40 p-4 text-sm text-muted-foreground">
        {ACADEMIC_DISCLAIMER}
      </p>
    </div>
  );
}

function Section({ icon, title, items }: { icon: React.ReactNode; title: string; items: string[] }) {
  return (
    <div>
      <h2 className="flex items-center gap-2 text-sm font-semibold">
        <span className="text-primary">{icon}</span>
        {title}
      </h2>
      <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
        {items.map((item) => (
          <li key={item} className="flex gap-2">
            <span aria-hidden="true">•</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}