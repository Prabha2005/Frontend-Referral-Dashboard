#!/usr/bin/env bash
set -e

# Run idempotent database initialization and seeding
python backend/seed.py

# Start Uvicorn ASGI server
exec uvicorn backend.main:app --host 0.0.0.0 --port "${PORT:-8000}"
