# Guía de Trabajo en Equipo

## Flujo Git recomendado

1. Actualizar rama principal:

```bash
git checkout main
git pull origin main
```

2. Crear rama por tarea:

```bash
git checkout -b feature/nombre-corto
```

3. Trabajar en cambios pequeños.
4. Validar antes de subir:

```bash
pnpm typecheck
pnpm lint
pnpm build
```

5. Commit claro:

```bash
git add .
git commit -m "feat: agrega base visual de tickets"
```

6. Crear Pull Request.

## Convención de ramas

- `feature/<descripcion>` para nuevas funcionalidades.
- `fix/<descripcion>` para correcciones.
- `docs/<descripcion>` para documentación.
- `refactor/<descripcion>` para reorganización sin cambiar comportamiento.

## Convención de commits

Usar formato tipo Conventional Commits:

- `feat:` nueva funcionalidad.
- `fix:` corrección.
- `docs:` documentación.
- `style:` formato/estilos.
- `refactor:` mejora interna.
- `chore:` tareas de mantenimiento.

## Reglas para no romper arquitectura

1. No crear lógica de negocio dentro de `src/app` si puede vivir en `src/features` o `src/server`.
2. No duplicar componentes globales.
3. No modificar infraestructura sin actualizar documentación.
4. No subir credenciales.
5. No mezclar cambios grandes no relacionados en un mismo PR.
6. Todo módulo nuevo debe tener README o comentario inicial si aún es placeholder.
