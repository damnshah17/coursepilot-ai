# CoursePilot AI

CoursePilot AI is an AI-assisted learning platform designed to transform course material into structured, interactive learning experiences.

The platform is being built as a production-style full-stack system with a React frontend, Node.js API, PostgreSQL/pgvector database, Redis-backed background processing, and an upcoming Retrieval-Augmented Generation (RAG) pipeline.

## Current Status

Phase 1 — Foundation ✅

The current foundation includes:

- TypeScript monorepo architecture
- React + Vite frontend
- Express API
- PostgreSQL + pgvector
- Prisma ORM
- Redis
- BullMQ background worker
- Mailpit development email infrastructure
- Dockerized web, API, and worker services
- Environment validation with Zod
- Health and readiness checks
- ESLint + Prettier
- Vitest
- Production builds
- Docker Compose development environment

## Architecture

```text
coursepilot-ai/
│
├── apps/
│   ├── web/                React frontend
│   ├── api/                Express API
│   └── worker/             BullMQ background worker
│
├── packages/
│   ├── config/             Shared configuration and schemas
│   ├── database/           Prisma and PostgreSQL access
│   └── queue/              Redis/BullMQ infrastructure
│
├── infrastructure/
│   └── docker/
│       ├── postgres/
│       └── redis/
│
├── docker-compose.yml
├── pnpm-workspace.yaml
└── package.json