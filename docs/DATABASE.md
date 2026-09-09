# Database

PostgreSQL is the system of record.

Core tables:

- `organizations`
- `users`
- `buildings`
- `consumption_records`
- `data_imports`
- `alerts`
- `audit_logs`

Important indexes include organization/time and building/time access paths. Consumption records have a unique `import_key` to make ingestion idempotent.

Flyway owns schema migrations. Hibernate is configured for validation rather than schema creation so application startup cannot silently change production tables.
