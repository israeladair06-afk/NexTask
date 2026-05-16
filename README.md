# NexTask — Entorno profesional

Plataforma base para IT Service Desk / Ticketing con arquitectura enterprise-grade.

**Fase actual:** Infraestructura y tooling. Sin lógica de negocio aún.

## Requisitos

- Node.js >= 18
- pnpm >= 8
- Docker + Docker Compose
- PostgreSQL 15 (en contenedor)

## Configuración rápida

```bash
# 1. Activar corepack (si no tienes pnpm)
corepack enable
corepack prepare pnpm@latest --activate

# 2. Instalar dependencias
pnpm install

# 3. Copiar variables de entorno
cp .env.example .env.local

# 4. Levantar entorno completo (con Docker)
docker-compose up --build

# 5. Frontend en http://localhost:3000
# PostgreSQL en localhost:5432
```

## Scripts disponibles

```bash
# Desarrollo
pnpm dev           # Frontend (hot reload)

# Build y producción
pnpm build         # Build Next.js
pnpm start         # Servidor producción

# Calidad de código
pnpm lint          # ESLint
pnpm lint:fix      # ESLint + fix
pnpm format        # Prettier (escritura)
pnpm format:check  # Prettier (verificación)
pnpm typecheck     # TypeScript strict
pnpm check         # Typecheck + lint
pnpm check:all     # Formato + typecheck + lint

# Docker
pnpm docker:up     # Levantar contenedores
pnpm docker:down   # Detener contenedores
pnpm docker:logs   # Ver logs en vivo
pnpm docker:clean  # Limpiar volúmenes
```

## Desarrollo local sin Docker

```bash
# Solo frontend (requiere PostgreSQL en 5432)
pnpm install
pnpm dev

# Frontend disponible en http://localhost:3000
```

## Desarrollo con Docker (recomendado)

```bash
cp .env.example .env.local
docker-compose up --build

# Logs en vivo
docker-compose logs -f frontend

# PostgreSQL accesible desde frontend en db:5432
```

## Estructura del proyecto

```
src/
├── app/           App Router (rutas)
├── components/    Componentes React
├── config/        Configuración centralizada
├── features/      Módulos por feature
├── hooks/         Custom React hooks
├── lib/           Utilidades y adaptadores
├── server/        Utilidades server-side
├── services/      Integraciones externas
├── styles/        Estilos globales
└── types/         Tipos TypeScript globales

infra/
├── docker/        Dockerfiles
└── scripts/       Scripts de infraestructura

docs/             Documentación técnica
notes/            Notas del proyecto
tests/            Tests (próximas fases)
```

## Configuración de tooling

- **ESLint:** TypeScript + import sorting automático
- **Prettier:** Formato consistente (100 chars)
- **TypeScript:** Strict mode activado
- **Tailwind:** Diseño corporativo (slate/brand colors)
- **husky + lint-staged:** Git hooks para calidad de commits

## Auditoría y actualizaciones

Ver `docs/AUDIT.md` para procedimientos de actualización segura de dependencias.

## Siguientes pasos

Próximas fases (cuando sea apropiado):

1. Prisma + migraciones DB
2. API routes y health checks
3. Autenticación base (sesiones)
4. Roles y permisos
5. Features modulares (tickets, usuarios, assets)
6. Testing (Jest + Vitest)
7. CI/CD pipelines

## Notas

- Diseño: corporativo, sobrio, profesional
- Base: limpia, modular, escalable
- Tecnología: moderna y estable
- Sin mocks innecesarios, sin IA aún, sin lógica de negocio
