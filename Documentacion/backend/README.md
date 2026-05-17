# Documentación Backend

## Responsabilidad

El backend futuro vivirá principalmente en rutas API de Next.js, `src/server`, `src/services` y la capa de base de datos.

## Carpetas relacionadas

| Carpeta | Uso |
| --- | --- |
| `src/server` | Utilidades y lógica del lado servidor |
| `src/services` | Servicios para APIs externas, correo, storage, IA, etc. |
| `src/lib/db` | Cliente de base de datos y configuración Prisma futura |
| `src/types` | Tipos compartidos |
| `src/features/<modulo>` | Casos de uso y lógica por dominio cuando exista |

## Base de datos

PostgreSQL se levanta con Docker Compose.

Variables relevantes:

```env
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=nex_task_dev
PG_PORT=5432
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/nex_task_dev?schema=public
```

## Reglas backend

1. No escribir queries desde componentes React.
2. No mezclar lógica de dominio con presentación.
3. Validar entradas con esquemas cuando se implementen APIs.
4. Centralizar clientes externos en `src/services`.
5. Mantener secrets solo en variables de entorno.
6. Usar `src/server` para utilidades seguras del lado servidor.

## Preparado para futuro

- Prisma ORM.
- NextAuth/Auth.js.
- Redis para cache/colas.
- WebSockets para actualizaciones en tiempo real.
- RAG con embeddings y proveedores LLM.
- Microservicios desacoplados si el proyecto crece.
