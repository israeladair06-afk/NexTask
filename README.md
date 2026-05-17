# NexTask

NexTask es una base profesional para construir un dashboard administrativo tipo **ITSM/helpdesk** con Next.js, React, TypeScript, Tailwind CSS, shadcn/ui style, PostgreSQL y Docker.

> Estado actual: plantilla enterprise inicial. La UI, arquitectura y documentación están preparadas; la lógica de negocio real se implementará después.

## Objetivo

Dejar un proyecto limpio, escalable y entendible para que un equipo universitario/profesional pueda trabajar sin romper la arquitectura.

## Stack

- Next.js App Router
- React
- TypeScript estricto
- Tailwind CSS
- Componentes base estilo shadcn/ui
- PostgreSQL
- Docker y Docker Compose
- Preparado para Prisma, Auth, Redis, WebSockets, RAG y APIs futuras

## Inicio rápido

```bash
pnpm install
cp .env.example .env.local
pnpm dev
```

Abrir: <http://localhost:3000>

Con Docker:

```bash
cp .env.example .env.local
pnpm docker:up
```

## Scripts principales

| Comando | Descripción |
| --- | --- |
| `pnpm dev` | Ejecuta Next.js en desarrollo |
| `pnpm build` | Compila la aplicación |
| `pnpm start` | Ejecuta la app compilada |
| `pnpm typecheck` | Valida TypeScript estricto |
| `pnpm lint` | Ejecuta lint |
| `pnpm format` | Formatea el proyecto |
| `pnpm docker:up` | Levanta app + PostgreSQL |
| `pnpm docker:down` | Detiene contenedores |

## Estructura principal

```txt
src/
  app/              Rutas y páginas del App Router
  components/       Componentes reutilizables de UI y navegación
  features/         Módulos funcionales futuros por dominio
  services/         Clientes y servicios externos futuros
  server/           Código del lado servidor
  hooks/            Hooks reutilizables
  lib/              Librerías internas e integraciones base
  utils/            Utilidades puras
  types/            Tipos globales
  styles/           Estilos globales y tokens visuales
  config/           Configuración centralizada
Documentacion/      Guías del equipo, arquitectura, frontend, backend e infraestructura
infra/              Docker, scripts y recursos operativos
```

## Documentación

La documentación está en [`Documentacion/`](./Documentacion/README.md):

- Frontend: [`Documentacion/frontend/README.md`](./Documentacion/frontend/README.md)
- Backend: [`Documentacion/backend/README.md`](./Documentacion/backend/README.md)
- Infraestructura: [`Documentacion/infraestructura/README.md`](./Documentacion/infraestructura/README.md)
- Equipo/Git: [`Documentacion/equipo/README.md`](./Documentacion/equipo/README.md)
- Arquitectura: [`Documentacion/arquitectura/README.md`](./Documentacion/arquitectura/README.md)

## Reglas importantes

1. No agregar lógica compleja directamente en páginas.
2. Crear módulos nuevos dentro de `src/features/<modulo>`.
3. Mantener componentes reutilizables en `src/components`.
4. Mantener acceso a datos e integraciones fuera de la UI.
5. Documentar decisiones importantes.
6. Ejecutar `pnpm typecheck` antes de enviar cambios.
