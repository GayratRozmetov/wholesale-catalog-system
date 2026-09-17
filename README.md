# Wholesale Catalog System
[![Open Live Demo](https://img.shields.io/badge/OPEN_LIVE_DEMO-FF4E24?style=for-the-badge&logo=vercel&logoColor=white)](https://wholesale-catalog-system.vercel.app/)

A full-stack wholesale catalog and order management platform built with ASP.NET Core, React, TypeScript and PostgreSQL.

## Features

- Responsive buyer-facing product catalog
- Search and category filters
- Size, color, wholesale price and live stock information
- Buyer selection list with estimated series value
- ASP.NET Core REST API
- PostgreSQL persistence with Entity Framework Core
- Product and stock management endpoints
- Swagger API documentation

## Technology

- **Frontend:** React, TypeScript, Vite
- **Backend:** C#, ASP.NET Core 8, Entity Framework Core
- **Database:** PostgreSQL
- **Infrastructure:** Docker Compose

## Run the frontend

```bash
npm install
npm run dev
```

## Run the API and database

```bash
docker compose up --build
```

The API is available at `http://localhost:8080` and Swagger at `http://localhost:8080/swagger`.

## Demo data

The public frontend uses fictional wholesale products so the interface can be explored without exposing real customer, stock or sales data.
