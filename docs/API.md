# API

Base URL: `/api`

## Authentication

`POST /auth/login`

Request:

```json
{"email":"demo@ecopulse.local","password":"password"}
```

Response contains a JWT token and role.

## Dashboard

`GET /dashboard`

Returns aggregated electricity, water, waste, cost, CO₂, score and record count.

Optional query parameters: `from=YYYY-MM-DD&to=YYYY-MM-DD`.

## Analytics

- `GET /analytics/trends`
- `GET /analytics/buildings`
- `GET /anomalies`
- `GET /buildings`

## Import

`POST /consumption/import`

Multipart field: `file`.

The server validates size, headers, dates, numbers, building references and duplicates.

## Health

`GET /health`

Public service health endpoint.

All other endpoints require a valid bearer token.
