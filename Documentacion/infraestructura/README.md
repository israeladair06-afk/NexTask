# 🐳 Documentación de Infraestructura

## 📋 Responsabilidad

La carpeta `infra/` y los archivos de configuración en la raíz contienen todo lo necesario para el entorno de desarrollo, despliegue y operación del proyecto.

---

## 📁 Archivos de infraestructura

| Archivo/Carpeta | Propósito |
|----------------|-----------|
| `docker-compose.yml` | Orquestación de servicios (frontend + PostgreSQL) |
| `infra/docker/Dockerfile` | Imagen Docker para Next.js en desarrollo |
| `infra/scripts/` | Scripts auxiliares (setup, health checks) |
| `.env.example` | Variables de entorno de ejemplo |
| `.dockerignore` | Archivos excluidos del contexto Docker |
| `.eslintrc.json` | Configuración de ESLint |
| `.prettierrc` | Configuración de Prettier |
| `.editorconfig` | Configuración del editor |
| `tsconfig.json` | Configuración de TypeScript |
| `tailwind.config.ts` | Configuración de Tailwind CSS |
| `next.config.mjs` | Configuración de Next.js |

---

## 📋 Servicios orquestados

### frontend

| Propiedad | Valor |
|-----------|-------|
| Puerto | `${NEXT_PORT:-3000}` |
| Dockerfile | `infra/docker/Dockerfile` |
| Comando | `pnpm dev` |
| Depende de | db (saludable) |

### db (PostgreSQL)

| Propiedad | Valor |
|-----------|-------|
| Imagen | `postgres:15-alpine` |
| Puerto | `${PG_PORT:-5432}` |
| Volumen | `postgres_data` (persistente) |
| Health check | `pg_isready` |

---

## 🔧 Herramientas de calidad

| Herramienta | Archivo | Propósito |
|------------|---------|-----------|
| ESLint | `.eslintrc.json` | Linting de TypeScript/React |
| Prettier | `.prettierrc` | Formateo automático de código |
| Husky | `.husky/` | Git hooks (pre-commit) |
| Lint-staged | `.lintstagedrc.json` | Validar solo archivos modificados |
| TypeScript | `tsconfig.json` | Strict mode |

---

## 📋 Buenas prácticas

1. ✅ No subir `.env` ni `.env.local` — Solo `.env.example` debe estar versionado
2. ✅ Mantener `.env.example` actualizado con todas las variables
3. ✅ No hardcodear credenciales en ningún archivo
4. ✅ Documentar servicios nuevos en Docker Compose
5. ✅ Usar los scripts de `package.json` en lugar de comandos largos
6. ✅ Ejecutar `pnpm check` antes de cada commit
7. ❌ No instalar dependencias globales si pueden ser locales
8. ❌ No modificar configuraciones de herramienta sin avisar al equipo

---

## 📖 Más información

- [Guía detallada de Docker](./DOCKER.md)