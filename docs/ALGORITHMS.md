# Algorithms

## Analytics aggregation

Consumption is grouped by day and building. Aggregation is O(n) over the records in the requested window.

## Baseline anomaly detection

The backend calculates a building-specific mean electricity baseline and flags observations above 135% of that baseline. This is deliberately transparent and easy to explain.

## ML anomaly detection

The FastAPI service exposes Isolation Forest. It is an additional ML boundary rather than a replacement for deterministic business logic.

## Forecasting

The ML service uses a simple least-squares trend as a transparent baseline forecast. It is not presented as a production-grade seasonal forecasting model.
