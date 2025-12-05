# Home Page - Cloud Run template

Minimal Node.js (Express) server with a `/ping` endpoint and a Dockerfile prepared for deployment to Google Cloud Run.

Quick start:

1. Build the container image locally:

```bash
docker build -t gcr.io/YOUR_PROJECT_ID/home-page:latest .
```

2. Run locally:

```bash
docker run -p 8080:8080 gcr.io/YOUR_PROJECT_ID/home-page:latest
# then visit http://localhost:8080/ping
```

3. Deploy to Cloud Run (one-line with gcloud):

```bash
gcloud run deploy home-page --source . --region YOUR_REGION --platform managed --allow-unauthenticated
```

Notes:
- Server listens on `process.env.PORT` (defaults to 8080) and binds to `0.0.0.0` for Cloud Run compatibility.
- Replace `YOUR_PROJECT_ID` and `YOUR_REGION` with your GCP project and region.
