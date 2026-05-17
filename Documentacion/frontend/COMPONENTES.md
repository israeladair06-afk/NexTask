# 🧩 Guía de Componentes

## 📋 Principios

1. **Componentes atómicos** en `src/components/ui/` — Botones, inputs, tarjetas, etc.
2. **Componentes compuestos** en `src/components/` — Navegación, layouts, etc.
3. **Componentes de módulo** en `src/features/<modulo>/components/` — Lógica específica del dominio.

---

## 🏗️ Estructura de componentes

```txt
src/components/
├── ui/                           # Componentes base (shadcn/ui style)
│   ├── boton.tsx                 #   Botón con variantes
│   ├── tarjeta.tsx               #   Tarjeta contenedora
│   └── Nav.tsx                   #   Navegación auxiliar
├── navegacion/                   # Componentes de navegación global
│   ├── layout-dashboard.tsx      #   Layout principal del dashboard
│   ├── sidebar.tsx               #   Sidebar colapsable
│   └── header.tsx                #   Header superior
└── ...                           # Futuros componentes globales
```

---

## 🆕 Cómo crear un componente nuevo

### 1. Determinar la ubicación

| Tipo de componente | Dónde colocarlo |
|-------------------|----------------|
| Botón, input, badge, etc. | `src/components/ui/<nombre>.tsx` |
| Sidebar, navbar, footer | `src/components/<nombre>.tsx` |
| Componente específico de Tickets | `src/features/tickets/components/<nombre>.tsx` |
| Componente específico de Usuarios | `src/features/usuarios/components/<nombre>.tsx` |

### 2. Estructura base

```tsx
'use client'; // Solo si usa hooks del cliente (useState, useEffect, etc.)

import React from 'react';
import { cn } from '@/lib/cn';

interface ComponenteProps {
  /** Descripción clara de la prop */
  titulo: string;
  /** Opcional: descripción */
  descripcion?: string;
  children?: React.ReactNode;
}

/**
 * Componente [Nombre] - Descripción breve de qué hace.
 * Usar para [propósito específico].
 *
 * @example
 * <Componente titulo="Ejemplo" />
 */
export function Componente({ titulo, descripcion, children }: ComponenteProps) {
  return (
    <div className={cn('rounded-xl border bg-card p-4')}>
      <h3 className="text-sm font-semibold">{titulo}</h3>
      {descripcion && (
        <p className="mt-1 text-xs text-muted-foreground">{descripcion}</p>
      )}
      {children && <div className="mt-3">{children}</div>}
    </div>
  );
}
```

### 3. Buenas prácticas

- ✅ Usar **TypeScript** con interfaces explícitas
- ✅ Documentar props con JSDoc
- ✅ Usar `cn()` para clases condicionales
- ✅ Nombres en español (el proyecto está en español)
- ✅ Componente por archivo
- ✅ Evitar lógica de negocio dentro del componente visual
- ❌ No usar `any` — definir tipos precisos
- ❌ No mezclar estilos inline con Tailwind

---

## 🔄 Patrones comunes

### Componente cliente vs servidor

```tsx
// ✅ Servidor (por defecto en App Router)
export function ComponenteServidor() {
  return <div>Renderizado en servidor</div>;
}

// ✅ Cliente (usa 'use client')
'use client';
export function ComponenteCliente() {
  const [estado, setEstado] = useState(false);
  return <button onClick={() => setEstado(!estado)}>{estado ? 'On' : 'Off'}</button>;
}
```

### Componente con variantes

```tsx
type Variante = 'default' | 'primary' | 'ghost';

interface Props {
  variante?: Variante;
  children: React.ReactNode;
}

const VARIANTES: Record<Variante, string> = {
  default: 'bg-card border hover:bg-accent',
  primary: 'bg-primary text-primary-foreground hover:bg-primary/90',
  ghost: 'hover:bg-accent text-muted-foreground',
};

export function Accion({ variante = 'default', children }: Props) {
  return (
    <button className={cn('rounded-xl px-4 py-2 text-sm font-medium transition-all', VARIANTES[variante])}>
      {children}
    </button>
  );
}
```

---

## 📋 Checklist al crear un componente

- [ ] ¿Está en la carpeta correcta?
- [ ] ¿Tiene TypeScript estricto?
- [ ] ¿Las props están documentadas?
- [ ] ¿Usa `cn()` para clases condicionales?
- [ ] ¿Es reutilizable o debería estar en features?
- [ ] ¿Tiene `'use client'` solo si es necesario?
- [ ] ¿Sigue la convención de nombres del proyecto?