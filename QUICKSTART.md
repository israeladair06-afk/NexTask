# QUICKSTART - NexTask

## Requisitos

- Node.js 18 o superior
- pnpm
- Docker y Docker Compose
- Git

## 1. Instalar dependencias

```bash
pnpm install
```

## 2. Configurar variables

```bash
cp .env.example .env.local
```

Edita `.env.local` si necesitas cambiar puertos o credenciales.

## 3. Ejecutar sin Docker

```bash
pnpm dev
```

Abrir <http://localhost:3000>.

## 4. Ejecutar con Docker

```bash
pnpm docker:up
```

Esto levanta:

- `frontend`: Next.js
- `db`: PostgreSQL

## 5. Detener Docker

```bash
pnpm docker:down
```

## 6. Validar el proyecto

```bash
pnpm typecheck
pnpm lint
pnpm build
```

## Primeros lugares a revisar

1. `src/app/dashboard/page.tsx`
2. `src/components/navegacion/sidebar.tsx`
3. `src/styles/globals.css`
4. `Documentacion/README.md`
