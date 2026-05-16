Estructura propuesta

- `src/`
  - `app/` — rutas y layouts (Next App Router)
  - `components/` — UI atómico y shared components
    - `ui/` — componentes estilizados reutilizables
  - `features/` — cada feature (tickets, users, assets, reports)
  - `lib/` — utilidades y adaptadores (db, api clients)
  - `hooks/` — hooks react comunes
  - `services/` — integraciones y servicios (API clients)
  - `types/` — tipos TypeScript globales
  - `styles/` — estilos globales y tokens
- `infra/` — docker, infra scripts, infra docs
  - Nota: se usa `pnpm` como gestor principal; ver `package.json` > `packageManager`.
- `docs/` — documentación del proyecto
- `tests/` — pruebas unitarias e integración

Justificación breve

La separación por `features/` permite escalar por dominio y mantener lógica localizada. `lib/` y `services/` contienen adaptadores y side-effects. `components/ui/` aloja componentes atómicos visuales, mientras que `components/` puede contener componentes compuestos o específicos de página.
