# Scalability

EcoPulse starts as a modular monolith because it is easier to reason about and test. At larger scale:

1. Keep API instances stateless and scale horizontally.
2. Add a connection pool and read replicas for PostgreSQL.
3. Partition very large time-series tables by organization/time when query volume justifies it.
4. Cache stable building metadata and expensive aggregates.
5. Move CSV processing and ML jobs to a queue-backed worker model.
6. Store raw uploaded files in object storage rather than application disk.
7. Scale the ML service independently.
8. Add CDN delivery for static frontend assets.
9. Add centralized metrics/traces and SLOs.
10. Apply per-organization rate limits and quotas.

At 10M users, the architecture would require a more explicit multi-tenant data strategy, asynchronous ingestion, stronger caching, partitioning, and likely specialized time-series/analytics infrastructure.
