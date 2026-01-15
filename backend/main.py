from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import random
from datetime import datetime, timedelta

app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mock data
MINES = [
    {"id": "m1", "name": "Jharia Coal Fields", "region": "Jharkhand", "lat": 23.8081, "lng": 84.8385},
    {"id": "m2", "name": "Singrauli Complex", "region": "Madhya Pradesh", "lat": 24.2002, "lng": 82.6915},
    {"id": "m3", "name": "Talcher Coalfield", "region": "Odisha", "lat": 20.5937, "lng": 85.2123},
    {"id": "m4", "name": "Korba Coalfield", "region": "Chhattisgarh", "lat": 22.3594, "lng": 82.6855},
]

class AnalyzeRequest(BaseModel):
    mine_id: str
    start_date: str
    end_date: str

@app.get("/api/mines")
async def get_mines():
    return {"mines": MINES}

@app.post("/api/analyze")
async def analyze(request: AnalyzeRequest):
    # Mock analysis data
    mine = next((m for m in MINES if m["id"] == request.mine_id), MINES[0])

    # Generate mock data based on mine
    random.seed(hash(request.mine_id + request.start_date))

    # Mock statistics
    total_legal_area = random.uniform(50, 200)
    total_nogo_area = random.uniform(10, 50)
    violation_count = random.randint(0, 10)
    max_nogo_area = random.uniform(5, 20)

    # Mock time series (12 months)
    dates = []
    legal_excavated = []
    nogo_excavated = []

    start = datetime.fromisoformat(request.start_date + "-01")
    for i in range(12):
        date = start + timedelta(days=i*30)
        dates.append(date.strftime("%Y-%m-%d"))
        legal_excavated.append(round(random.uniform(1, 10), 2))
        nogo_excavated.append(round(random.uniform(0, 3), 2))

    # Mock map layers
    map_layers = {
        "legal_boundary": {
            "geometry": {
                "coordinates": [[
                    [20 + random.random()*10, 15 + random.random()*10],
                    [78 + random.random()*10, 18 + random.random()*10],
                    [85 + random.random()*10, 65 + random.random()*10],
                    [75 + random.random()*10, 88 + random.random()*10],
                    [28 + random.random()*10, 85 + random.random()*10],
                    [15 + random.random()*10, 48 + random.random()*10],
                ]]
            }
        },
        "no_go_zone": {
            "features": [
                {
                    "geometry": {
                        "coordinates": [[
                            [52 + random.random()*10, 30 + random.random()*10],
                            [72 + random.random()*10, 35 + random.random()*10],
                            [70 + random.random()*10, 52 + random.random()*10],
                            [50 + random.random()*10, 48 + random.random()*10],
                        ]]
                    }
                }
            ]
        },
        "excavation_mask": {
            "geometry": {
                "coordinates": [[
                    [42 + random.random()*5, 42 + random.random()*5],
                    [58 + random.random()*5, 68 + random.random()*5],
                    [35 + random.random()*5, 38 + random.random()*5],
                ]]
            }
        }
    }

    # Mock alerts
    alerts = []
    for i in range(violation_count):
        alerts.append({
            "id": f"alert_{i}",
            "title": f"Violation Detected #{i+1}",
            "description": f"Unauthorized excavation in no-go zone area {random.randint(1,5)}",
            "severity": random.choice(["high", "medium", "low"]),
            "timestamp": (datetime.now() - timedelta(hours=random.randint(1, 24))).isoformat()
        })

    # Mock violations for map
    violations = []
    for i in range(violation_count):
        violations.append({
            "x": 50 + random.random()*20,
            "y": 40 + random.random()*30
        })

    return {
        "mine_id": request.mine_id,
        "actual_start_date": request.start_date,
        "actual_end_date": request.end_date,
        "statistics": {
            "total_legal_area_ha": round(total_legal_area, 2),
            "total_nogo_area_ha": round(total_nogo_area, 2),
            "violation_count": violation_count,
            "max_nogo_area_ha": round(max_nogo_area, 2)
        },
        "time_series": {
            "dates": dates,
            "legal_excavated_area": legal_excavated,
            "no_go_excavated_area": nogo_excavated
        },
        "map_layers": map_layers,
        "alerts": alerts,
        "violations": violations
    }

@app.get("/health")
async def health():
    return {"status": "ok"}
