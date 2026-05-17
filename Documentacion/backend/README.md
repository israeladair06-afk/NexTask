# ⚙️ Documentación del Backend

## 📋 Responsabilidad

El backend contiene toda la lógica del servidor: rutas API, conexión a base de datos, servicios externos, autenticación y procesamiento de datos. Vive principalmente en rutas API de Next.js y en las capas de servidor.

> ⚠️ **Estado actual:** Estructura preparada. No hay lógica de negocio compleja todavía.

---

## 📁 Carpetas del backend

| Carpeta | Propósito |
|---------|-----------|
| `src/server/` | Utilidades y lógica del lado servidor (server-only) |
| `src/services/` | Clientes para APIs externas, correo, storage, IA, etc. |
| `src/lib/db/` | Cliente de base de datos (Prisma) y configuración |
| `src/types/` | Tipos TypeScript compartidos entre frontend y backend |
| `src/features/<modulo>/` | Casos de uso y lógica por dominio (cuando exista) |
| `src/app/api/` | Rutas API de Next.js (futuro) |

---

## 🗄️ Base de datos

### PostgreSQL

PostgreSQL se levanta automáticamente con Docker Compose.

**Variables de entorno relevantes:**

```env
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=nex_task_dev
PG_PORT=5432
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/nex_task_dev?schema=public
```

### Prisma (preparado)

Prisma está instalado y listo para usar:

```bash
# Inicializar Prisma (cuando sea momento)
pnpm prisma init

# Crear migración inicial
pnpm prisma migrate dev --name init

# Generar cliente Prisma
pnpm prisma generate

# Abrir Prisma Studio (interfaz gráfica)
pnpm prisma studio
```

**Ubicación del schema:** `prisma/schema.prisma` (a crear cuando se implemente)

**Cliente Prisma:** `src/lib/db/prisma.ts` — Singleton del cliente Prisma

---

## 🔌 API (futuro)

Las rutas API vivirán en `src/app/api/` siguiendo la convención de Next.js App Router.

### Estructura esperada

```txt
src/app/api/
├── auth/           # Autenticación (NextAuth/Auth.js)
│   ├── [...nextauth]/route.ts
├── tickets/        # CRUD de tickets
│   ├── route.ts          # GET (listar), POST (crear)
│   └── [id]/route.ts     # GET, PUT, DELETE
├── usuarios/       # CRUD de usuarios
│   ├── route.ts
│   └── [id]/route.ts
├── base-conocimiento/  # Artículos y búsqueda
│   ├── route.ts
│   └── [id]/route.ts
└── reportes/       # Generación de reportes
    └── route.ts
```

### Convenciones API

- ✅ Usar `NextResponse` y `NextRequest` de `next/server`
- ✅ Validar entradas con Zod (ya instalado)
- ✅ Manejar errores con try/catch y respuestas consistentes
- ✅ Usar HTTP status codes estándar
- ✅ Documentar cada endpoint con JSDoc
- ❌ No exponer datos sensibles en respuestas
- ❌ No hacer operaciones lentas sin considerar timeouts

---

## 🛡️ Autenticación (preparada)

NextAuth/Auth.js está instalado y listo:

```bash
# Configurar proveedores (Google, GitHub, Credentials, etc.)
# En src/app/api/auth/[...nextauth]/route.ts
```

**Variables necesarias:**
```env
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=generar-clave-segura
```

---

## 📋 Reglas del backend

1. **No escribir queries desde componentes React.** — Los datos deben venir de Server Components o APIs.
2. **No mezclar lógica de dominio con presentación.** — Separar casos de uso en `src/features/`.
3. **Validar entradas con esquemas.** — Usar Zod para validación de datos.
4. **Centralizar clientes externos.** — En `src/services/`, no desperdigados.
5. **Mantener secrets solo en variables de entorno.** — Nunca hardcodear.
6. **Usar `src/server/` para utilidades server-only.** — Nunca importar desde cliente.
7. **TypeScript estricto en todo el backend.** — `strict: true` en tsconfig.

---

## 🔮 Preparado para escalar

El backend está listo para agregar:

| Funcionalidad | Herramienta | Estado |
|--------------|-------------|--------|
| ORM | Prisma | ✅ Instalado |
| Autenticación | NextAuth/Auth.js | ✅ Instalado |
| Validación | Zod | ✅ Instalado |
| Base de datos | PostgreSQL | ✅ Docker listo |
| Cache / Colas | Redis | 🔧 Variable de entorno lista |
| WebSockets | Socket.io / Server-Sent Events | 📝 Preparado conceptualmente |
| RAG | Embeddings + LLM | 📝 Preparado conceptualmente |
| Microservicios | Docker Compose + API Gateway | 📝 Arquitectura lista |

---

## 📖 Más información

- [Guía de API](./API.md) — Convenciones detalladas para endpoints
- [Base de datos](./DATABASE.md) — Guía detallada de PostgreSQL + Prisma