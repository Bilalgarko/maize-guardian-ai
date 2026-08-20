import { createFileRoute, Link } from "@tanstack/react-router";
import {
  BrainCircuit,
  Camera,
  ClipboardList,
  Cpu,
  Gauge,
  Layers,
  ScanLine,
  Timer,
} from "lucide-react";

import heroImage from "@/assets/maize-hero.jpg";
import { ModelStatusBanner } from "@/components/ModelStatusBanner";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ACADEMIC_DISCLAIMER, DISEASE_LIST } from "@/lib/diseases";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "MaizeScan AI — Detect Maize Leaf Diseases with Deep Learning" },
      {
        name: "description",
        content:
          "Upload a maize leaf image and use a deep learning classifier to identify common rust, gray leaf spot, northern corn leaf blight or a healthy leaf.",
      },
      { property: "og:title", content: "MaizeScan AI — Detect Maize Leaf Diseases with Deep Learning" },
      {
        property: "og:description",
        content: "AI-powered maize leaf disease detection built on a MobileNetV2 transfer-learning classifier.",
      },
    ],
  }),
  component: Index,
});

const STEPS = [
  {
    icon: Camera,
    title: "1. Capture or upload",
    text: "Take a photo of the maize leaf or upload an existing JPG, PNG or WEBP image.",
  },
  {
    icon: Cpu,
    title: "2. Deep learning analysis",
    text: "The image is preprocessed and passed through the convolutional neural network for feature extraction and classification.",
  },
  {
    icon: ClipboardList,
    title: "3. Review the result",
    text: "Read the predicted class, confidence score, symptoms and recommended management actions.",
  },
];

const BENEFITS = [
  { icon: Timer, title: "Fast field screening", text: "Get a class prediction in seconds instead of waiting for laboratory confirmation." },
  { icon: Gauge, title: "Confidence scores", text: "Every prediction reports per-class probabilities so uncertain cases are visible." },
  { icon: Layers, title: "Reproducible pipeline", text: "A fixed preprocessing and classification pipeline makes results easy to demonstrate and compare." },
  { icon: BrainCircuit, title: "Transfer learning", text: "Built around a MobileNetV2 backbone fine-tuned on maize leaf imagery from the PlantVillage dataset." },
];

function Index() {
  return (
    <div>
      <section className="border-b border-border bg-secondary/40">
        <div className="mx-auto grid w-full max-w-6xl items-center gap-10 px-4 py-14 sm:px-6 lg:grid-cols-2 lg:py-20">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-3 py-1 text-xs font-medium text-muted-foreground">
              <ScanLine className="size-3.5 text-primary" /> Deep learning · Computer vision · Agriculture
            </span>
            <h1 className="mt-5 font-display text-4xl font-semibold leading-tight sm:text-5xl">
              Detect Maize Leaf Diseases with AI
            </h1>
            <p className="mt-4 max-w-xl text-lg text-muted-foreground">
              Upload a maize leaf image and use deep learning to identify common maize leaf diseases
              quickly and accurately.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link to="/detect">Detect Disease</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="/diseases">Learn More</Link>
              </Button>
            </div>
          </div>
          <img
            src={heroImage}
            alt="Close-up of a maize leaf being analysed by a computer vision system"
            width={1600}
            height={1104}
            className="w-full rounded-xl border border-border object-cover shadow-sm"
          />
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr]">
          <div>
            <h2 className="font-display text-2xl font-semibold sm:text-3xl">About the system</h2>
            <p className="mt-4 text-muted-foreground">
              This application accompanies the undergraduate research project “Plant Disease Detection
              Using Deep Learning: A Case Study of Maize Leaf Diseases”. A maize leaf image is
              preprocessed, passed through a convolutional neural network built with MobileNetV2
              transfer learning, and classified into one of four categories with an associated
              confidence score.
            </p>
            <p className="mt-4 text-sm text-muted-foreground">{ACADEMIC_DISCLAIMER}</p>
          </div>
          <div className="rounded-xl border border-border bg-card p-6">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              Research pipeline
            </h3>
            <ol className="mt-4 space-y-2 text-sm">
              {[
                "Maize leaf image input",
                "Preprocessing (resize, normalise)",
                "Deep learning model (CNN · MobileNetV2)",
                "Feature extraction",
                "Classification",
                "Prediction + confidence score",
                "Disease information & recommendations",
              ].map((step, i) => (
                <li key={step} className="flex items-center gap-3">
                  <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                    {i + 1}
                  </span>
                  <span className="text-muted-foreground">{step}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-secondary/30">
        <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6">
          <h2 className="font-display text-2xl font-semibold sm:text-3xl">How it works</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {STEPS.map((step) => (
              <Card key={step.title}>
                <CardContent className="pt-6">
                  <span className="flex size-10 items-center justify-center rounded-md bg-primary/10 text-primary">
                    <step.icon className="size-5" aria-hidden="true" />
                  </span>
                  <h3 className="mt-4 font-display text-lg font-semibold">{step.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{step.text}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6">
        <h2 className="font-display text-2xl font-semibold sm:text-3xl">Supported diseases</h2>
        <p className="mt-2 text-muted-foreground">The classifier distinguishes these four maize leaf classes.</p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {DISEASE_LIST.map((disease) => (
            <Card key={disease.name}>
              <CardContent className="pt-6">
                <h3 className="font-display text-base font-semibold">{disease.name}</h3>
                <p className="mt-1 text-xs italic text-muted-foreground">{disease.scientificName}</p>
                <p className="mt-3 line-clamp-4 text-sm text-muted-foreground">{disease.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        <Button asChild variant="outline" className="mt-6">
          <Link to="/diseases">View full disease information</Link>
        </Button>
      </section>

      <section className="border-t border-border bg-secondary/30">
        <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6">
          <h2 className="font-display text-2xl font-semibold sm:text-3xl">Benefits</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {BENEFITS.map((benefit) => (
              <div key={benefit.title} className="rounded-xl border border-border bg-card p-5">
                <benefit.icon className="size-5 text-primary" aria-hidden="true" />
                <h3 className="mt-3 font-display text-base font-semibold">{benefit.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{benefit.text}</p>
              </div>
            ))}
          </div>
          <div className="mt-8">
            <ModelStatusBanner />
          </div>
        </div>
      </section>
    </div>
  );
}
