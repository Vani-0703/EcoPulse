# EcoPulse — Sustainability Intelligence Platform

EcoPulse is a realistic sustainability analytics demo for monitoring electricity, water, waste, cost and estimated CO₂ across facilities.

## Live demo

The production Vercel build runs in standalone demo mode by default, so the login and dashboard work without a database or external API configuration.

### Demo login

- Email: `demo@ecopulse.local`
- Password: `password`

## Included workflow

- Responsive sustainability intelligence login
- Authenticated demo session stored in the browser
- KPI dashboard with electricity, water, waste, cost, CO₂ and sustainability score
- 14-day resource trend charts
- Building comparison analytics
- Rule-based anomaly cards
- CSV validation/import simulation with duplicate and invalid-row reporting
- Sign out and session protection
- Optional remote backend mode through `NEXT_PUBLIC_API_MODE=remote` and `NEXT_PUBLIC_API_URL`

## Architecture

The frontend is Next.js 15 and can operate entirely without backend credentials. This keeps the public demo reliable. The repository also contains the Spring Boot backend, database scripts and ML service for extending the project into a full deployed stack later.

## Development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.
