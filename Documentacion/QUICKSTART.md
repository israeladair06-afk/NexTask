# 🚀 QUICKSTART - NexTask

## Requisitos del sistema

| Herramienta | Versión | Verificar |
|-------------|---------|-----------|
| Node.js | 18+ | `node --version` |
| pnpm | 8+ | `pnpm --version` |
| Docker | 24+ (opcional) | `docker --version` |
| Docker Compose | 2+ (opcional) | `docker compose version` |

---

## 1. Clonar e instalar

```bash
git clone https://github.com/israeladair06-afk/NexTask.git
cd NexTask
pnpm install
```

## 2. Configurar variables de entorno

```bash
cp .env.example .env.local
```

> Los valores por defecto funcionan para desarrollo local. Solo cambia si necesitas puertos diferentes.

## 3. Iniciar el proyecto

### Opción A: Solo frontend (rápido)

```bash
pnpm dev
```

Abrir **http://localhost:3000**

### Opción B: Con Docker (frontend + PostgreSQL)

```bash
pnpm docker:up
```

Esto levanta:
- **frontend** → http://localhost:3000 (Next.js con hot-reload)
- **db** → localhost:5432 (PostgreSQL 15)

---

## 4. Comandos útiles

| Comando | Descripción |
|---------|-------------|
| `pnpm dev` | Inicia servidor de desarrollo |
| `pnpm build` | Compila para producción |
| `pnpm typecheck` | Valida tipos TypeScript |
| `pnpm lint` | Ejecuta ESLint |
| `pnpm format` | Formatea código |
| `pnpm check` | Typecheck + lint |
| `pnpm docker:up` | Levanta app + PostgreSQL |
| `pnpm docker:down` | Detiene contenedores |
| `pnpm docker:logs` | Muestra logs |
| `pnpm docker:clean` | Detiene y limpia volúmenes |

---

## 5. Primeros pasos

```bash
# 1. Validar que todo funciona
pnpm check
pnpm build

# 2. Abrir en el navegador
# http://localhost:3000

# 3. Explorar la estructura
ls src/
ls Documentacion/
```

---

## 6. ¿Qué sigue?

1. **Explorar el dashboard** → http://localhost:3000/dashboard
2. **Leer la documentación** → `Documentacion/README.md`
3. **Entender la arquitectura** → `Documentacion/base/ARQUITECTURA.md`
4. **Ver los componentes** → `Documentacion/frontend/COMPONENTES.md`

---

## 7. Flujo de trabajo diario

```bash
# Al empezar: actualizar main
git checkout main
git pull origin main

# Crear rama para tu tarea
git checkout -b feature/descripcion

# Trabajar...
pnpm dev

# Antes de commit: validar
pnpm check

# Commit y push
git add .
git commit -m "feat: descripción del cambio"
git push origin feature/descripcion

# Crear Pull Request en GitHub
```

---

## Solución de problemas

**Error: `pnpm: command not found`**
```bash
npm install -g pnpm
```

**Error: Puerto 3000 en uso**
```bash
# Cambiar puerto
export NEXT_PORT=3001
pnpm dev
```

**Error: Docker no disponible**
```bash
# Trabajar sin Docker
pnpm dev
# PostgreSQL no estará disponible, pero el frontend funciona
```

**Error: TypeScript errors**
```bash
pnpm typecheck  # Ver errores específicos
```

---

> 📖 Documentación completa en [`Documentacion/README.md`](./Documentacion/README.md)