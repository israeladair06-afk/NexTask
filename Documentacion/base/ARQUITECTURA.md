# 🏗️ Arquitectura Detallada de NexTask

## 📋 Visión general

NexTask está diseñado como una **base enterprise preparada para crecer**. La arquitectura separa claramente las responsabilidades para que el equipo pueda trabajar en paralelo sin conflictos.

---

## 📁 Estructura completa del proyecto

```txt
nex-task/
│
├── src/                               # ← CÓDIGO FUENTE PRINCIPAL
│   ├── app/                           #   App Router de Next.js (rutas y páginas)
│   │   ├── layout.tsx                 #     Layout raíz (HTML, body, providers)
│   │   ├── page.tsx                   #     Página principal (landing)
│   │   ├── dashboard/                 #     Dashboard principal
│   │   ├── tickets/                   #     Módulo tickets (placeholder)
│   │   ├── usuarios/                  #     Módulo usuarios (placeholder)
│   │   ├── base-conocimiento/         #     Módulo base de conocimiento (placeholder)
│   │   ├── reportes/                  #     Módulo reportes (placeholder)
│   │   ├── configuracion/             #     Módulo configuración (placeholder)
│   │   └── api/                       #     API routes (futuro)
│   │
│   ├── components/                    #   Componentes reutilizables
│   │   ├── ui/                        #     Componentes base (botón, tarjeta, etc.)
│   │   └── navegacion/                #     Sidebar, header, layout dashboard
│   │
│   ├── features/                      #   Módulos por dominio (futuros)
│   │   ├── tickets/                   #     Lógica de tickets
│   │   ├── usuarios/                  #     Lógica de usuarios
│   │   ├── base-conocimiento/         #     Lógica de base de conocimiento
│   │   ├── reportes/                  #     Lógica de reportes
│   │   └── configuracion/             #     Lógica de configuración
│   │
│   ├── services/                      #   Servicios externos (futuro)
│   ├── server/                        #   Código server-only
│   ├── hooks/                         #   Hooks React personalizados
│   ├── lib/                           #   Librerías internas
│   │   ├── cn.ts                      #     Utilidad para clases condicionales
│   │   ├── db/                        #     Cliente Prisma (futuro)
│   │   └── utils/                     #     Helpers adicionales
│   ├── utils/                         #   Funciones puras
│   ├── types/                         #   Tipos globales TypeScript
│   ├── styles/                        #   Estilos globales y variables CSS
│   │   └── globals.css                #     Tailwind base, variables de tema
│   └── config/                        #   Configuración centralizada
│       ├── tema.tsx                    #     Sistema de tema dark/light
│       ├── proveedores.tsx             #     Providers globales
│       ├── metadata.ts                 #     SEO metadata
│       ├── constants.ts               #     Constantes globales
│       └── api.ts                      #     Configuración de API (futuro)
│
├── Documentacion/                     # ← DOCUMENTACIÓN
│   ├── README.md                      #   Índice general
│   ├── frontend/                      #   Guías del frontend
│   ├── backend/                       #   Guías del backend
│   ├── infraestructura/               #   Guías de infraestructura
│   ├── equipo/                        #   Guías de trabajo en equipo
│   └── base/                          #   Stack y arquitectura
│
├── infra/                             # ← INFRAESTRUCTURA
│   ├── docker/                        #   Dockerfiles
│   └── scripts/                       #   Scripts auxiliares
│
├── public/                            # Archivos estáticos
├── notes/                             # Notas internas del equipo
│
├── docker-compose.yml                 # Orquestación de servicios
├── package.json                       # Dependencias y scripts
├── tsconfig.json                      # Configuración TypeScript
├── tailwind.config.ts                 # Configuración Tailwind
├── next.config.mjs                    # Configuración Next.js
├── .env.example                       # Variables de entorno de ejemplo
└── ...configuraciones                # ESLint, Prettier, Husky, etc.
```

---

## 🧠 Principios arquitectónicos

### 1. Separación por capas

```
┌─────────────────┐
│   src/app/      │  ← Páginas (composición, NO lógica)
├─────────────────┤
│ src/components/ │  ← UI reutilizable (sin lógica de negocio)
├─────────────────┤
│ src/features/   │  ← Lógica de dominio (casos de uso)
├─────────────────┤
│ src/services/   │  ← Integraciones externas (APIs, BD, etc.)
├─────────────────┤
│ src/server/     │  ← Utilidades server-only
└─────────────────┘
```

### 2. Flujo de datos

```
[Página en src/app/]
       │
       ▼
[Componente en src/components/]  ← Solo UI, props tipadas
       │
       ▼
[Servicio en src/services/]      ← Lógica de negocio + datos
       │
       ▼
[Base de datos / API externa]    ← Fuente de datos
```

### 3. Reglas de importación

| Carpeta | Puede importar de |
|---------|------------------|
| `src/app/` | components, features, services, hooks, lib, utils, config |
| `src/components/` | components/ui, hooks, lib, utils, config |
| `src/features/<modulo>/` | services, lib, utils, types, config |
| `src/services/` | lib, utils, types, config |
| `src/server/` | lib, utils, types, config |

**Prohibido:**
- `src/app/` → no importa lógica de negocio directamente (delega a features/services)
- `src/components/` → no importa de services o server
- Componentes cliente (`'use client'`) → no importan de `src/server/`

---

## 🧩 Arquitectura de módulos (features)

Cada módulo en `src/features/` tendrá:

```txt
src/features/<modulo>/
├── components/          # Componentes específicos del módulo
│   └── ...tsx
├── services/            # Servicios del módulo (opcional)
│   └── ...ts
├── types/               # Tipos específicos del módulo (opcional)
│   └── ...ts
├── utils/               # Utilidades del módulo (opcional)
│   └── ...ts
└── README.md            # Documentación del módulo
```

---

## 🔄 Flujo de requests

```
1. Usuario interactúa con la UI
        │
2. Componente llama a un service
        │
3. Service valida datos (Zod), ejecuta lógica
        │
4. Service accede a datos (Prisma/API externa)
        │
5. Resultado vuelve al componente
        │
6. Componente actualiza la UI
```

---

## 🔮 Preparado para escalar

### Fase 1: Base actual ✅
- [x] Estructura de carpetas
- [x] UI base (dashboard, sidebar, header)
- [x] Tema dark/light
- [x] Componentes base
- [x] Documentación completa
- [x] Docker + PostgreSQL
- [x] ESLint, Prettier, Husky

### Fase 2: Autenticación 📝
- [ ] Configurar NextAuth/Auth.js
- [ ] Página de login
- [ ] Protección de rutas
- [ ] Roles y permisos

### Fase 3: Tickets 📝
- [ ] Modelo de datos (Prisma)
- [ ] CRUD de tickets
- [ ] Estados y prioridades
- [ ] Filtros y búsqueda

### Fase 4: Usuarios 📝
- [ ] CRUD de usuarios
- [ ] Gestión de roles
- [ ] Perfiles y equipos

### Fase 5: Base de conocimiento 📝
- [ ] Artículos y categorías
- [ ] Búsqueda full-text
- [ ] Sistema RAG (embeddings + LLM)

### Fase 6: Reportes 📝
- [ ] KPIs y métricas
- [ ] Gráficas y tableros
- [ ] Exportaciones

### Fase 7: Tiempo real 📝
- [ ] WebSockets
- [ ] Notificaciones
- [ ] Actualizaciones en vivo