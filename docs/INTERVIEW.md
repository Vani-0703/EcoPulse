# Interview Guide

**Why Spring Boot?** Strong ecosystem for secure REST APIs, validation, persistence and production Java services.

**Why PostgreSQL?** Consumption, organizations and buildings have clear relational integrity requirements, and PostgreSQL provides mature indexing and transactional guarantees.

**Why a separate ML service?** Python has a strong scientific/ML ecosystem and can scale independently from the Java API.

**How do you prevent duplicate imports?** A deterministic import key is protected by a database uniqueness constraint.

**What happens if ML fails?** Core analytics remain available; ML-dependent features must surface an explicit unavailable state.

**How would you scale it?** Stateless API replicas, indexed/partitioned PostgreSQL, caching, asynchronous ingestion and independently scaled ML workers.

**Why not microservices everywhere?** Unnecessary network and operational complexity is avoided until domain or scale boundaries justify it.
