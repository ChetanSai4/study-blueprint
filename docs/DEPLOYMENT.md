# Study Blueprint — Deployment & Environment Setup Guide

## 1. Prerequisites

- **Python:** 3.9+ (with `pip` and `venv`)
- **Node.js:** v18.x, v20.x, or v22+ (with `npm`)
- **MongoDB Atlas:** Free Tier (M0) Cluster or local MongoDB instance

---

## 2. MongoDB Atlas Setup (Step-by-Step)

1. **Create Account & Cluster:**
   - Sign up at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas).
   - Create a free Shared Cluster (M0 Sandbox).
   - Select cloud provider region closest to India (e.g. AWS `ap-south-1` Mumbai).
2. **Database User:**
   - Navigate to **Security → Database Access**.
   - Click **Add New Database User**.
   - Select Password authentication (e.g. `blueprint_app`). Generate a secure password.
   - Assign role **Read and write to any database**.
3. **Network Access:**
   - Navigate to **Security → Network Access**.
   - Click **Add IP Address**.
   - For local development, add your current IP address (or `0.0.0.0/0` with secure user/password for staging/cloud deployments).
4. **Retrieve Connection String:**
   - Navigate to **Deployment → Database**.
   - Click **Connect → Drivers → Python (version 3.12 or later)**.
   - Copy connection string:
     `mongodb+srv://<username>:<password>@cluster0.mongodb.net/study_blueprint?retryWrites=true&w=majority`
   - Store this URI in `backend/.env` as `MONGODB_URI`.

---

## 3. Google Identity Services Setup

1. Go to the [Google Cloud Console](https://console.cloud.google.com/).
2. Create a new project: `Study Blueprint`.
3. Configure the **OAuth Consent Screen**:
   - User Type: **External**.
   - App Name: `Study Blueprint`.
   - Scopes: `openid`, `email`, `profile`.
4. Create **OAuth 2.0 Client IDs**:
   - Application Type: **Web application**.
   - Authorized JavaScript origins:
     - `http://localhost:3000` (Local frontend)
     - `https://your-production-domain.com`
   - Copy **Client ID** (e.g., `xxxxxxxxxx.apps.googleusercontent.com`).
   - Store in `backend/.env` and `frontend/.env.local`.

---

## 4. Local Development Execution

### Backend Setup (FastAPI)
```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt

# Copy environment template
cp .env.example .env
# Edit .env with your MongoDB URI and Google Client ID

# Initialize database indexes and seed curated academic content
python3 scripts/seed_database.py

# Start FastAPI server
uvicorn app.main:app --reload --port 8000
```
Backend will be available at: `http://localhost:8000`  
Interactive OpenAPI Docs: `http://localhost:8000/docs`

### Frontend Setup (Next.js)
```bash
cd frontend
npm install

# Copy environment template
cp .env.example .env.local
# Set NEXT_PUBLIC_API_URL=http://localhost:8000/api/v1

# Start Next.js development server
npm run dev
```
Frontend will be available at: `http://localhost:3000`

---

## 5. Production Build & Deployment

### Frontend (e.g. Vercel, Netlify, or Docker)
```bash
cd frontend
npm run build
npm run start
```

### Backend (e.g. Render, Railway, DigitalOcean, or AWS EC2)
```bash
cd backend
uvicorn app.main:app --host 0.0.0.0 --port 8000 --workers 4
```
Ensure HTTPS is enabled on production domains for secure cookie transmission.
