# Backend

NestJS + Prisma scaffold for the Croissant-Rouge Gafsa migration.

## What is in place

- `src/prisma`: shared `PrismaService` and `PrismaModule`
- `src/health`: health-check endpoint
- `src/auth`, `src/activities`, `src/adhesion`, `src/team`, `src/news`: feature modules with controllers, services, and DTOs
- CORS and validation pipes in `src/main.ts`

## Prisma

`prisma/schema.prisma` is intentionally empty except for the MySQL datasource. I did not guess table models. Send me the entities and columns you want, and I’ll generate the schema and wire the feature services to the final model.
