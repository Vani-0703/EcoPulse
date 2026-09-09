# EcoPulse

EcoPulse is a sustainability and resource-optimization platform for campuses, offices, apartments, and small organizations. It turns electricity, water, waste, cost, and carbon data into operational dashboards, anomaly signals, forecasts, and recommendations.

## Stack
- Next.js + TypeScript + Tailwind + Recharts
- Spring Boot + Java 21 + Spring Security + JPA
- PostgreSQL + Flyway
- Python + FastAPI + pandas + NumPy + scikit-learn
- Docker Compose + GitHub Actions

## Local development

```bash
docker compose up --build
```

The web app is exposed on port 3000, the API on 8080, the ML service on 8000, and PostgreSQL on 5432.

Demo login:
- Email: `demo@ecopulse.local`
- Password: `password`

## Architecture

```text
Next.js UI -> Spring Boot REST API -> PostgreSQL
                         |
                         +-> Python ML service
```

The system is intentionally a modular monolith plus a focused ML service: it keeps deployment and reasoning simple while demonstrating production-style boundaries.

## Important status

This repository is a functional engineering foundation. It includes real persistence, authentication, CSV ingestion, analytics, anomaly detection, forecasting endpoints, Docker configuration, CI, and documentation. Some enterprise features from the full product roadmap (advanced RBAC workflows, persistent alert lifecycle UI, campus maps, richer recommendation workflows, full browser E2E, production observability, and load testing) are structured as the next implementation increment rather than being represented as fake functionality.

Never commit secrets. Use `.env.example` as the configuration template.
