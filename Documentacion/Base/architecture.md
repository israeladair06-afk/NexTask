# Arquitectura — NexTask

Justificación de decisiones técnicas para infraestructura enterprise-grade.

## Stack tecnológico

### Frontend

**Next.js + App Router**
- Razón: Full-stack framework moderno, SSR + SSG, App Router (convención moderna)
- Ventaja: Rutas simples, layouts composables, optimizaciones automáticas
- Versión: 14.x estable

**React 18.3.x**
- Razón: Ecosistema maduro, suspense, concurrent rendering
- Ventaja: Amplio soporte comunitario, múltiples librerías disponibles

**TypeScript 5.4**
- Razón: Seguridad de tipos en desarrollo
- Ventaja: Catching errors early, mejor IDE support, documentación automática
- Config: strict: true, paths alias @/*

**Tailwind CSS 3.4**
- Razón: Utility-first, rápido, escalable
- Ventaja: Diseño corporativo consistente, responsive automático
- Config: Paleta slate + brand (colores profesionales)

### Backend / Infraestructura

**PostgreSQL 15**
- Razón: Relacional maduro, ACID compliance, excelente para ITSM
- Ventaja: Escalable, JSON native, full-text search, trigger support
- Deployment: Docker con volumen persistente

**Node.js 18+**
- Razón: Runtime estable, LTS, amplio soporte
- Ventaja: Compatible con npm ecosystem, pnpm optimization

**pnpm 8+**
- Razón: Gestor de paquetes rápido y eficiente
- Ventaja: Monorepo-ready, lock files reproducibles, espacio en disco
- Declarado: packageManager en package.json

### DevOps / Tooling

**Docker + Docker Compose**
- Razón: Reproducibilidad, aislamiento de servicios
- Ventaja: Mismo entorno dev/prod, escalable (agregar servicios fácil)
- Services: frontend (Next.js), db (PostgreSQL)

**ESLint + TypeScript ESLint**
- Razón: Linting moderno, seguridad de tipos
- Ventaja: Import sorting automático, reglas TypeScript built-in
- Config: next/core-web-vitals + plugin:import

**Prettier**
- Razón: Formato automático, sin debates de estilo
- Ventaja: Consistencia garantizada, integrado con husky

**husky + lint-staged**
- Razón: Git hooks automatizados, validación pre-commit
- Ventaja: Commits siempre limpios, evita subir código inválido

## Estructura modular

```
src/
├── app/           Next App Router (rutas y layouts)
├── components/    UI componentes reutilizables
│   └── ui/        Componentes atómicos
├── config/        Configuración centralizada (constants, API client)
├── features/      Módulos por feature (future: tickets, users, assets)
├── hooks/         Custom React hooks compartidos
├── lib/           Utilidades y adaptadores
│   └── db/        (Future: Prisma, migrations)
├── server/        Utilidades server-side, health checks
├── services/      Integraciones externas (APIs, terceros)
├── styles/        Estilos globales y Tailwind
└── types/         Tipos TypeScript globales (.d.ts)
```

**Razón de diseño:** Separación clara de concerns, scalability, colaboración en equipo.

## Decisiones clave

### 1. Por qué App Router en lugar de Pages Router

- Más moderno, soportado a largo plazo
- Mejor DX con layouts composables
- Server components para optimización

### 2. Por qué TypeScript strict

- Detecta errores en tiempo de compilación
- Documentación automática con types
- Mejor refactoring

### 3. Por qué Tailwind en lugar de CSS modules

- Rápido iterar en diseño corporativo
- Consistencia garantizada
- Fácil mantener paleta de colores

### 4. Por qué pnpm en lugar de npm

- Faster installs (~3x)
- Lock files reproducibles
- Monorepo-ready (para futuro)

### 5. Por qué Docker desde el inicio

- Dev/prod parity
- Fácil onboarding para nuevos devs
- Escalable (agregar servicios)

## Escalabilidad

El proyecto está preparado para crecer sin refactorización:

- **Features modulares:** agregar /features/tickets, /features/users, etc.
- **API routes:** `src/app/api/` lista para API endpoints
- **Prisma:** `/src/lib/db/` lista para ORM schema
- **Testing:** `/tests/` estructura lista para Jest/Vitest
- **CI/CD:** Scripts en package.json preparados para automatización
- **Authentication:** Estructura de roles y permisos lista

## Cero deuda técnica

Esta base está construida bajo principios enterprise:

- Configuración explícita, sin "magic"
- Documentación en código (JSDoc, comments)
- Scripts y alias claros
- Herramientas de calidad (lint, type-check, format)
- Git hooks (pre-commit validation)

## Próximas evoluciones (cuando corresponda)

1. **Prisma ORM:** `src/lib/db/prisma.ts` + migrations
2. **API routes:** RESTful o GraphQL en `src/app/api/`
3. **Autenticación:** Sesiones en `src/features/auth/`
4. **Testing:** Jest/Vitest en `tests/`
5. **CI/CD:** GitHub Actions o similar
