# 🎨 Documentación del Frontend

## 📋 Responsabilidad

El frontend contiene toda la experiencia visual del dashboard administrativo ITSM/helpdesk. Su responsabilidad es presentar la interfaz de usuario, manejar la navegación y proporcionar los componentes reutilizables que el equipo usará para construir módulos funcionales.

> ⚠️ **Estado actual:** UI base placeholder. No hay lógica de negocio compleja todavía.

---

## 📁 Carpetas del frontend

| Carpeta | Propósito |
|---------|-----------|
| `src/app` | Rutas, layouts y páginas del App Router de Next.js |
| `src/components/navegacion/` | Sidebar, header y layout del dashboard |
| `src/components/ui/` | Componentes base estilo shadcn/ui (botones, tarjetas, inputs, etc.) |
| `src/components/` | Componentes reutilizables globales (futuro) |
| `src/features/<modulo>/` | Componentes específicos por módulo (futuro) |
| `src/hooks/` | Hooks React personalizados reutilizables |
| `src/styles/` | Estilos globales, variables CSS y tokens de tema |
| `src/config/` | Proveedores (theme, auth futuro), metadata y constantes |

---

## 🖥️ Dashboard base

El dashboard está compuesto por:

| Componente | Archivo | Descripción |
|------------|---------|-------------|
| Layout | `src/components/navegacion/layout-dashboard.tsx` | Layout principal que envuelve todo el dashboard |
| Sidebar | `src/components/navegacion/sidebar.tsx` | Navegación lateral colapsable con grupos |
| Header | `src/components/navegacion/header.tsx` | Barra superior con búsqueda y toggle de tema |
| Páginas | `src/app/<ruta>/page.tsx` | Cada sección tiene su página placeholder |

### Funcionalidades del dashboard base

- ✅ Sidebar profesional colapsable en escritorio
- ✅ Grupos de navegación: General, Operación, Análisis, Sistema
- ✅ Header superior con búsqueda placeholder
- ✅ Tema oscuro por defecto con toggle dark/light
- ✅ Cards placeholder en cada página
- ✅ Diseño responsive
- ✅ Navegación placeholder para 6 secciones

---

## 🧩 Componentes UI disponibles

| Componente | Archivo | Descripción |
|------------|---------|-------------|
| `Boton` | `src/components/ui/boton.tsx` | Botón con variantes (primario, secundario, fantasma, outline) |
| `Tarjeta` | `src/components/ui/tarjeta.tsx` | Contenedor tipo card con título y descripción |
| `Nav` | `src/components/ui/Nav.tsx` | Componente de navegación auxiliar |

---

## 🌗 Tema global

El sistema de tema está implementado con Context API de React:

- `src/config/tema.tsx` — Proveedor y hook `useTema`
- `src/config/proveedores.tsx` — Proveedor raíz que envuelve la app
- `src/styles/globals.css` — Variables CSS para dark/light mode

**Características:**
- Dark mode como predeterminado (estética enterprise ITSM)
- Persistencia en localStorage (`nex-task-tema`)
- Soporte para tema `system` (sigue preferencia del SO)
- Transiciones suaves entre modos

---

## 📐 Convenciones de UI

1. **Usar clases Tailwind simples y legibles** — Evitar estilos inline complejos.
2. **No duplicar estilos** — Si un patrón se repite, crear un componente.
3. **Mantener layouts responsive** — Diseñar primero para móvil, luego escalar.
4. **No instalar librerías visuales sin discutirlo** — Coordinar con el equipo.
5. **Textos placeholder claros** — Cuando un módulo no tenga lógica real, dejar comentarios tipo `// Aquí irá el sistema de tickets`.
6. **Usar `cn()` para clases condicionales** — Importar desde `@/lib/cn`.

```tsx
import { cn } from '@/lib/cn';

export function EstadoBadge({ activo }: { activo: boolean }) {
  return (
    <span className={cn(
      'px-2 py-1 rounded-full text-xs font-medium',
      activo ? 'bg-green-500/20 text-green-500' : 'bg-muted text-muted-foreground'
    )}>
      {activo ? 'Activo' : 'Inactivo'}
    </span>
  );
}
```

---

## 🆕 Cómo agregar una nueva página

1. Crear carpeta en `src/app/<ruta>/` con un `page.tsx`
2. Usar el layout del dashboard si es una página interna
3. Agregar la ruta al sidebar en `src/components/navegacion/sidebar.tsx`
4. Crear página placeholder con cards descriptivas
5. Si el módulo tendrá lógica propia, crear `src/features/<modulo>/` con su README

---

## 🔮 Preparado para escalar

El frontend está listo para agregar:

- **Autenticación:** Login, registro, recuperación de contraseña
- **Tickets:** Lista, detalle, creación, filtros, estados, SLA
- **Usuarios:** CRUD, roles, permisos, equipos
- **Base de conocimiento:** Artículos, búsqueda, RAG, embeddings
- **Reportes:** KPIs, gráficas, exportaciones, tableros
- **Configuración:** Ajustes del sistema, integraciones, auditoría
- **Notificaciones:** Toast, badge en sidebar, tiempo real
- **WebSockets:** Actualizaciones en vivo de tickets y reportes