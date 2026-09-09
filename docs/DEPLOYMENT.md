# Deployment

Recommended topology:

- Next.js frontend → Vercel
- Spring Boot API → container-capable backend host
- FastAPI ML → container-capable backend host
- PostgreSQL → managed PostgreSQL provider

Set `NEXT_PUBLIC_API_URL` to the public API URL and configure backend CORS to the deployed frontend origin.

Never commit production secrets. Use provider-managed environment variables.

The Docker Compose file is intended for local development and integration testing, not as a high-availability production cluster.
