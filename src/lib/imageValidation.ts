import { ACCEPTED_MIME_TYPES, MAX_IMAGE_BYTES } from "./config";

export function validateImageFile(file: File): string | null {
  if (!ACCEPTED_MIME_TYPES.includes(file.type.toLowerCase())) {
    return "Unsupported file type. Please select a JPG, JPEG, PNG or WEBP image.";
  }
  if (file.size === 0) {
    return "The selected file appears to be empty. Please choose another image.";
  }
  if (file.size > MAX_IMAGE_BYTES) {
    return `Image is too large (${(file.size / 1024 / 1024).toFixed(1)} MB). Maximum size is ${MAX_IMAGE_BYTES / 1024 / 1024} MB.`;
  }
  return null;
}

export function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(new Error("Could not read the selected image."));
    reader.readAsDataURL(file);
  });
}