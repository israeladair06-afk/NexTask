# 👥 Guía de Trabajo en Equipo

## 📋 Flujo Git recomendado

### 1. Actualizar rama principal

```bash
git checkout main
git pull origin main
```

### 2. Crear rama por tarea

```bash
# Convención de nombres:
# feature/descripcion-corta
# fix/descripcion-corta
# docs/descripcion-corta
# refactor/descripcion-corta

git checkout -b feature/implementar-buscador-tickets
```

### 3. Trabajar en cambios pequeños y frecuentes

```bash
# Hacer commits atómicos (un cambio lógico por commit)
git add .
git commit -m "feat: agrega buscador de tickets por título"
```

### 4. Validar antes de subir

```bash
# Siempre ejecutar estas validaciones
pnpm typecheck     # Validar tipos TypeScript
pnpm lint          # Validar estilo de código
pnpm build         # Validar que compila correctamente
```

### 5. Subir y crear Pull Request

```bash
git push origin feature/implementar-buscador-tickets
```

---

## 📋 Convención de ramas

| Tipo | Formato | Ejemplo |
|------|---------|---------|
| Nueva funcionalidad | `feature/<descripcion>` | `feature/crear-tickets` |
| Corrección | `fix/<descripcion>` | `fix/error-estado-ticket` |
| Documentación | `docs/<descripcion>` | `docs/api-tickets` |
| Mejora interna | `refactor/<descripcion>` | `refactor/componentes-ui` |
| Mantenimiento | `chore/<descripcion>` | `chore/actualizar-deps` |

---

## 📋 Convención de commits (Conventional Commits)

```
<tipo>(<alcance opcional>): <descripción>

[body opcional]

[footer opcional]
```

| Tipo | Uso |
|------|-----|
| `feat:` | Nueva funcionalidad |
| `fix:` | Corrección de bug |
| `docs:` | Cambios en documentación |
| `style:` | Formato, estilos (no lógica) |
| `refactor:` | Mejora sin cambio funcional |
| `perf:` | Mejora de rendimiento |
| `test:` | Agregar o corregir tests |
| `chore:` | Tareas de mantenimiento |

**Ejemplos:**
```
feat: agrega filtro de tickets por prioridad
fix: corrige error al asignar ticket sin usuario
docs: actualiza guía de componentes del frontend
refactor: extrae lógica de tickets a servicio independiente
```

---

## 📋 Reglas para no romper la arquitectura

### ❌ Prohibido

1. **No crear lógica de negocio dentro de `src/app`** — Las páginas solo deben componer y delegar.
2. **No duplicar componentes** — Si ya existe un componente similar, reutilizarlo o extenderlo.
3. **No modificar infraestructura sin actualizar documentación** — Docker, ESLint, etc.
4. **No subir credenciales** — Usar `.env` o `.env.local`, mantener `.env.example` actualizado.
5. **No mezclar cambios grandes no relacionados** — Un PR = una funcionalidad/corrección.
6. **No ignorar errores de TypeScript** — `strict: true` es obligatorio.
7. **No importar código de servidor en componentes cliente** — Usar Server Components o APIs.

### ✅ Obligatorio

1. **Todo módulo nuevo debe tener README** o comentario inicial si aún es placeholder.
2. **Ejecutar `pnpm check` antes de cada commit** (typecheck + lint).
3. **Documentar decisiones importantes** en la carpeta `Documentacion/`.
4. **Seguir la estructura de carpetas establecida** — No crear carpetas en la raíz.
5. **Usar TypeScript estricto** en todos los archivos nuevos.
6. **Mantener nombres en español** para carpetas, componentes y funciones.

---

## 📋 Flujo de trabajo para nuevas funcionalidades

```mermaid
graph TD
    A[Identificar necesidad] --> B[Crear rama feature/]
    B --> C[Implementar en src/features/<modulo>/]
    C --> D[Crear/actualizar componentes]
    D --> E[Agregar ruta en sidebar]
    E --> F[Documentar cambios]
    F --> G[Ejecutar validaciones]
    G --> H[Crear Pull Request]
    H --> I[Revisión del equipo]
    I --> J[Merge a main]