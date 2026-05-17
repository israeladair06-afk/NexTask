# Arquitectura de NexTask

## Objetivo arquitectónico

NexTask se organiza como una base enterprise preparada para crecer sin mezclar responsabilidades.

## Estructura

```txt
src/
  app/            Páginas y rutas del App Router
  components/     UI reutilizable y navegación global
  features/       Módulos por dominio
  services/       Integraciones externas y clientes de servicios
  server/         Código exclusivo del servidor
  hooks/          Hooks React reutilizables
  lib/            Librerías internas, helpers base e integraciones
  utils/          Funciones puras y utilidades generales
  types/          Tipos globales y contratos compartidos
  styles/         CSS global, tokens y variables
  config/         Configuración de app, tema, metadata y providers
```

## Dominios futuros

- `tickets`: gestión de solicitudes, SLA, estados y comentarios.
- `usuarios`: roles, permisos, perfiles y equipos.
- `base-conocimiento`: artículos, búsqueda, RAG y embeddings.
- `reportes`: KPIs, métricas y exportaciones.
- `configuracion`: ajustes globales, integraciones y auditoría.

## Principios

- `src/app` compone pantallas, no concentra negocio complejo.
- `src/features` agrupa lógica por dominio.
- `src/components` es compartido y genérico.
- `src/server` nunca debe importarse desde componentes cliente.
- `src/services` encapsula comunicación con terceros.
- `src/lib` contiene infraestructura interna reutilizable.

## Escalabilidad prevista

La base está preparada para agregar:

- Autenticación y autorización.
- PostgreSQL + Prisma.
- Redis para cache, sesiones o colas.
- APIs REST o server actions.
- WebSockets/eventos en tiempo real.
- RAG con embeddings y modelos LLM.
- Microservicios cuando el dominio lo justifique.
