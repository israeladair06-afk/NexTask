# QUICKSTART — NexTask

Levanta el proyecto en 5 minutos.

## 1. Instalación inicial (primera vez)

```bash
# Activar pnpm (si aún no lo tienes)
corepack enable
corepack prepare pnpm@latest --activate

# Verificar versiones
node --version      # >= 18
pnpm --version      # >= 8
docker --version    # Docker desktop o similiar

# Instalar deps
pnpm install

# Copiar env
cp .env.example .env.local
```

## 2. Levanta todo con Docker (recomendado)

```bash
docker-compose up --build

# En otra terminal, ver logs:
docker-compose logs -f frontend

# Frontend: http://localhost:3000
# PostgreSQL: localhost:5432 (user: postgres, pass: postgres, db: nex_task_dev)
```

## 3. Desarrollo local (sin Docker)

```bash
# Solo frontend (requiere PostgreSQL en 5432)
pnpm dev

# http://localhost:3000
```

## 4. Scripts útiles

```bash
pnpm check         # Validar código (types + lint)
pnpm lint:fix      # Arreglar lints automáticamente
pnpm format        # Formatear código
pnpm docker:down   # Detener Docker
pnpm docker:clean  # Limpiar volúmenes (reseta BD)
```

## Problemas comunes

**"docker: command not found"**
→ Instala Docker Desktop o docker-ce

**"pnpm: command not found"**
→ `corepack enable && corepack prepare pnpm@latest --activate`

**"Port 3000 already in use"**
→ `lsof -i :3000` y mata el proceso, o cambia `NEXT_PORT=3001` en `.env.local`

**"Port 5432 already in use"**
→ `lsof -i :5432` o `docker-compose down` y luego `docker ps -a` para verificar

**"Permission denied" en scripts**
→ `chmod +x infra/scripts/*.sh`

## Documentación completa

→ Ver `README.md`

## Roadmap

Próximas fases documentadas en `README.md`
