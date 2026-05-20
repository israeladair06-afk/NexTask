# Documentación de API para Backend — NexTask WMS

> **Estado:** Frontend listo. Backend pendiente de implementación.
> **Propósito:** Esta documentación describe todos los endpoints que el equipo backend debe implementar para conectar el frontend del WMS con datos reales.

---

## Índice de Endpoints

| Método | Endpoint | Propósito | Prioridad |
|--------|----------|-----------|-----------|
| GET | `/api/kpis` | KPIs principales del dashboard | 🔴 Alta |
| GET | `/api/warehouse/layout` | Layout de la bodega con racks | 🔴 Alta |
| GET | `/api/warehouse/activity?range=hoy\|semana\|mes` | Actividad operativa del almacén | 🔴 Alta |
| GET | `/api/tasks/urgent` | Tareas urgentes y pedidos críticos | 🟡 Media |
| GET | `/api/warehouse/zones` | Ocupación por zona | 🟡 Media |
| GET | `/api/picking/instructions` | Instrucciones activas de picking | 🟡 Media |
| GET | `/api/alerts/recent` | Alertas operativas recientes | 🟡 Media |
| GET | `/api/modules` | Módulos activos del sistema | 🟢 Normal |
| GET | `/api/system/status` | Estado de integración del sistema | 🟢 Normal |

---

## 1. GET /api/kpis

**Propósito:** Retorna los indicadores clave del dashboard principal.

### Respuesta esperada (JSON)

```json
{
  "skuTotales": 12450,
  "ordenesActivas": 247,
  "capacidadOcupada": 72,
  "alertasCriticas": 7,
  "ubicacionesTotales": 2400,
  "ubicacionesDisponibles": 432,
  "pickingPendientes": 89,
  "packingPendientes": 45,
  "recepcionesPendientes": 16,
  "despachosPendientes": 23
}
```

### Tipos TypeScript (referencia)

```typescript
interface KpiWMS {
  skuTotales: number;
  ordenesActivas: number;
  capacidadOcupada: number;       // porcentaje 0-100
  alertasCriticas: number;
  ubicacionesTotales: number;
  ubicacionesDisponibles: number;
  pickingPendientes: number;
  packingPendientes: number;
  recepcionesPendientes: number;
  despachosPendientes: number;
}
```

### Frontend: `src/app/dashboard/page.tsx`
- Línea donde se importa el tipo: `import type { ... KpiWMS ... } from '@/types/wms'`
- La constante `KPIS` en la línea ~28 contiene valores mock que deben reemplazarse.
- Se sugiere usar `fetch('/api/kpis')` en un `useEffect` o con React Query/SWR.

---

## 2. GET /api/warehouse/layout

**Propósito:** Retorna la estructura completa de pasillos y racks de la bodega.

### Respuesta esperada (JSON)

```json
{
  "pasillos": [
    {
      "id": "dock-rec",
      "nombre": "Dock Recepción",
      "tipo": "recepcion",
      "racks": [
        {
          "id": "REC-01",
          "codigo": "REC-01",
          "estado": "disponible",
          "nivel": 1,
          "porcentajeOcupacion": 0
        }
      ]
    }
  ]
}
```

### Valores posibles para `tipo`
| Valor | Significado |
|-------|-------------|
| `almacenamiento` | Zona de almacenaje general |
| `recepcion` | Muelle o zona de recepción |
| `despacho` | Muelle o zona de despacho |
| `picking` | Zona de preparación de pedidos |
| `transito` | Pasillos de tránsito o circulación |

### Valores posibles para `estado` (en rack)
| Valor | Color | Significado |
|-------|-------|-------------|
| `disponible` | 🟢 Verde | Ubicación libre |
| `parcial` | 🟡 Ámbar | Ubicación parcialmente ocupada |
| `lleno` | 🔴 Rojo | Ubicación completamente ocupada |
| `bloqueado` | ⚫ Gris | Ubicación bloqueada (inaccesible) |
| `mantenimiento` | 🔵 Azul | Ubicación en mantenimiento |

