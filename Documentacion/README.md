# 📚 Documentación de NexTask WMS

Bienvenido a la documentación oficial de **NexTask WMS**, una plataforma profesional de gestión de almacenes (Warehouse Management System) construida con enfoque enterprise.

> **Fase actual:** Frontend completamente estructurado y funcional.
> **Estado:** Interfaz visual preparada. La lógica de negocio y conexión con backend se integrará en fases posteriores.
> **Enfoque:** NexTask ha sido redirigido de un sistema ITSM/helpdesk a una plataforma WMS profesional.

---

## 🏭 ¿Qué es NexTask WMS?

NexTask WMS es una plataforma web enterprise para la gestión integral de almacenes y centros de distribución. Proporciona una interfaz moderna, profesional y responsive para controlar:

- **Inventario** — Gestión de stock, SKUs y existencias
- **Recepción** — Ingreso y validación de mercancía
- **Picking** — Preparación de pedidos
- **Packing** — Empaque y embalaje
- **Despacho** — Gestión de salidas
- **Trazabilidad** — Historial de movimientos
- **Mapeo de bodega** — Visualización del layout del almacén
- **Alertas y automatización** — Reglas de negocio y notificaciones
- **Reportes** — KPIs y métricas operativas

Actualmente todo el frontend está construido y funcional a nivel visual. Los módulos están preparados con placeholders profesionales indicando las funcionalidades futuras y la integración pendiente con backend.

---

## 📂 Estructura de la documentación

```txt
Documentacion/
├── README.md                       # ← Este archivo (índice general - WMS)
├── frontend/                       # Guías del frontend (actualizadas a WMS)
├── backend/                        # Guías del backend
├── infraestructura/                # Docker, scripts, despliegue
├── equipo/                         # Trabajo colaborativo
├── base/                           # Documentación base/arquitectura
└── QUICKSTART.md                   # Inicio rápido
```

---

## 🧠 Principios del proyecto

1. **WMS como objetivo principal.** Toda la arquitectura está diseñada para un sistema de gestión de almacenes.
2. **Frontend primero.** La UI/UX es completa y profesional antes de implementar lógica de negocio.
3. **Separación clara de responsabilidades.** Cada carpeta tiene un propósito definido.
4. **Código legible y mantenible.** TypeScript estricto, nombres claros, componentes reutilizables.
5. **UI enterprise y responsive.** Diseño profesional, modo oscuro/claro, adaptable a todos los dispositivos.
6. **Placeholders profesionales.** Donde no hay backend, hay textos claros de "pendiente de integración".
7. **Escalabilidad desde el inicio.** Preparado para APIs, base de datos, IA y automatización futura.

---

## 📋 Stack tecnológico

| Capa | Tecnología | Versión |
|------|-----------|---------|
| Framework | Next.js (App Router) | 15+ |
| UI | React + TypeScript | 19+ / 5.6+ |
| Estilos | Tailwind CSS | 3.4+ |
| Componentes | shadcn/ui + Radix UI | — |
| Animaciones | Framer Motion | — |
| Notificaciones | Sonner | — |
| Íconos | Lucide React | — |
| Paquetería | pnpm | 8+ |

---

## 🗺️ Mapa de rutas (App Router)

| Ruta | Módulo | Estado |
|------|--------|--------|
| `/login` | Login enterprise | ✅ Completo |
| `/lobby` | Lobby / Portal de acceso | ✅ Completo |
| `/dashboard` | Dashboard principal | ✅ Completo |
| `/inventario` | Gestión de inventario | ✅ Activo |
| `/mapeo-bodega` | Mapeo visual de bodega | ✅ Activo |
| `/configuracion` | Configuración del sistema | ✅ Activo |
| `/recepcion` | Recepción de mercancía | 🔧 Preparado |
| `/picking` | Preparación de pedidos | 🔧 Preparado |
| `/packing` | Empaque y embalaje | 🔧 Preparado |
| `/despacho` | Gestión de salidas | 🔧 Preparado |
| `/trazabilidad` | Trazabilidad de productos | 🔧 Preparado |
| `/acondicionamiento` | Reempaque y reetiquetado | 🔧 Preparado |
| `/etiquetado` | Etiquetas y códigos | 🔧 Preparado |
| `/alertas` | Alertas y notificaciones | 🔧 Preparado |
| `/automatizacion` | Automatización y workflows | 🔧 Preparado |
| `/reportes` | Reportes y KPIs | 🔧 Preparado |

**Estados:**
- ✅ **Activo** — Interfaz funcional con componentes visuales completos
- 🔧 **Preparado** — Placeholder profesional, pendiente de integración con backend

---

## 📁 Estructura del proyecto

```txt
nex-task/
├── src/                      # Código fuente principal
│   ├── app/                  #   Rutas y páginas (App Router)
│   │   ├── login/            #     Login enterprise
│   │   ├── lobby/            #     Portal de acceso
│   │   ├── dashboard/        #     Dashboard principal
│   │   ├── inventario/       #     Inventario
│   │   ├── mapeo-bodega/     #     Mapeo de bodega
│   │   ├── recepcion/        #     Recepción
│   │   ├── picking/          #     Picking
│   │   ├── packing/          #     Packing
│   │   ├── despacho/         #     Despacho
│   │   ├── trazabilidad/     #     Trazabilidad
│   │   ├── acondicionamiento/ #    Acondicionamiento
│   │   ├── etiquetado/       #     Etiquetado
│   │   ├── alertas/          #     Alertas
│   │   ├── automatizacion/   #     Automatización
│   │   ├── reportes/         #     Reportes
│   │   └── configuracion/    #     Configuración
│   ├── components/           #   Componentes reutilizables
│   │   ├── ui/               #     shadcn/ui (Button, Card, Tabs, etc.)
│   │   └── *.tsx             #     WmsSidebar, WmsHeader, WmsLayout
│   ├── config/               #   Configuración centralizada
│   ├── types/                #   Tipos TypeScript
│   ├── lib/                  #   Utilidades (cn)
│   └── styles/               #   Estilos globales (CSS variables)
├── Documentacion/            # Documentación del proyecto
└── package.json              # Dependencias y scripts
```

---

## 🎨 Modo oscuro y claro

El sistema soporta modo oscuro y modo claro utilizando `next-themes`.

- **Modo oscuro** (predeterminado): Dominante azul oscuro profesional con acentos azules (#1e3a5f → #3b82f6)
- **Modo claro**: Base blanca/negra con grises elegantes y contraste sobrio

El tema se persiste en localStorage y puede alternarse desde el Header del dashboard o desde el login.

---

## 🔮 Próximos pasos

1. Integración de backend (API REST, base de datos PostgreSQL)
2. Autenticación real con NextAuth.js
3. Conexión de módulos con datos dinámicos
4. Implementación de lógica de negocio WMS
5. Automatización e IA para optimización de almacén

---

## 🚀 Scripts útiles

| Comando | Descripción |
|---------|-----------|
| `pnpm dev` | Inicia el servidor de desarrollo |
| `pnpm build` | Compila la aplicación para producción |
| `pnpm typecheck` | Valida tipos de TypeScript |
| `pnpm lint` | Ejecuta ESLint |
| `pnpm check` | Ejecuta typecheck + lint |

---

> 📖 _NexTask WMS — Transformando la gestión de almacenes desde el frontend._