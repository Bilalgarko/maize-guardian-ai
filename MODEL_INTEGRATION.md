# Connecting the trained MobileNetV2 model

The frontend talks to the inference server through one abstraction:
`src/lib/predictionService.ts` → `src/lib/predictionApi.ts`.

## Environment variables

```
VITE_API_URL=https://your-inference-server.example.com
VITE_DEMO_MODE=false
```

- `VITE_API_URL` — base URL of the FastAPI server. No localhost URLs are hard-coded.
- `VITE_DEMO_MODE` — `true` uses the clearly-labelled demo simulator. Demo mode also turns
  itself on automatically when `VITE_API_URL` is not set, and the UI always shows
  "Demo Prediction — AI model not connected" in that case.

## Expected endpoint

`POST {VITE_API_URL}/predict` with `multipart/form-data`, field name `image`.

Response:

```json
{
  "prediction": "Common Rust",
  "confidence": 0.964,
  "probabilities": {
    "Healthy": 0.01,
    "Common Rust": 0.964,
    "Gray Leaf Spot": 0.012,
    "Northern Corn Leaf Blight": 0.014
  }
}
```

`prediction` must be one of the four class names exactly as written above.

## Minimal FastAPI reference

```python
from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
import numpy as np, tensorflow as tf
from PIL import Image
import io

CLASSES = ["Healthy", "Common Rust", "Gray Leaf Spot", "Northern Corn Leaf Blight"]
model = tf.keras.models.load_model("maize_mobilenetv2.keras")

app = FastAPI()
app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_methods=["*"], allow_headers=["*"])

@app.post("/predict")
async def predict(image: UploadFile = File(...)):
    img = Image.open(io.BytesIO(await image.read())).convert("RGB").resize((224, 224))
    x = tf.keras.applications.mobilenet_v2.preprocess_input(np.expand_dims(np.array(img), 0))
    probs = model.predict(x)[0]
    idx = int(np.argmax(probs))
    return {
        "prediction": CLASSES[idx],
        "confidence": float(probs[idx]),
        "probabilities": {c: float(p) for c, p in zip(CLASSES, probs)},
    }
```

## Storage

Saved predictions go through `PredictionRepository` in `src/lib/historyStore.ts`.
The default implementation persists to browser local storage; swapping in a hosted
database (a `predictions` table with `id`, `image_url`, `predicted_class`, `confidence`,
`created_at`, plus row-level security per user) only requires a second implementation of
that interface — no UI changes.