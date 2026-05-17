# Documentación de Infraestructura

## Archivos principales

| Archivo/carpeta | Uso |
| --- | --- |
| `docker-compose.yml` | Orquesta frontend y PostgreSQL |
| `infra/docker/Dockerfile` | Imagen de desarrollo para Next.js |
| `infra/scripts` | Scripts auxiliares |
| `.env.example` | Variables de entorno de ejemplo |
| `.dockerignore` | Archivos excluidos del contexto Docker |

## Levantar PostgreSQL y la app

```bash
cp .env.example .env.local
pnpm docker:up
```

## Detener servicios

```bash
pnpm docker:down
```

## Limpiar volúmenes

> Esto borra datos locales de PostgreSQL.

```bash
pnpm docker:clean
```

## Servicios actuales

### db

- Imagen: `postgres:15-alpine`
- Puerto local: `${PG_PORT:-5432}`
- Volumen persistente: `postgres_data`

### frontend

- Construido desde `infra/docker/Dockerfile`
- Puerto local: `${NEXT_PORT:-3000}`
- Comando: `pnpm dev`

## Buenas prácticas

- No subir `.env.local`.
- Mantener `.env.example` actualizado.
- No hardcodear credenciales.
- Documentar cualquier nuevo servicio agregado a Docker Compose.
- Evitar dependencias globales: usar scripts del proyecto.
