# EcoPulse Architecture

EcoPulse uses a modular-monolith backend plus a separate ML service. This keeps deployment and debugging practical while making the ML boundary explicit.

## Components

- **Next.js**: presentation, authentication UI, charts, file upload.
- **Spring Boot**: authorization boundary, validation, persistence, analytics and domain logic.
- **PostgreSQL**: source of truth for organizations, buildings and consumption records.
- **FastAPI ML service**: statistical/ML operations that can scale independently.
- **Docker Compose**: reproducible local environment.

## Request flow

1. User signs in through the backend.
2. Backend issues a short-lived JWT.
3. Frontend sends the JWT on protected API calls.
4. Spring Security validates the token before application code runs.
5. Services query PostgreSQL using organization-scoped data.
6. Analytics are calculated from stored records.
7. ML operations are isolated behind a service boundary.

## Why a modular monolith?

Most EcoPulse operations share the same transactional data. Splitting every domain into a microservice would add operational complexity without a demonstrated need. The ML service is separated because it has a different runtime, dependency set and scaling profile.

## Failure isolation

If ML is unavailable, core CRUD/analytics should remain available. The frontend should show an explicit degraded state instead of inventing a prediction.

## Data integrity

Consumption imports use deterministic import keys. PostgreSQL uniqueness constraints prevent duplicate records even if an import is retried.
