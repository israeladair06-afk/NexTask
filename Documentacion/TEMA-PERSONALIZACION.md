# 🎨 Sistema de Personalización de Tema

NexTask WMS incluye un sistema completo de personalización visual que permite cambiar toda la apariencia de la aplicación en tiempo real, sin necesidad de recargar la página.

---

## 📋 Acceso

La configuración de tema se encuentra en **Configuración → Apariencia y Tema** (`/configuracion`).

---

## 🔧 Funcionalidades

### 1. Modo Oscuro / Claro
- **Oscuro**: Paleta azul profesional dominante
- **Claro**: Grises elegantes con contraste sobrio
- Toggle visual con preview de iconos

### 2. Paletas de Color Predefinidas (8 disponibles)

| Paleta | Modo | Descripción |
|--------|------|-------------|
| NexTask Oscuro | 🌙 Oscuro | Azul profesional empresarial |
| NexTask Claro | ☀️ Claro | Blanco/negro elegante |
| Océano Profundo | 🌙 Oscuro | Tonos azul verdoso/teal |
| Esmeralda | 🌙 Oscuro | Verde esmeralda corporativo |
| Azul Real | 🌙 Oscuro | Azul real profundo |
| Pizarra Elegante | ☀️ Claro | Gris pizarra sofisticado |
| Atardecer | 🌙 Oscuro | Tonos naranja/cálidos |
| Medianoche | 🌙 Oscuro | Púrpura oscuro nocturno |

### 3. Personalización Avanzada
- **19 colores editables** agrupados por categoría:
  - Fondo y Texto
  - Tarjetas
  - Colores Principales (primario, secundario)
  - Muted y Acento
  - Bordes y Foco
  - Sidebar (fondo, texto, primario, acento, borde)
- **Color picker visual**: Selecciona cualquier color con el selector nativo del navegador
- **Vista previa en tiempo real**: Los cambios se aplican instantáneamente

### 4. Gestión de Paletas
- **Crear paleta personalizada**: Desde la actual con un clic
- **Resetear paleta**: Vuelve a los valores originales predefinidos
- **Copiar configuración**: Exporta la configuración actual al portapapeles
- **Persistencia**: Las paletas se guardan en localStorage

---

## 💻 Arquitectura Técnica

### Archivos principales

```txt
src/config/theme-config.tsx    # Contexto, tipos, paletas y lógica
```

### Flujo de datos

1. `ThemeConfigProvider` envuelve la aplicación (en `proveedores.tsx`)
2. En el montaje, carga la configuración de `localStorage`
3. `applyThemeToDocument()` aplica los colores como CSS custom properties en `:root`
4. Cualquier cambio se persiste automáticamente en `localStorage`

### Clave de almacenamiento

```
nex-task-theme-config → JSON con paleta activa + todas las paletas
```

### Hook disponible

```typescript
import { useThemeConfig } from '@/config/theme-config';

function Componente() {
  const {
    paletaActiva,       // ColorScheme actual
    paletas,            // Todas las paletas disponibles
    seleccionarPaleta,  // (name: string) => void
    personalizarColor,  // (key: PaletaKey, hex: string) => void
    resetearPaleta,     // () => void
    crearPaletaPersonalizada, // (base: string) => void
    modo,               // 'light' | 'dark'
    cambiarModo,         // (mode: 'light' | 'dark') => void
  } = useThemeConfig();
}
```

### API de colores

```typescript
// Obtener un color específico como hex
import { usePaletaColor } from '@/config/theme-config';
const primaryColor = usePaletaColor('primary'); // → "#3b82f6"

// Convertir hex a HSL
import { hexToHsl } from '@/config/theme-config';
const hsl = hexToHsl('#3b82f6'); // → "217 91% 60%"
```

---

## 📝 Notas

- **Solo frontend**: No requiere backend para funcionar
- **Sin reload**: Los cambios se aplican instantáneamente con transiciones suaves
- **Preparado para expansión**: Fácil agregar nuevas paletas en `PALETAS_PREDEFINIDAS`
- **Accesibilidad**: Los colores mantienen contraste suficiente en todas las paletas