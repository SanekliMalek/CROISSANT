# Frontend

Next.js App Router frontend for the Croissant-Rouge Gafsa migration.

## Structure

- `app/routes`: route-level page files. Each `page.tsx` only renders a container.
- `app/containers`: page sections and composition logic. These own local state and load data through services.
- `app/components`: reusable presentational pieces.
- `services`: API calls only. Containers never call `fetch` directly.

## Routing Convention

Clean URLs such as `/`, `/activities`, `/adhesion`, `/team`, and `/admin` are mapped to the matching files under `app/routes/*` via Next rewrites, so the route-folder naming stays separate from the browser URL surface.