### Frontend: `src/app/mapeo-bodega/page.tsx`
- Layout simulado en la constante `LAYOUT_BODEGA` (línea ~64).
- Reemplazar con datos de API en un `useEffect` / React Query.

---

## 3. GET /api/warehouse/activity

**Propósito:** Retorna el resumen de actividad operativa del almacén.

### Parámetros query
| Parámetro | Valor | Descripción |
|-----------|-------|-------------|
| `range` | `hoy` / `semana` / `mes` | Rango de tiempo para el resumen |

### Respuesta esperada (JSON)

```json
{
  "recepciones": 16,
  "pickings": 89,
  "packings": 45,
  "despachos": 23,
  "totalOperaciones": 173
}
```

### Frontend: `src/app/dashboard/page.tsx`
- Mock data en constante `actividadMock` (línea ~88).
- El estado `rangoActividad` controla el tab activo (`hoy|semana|mes`).
- Se debe llamar a `/api/warehouse/activity?range=hoy` y variar según el tab.

---

## 4. GET /api/tasks/urgent

**Propósito:** Retorna las tareas operativas urgentes y pedidos críticos.

### Respuesta esperada (JSON)

```json
[
  {
    "id": "T-001",
    "tipo": "picking",
    "titulo": "Pedido EXP-4521 - Urgente (Cliente VIP)",
    "prioridad": "critica",
    "origen": "B-12-04",
    "destino": "Dock 3",
    "fechaLimite": "Hoy 14:00",
    "estado": "pendiente"
  }
]
```

### Valores posibles
| Campo | Valores |
|-------|---------|
| `tipo` | `picking`, `packing`, `recepcion`, `despacho`, `inventario` |
| `prioridad` | `critica`, `alta`, `media`, `baja` |
| `estado` | `pendiente`, `en_progreso`, `completada` |

---

## 5. GET /api/warehouse/zones

**Propósito:** Retorna la ocupación por zona de la bodega.

### Respuesta esperada (JSON)

```json
[
  {
    "zona": "A — Recepción",
    "total": 240,
    "ocupado": 192,
    "disponible": 48,
    "porcentajeOcupacion": 80
  }
]
```

### Frontend
- Se usa en el componente `BarraOcupacion` en el dashboard.
- La barra de progreso cambia de color según el porcentaje:
  - ≤ 65%: verde (`bg-emerald-500`)
  - 66-85%: ámbar (`bg-amber-500`)
  - > 85%: rojo (`bg-red-500`)

---

## 6. GET /api/picking/instructions

**Propósito:** Retorna las instrucciones activas de picking para los operadores.

### Respuesta esperada (JSON)

```json
[
  {
    "id": "PK-001",
    "orden": "EXP-4521",
    "sku": "SKU-8842",
    "producto": "Caja Tornillos M8 x 100",
    "cantidad": 48,
    "ubicacion": "B-12-04",
    "destino": "Dock 3",
    "prioridad": "express",
    "estado": "pendiente"
  }
]
```

### Valores posibles
| Campo | Valores |
|-------|---------|
| `prioridad` | `normal`, `urgente`, `express` |
| `estado` | `pendiente`, `asignado`, `en_curso`, `completado` |

---

## 7. GET /api/alerts/recent

**Propósito:** Retorna las alertas operativas más recientes.

### Respuesta esperada (JSON)

```json
[
  {
    "id": "AL-001",
    "tipo": "critico",
    "mensaje": "Stock crítico: SKU-8842 por debajo del mínimo",
    "modulo": "Inventario",
    "timestamp": "Hace 5 min",
    "prioridad": 1
  }
]
```

