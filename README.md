# Aurora Insights

A comprehensive mining monitoring and analysis system with real-time insights for excavation activities.

## Repository Structure

This is a monorepo containing both backend and frontend applications:

- `backend/` - FastAPI backend service (copy from `../aurora-backend-python/`)
- `frontend/` - React frontend application

## Technologies

### Backend
- FastAPI
- Python 3.8+
- Uvicorn

### Frontend
- React 18
- TypeScript
- Vite
- Tailwind CSS
- shadcn/ui components

## Setup

### Backend Setup

**Note:** The backend code needs to be copied from the existing `aurora-backend-python/` directory:

```bash
# Copy the actual backend code
cp -r ../aurora-backend-python/* backend/

# Then install dependencies
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

## Development

1. Start the backend server on `http://localhost:8000`
2. Start the frontend development server on `http://localhost:5173`
3. The frontend will proxy API calls to the backend

## Current Status

⚠️ **Backend needs to be copied**: The `backend/` directory currently contains only a basic template. Copy the full implementation from `../aurora-backend-python/` to get the complete geospatial analysis backend.

## Deployment

Both backend and frontend can be deployed separately or together depending on your infrastructure preferences.
