import { ImageUp, Trash2, UploadCloud } from "lucide-react";
import { useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { ACCEPTED_EXTENSIONS, MAX_IMAGE_BYTES } from "@/lib/config";

interface Props {
  previewUrl: string | null;
  fileName?: string | undefined;
  disabled?: boolean | undefined;
  onSelect: (file: File) => void;
  onClear: () => void;
}

export function ImageUploader({ previewUrl, fileName, disabled, onSelect, onClear }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);

  const handleFiles = (files: FileList | null) => {
    const file = files?.[0];
    if (file) onSelect(file);
  };

  if (previewUrl) {
    return (
      <div className="space-y-3">
        <div className="overflow-hidden rounded-xl border border-border bg-muted">
          <img
            src={previewUrl}
            alt={fileName ? `Selected maize leaf image: ${fileName}` : "Selected maize leaf image"}
            className="mx-auto max-h-[380px] w-full object-contain"
          />
        </div>
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className="truncate text-sm text-muted-foreground">{fileName}</p>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" disabled={disabled} onClick={() => inputRef.current?.click()}>
              <ImageUp className="mr-2 size-4" /> Upload another
            </Button>
            <Button variant="outline" size="sm" disabled={disabled} onClick={onClear}>
              <Trash2 className="mr-2 size-4" /> Remove
            </Button>
          </div>
        </div>
        <input
          ref={inputRef}
          type="file"
          accept={ACCEPTED_EXTENSIONS}
          className="sr-only"
          onChange={(e) => {
            handleFiles(e.target.files);
            e.target.value = "";
          }}
        />
      </div>
    );
  }

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();
        setDragging(true);
      }}
      onDragLeave={() => setDragging(false)}
      onDrop={(e) => {
        e.preventDefault();
        setDragging(false);
        handleFiles(e.dataTransfer.files);
      }}
      className={`flex min-h-[280px] flex-col items-center justify-center rounded-xl border-2 border-dashed p-8 text-center transition-colors ${
        dragging ? "border-primary bg-primary/5" : "border-border bg-muted/40"
      }`}
    >
      <span className="flex size-14 items-center justify-center rounded-full bg-primary/10 text-primary">
        <UploadCloud className="size-7" aria-hidden="true" />
      </span>
      <h3 className="mt-4 font-display text-lg font-semibold">Drag and drop a maize leaf image</h3>
      <p className="mt-1 text-sm text-muted-foreground">
        JPG, JPEG, PNG or WEBP · up to {MAX_IMAGE_BYTES / 1024 / 1024} MB
      </p>
      <Button className="mt-5" onClick={() => inputRef.current?.click()} disabled={disabled}>
        Browse image
      </Button>
      <p className="mt-3 text-xs text-muted-foreground">
        On mobile you can also capture a photo directly with your camera.
      </p>
      <input
        ref={inputRef}
        type="file"
        accept={ACCEPTED_EXTENSIONS}
        capture="environment"
        className="sr-only"
        onChange={(e) => {
          handleFiles(e.target.files);
          e.target.value = "";
        }}
      />
    </div>
  );
}