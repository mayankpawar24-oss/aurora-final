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

<img width="842" height="114" alt="image" src="https://github.com/user-attachments/assets/0ee3f228-7d5c-4e85-a96e-f9b2f56898a2" />


2️⃣ Start the Backend (FastAPI)
cd backend
pip install fastapi uvicorn
uvicorn main:app --reload --port 8000


<img width="822" height="172" alt="image" src="https://github.com/user-attachments/assets/e0f9a739-c350-4c27-bebd-bb4d442083a9" />



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

How to Use the Dashboard (UI Guide)
1️⃣ Select Mine & Date Range

Choose a mining site from the dropdown

Select the analysis time window

2️⃣ Start Monitoring

Click “Start Monitoring”

The system fetches analytics from the backend

3️⃣ Analyze Outputs

The dashboard displays:

Map View – legal boundary, no-go zones, and detected excavation areas

System Insights – total excavated area, violation area, and counts

Excavation Timeline – temporal progression of mining activity

4️⃣ View Detailed Analysis

Expand “Detailed Analysis” to see:

Violation area breakdown

Temporal growth trends supporting the summary metrics

5️⃣ Understand the Workflow

Expand “How It Works” to view the step-by-step monitoring pipeline
📌 Notes for Evaluators

Demonstrates end-to-end integration (analytics → backend → visualization)

Designed to be mine-agnostic and scalable

Emphasizes clarity, trust, and interpretability in decision-making
