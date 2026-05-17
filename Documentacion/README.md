# 📚 Documentación de NexTask

Bienvenido a la documentación oficial de **NexTask**, una base profesional para construir un sistema ITSM/helpdesk.

> **Fase actual:** Base arquitectónica, UI placeholder y documentación lista.
> **Objetivo:** Que el equipo pueda comenzar a agregar funcionalidades sin romper la arquitectura.

---

## 📂 Estructura de la documentación

```txt
Documentacion/
├── README.md                       # ← Este archivo (índice general)
├── frontend/                       # Guías del frontend
│   ├── README.md                   #   Documentación principal del frontend
│   ├── COMPONENTES.md              #   Cómo crear y organizar componentes
│   └── DASHBOARD.md                #   Guía del dashboard base
├── backend/                        # Guías del backend
│   ├── README.md                   #   Documentación principal del backend
│   ├── API.md                      #   Convenciones para APIs futuras
│   └── DATABASE.md                 #   Base de datos (PostgreSQL + Prisma)
├── infraestructura/                # Docker, scripts, despliegue
│   ├── README.md                   #   Documentación principal de infraestructura
│   └── DOCKER.md                   #   Guía detallada de Docker
├── equipo/                         # Trabajo colaborativo
│   ├── README.md                   #   Flujo Git, convenciones y reglas
│   └── CONTRIBUTING.md             #   Cómo contribuir al proyecto
└── base/                           # Documentación base/arquitectura
    ├── README.md                   #   Stack y decisiones tecnológicas
    └── ARQUITECTURA.md             #   Arquitectura detallada del proyecto
```

---

## 🧭 ¿Por dónde empezar?

| Si quieres... | Ve a... |
|--------------|---------|
| 🚀 Levantar el proyecto rápido | [`QUICKSTART.md`](../QUICKSTART.md) |
| 🏗️ Entender la arquitectura | [`base/ARQUITECTURA.md`](./base/ARQUITECTURA.md) |
| 🎨 Trabajar en el frontend | [`frontend/README.md`](./frontend/README.md) |
| ⚙️ Trabajar en el backend | [`backend/README.md`](./backend/README.md) |
| 🐳 Usar Docker | [`infraestructura/DOCKER.md`](./infraestructura/DOCKER.md) |
| 👥 Unirte al equipo | [`equipo/CONTRIBUTING.md`](./equipo/CONTRIBUTING.md) |

---

## 🧠 Principios del proyecto

1. **Base profesional antes que lógica compleja.** Todo debe estar listo antes de implementar funcionalidades.
2. **Separación clara de responsabilidades.** Cada carpeta tiene un propósito definido.
3. **Código legible y mantenible.** TypeScript estricto, nombres claros, comentarios útiles.
4. **UI moderna y accesible.** Diseño enterprise, responsive, dark/light mode.
5. **Documentación obligatoria.** Toda decisión importante debe quedar documentada.
6. **Escalabilidad desde el inicio.** Preparado para autenticación, tickets, RAG, PostgreSQL, Prisma, Redis, APIs, WebSockets y microservicios.

---

## 📋 Stack tecnológico

| Capa | Tecnología | Versión |
|------|-----------|---------|
| Framework | Next.js (App Router) | 15+ |
| UI | React + TypeScript | 19+ / 5.6+ |
| Estilos | Tailwind CSS | 3.4+ |
| Componentes | shadcn/ui style (personalizados) | — |
| Base de datos | PostgreSQL | 15 |
| ORM | Prisma (preparado) | 5.8+ |
| Contenedores | Docker + Docker Compose | — |
| Paquetería | pnpm | 8+ |

---

## 📁 Mapa del proyecto

```txt
nex-task/
├── src/                      # Código fuente principal
│   ├── app/                  #   Rutas y páginas (App Router)
│   ├── components/           #   Componentes reutilizables
│   ├── features/             #   Módulos por dominio (futuros)
│   ├── services/             #   Clientes de servicios externos
│   ├── server/               #   Código exclusivo del servidor
│   ├── hooks/                #   Hooks React personalizados
│   ├── lib/                  #   Librerías internas y helpers
│   ├── utils/                #   Funciones utilitarias puras
│   ├── types/                #   Tipos globales TypeScript
│   ├── styles/               #   Estilos globales y variables CSS
│   └── config/               #   Configuración centralizada
├── Documentacion/            # Documentación del proyecto
├── infra/                    # Docker, scripts, recursos operativos
├── public/                   # Archivos estáticos
├── notes/                    # Notas internas del equipo
├── docker-compose.yml        # Orquestación de servicios
└── package.json              # Dependencias y scripts
```

---

## 🚀 Scripts útiles

| Comando | Descripción |
|---------|-----------|
| `pnpm dev` | Inicia el servidor de desarrollo |
| `pnpm build` | Compila la aplicación para producción |
| `pnpm start` | Ejecuta la app compilada |
| `pnpm typecheck` | Valida tipos de TypeScript |
| `pnpm lint` | Ejecuta ESLint |
| `pnpm lint:fix` | Corrige errores de lint automáticamente |
| `pnpm format` | Formatea el código con Prettier |
| `pnpm format:check` | Verifica el formato |
| `pnpm check` | Ejecuta typecheck + lint |
| `pnpm docker:up` | Levanta todos los servicios con Docker |
| `pnpm docker:down` | Detiene todos los servicios |
| `pnpm docker:logs` | Muestra logs de los contenedores |
| `pnpm docker:clean` | Detiene servicios y elimina volúmenes |

---

> 📖 _Cada carpeta de `Documentacion/` tiene su propio README con información detallada._