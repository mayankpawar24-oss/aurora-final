🌌 AURORA 2.0 – Adaptive Mining Activity Monitoring

Beyond the Horizon

An end-to-end geospatial analytics system for adaptive monitoring of mining activities using Sentinel-2 time-series data, designed to detect excavation trends and no-go zone violations with temporal consistency and explainability.

Overview

Regulatory agencies require continuous, reliable monitoring of mining operations to ensure compliance with legal boundaries and protection of restricted zones.

AURORA 2.0 addresses this challenge by providing:

Automated excavation activity detection

Temporal profiling of mining expansion

No-go zone violation alerts

Interactive visual analytics dashboard

The system is data-adaptive, mine-agnostic, and designed for real-world deployment scenarios.

🧠 Key Capabilities

Adaptive Signature Learning
Learns excavation patterns dynamically from multispectral time-series data without hard-coded thresholds.

Temporal Excavation Analytics
Tracks excavation growth trends and rates over time while suppressing seasonal noise.

No-Go Zone Violation Detection
Detects and quantifies illegal mining activity inside restricted zones with temporal alerts.

Interactive Dashboard
Visualizes spatial changes, timelines, and system insights through an intuitive interface.

🏗️ System Architecture



<img width="775" height="413" alt="image" src="https://github.com/user-attachments/assets/944f76a6-ad23-4ef2-9f5f-bfb91160c47d" />


🛠️ Tech Stack
Frontend

React + TypeScript

Vite

Tailwind CSS

shadcn-ui

Backend

Python

FastAPI

Uvicorn

▶️ How to Run the Project Locally


1️⃣ Clone the Repository
git clone https://github.com/mayankpawar24-oss/aurora-insights.git
cd aurora-insights

2️⃣ Start the Backend (FastAPI)
cd backend
pip install fastapi uvicorn
uvicorn main:app --reload --port 8000


🔹 Backend URL:
http://127.0.0.1:8000

🔹 API Documentation:
http://127.0.0.1:8000/docs



3️⃣ Start the Frontend (React Dashboard)

Open a new terminal window:

cd frontend
npm install
npm run dev


🔹 Frontend URL:
http://localhost:5173

📊 Dashboard Walkthrough

Select Mine and Date Range

Click Start Monitoring

Analyze:

Excavated area trends

No-go zone violations

Temporal excavation growth

Expand Detailed Analysis for supporting charts and breakdowns

📌 Notes for Evaluators

Demonstrates end-to-end integration (analytics → backend → visualization)

Designed to be mine-agnostic and scalable

Emphasizes clarity, trust, and interpretability in decision-making
