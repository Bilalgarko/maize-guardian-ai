import { Link } from "@tanstack/react-router";
import { Leaf } from "lucide-react";

import { ACADEMIC_DISCLAIMER } from "@/lib/diseases";

export function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-border bg-secondary/40">
      <div className="mx-auto grid w-full max-w-6xl gap-8 px-4 py-10 sm:px-6 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex size-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <Leaf className="size-4" aria-hidden="true" />
            </span>
            <span className="font-display font-semibold">MaizeScan AI</span>
          </div>
          <p className="mt-3 text-sm text-muted-foreground">
            Plant Disease Detection Using Deep Learning: A Case Study of Maize Leaf Diseases.
          </p>
        </div>

        <div>
          <h2 className="text-sm font-semibold">Explore</h2>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li><Link to="/detect" className="hover:text-foreground">Detect Disease</Link></li>
            <li><Link to="/diseases" className="hover:text-foreground">Disease Information</Link></li>
            <li><Link to="/history" className="hover:text-foreground">Prediction History</Link></li>
            <li><Link to="/dashboard" className="hover:text-foreground">Dashboard</Link></li>
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-semibold">Academic notice</h2>
          <p className="mt-3 text-sm text-muted-foreground">{ACADEMIC_DISCLAIMER}</p>
        </div>
      </div>
      <div className="border-t border-border py-4 text-center text-xs text-muted-foreground">
        Undergraduate Computer Science research project · Convolutional Neural Network (MobileNetV2 transfer learning)
      </div>
    </footer>
  );
}