# Documentación Frontend

## Responsabilidad

El frontend contiene la experiencia visual del dashboard administrativo ITSM/helpdesk.

## Carpetas relacionadas

| Carpeta | Uso |
| --- | --- |
| `src/app` | Rutas, layouts y páginas del App Router |
| `src/components` | Componentes reutilizables globales |
| `src/components/navegacion` | Header, sidebar y layout del dashboard |
| `src/components/ui` | Componentes base estilo shadcn/ui |
| `src/features` | Módulos futuros por dominio |
| `src/hooks` | Hooks reutilizables del cliente |
| `src/styles` | Estilos globales y variables de tema |
| `src/config` | Providers, tema, metadata y constantes |

## Dashboard base

El dashboard está en:

- `src/app/dashboard/page.tsx`
- `src/components/navegacion/layout-dashboard.tsx`
- `src/components/navegacion/sidebar.tsx`
- `src/components/navegacion/header.tsx`

Incluye:

- Sidebar profesional colapsable en escritorio.
- Header superior con búsqueda placeholder.
- Tema oscuro por defecto.
- Toggle dark/light.
- Cards placeholder.
- Navegación placeholder para Dashboard, Tickets, Usuarios, Base de conocimiento, Reportes y Configuración.

## Cómo crear componentes

1. Si el componente es global, colocarlo en `src/components`.
2. Si pertenece a un módulo específico, colocarlo en `src/features/<modulo>/components`.
3. Usar TypeScript y nombres claros.
4. Evitar lógica de negocio dentro de componentes visuales.
5. Reutilizar `cn()` desde `src/lib/cn.ts` para clases condicionales.

Ejemplo:

```tsx
import { cn } from '@/lib/cn';

export function EstadoVisual({ activo }: { activo: boolean }) {
  return <span className={cn('text-sm', activo ? 'text-green-500' : 'text-muted-foreground')}>Estado</span>;
}
```

## Tema global

El tema vive en:

- `src/config/tema.tsx`
- `src/config/proveedores.tsx`
- `src/styles/globals.css`

El modo oscuro es el predeterminado para mantener una estética enterprise.

## Convenciones UI

- Usar clases Tailwind simples y legibles.
- No duplicar estilos complejos si pueden convertirse en componente.
- Mantener layouts responsive desde el inicio.
- No instalar librerías visuales sin discutirlo con el equipo.
- Mantener los textos placeholder cuando el módulo aún no tenga lógica real.
