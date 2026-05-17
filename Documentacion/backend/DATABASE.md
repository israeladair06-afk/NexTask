# 🗄️ Guía de Base de Datos

## 📋 Descripción

NexTask usa PostgreSQL como base de datos principal, orquestada con Docker Compose. Prisma ORM está preparado para cuando se implemente el modelo de datos.

---

## 🐘 PostgreSQL con Docker

### Iniciar PostgreSQL

```bash
# Iniciar solo PostgreSQL
docker-compose up db -d

# Iniciar PostgreSQL junto con la app
pnpm docker:up
```

### Conectarse a PostgreSQL

```bash
# Usando psql dentro del contenedor
docker-compose exec db psql -U postgres -d nex_task_dev

# Usando herramienta externa
# Host: localhost
# Puerto: 5432
# Usuario: postgres
# Contraseña: postgres
# Base de datos: nex_task_dev
```

### Comandos útiles

```bash
# Ver logs de PostgreSQL
pnpm docker:logs db

# Detener PostgreSQL
pnpm docker:down

# Reiniciar desde cero (borra datos)
pnpm docker:clean
```

---

## 🔧 Prisma ORM

### Inicialización

```bash
# Solo cuando estés listo para implementar modelos
pnpm prisma init
```

Esto creará:
```txt
prisma/
└── schema.prisma    # Modelos de datos
```

### Schema de ejemplo

```prisma
// prisma/schema.prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model Usuario {
  id        String   @id @default(cuid())
  email     String   @unique
  nombre    String
  password  String
  rol       Rol      @default(USUARIO)
  activo    Boolean  @default(true)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  tickets   Ticket[]
}

model Ticket {
  id          String   @id @default(cuid())
  titulo      String
  descripcion String?
  estado      Estado   @default(ABIERTO)
  prioridad   Prioridad @default(MEDIA)
  usuarioId   String
  usuario     Usuario  @relation(fields: [usuarioId], references: [id])
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}

enum Rol {
  ADMIN
  AGENTE
  USUARIO
}

enum Estado {
  ABIERTO
  EN_PROGRESO
  RESUELTO
  CERRADO
}

enum Prioridad {
  BAJA
  MEDIA
  ALTA
  CRITICA
}
```

### Migraciones

```bash
# Crear migración
pnpm prisma migrate dev --name descripcion-de-cambios

# Aplicar migraciones en producción
pnpm prisma migrate deploy

# Generar cliente Prisma después de cambios
pnpm prisma generate

# Abrir Prisma Studio (UI para ver datos)
pnpm prisma studio
```

### Cliente Prisma

```typescript
// src/lib/db/prisma.ts
import { PrismaClient } from '@prisma/client';

/**
 * Singleton del cliente Prisma para evitar múltiples instancias
 * durante hot-reload en desarrollo.
 */
const globalParaPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma = globalParaPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== 'production') {
  globalParaPrisma.prisma = prisma;
}

export default prisma;
```

---

## 🔄 Flujo de trabajo con base de datos

### 1. Definir modelo en schema.prisma

```prisma
model Articulo {
  id        String   @id @default(cuid())
  titulo    String
  contenido String
  autorId   String
  autor     Usuario  @relation(fields: [autorId], references: [id])
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

### 2. Crear migración

```bash
pnpm prisma migrate dev --name add-articulos
```

### 3. Usar en servicios

```typescript
// src/features/base-conocimiento/services/articulos.ts
import prisma from '@/lib/db/prisma';

export async function listarArticulos() {
  return prisma.articulo.findMany({
    include: { autor: { select: { nombre: true } } },
    orderBy: { createdAt: 'desc' },
  });
}
```

---

## 📋 Buenas prácticas

1. ✅ **Siempre usar migraciones** — No modificar la base de datos manualmente
2. ✅ **Validar datos antes de guardar** — Usar Zod en el servidor
3. ✅ **Usar transacciones** para operaciones que afectan múltiples tablas
4. ✅ **Indexar campos de búsqueda frecuente** — email, estado, fecha
5. ✅ **Usar `select` para limitar campos devueltos** — No exponer datos sensibles
6. ✅ **Mantener el schema versionado** — Cada migración es un commit
7. ❌ No hardcodear valores de conexión — Usar siempre variables de entorno
8. ❌ No hacer queries desde el frontend — Siempre a través de API o Server Components

---

## 📊 Variables de entorno

```env
# URL de conexión para Prisma
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/nex_task_dev?schema=public

# Configuración de PostgreSQL en Docker
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=nex_task_dev
PG_PORT=5432