# 🔌 Guía de APIs

## 📋 Convenciones generales

Este documento establece las convenciones para crear endpoints API en NexTask.

---

## 🏗️ Estructura de rutas

```txt
src/app/api/
├── <recurso>/           # Plural, en español
│   ├── route.ts        # GET (listar), POST (crear)
│   └── [id]/route.ts   # GET (obtener), PUT (actualizar), DELETE (eliminar)
```

### Ejemplo: Tickets

```txt
src/app/api/tickets/
├── route.ts             # GET /api/tickets, POST /api/tickets
└── [id]/route.ts        # GET /api/tickets/123, PUT /api/tickets/123, DELETE /api/tickets/123
```

---

## 📝 Formato de respuestas

### Éxito

```typescript
// GET /api/tickets (listar)
{
  "data": [...],
  "meta": {
    "total": 100,
    "pagina": 1,
    "porPagina": 20,
    "totalPaginas": 5
  }
}

// GET /api/tickets/123 (obtener uno)
{
  "data": { ... }
}

// POST /api/tickets (crear)
{
  "data": { ... },
  "mensaje": "Ticket creado exitosamente"
}
```

### Error

```typescript
{
  "error": {
    "codigo": "VALIDATION_ERROR",
    "mensaje": "Los datos proporcionados no son válidos",
    "detalles": [
      { "campo": "titulo", "mensaje": "El título es requerido" }
    ]
  }
}
```

### Códigos HTTP

| Código | Uso |
|--------|-----|
| 200 | Éxito (GET, PUT) |
| 201 | Creado (POST) |
| 204 | Sin contenido (DELETE) |
| 400 | Error de validación |
| 401 | No autenticado |
| 403 | No autorizado |
| 404 | Recurso no encontrado |
| 409 | Conflicto |
| 422 | Entidad no procesable |
| 500 | Error interno del servidor |

---

## ✅ Validación con Zod

```typescript
import { z } from 'zod';

// Esquema de validación para crear ticket
export const crearTicketSchema = z.object({
  titulo: z.string().min(3, 'El título debe tener al menos 3 caracteres').max(200),
  descripcion: z.string().min(10).max(2000).optional(),
  prioridad: z.enum(['baja', 'media', 'alta', 'critica']),
  categoria: z.string().min(1),
});

export type CrearTicketInput = z.infer<typeof crearTicketSchema>;
```

---

## 🏗️ Template de endpoint

```typescript
// src/app/api/tickets/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

/**
 * GET /api/tickets
 * Obtiene lista paginada de tickets.
 *
 * @query pagina - Número de página (default: 1)
 * @query porPagina - Items por página (default: 20)
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const pagina = Number(searchParams.get('pagina')) || 1;
    const porPagina = Number(searchParams.get('porPagina')) || 20;

    // Aquí irá la lógica de negocio
    // const tickets = await ticketService.listar({ pagina, porPagina });

    return NextResponse.json({
      data: [],
      meta: { total: 0, pagina, porPagina, totalPaginas: 0 },
    });
  } catch (error) {
    console.error('Error al listar tickets:', error);
    return NextResponse.json(
      { error: { codigo: 'INTERNAL_ERROR', mensaje: 'Error al procesar la solicitud' } },
      { status: 500 }
    );
  }
}

/**
 * POST /api/tickets
 * Crea un nuevo ticket.
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validar entrada
    // const datos = crearTicketSchema.parse(body);

    // Aquí irá la lógica de creación
    // const ticket = await ticketService.crear(datos);

    return NextResponse.json(
      { data: {}, mensaje: 'Ticket creado exitosamente' },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          error: {
            codigo: 'VALIDATION_ERROR',
            mensaje: 'Datos inválidos',
            detalles: error.errors.map((e) => ({
              campo: e.path.join('.'),
              mensaje: e.message,
            })),
          },
        },
        { status: 400 }
      );
    }

    console.error('Error al crear ticket:', error);
    return NextResponse.json(
      { error: { codigo: 'INTERNAL_ERROR', mensaje: 'Error al procesar la solicitud' } },
      { status: 500 }
    );
  }
}
```

---

## 🧪 Buenas prácticas

1. ✅ **Validar siempre** las entradas con Zod
2. ✅ **Manejar errores** con try/catch en cada endpoint
3. ✅ **Usar NextResponse.json()** en lugar de Response.json()
4. ✅ **Documentar** cada endpoint con JSDoc
5. ✅ **Usar servicios** (`src/services/`) para lógica de negocio
6. ✅ **Paginación** en endpoints de listado
7. ❌ No exponer IDs internos si no es necesario
8. ❌ No hacer operaciones sincrónicas lentas
9. ❌ No hardcodear valores sensibles

---

## 🔐 Autenticación y autorización

```typescript
// Middleware para proteger rutas API
export async function middleware(request: NextRequest) {
  // const sesion = await getServerSession(authOptions);
  // if (!sesion) {
  //   return NextResponse.json(
  //     { error: { codigo: 'UNAUTHORIZED', mensaje: 'No autenticado' } },
  //     { status: 401 }
  //   );
  // }
  return NextResponse.next();
}