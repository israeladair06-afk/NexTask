Dependencias recomendadas y pasos de auditoría
=============================================

Objetivo: modernizar el stack base de forma segura y reproducible usando `pnpm`.

Recomendación general:
- Usa `pnpm` y `corepack` para reproducibilidad.
- Genera `pnpm-lock.yaml` con `pnpm install` en tu máquina de desarrollo.
- Ejecuta `pnpm audit` y `pnpm outdated` para revisar vulnerabilidades y paquetes antiguos.

Comandos sugeridos:

```bash
# activar corepack (si está disponible)
corepack enable
corepack prepare pnpm@latest --activate

# instalar dependencias y generar lockfile
pnpm install

# revisar paquetes desactualizados
pnpm outdated

# revisar vulnerabilidades
pnpm audit

# instalar las dependencias de desarrollo recomendadas (ejemplo)
pnpm add -D @typescript-eslint/parser @typescript-eslint/eslint-plugin eslint-plugin-import prettier

```

Paquetes a considerar actualizar/añadir (estable y compatible):

- `next` (>=14.x, mantener compatibilidad App Router)
- `react`, `react-dom` (18.2.x)
- `typescript` (>=5.x)
- `tailwindcss` (3.x)
- `postcss` (8.x)
- `autoprefixer` (10.x)
- `eslint` (8.x)
- `eslint-config-next` (coincidente con `next`)
- `@typescript-eslint/parser` y `@typescript-eslint/eslint-plugin`
- `prettier` (para formato)

Notas:
- No instales Prisma ni librerías de negocio en esta fase.
- Después de instalar, ejecuta `pnpm run check` para validar lints y typechecks.
