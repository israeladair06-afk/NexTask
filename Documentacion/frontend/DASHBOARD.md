# 🖥️ Dashboard Base

## 📋 Descripción

El dashboard es el núcleo visual del proyecto. Es una interfaz administrativa moderna tipo ITSM/helpdesk, inicialmente vacía, con componentes placeholder listos para ser reemplazados por funcionalidades reales.

---

## 🏗️ Estructura del dashboard

```txt
src/
├── app/
│   ├── dashboard/
│   │   └── page.tsx              # Vista principal del dashboard
│   ├── tickets/
│   │   └── page.tsx              # Módulo de tickets (placeholder)
│   ├── usuarios/
│   │   └── page.tsx              # Módulo de usuarios (placeholder)
│   ├── base-conocimiento/
│   │   └── page.tsx              # Módulo de base de conocimiento (placeholder)
│   ├── reportes/
│   │   └── page.tsx              # Módulo de reportes (placeholder)
│   └── configuracion/
│       └── page.tsx              # Módulo de configuración (placeholder)
├── components/
│   └── navegacion/
│       ├── layout-dashboard.tsx   # Layout que envuelve todas las páginas
│       ├── sidebar.tsx            # Sidebar colapsable
│       └── header.tsx             # Header superior
└── config/
    ├── tema.tsx                   # Sistema de tema dark/light
    └── proveedores.tsx            # Proveedores globales
```

---

## 🧭 Sidebar

Ubicación: `src/components/navegacion/sidebar.tsx`

### Secciones del sidebar

| Grupo | Sección | Ruta | Descripción futura |
|-------|---------|------|-------------------|
| **General** | Dashboard | `/dashboard` | Resumen ejecutivo del sistema ITSM |
| **General** | Base de conocimiento | `/base-conocimiento` | Sistema RAG, artículos, embeddings, búsqueda inteligente |
| **Operación** | Tickets | `/tickets` | Gestión de solicitudes, SLA, prioridades, asignaciones |
| **Operación** | Usuarios | `/usuarios` | Administración de usuarios, roles, permisos, equipos |
| **Análisis** | Reportes | `/reportes` | Métricas, analítica, KPIs, exportaciones, tableros BI |
| **Sistema** | Configuración | `/configuracion` | Configuración del sistema, integraciones, auditoría |

### Funcionalidades

- ✅ Colapsable/expandible con animación suave
- ✅ Grupos de navegación visuales
- ✅ Indicador de ruta activa
- ✅ Tooltips en modo colapsado
- ✅ Footer con información de la plantilla
- ✅ Diseño responsive (oculto en móvil, visible en lg+)

---

## 📌 Header

Ubicación: `src/components/navegacion/header.tsx`

### Elementos

- **Menú hamburguesa** (visible en móvil) — para abrir sidebar
- **Título y subtítulo** — "Panel administrativo" / "Base profesional ITSM"
- **Búsqueda global** — Placeholder para búsqueda futura
- **Toggle de tema** — Cambia entre dark/light mode
- **Configuración** — Enlace rápido a página de configuración

---

## 📊 Páginas placeholder

Cada página del dashboard sigue este patrón:

```tsx
// src/app/dashboard/page.tsx
import { LayoutDashboard } from '@/components/navegacion/layout-dashboard';

export default function PaginaDashboard() {
  return (
    <LayoutDashboard>
      <div>
        {/* Aquí irá el resumen ejecutivo del sistema ITSM */}
        {/* Cards con KPIs, gráficas, actividad reciente, etc. */}
      </div>
    </LayoutDashboard>
  );
}
```

### Páginas actuales

| Página | Placeholder para |
|--------|-----------------|
| Dashboard | KPIs, gráficas, resumen ejecutivo |
| Tickets | Lista de tickets, filtros, creación, detalle |
| Usuarios | CRUD de usuarios, roles, permisos |
| Base de conocimiento | Artículos, buscador, categorías, RAG |
| Reportes | Métricas, exportaciones, tableros |
| Configuración | Ajustes del sistema, integraciones |

---

## 🎨 Estilo visual

- Paleta corporativa profesional (negros elegantes, blancos limpios)
- Bordes redondeados (`radius: 0.875rem`)
- Efectos glassmorphism sutiles (`backdrop-blur-xl`)
- Sombras suaves (`shadow-sm`)
- Transiciones animadas en interacciones
- Tipografía Inter (sans-serif moderna)

---

## 🔮 Próximas implementaciones

Cuando el equipo esté listo para agregar funcionalidad:

1. **Conectar sidebar con lógica real** — Estado activo, notificaciones, badges
2. **Reemplazar cards placeholder** — Por componentes con datos reales
3. **Agregar filtros y búsqueda** — En tickets, usuarios, base de conocimiento
4. **Implementar tabla de datos** — Para listar tickets, usuarios, etc.
5. **Agregar formularios** — Creación/edición de entidades
6. **Integrar gráficas** — Para reportes y dashboard principal