# Security

## Current controls

- Passwords are stored as BCrypt hashes.
- Protected API routes require a signed JWT.
- Authorization belongs on the server, not only in the UI.
- CSV uploads have a 5 MB size limit and strict numeric/date validation.
- Database access uses JPA parameterization rather than string-built SQL.
- CORS is configurable through an environment variable.
- Secrets belong in environment variables and are excluded by `.gitignore`.
- Technical exceptions are not returned as stack traces to clients.

## Production hardening

Before production use, rotate the JWT secret, replace the demo account, terminate TLS at the hosting edge, use a managed secret store, add distributed rate limiting and centralized logs, and define a formal data-retention policy.
