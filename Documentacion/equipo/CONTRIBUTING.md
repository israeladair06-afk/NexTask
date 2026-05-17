# 🤝 Cómo Contribuir al Proyecto

## 📋 ¿Eres nuevo en el equipo?

¡Bienvenido! Aquí tienes los pasos para empezar a contribuir:

### 1. Requisitos del sistema

Antes de empezar, asegúrate de tener instalado:

| Requisito | Versión | Verificar |
|-----------|---------|-----------|
| Node.js | 18+ | `node --version` |
| pnpm | 8+ | `pnpm --version` |
| Docker | 24+ | `docker --version` |
| Docker Compose | 2+ | `docker compose version` |
| Git | 2.40+ | `git --version` |

### 2. Clonar el repositorio

```bash
git clone https://github.com/israeladair06-afk/NexTask.git
cd NexTask
```

### 3. Instalar dependencias

```bash
pnpm install
```

### 4. Configurar variables de entorno

```bash
cp .env.example .env.local
# Opcional: editar .env.local si necesitas puertos diferentes
```

### 5. Iniciar el servidor de desarrollo

```bash
# Sin Docker (solo frontend)
pnpm dev

# Con Docker (frontend + PostgreSQL)
pnpm docker:up
```

Abrir http://localhost:3000

---

## 📋 ¿Cómo empezar a contribuir?

### Opción 1: Arreglar un bug

1. Crear rama: `git checkout -b fix/descripcion-del-bug`
2. Identificar el problema
3. Implementar la solución
4. Validar: `pnpm check`
5. Commit: `git commit -m "fix: descripción del bug"`
6. Push y PR

### Opción 2: Agregar una funcionalidad

1. Crear rama: `git checkout -b feature/descripcion`
2. Si involucra lógica de negocio:
   - Crear módulo en `src/features/<modulo>/`
   - Agregar servicios en `src/features/<modulo>/services/`
   - Agregar componentes en `src/features/<modulo>/components/`
3. Si es solo UI:
   - Crear componente en `src/components/`
   - O página en `src/app/<ruta>/`
4. Agregar al sidebar en `src/components/navegacion/sidebar.tsx`
5. Documentar en `Documentacion/<area>/`
6. Validar: `pnpm check`
7. Commit y PR

### Opción 3: Mejorar documentación

1. Crear rama: `git checkout -b docs/descripcion`
2. Los archivos de documentación están en `Documentacion/`
3. Seguir el formato existente (Markdown con emojis)
4. Validar: `pnpm format:check`
5. Commit: `git commit -m "docs: descripción del cambio"`
6. Push y PR

---

## 📋 Proceso de Pull Request

1. **Asegúrate de estar al día con main:**
   ```bash
   git checkout main
   git pull origin main
   git checkout tu-rama
   git rebase main
   ```

2. **Valida tu código:**
   ```bash
   pnpm check
   pnpm build
   ```

3. **Sube tu rama:**
   ```bash
   git push origin tu-rama
   ```

4. **Crea el Pull Request en GitHub** con:
   - Título descriptivo siguiendo Conventional Commits
   - Descripción de los cambios
   - Screenshots si aplica
   - Referencia a issues relacionados

5. **Espera revisión del equipo** antes de mergear

---

## 📋 ¿Qué hago si tengo dudas?

1. **Revisa la documentación** — `Documentacion/README.md`
2. **Pregunta en el canal del equipo** — Slack/Discord/WhatsApp
3. **Crea un issue** en GitHub con tu pregunta

---

## 📋 Checklist de contribución

- [ ] ¿Leíste la documentación del proyecto?
- [ ] ¿Seguís la convención de ramas?
- [ ] ¿Seguís la convención de commits?
- [ ] ¿Ejecutaste `pnpm check` antes de commit?
- [ ] ¿Ejecutaste `pnpm build` antes del PR?
- [ ] ¿Los cambios están documentados?
- [ ] ¿No rompes la arquitectura existente?