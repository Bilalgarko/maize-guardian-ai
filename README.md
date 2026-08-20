# Maize Guardian AI

Build a complete, modern, production-ready web application for my final-year Computer Science project titled:

"Plant Disease Detection Using Deep Learning: A Case Study of Maize Leaf Diseases."

The application is an AI-powered maize leaf disease detection system.

IMPORTANT:

This is a real academic project, not just a UI prototype. Build the application with a clean architecture that allows a real Deep Learning image-classification model to be connected and used for predictions.

Do NOT create unnecessary features that are unrelated to the core project.

==================================================

1. TECHNOLOGY STACK

==================================================

Use:

- React

- TypeScript

- Vite

- Tailwind CSS

- shadcn/ui

- Lucide icons

- Supabase where persistent storage is required

Keep the code clean, modular, maintainable and well structured.

The interface must be responsive and work properly on:

- Desktop

- Laptop

- Tablet

- Mobile

==================================================

2. CORE PURPOSE

==================================================

The system allows a user to upload or capture an image of a maize leaf.

The system processes the image through a Deep Learning image-classification model and predicts the condition of the maize leaf.

The primary classification categories are:

1. Healthy

2. Common Rust

3. Gray Leaf Spot

4. Northern Corn Leaf Blight

Use these exact disease names throughout the application.

The prediction result should include:

- Predicted disease

- Confidence score

- Short description

- Symptoms

- Recommended management/action

- Prediction timestamp

==================================================

3. APPLICATION PAGES

==================================================

Create the following pages:

A. LANDING / HOME PAGE

Create a professional agricultural AI landing page.

Hero section:

"Detect Maize Leaf Diseases with AI"

Subtitle:

"Upload a maize leaf image and use deep learning to identify common maize leaf diseases quickly and accurately."

Primary CTA:

"Detect Disease"

Secondary CTA:

"Learn More"

Include:

- Brief explanation of the system

- How it works

- Supported diseases

- Benefits

- Simple 3-step process

- Footer

The visual design should communicate:

Agriculture + Artificial Intelligence + Computer Vision.

Avoid excessive animations.

==================================================

B. DETECTION PAGE

==================================================

This is the most important page.

Create a large image-upload interface.

Allow the user to:

- Drag and drop an image

- Browse and select an image

- Preview the selected image

- Remove the image

- Upload another image

- Start prediction

Supported formats:

- JPG

- JPEG

- PNG

- WEBP

Show a clear message if an unsupported file is selected.

After image selection, display:

Image preview

[Analyze Leaf]

While prediction is running:

"Analyzing maize leaf..."

Show a loading state.

==================================================

4. PREDICTION RESULT

==================================================

After prediction, display a professional result card.

Example structure:

Prediction Result

Disease:

Northern Corn Leaf Blight

Confidence:

96.4%

Status:

Disease Detected

Description:

[short explanation]

Common Symptoms:

• ...

• ...

• ...

Recommended Management:

• ...

• ...

• ...

Provide buttons:

"Analyze Another Image"

"View Details"

"Save Result"

IMPORTANT:

Do not present fake AI results as real predictions.

Create a clean prediction-service abstraction so the real trained model can be connected later.

For development purposes, create a clearly identifiable DEMO MODE only if a real model endpoint is not yet connected.

The UI must clearly indicate:

"Demo Prediction — AI model not connected"

when demo mode is being used.

Never disguise demo predictions as real model predictions.

==================================================

5. DISEASE INFORMATION PAGE

==================================================

Create a disease information section for the four supported classes.

For each class provide:

- Disease name

- Description

- Common symptoms

- Visual characteristics

- General management practices

- Prevention information

Classes:

Healthy Maize Leaf

Common Rust

Gray Leaf Spot

Northern Corn Leaf Blight

Use appropriate agricultural language.

Do not claim that the application provides professional agricultural diagnosis.

Include a small disclaimer:

"This system is intended as an academic decision-support tool and should not replace professional agricultural diagnosis."

==================================================

6. PREDICTION HISTORY

==================================================

Create a History page.

Store previous predictions in Supabase.

Each record should contain:

- ID

- Image reference

- Predicted class

- Confidence

- Timestamp

Allow users to:

- View previous predictions

- Open prediction details

- Delete a prediction

Create a clean table/card layout.

==================================================

7. DASHBOARD

==================================================

Create a simple dashboard showing:

Total analyses

Healthy leaves detected

Diseased leaves detected

Most frequently detected disease

Recent predictions

Use clean statistics cards and charts where useful.

