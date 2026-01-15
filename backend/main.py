from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional

app = FastAPI(title="Aurora Insights Backend", version="1.0.0")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Vite dev server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Pydantic models
class Mine(BaseModel):
    id: str
    name: str
    region: str

class MineCreate(BaseModel):
    name: str
    region: str

# In-memory storage (replace with database in production)
mines_db = [
    {"id": "m1", "name": "Jharia Coal Fields", "region": "Jharkhand"},
    {"id": "m2", "name": "Singrauli Complex", "region": "Madhya Pradesh"},
    {"id": "m3", "name": "Talcher Coalfield", "region": "Odisha"},
    {"id": "m4", "name": "Korba Coalfield", "region": "Chhattisgarh"},
]

@app.get("/api/mines")
async def get_mines():
    return {"mines": mines_db}

@app.get("/mines/{mine_id}")
async def get_mine(mine_id: str):
    mine = next((m for m in mines_db if m["id"] == mine_id), None)
    if not mine:
        raise HTTPException(status_code=404, detail="Mine not found")
    return mine

@app.post("/mines")
async def create_mine(mine: MineCreate):
    new_id = f"m{len(mines_db) + 1}"
    new_mine = {"id": new_id, "name": mine.name, "region": mine.region}
    mines_db.append(new_mine)
    return new_mine

@app.put("/mines/{mine_id}")
async def update_mine(mine_id: str, mine: MineCreate):
    for i, m in enumerate(mines_db):
        if m["id"] == mine_id:
            mines_db[i] = {"id": mine_id, "name": mine.name, "region": mine.region}
            return mines_db[i]
    raise HTTPException(status_code=404, detail="Mine not found")

@app.delete("/mines/{mine_id}")
async def delete_mine(mine_id: str):
    for i, m in enumerate(mines_db):
        if m["id"] == mine_id:
            deleted_mine = mines_db.pop(i)
            return deleted_mine
    raise HTTPException(status_code=404, detail="Mine not found")

@app.get("/")
async def root():
    return {"message": "Aurora Insights Backend API"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)