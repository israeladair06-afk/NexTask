# 🚀 Inicio Rápido con Docker

> **Para nuevos desarrolladores:** Todo lo que necesitas es Docker.

---

## ✅ Requisitos

Solo necesitas tener instalado:

| Herramienta | Versión mínima | 
|-------------|----------------|
| **Docker** | 24.0.0+ | 
| **Docker Compose** | 2.20.0+ |
| **pnpm** | 8.0.0+ |

**¿Cómo verificar?**
```bash
docker --version
docker-compose --version
pnpm --version
```

**Si usas Windows y no tienes `pnpm`:**
```cmd
npm install -g pnpm@8.6.0
```

> Si tu Node es 18+, también puedes usar Corepack:
> ```cmd
> corepack enable
> corepack prepare pnpm@8.6.0 --activate
> ```

## 🎯 Pasos para empezar

### 1️⃣ Clonar el repositorio

```bash
git clone <url-del-repositorio>
cd nex-task
```

### 2️⃣ Copiar el archivo de configuración

```bash
# Linux / macOS
cp .env.example .env

# Windows CMD
copy .env.example .env

# PowerShell
Copy-Item .env.example .env
```

**¿Qué hace esto?** Copia las variables de entorno necesarias para desarrollo en Docker Compose. Puedes dejarlo así tal cual está configurado.

### 3️⃣ Instalar dependencias con pnpm

```bash
pnpm install
```

> Si `pnpm` no está instalado en Windows:
> ```cmd
> npm install -g pnpm@8.6.0
> ```

### 4️⃣ Ejecutar localmente con pnpm

```bash
pnpm dev
```

**Esto inicia el servidor de desarrollo de Next.js en http://localhost:3000**.

> Si usas Windows, ejecuta el comando en `cmd` o `PowerShell`.

### 5️⃣ Levantar con Docker Compose

Si prefieres usar Docker para frontend + base de datos:

```bash
docker-compose up --build
```

**Primera vez:** Esto va a tardar 2-3 minutos descargando imágenes y configurando los servicios. ☕

**Esperado:**
```
frontend-1 | ▲ Next.js 15.0.0
frontend-1 | - Local:        http://localhost:3000
frontend-1 | 
db-1       | database system is ready to accept connections
```

### 6️⃣ Abrir en el navegador

- **Frontend:** http://localhost:3000
- **Proyecto está listo** ✅

---

## 🛠️ Comandos útiles

### Instalar dependencias
```bash
pnpm install
```

### Ejecutar la app localmente
```bash
pnpm dev
```

> Alternativa equivalente:
> ```bash
> pnpm run dev
> ```

### Ver logs en tiempo real
```bash
docker-compose logs -f
```

### Ver logs de un servicio específico
```bash
docker-compose logs -f frontend  # Solo Next.js
docker-compose logs -f db        # Solo PostgreSQL
```

### Detener los servicios
```bash
docker-compose down
```

### Limpiar todo (⚠️ borra datos de la BD)
```bash
docker-compose down -v
```

### Reiniciar un servicio
```bash
docker-compose restart frontend
docker-compose restart db
```

---

## 🗄️ Acceso a la Base de Datos

### Con pgAdmin (Web UI - Recomendado para beginners)

La BD está disponible en:
- **Host:** `db`
- **Puerto:** `5432`
- **Usuario:** `postgres`
- **Contraseña:** `postgres`
- **Base de datos:** `nex_task_dev`

**Desde tu máquina:** `localhost:5432`

### Con Prisma Studio (Visual - Recomendado para development)

```bash
# Abre una terminal dentro del contenedor
docker exec -it nex-task-frontend-1 pnpm prisma studio

# Luego abre: http://localhost:5555
```

### Con psql (CLI - Para poder realizar queries)

```bash
docker exec -it nex-task-db-1 psql -U postgres -d nex_task_dev
```

Luego puedes ejecutar queries SQL:
```sql
SELECT * FROM usuarios;  -- Cuando haya tablas creadas
\dt                      -- Listar todas las tablas
```

---

## 🐛 Troubleshooting

### ❌ "Port 3000 is already in use"

**Problema:** Otro proceso usa el puerto 3000.

**Solución:**
```bash
# Opción 1: Cambiar el puerto (Linux / macOS)
NEXT_PORT=3001 docker-compose up

# Opción 1: Cambiar el puerto (Windows CMD)
set NEXT_PORT=3001 && docker-compose up

# Opción 1: Cambiar el puerto (PowerShell)
$env:NEXT_PORT=3001; docker-compose up

# Opción 2: Matar el proceso usando el puerto
lsof -i :3000        # Ver qué usa el puerto
kill -9 <PID>        # Matar el proceso
```

### ❌ "Port 5432 is already in use"

**Problema:** PostgreSQL local está corriendo.

**Solución:**
```bash
# Cambiar puerto en .env
PG_PORT=5433  # Cambiar a otro puerto libre

# O detener PostgreSQL local
sudo systemctl stop postgresql
```

### ❌ "Cannot connect to Docker daemon"

**Problema:** Docker no está corriendo.

**Solución:**
```bash
# En Linux
sudo systemctl start docker

# En Mac/Windows
# Abre la app Docker Desktop
```

### ❌ "Build fails - pnpm install error"

**Problema:** Las dependencias fallan.

**Solución:**
```bash
# Limpiar y reintentar
docker-compose down -v
docker-compose up --build
```

### ❌ "Hydration error en Next.js"

**Problema:** Viste error "Hydration failed" en la consola del navegador.

**Solución:** Es normal en desarrollo. Refrescar la página:
```bash
# En el navegador, presiona: Ctrl+Shift+R (o Cmd+Shift+R en Mac)
```

---

## 📦 ¿Qué está en Docker?

| Servicio | Puerto | Descripción |
|----------|--------|-------------|
| **frontend** | 3000 | Next.js dev server con hot-reload |
| **db** | 5432 | PostgreSQL 15 con datos persistentes |

**Volúmenes:**
- `src/` y `public/` → Se sincroniza en vivo con el contenedor
- `postgres_data/` → Persistencia de datos (NO se borra con `down`, solo con `down -v`)

---

## 🎓 Próximos pasos

1. **Leer la documentación completa** → Ve a `Documentacion/README.md`
2. **Entender la arquitectura** → `Documentacion/base/ARQUITECTURA.md`
3. **Trabajar en el frontend** → `Documentacion/frontend/README.md`
4. **Contribuir al proyecto** → `Documentacion/equipo/CONTRIBUTING.md`

---

## ❓ ¿Problemas?

- Revisa los logs: `docker-compose logs`
- Consulta la [guía detallada de Docker](./infraestructura/DOCKER.md)

**¡Bienvenido al equipo! 🚀**