Do not make the dashboard unnecessarily complicated.

==================================================

8. DATABASE

==================================================

Use Supabase for persistent storage.

Create an appropriate database structure.

At minimum create a predictions table containing:

id

image_url

predicted_class

confidence

created_at

If authentication is implemented, associate predictions with the authenticated user.

Use appropriate Row Level Security policies.

Do NOT expose private credentials in frontend code.

==================================================

9. AI MODEL INTEGRATION ARCHITECTURE

==================================================

This is extremely important.

Design the application so that the Deep Learning model can be connected without rewriting the frontend.

Create a prediction service abstraction such as:

predictionService

The frontend should send the selected image to a prediction endpoint.

Expected API concept:

POST /predict

Request:

multipart/form-data

image = uploaded maize leaf image

Expected response:

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

The frontend should be designed to consume this response.

Do NOT hard-code prediction results into the production prediction flow.

==================================================

10. MODEL BACKEND PREPARATION

==================================================

The intended Deep Learning model is:

Convolutional Neural Network using Transfer Learning with MobileNetV2.

The model will eventually be trained separately using:

- Python

- TensorFlow/Keras

- PlantVillage maize leaf dataset

- Google Colab

The model will classify:

Healthy

Common Rust

Gray Leaf Spot

Northern Corn Leaf Blight

Prepare the application architecture so that a Python FastAPI inference server can later expose:

POST /predict

The frontend must communicate with this endpoint through an environment variable such as:

VITE_API_URL

Do not hard-code localhost URLs.

Create a clean API service file for this integration.

==================================================

11. IMAGE HANDLING

==================================================

Before sending an image to the model:

- Validate file type

- Validate file size

- Display preview

- Handle upload errors

- Show loading state

- Handle API errors gracefully

Do not permanently store images unless the user chooses to save the prediction.

==================================================

12. USER EXPERIENCE

==================================================

The application should feel like a real AI agricultural product.

Use:

- Clean typography

- Professional cards

- Clear buttons

- Good spacing

- Responsive layout

- Accessible color contrast

- Meaningful icons

- Subtle animations only where useful

Do not use excessive gradients, glassmorphism or flashy effects.

The design should look suitable for presentation during a university final-year project defense.

==================================================

13. NAVIGATION

==================================================

Navigation should contain:

Home

Detect Disease

Diseases

History

Dashboard

On mobile, use a responsive mobile navigation.

==================================================

14. ERROR HANDLING

==================================================

Handle:

- Invalid image

- Image too large

- Empty upload

- Model unavailable

- Network failure

- Prediction failure

- Database failure

Display human-readable error messages.

Never expose technical stack traces to normal users.

==================================================

15. IMPORTANT ACADEMIC REQUIREMENT

==================================================

This application is part of an undergraduate Computer Science research project.

The system should clearly demonstrate the following research pipeline:

Input:

Maize leaf image

↓

Preprocessing

↓

Deep Learning Model

↓

Feature Extraction

↓

Classification

↓

Prediction

↓

Confidence Score

↓

Disease Information

The application should therefore make this workflow easy to demonstrate during a project defense.

==================================================

16. DEMO MODE

==================================================

Because the trained model may not yet be available during initial development:

Create a development-only DEMO MODE behind a clearly visible configuration flag.

Example:

VITE_DEMO_MODE=true

When enabled, the application may use controlled sample predictions so that the interface can be tested.

However:

- Clearly label demo predictions.

- Do not represent demo results as actual model performance.

- Keep the real prediction API integration ready.

- Make it easy to disable demo mode once the trained model is connected.

==================================================

17. CODE QUALITY

==================================================

Organize the project into logical components.

Use reusable components.

Separate:

- UI

- API services

- prediction logic

- database logic

- types

- disease information

- configuration

Use TypeScript types for prediction responses.

Avoid duplicated code.

Do not create unnecessary dependencies.

==================================================

18. FINAL REQUIREMENT

==================================================

Build the complete application now.

Do not stop at creating a visual mockup.

Implement:

- All pages

- Navigation

- Upload workflow

- Image preview

- Prediction UI

- Disease information

- History

- Dashboard

- Supabase integration

- Prediction API abstraction

- Demo mode

- Error handling

- Responsive design

After implementation, check the entire application for broken routes, TypeScript errors, missing imports, broken components and obvious UI issues.

The final result should be a functional AI-powered maize disease detection web application ready for connection to the trained MobileNetV2 model.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/68871de9-99fe-4557-979a-98f6ce46b2eb).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
