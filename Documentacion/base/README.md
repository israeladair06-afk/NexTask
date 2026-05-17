# 🏗️ Stack Tecnológico y Decisiones

## 📋 Stack tecnológico

| Capa | Tecnología | Versión | Propósito |
|------|-----------|---------|-----------|
| Framework | Next.js (App Router) | 15+ | Full-stack, SSR + SSG, routing moderno |
| UI | React | 19+ | Interfaz de usuario declarativa |
| Lenguaje | TypeScript | 5.6+ | Seguridad de tipos en desarrollo |
| Estilos | Tailwind CSS | 3.4+ | Utility-first, diseño responsive |
| Componentes | shadcn/ui style | — | Componentes base modernos |
| Base de datos | PostgreSQL | 15 | Relacional, ACID, maduro |
| ORM | Prisma | 5.8+ | Tipado seguro, migrations, studio |
| Contenedores | Docker + Compose | — | Entornos reproducibles |
| Paquetería | pnpm | 8+ | Rápido, eficiente, monorepo-ready |

---

## 📋 ¿Por qué estas tecnologías?

### Next.js + App Router
- **Framework full-stack moderno** — Sirve frontend y backend en un solo proyecto
- **App Router** — Routing basado en archivos, layouts composables, server components
- **SSR + SSG** — Renderizado híbrido para rendimiento óptimo
- **Ecosistema maduro** — Amplia comunidad, documentación, plugins

### React
- **Declarativo** — Describe qué UI quieres, React se encarga del cómo
- **Componentes reutilizables** — Base de cualquier sistema de diseño
- **Server Components** — Reduce JavaScript del lado cliente

### TypeScript (strict mode)
- **Seguridad de tipos** — Detecta errores en compilación, no en ejecución
- **Documentación automática** — Los tipos documentan el código
- **Refactoring seguro** — Cambiar nombres/tipos sin romper nada
- **strict: true** — La opción más restrictiva para código enterprise

### Tailwind CSS
- **Utility-first** — Rápido prototipado, sin nombres de clases inventados
- **Consistencia** — Paleta de colores centralizada, espaciado uniforme
- **Eliminación de CSS no usado** — Build pequeño en producción
- **Responsive** — Diseño adaptable sin media queries separadas

### PostgreSQL
- **Maduro y confiable** — 30+ años de desarrollo activo
- **ACID compliance** — Transacciones seguras para datos críticos
- **JSON nativo** — Flexibilidad de NoSQL cuando se necesita
- **Full-text search** — Búsqueda avanzada sin Elasticsearch

### Prisma
- **Tipado seguro** — El ORM más type-safe para TypeScript
- **Migrations** — Versionado de esquemas de base de datos
- **Studio** — UI visual para explorar datos en desarrollo
- **Relaciones intuitivas** — Modelado de datos limpio

### Docker + Docker Compose
- **Entorno reproducible** — Misma configuración en cualquier máquina
- **Aislamiento** — Servicios separados sin conflictos
- **Onboarding rápido** — Nuevos devs: solo Docker y git clone
- **Escalable** — Agregar servicios (Redis, Elasticsearch) es trivial

### pnpm
- **Rápido** — Instalaciones ~3x más rápidas que npm
- **Eficiente** — Usa hard links, ahorra espacio en disco
- **Monorepo-ready** — Listo para cuando el proyecto crezca
- **Lock file reproducible** — pnpm-lock.yaml garantiza consistencia

---

## 📋 ¿Por qué NO otras tecnologías?

| Tecnología | Descartada por |
|------------|---------------|
| Pages Router | Deprecado por Next.js, App Router es el futuro |
| JavaScript | TypeScript ofrece seguridad que JS no puede igualar |
| CSS Modules | Menos flexible que Tailwind, más boilerplate |
| MySQL | Menos features que PostgreSQL (JSON, full-text, etc.) |
| npm | Más lento, menos eficiente que pnpm |
| Yarn | Menos adopción que pnpm, no significantemente mejor |

---

## 📋 Requisitos del sistema

| Herramienta | Versión mínima |
|-------------|----------------|
| Node.js | 18.0.0 |
| pnpm | 8.0.0 |
| Docker | 24.0.0 |
| Docker Compose | 2.20.0 |
| Git | 2.40.0 |
| RAM | 4 GB (recomendado 8 GB) |
| Disco | 1 GB libres (más con datos de BD) |

---

## 📋 Buenas prácticas obligatorias

1. **TypeScript estricto siempre** — `strict: true` en tsconfig.json
2. **Commits convencionales** — feat:, fix:, docs:, refactor:, chore:
3. **Validación pre-commit** — `pnpm check` antes de cada commit
4. **Ramas por feature** — Una rama por tarea, PR para mergear
5. **Documentación** — Toda decisión importante debe documentarse
6. **No credenciales** — Usar `.env.local`, mantener `.env.example`
7. **Responsabilidad única** — Cada archivo hace una cosa
8. **Componentes en español** — Nombres claros en español
9. **Sin lógica en páginas** — `src/app` solo compone, no implementa
10. **Separación frontend/backend** — Server Components + API routes