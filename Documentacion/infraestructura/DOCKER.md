# 🐳 Guía Detallada de Docker

## 📋 Descripción

Docker se usa para mantener entornos reproducibles y aislados. Actualmente orquesta dos servicios: la aplicación Next.js y PostgreSQL.

---

## 🚀 Comandos principales

| Comando | Descripción |
|---------|-------------|
| `pnpm docker:up` | Construye y levanta todos los servicios |
| `pnpm docker:down` | Detiene todos los servicios |
| `pnpm docker:logs` | Muestra logs en tiempo real |
| `pnpm docker:clean` | Detiene servicios y elimina volúmenes (borra datos) |

---

## 🏗️ Estructura

```txt
nex-task/
├── docker-compose.yml          # Orquestación de servicios
├── .dockerignore               # Archivos excluidos del build
├── .env.example                # Variables de entorno de ejemplo
└── infra/
    └── docker/
        └── Dockerfile          # Imagen para Next.js
```

---

## 📋 docker-compose.yml

```yaml
services:
  db:
    image: postgres:15-alpine
    restart: unless-stopped
    environment:
      POSTGRES_USER: ${POSTGRES_USER:-postgres}
      POSTGRES_PASSWORD: ${POSTGRES_PASSWORD:-postgres}
      POSTGRES_DB: ${POSTGRES_DB:-nex_task_dev}
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "${PG_PORT:-5432}:5432"
    healthcheck:
      test: ['CMD-SHELL', 'pg_isready -U ${POSTGRES_USER:-postgres} -d ${POSTGRES_DB:-nex_task_dev}']
      interval: 10s
      timeout: 5s
      retries: 5
      start_period: 10s

  frontend:
    build:
      context: .
      dockerfile: infra/docker/Dockerfile
    restart: unless-stopped
    volumes:
      - ./src:/app/src          # Hot-reload en desarrollo
      - ./public:/app/public
      - /app/node_modules       # Excluir node_modules del contenedor
      - /app/.next              # Excluir .next del contenedor
    ports:
      - "${NEXT_PORT:-3000}:3000"
    environment:
      NODE_ENV: development
    command: pnpm dev
    depends_on:
      db:
        condition: service_healthy
```

---

## 📋 Dockerfile

```dockerfile
# infra/docker/Dockerfile
FROM node:18-alpine AS base

# Instalar pnpm globalmente
RUN npm install -g pnpm

WORKDIR /app

# Copiar archivos de dependencias
COPY package.json pnpm-lock.yaml ./

# Instalar dependencias
RUN pnpm install --frozen-lockfile

# Copiar resto del proyecto
COPY . .

EXPOSE 3000

CMD ["pnpm", "dev"]
```

---

## 🔄 Flujo de trabajo con Docker

### Desarrollo

```bash
# 1. Configurar variables de entorno
cp .env.example .env.local

# 2. Iniciar servicios
pnpm docker:up

# 3. La app estará en http://localhost:3000
# 4. PostgreSQL estará en localhost:5432
# 5. Los cambios en src/ se reflejan automáticamente (hot-reload)
```

### Solución de problemas

```bash
# Ver logs detallados
pnpm docker:logs

# Ver logs de un servicio específico
pnpm docker:logs frontend
pnpm docker:logs db

# Reiniciar un servicio
docker-compose restart frontend

# Reconstruir imágenes desde cero
docker-compose build --no-cache

# Limpiar todo (cuidado: borra datos de BD)
pnpm docker:clean
```

---

## 📋 Buenas prácticas con Docker

1. ✅ **Usar volúmenes** para datos persistentes (PostgreSQL)
2. ✅ **Montar código local** en desarrollo para hot-reload
3. ✅ **Excluir node_modules y .next** del montaje
4. ✅ **Usar health checks** para manejar dependencias entre servicios
5. ✅ **Variables de entorno** para configuración (nunca hardcodear)
6. ✅ **Usar `.dockerignore`** para reducir tamaño del contexto de build
7. ❌ No ejecutar `docker-compose` como root si no es necesario
8. ❌ No exponer puertos de más en producción

---

## 🔮 Agregar nuevos servicios

Cuando quieras agregar un servicio (Redis, Elasticsearch, etc.):

```yaml
# docker-compose.yml - Ejemplo para Redis
services:
  # ... servicios existentes ...

  redis:
    image: redis:7-alpine
    restart: unless-stopped
    ports:
      - "${REDIS_PORT:-6379}:6379"
    volumes:
      - redis_data:/data
    healthcheck:
      test: ['CMD', 'redis-cli', 'ping']
      interval: 10s
      timeout: 5s
      retries: 5

volumes:
  # ... volúmenes existentes ...
  redis_data:
```

Luego:
1. Actualizar `.env.example` con las nuevas variables
2. Documentar el nuevo servicio
3. Agregar la dependencia al servicio frontend si es necesario