### Valores posibles
| Campo | Valores |
|-------|---------|
| `tipo` | `critico`, `advertencia`, `info` |
| `prioridad` | `1` (máxima), `2` (media), `3` (baja) |

### Frontend
- Cada tipo de alerta tiene un color específico:
  - `critico`: 🔴 Rojo
  - `advertencia`: 🟡 Ámbar
  - `info`: 🔵 Azul

---

## 8. GET /api/modules

**Propósito:** Retorna la lista de módulos disponibles del WMS.

### Respuesta esperada (JSON)

```json
[
  {
    "id": "dashboard",
    "nombre": "Dashboard",
    "descripcion": "Centro de control y monitoreo general del WMS",
    "href": "/dashboard",
    "icono": "LayoutDashboard",
    "grupo": "Operaciones",
    "estado": "activo"
  }
]
```

### Valores posibles
| Campo | Valores |
|-------|---------|
| `grupo` | `Operaciones`, `Inventario`, `Logística`, `Monitoreo`, `Configuración` |
| `estado` | `activo`, `preparado`, `proximamente` |

### Nota
Actualmente los módulos se definen estáticamente en `src/config/navegacion.ts`.
Si se desea que sean dinámicos desde backend, reemplazar la constante `MODULOS_WMS` con datos de API.

---

## 9. GET /api/system/status

**Propósito:** Retorna el estado de integración de todos los componentes del sistema.

### Respuesta esperada (JSON)

```json
{
  "version": "v1.0.0",
  "frontend": "completo",
  "backend": "pendiente",
  "baseDatos": "pendiente",
  "api": "no_conectada",
  "ultimaSync": "—"
}
```

### Valores posibles
| Campo | Valores |
|-------|---------|
| `frontend` | `completo`, `parcial` |
| `backend` | `pendiente`, `parcial`, `completo` |
| `baseDatos` | `pendiente`, `conectado` |
| `api` | `no_conectada`, `conectada` |

### Frontend
- Se renderiza en la card "Estado del Sistema" en el dashboard.
- Los badges cambian según el estado:
  - `completo` / `conectado` → badge verde
  - `pendiente` / `parcial` → badge ámbar
  - `no_conectada` → badge outline

---

## Notas Técnicas para el Equipo Backend

### CORS
El frontend se ejecuta en `http://localhost:3000` en desarrollo.
Asegurar que el backend permita CORS desde ese origen.

### Formato de Fechas
Usar formato ISO 8601 (`2026-05-20T14:00:00Z`) en los campos de timestamp.
El frontend puede formatear para visualización.

### Convención de Errores
```json
{
  "error": true,
  "codigo": "NOT_FOUND",
  "mensaje": "Recurso no encontrado"
}
```

### Paginación
Para endpoints que puedan devolver listas largas (ej. instrucciones de picking, alertas), implementar paginación vía query params `?page=1&limit=20`.

```json
{
  "data": [...],
  "paginacion": {
    "page": 1,
    "limit": 20,
    "total": 156,
    "totalPages": 8
  }
}
```

### Mapa de Archivos Frontend que Deben Conectarse

| Archivo | Endpoint a consumir | Líneas clave |
|---------|---------------------|-------------|
| `src/app/dashboard/page.tsx` | `/api/kpis`, `/api/warehouse/activity`, `/api/tasks/urgent`, `/api/warehouse/zones`, `/api/picking/instructions`, `/api/alerts/recent`, `/api/system/status` | Constantes mock desde línea ~28 hasta ~99 |
| `src/app/mapeo-bodega/page.tsx` | `/api/warehouse/layout`, `/api/warehouse/zones` | Constante `LAYOUT_BODEGA` línea ~64 |
| `src/app/lobby/page.tsx` | `/api/modules` (opcional) | Constante `stats` línea ~18 |

---

> **Documentación generada:** 20/05/2026
> **Versión Frontend:** v1.0.0
> **Contacto:** Equipo Frontend NexTask
</content>
</filepath>