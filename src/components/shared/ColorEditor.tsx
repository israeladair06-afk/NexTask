'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Palette, Save, RotateCcw, Copy, Check, Eye, Moon, Sun } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/boton';
import { Badge } from '@/components/ui/badge';
import { useThemeConfig, type ColorScheme } from '@/config/theme-config';
import { cn } from '@/lib/cn';
import { toast } from 'sonner';
import { Separator } from '@/components/ui/separator';

interface ColorGroup {
  label: string;
  keys: string[];
}

const COLOR_GROUPS: ColorGroup[] = [
  { label: 'Fondo y Texto', keys: ['background', 'foreground'] },
  { label: 'Tarjetas', keys: ['card', 'card-foreground', 'popover', 'popover-foreground'] },
  { label: 'Colores Primarios', keys: ['primary', 'primary-foreground', 'secondary', 'secondary-foreground'] },
  { label: 'Muted y Acento', keys: ['muted', 'muted-foreground', 'accent', 'accent-foreground'] },
  { label: 'Bordes y Estado', keys: ['border', 'input', 'ring', 'destructive', 'destructive-foreground'] },
  { label: 'Sidebar', keys: ['sidebar-background', 'sidebar-foreground', 'sidebar-primary', 'sidebar-primary-foreground', 'sidebar-accent', 'sidebar-accent-foreground', 'sidebar-border', 'sidebar-ring'] },
  { label: 'Gráficos', keys: ['chart-1', 'chart-2', 'chart-3', 'chart-4', 'chart-5'] },
];

const COLOR_LABELS: Record<string, string> = {
  background: 'Fondo',
  foreground: 'Texto',
  card: 'Tarjeta',
  'card-foreground': 'Texto en tarjeta',
  popover: 'Popover',
  'popover-foreground': 'Texto en popover',
  primary: 'Primario',
  'primary-foreground': 'Texto primario',
  secondary: 'Secundario',
  'secondary-foreground': 'Texto secundario',
  muted: 'Muted',
  'muted-foreground': 'Texto muted',
  accent: 'Acento',
  'accent-foreground': 'Texto acento',
  border: 'Borde',
  input: 'Input',
  ring: 'Foco',
  destructive: 'Destructivo',
  'destructive-foreground': 'Texto destructivo',
  'sidebar-background': 'Fondo sidebar',
  'sidebar-foreground': 'Texto sidebar',
  'sidebar-primary': 'Primario sidebar',
  'sidebar-primary-foreground': 'Texto primario sidebar',
  'sidebar-accent': 'Acento sidebar',
  'sidebar-accent-foreground': 'Texto acento sidebar',
  'sidebar-border': 'Borde sidebar',
  'sidebar-ring': 'Foco sidebar',
  'chart-1': 'Gráfico 1',
  'chart-2': 'Gráfico 2',
  'chart-3': 'Gráfico 3',
  'chart-4': 'Gráfico 4',
  'chart-5': 'Gráfico 5',
};

// HSL to Hex conversion
function hslToHex(hsl: string): string {
  const match = hsl.match(/(\d+)\s+(\d+)%\s+(\d+)%/);
  if (!match) return '#000000';
  const h = parseInt(match[1]) / 360;
  const s = parseInt(match[2]) / 100;
  const l = parseInt(match[3]) / 100;

  const a = s * Math.min(l, 1 - l);
  const f = (n: number) => {
    const k = (n + h * 12) % 12;
    return l - a * Math.max(-1, Math.min(k - 3, 9 - k, 1));
  };
  const toHex = (x: number) =>
    Math.round(255 * f(x))
      .toString(16)
      .padStart(2, '0');
  return `#${toHex(0)}${toHex(8)}${toHex(4)}`;
}

function hexToHslValues(hex: string): string {
  let r = 0, g = 0, b = 0;
  if (hex.length === 4) {
    r = parseInt(hex[1] + hex[1], 16);
    g = parseInt(hex[2] + hex[2], 16);
    b = parseInt(hex[3] + hex[3], 16);
  } else if (hex.length === 7) {
    r = parseInt(hex[1] + hex[2], 16);
    g = parseInt(hex[3] + hex[4], 16);
    b = parseInt(hex[5] + hex[6], 16);
  }
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }

  return `${Math.round(h * 360)} ${Math.round(s * 100)}% ${Math.round(l * 100)}%`;
}

const PALETAS_PREDEFINIDAS_UI: { name: string; label: string; mode: 'dark' | 'light'; colors: Record<string, string> }[] = [
  {
    name: 'nexTask-dark',
    label: 'NexTask Azul',
    mode: 'dark',
    colors: {
      background: '#0a0e1a',
      foreground: '#e2e8f0',
      primary: '#3b82f6',
      'primary-foreground': '#0f172a',
      sidebar: '#0f172a',
    },
  },
  {
    name: 'nexTask-light',
    label: 'NexTask Claro',
    mode: 'light',
    colors: {
      background: '#f8fafc',
      foreground: '#0f172a',
      primary: '#2563eb',
      'primary-foreground': '#f8fafc',
      sidebar: '#f1f5f9',
    },
  },
  {
    name: 'oceano',
    label: 'Océano Profundo',
    mode: 'dark',
    colors: {
      background: '#0d1b1e',
      foreground: '#ccfbf1',
      primary: '#14b8a6',
      'primary-foreground': '#0d1b1e',
      sidebar: '#0f1a1c',
    },
  },
  {
    name: 'esmeralda',
    label: 'Esmeralda',
    mode: 'dark',
    colors: {
      background: '#0a1a12',
      foreground: '#d1fae5',
      primary: '#059669',
      'primary-foreground': '#0a1a12',
      sidebar: '#0c1f15',
    },
  },
  {
    name: 'atardecer',
    label: 'Atardecer',
    mode: 'dark',
    colors: {
      background: '#1a0e0a',
      foreground: '#fed7aa',
      primary: '#ea580c',
      'primary-foreground': '#1a0e0a',
      sidebar: '#1f110a',
    },
  },
  {
    name: 'medianoche',
    label: 'Medianoche',
    mode: 'dark',
    colors: {
      background: '#0e0a1a',
      foreground: '#e9d5ff',
      primary: '#7c3aed',
      'primary-foreground': '#0e0a1a',
      sidebar: '#110c1f',
    },
  },
  {
    name: 'pizarra',
    label: 'Pizarra Elegante',
    mode: 'light',
    colors: {
      background: '#f1f5f9',
      foreground: '#1e293b',
      primary: '#475569',
      'primary-foreground': '#f1f5f9',
      sidebar: '#e2e8f0',
    },
  },
];

export function ColorEditor() {
  const { modo, cambiarModo, paletaActiva, seleccionarPaleta } = useThemeConfig();
  const [editMode, setEditMode] = useState(false);
  const [copiado, setCopiado] = useState(false);

  // Get current CSS variables as hex
  const valoresActuales = useMemo(() => {
    const vars: Record<string, string> = {};
    COLOR_GROUPS.forEach((group) => {
      group.keys.forEach((key) => {
        const cssVar = `--${key}`;
        if (typeof document !== 'undefined') {
          const computed = getComputedStyle(document.documentElement).getPropertyValue(cssVar).trim();
          if (computed) {
            vars[key] = hslToHex(computed);
          }
        }
      });
    });
    return vars;
  }, [modo, paletaActiva]);

  const handleColorChange = (key: string, hex: string) => {
    const hsl = hexToHslValues(hex);
    document.documentElement.style.setProperty(`--${key}`, hsl);
  };

  const handleResetPalette = () => {
    // Reload to reset
    window.location.reload();
  };

  const handleCopyConfig = () => {
    const config = JSON.stringify(valoresActuales, null, 2);
    navigator.clipboard.writeText(config).then(() => {
      setCopiado(true);
      toast.success('Configuración copiada al portapapeles');
      setTimeout(() => setCopiado(false), 2000);
    });
  };

  const handleSelectPresetPalette = (name: string) => {
    seleccionarPaleta(name);
    toast.success(`Paleta "${PALETAS_PREDEFINIDAS_UI.find(p => p.name === name)?.label}" aplicada`);
  };

  return (
    <div className="space-y-4">
      {/* Paletas Predefinidas */}
      <Card>
        <CardHeader className="p-4 pb-2">
          <div className="flex items-center gap-2">
            <Palette className="h-4 w-4 text-primary" />
            <CardTitle className="text-sm">Paletas de Color</CardTitle>
          </div>
          <CardDescription className="text-[10px]">
            Selecciona una paleta predefinida o personaliza los colores manualmente
          </CardDescription>
        </CardHeader>
        <CardContent className="p-4 pt-0">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
            {PALETAS_PREDEFINIDAS_UI.map((paleta, idx) => {
              const isActive = paletaActiva.name === paleta.name;
              return (
                <motion.button
                  key={paleta.name}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, delay: idx * 0.03 }}
                  onClick={() => handleSelectPresetPalette(paleta.name)}
                  className={cn(
                    'relative flex flex-col items-center gap-2 rounded-xl border-2 p-3 transition-all',
                    isActive
                      ? 'border-primary bg-primary/5 shadow-sm'
                      : 'border-border hover:border-primary/40 hover:bg-accent/20'
                  )}
                >
                  {/* Color preview */}
                  <div className="flex gap-0.5 rounded-lg overflow-hidden h-8 w-full">
                    {['background', 'foreground', 'primary', 'sidebar'].map((key) => (
                      <div
                        key={key}
                        className="flex-1"
                        style={{ backgroundColor: paleta.colors[key] || '#000' }}
                      />
                    ))}
                  </div>
                  <div className="text-center">
                    <p className={cn('text-[10px] font-medium', isActive && 'text-primary')}>
                      {paleta.label}
                    </p>
                    <p className="text-[8px] text-muted-foreground">
                      {paleta.mode === 'dark' ? '🌙 Oscuro' : '☀️ Claro'}
                    </p>
                  </div>
                  {isActive && (
                    <div className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary">
                      <Check className="h-3 w-3 text-primary-foreground" />
                    </div>
                  )}
                </motion.button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Modo Oscuro/Claro */}
      <Card>
        <CardHeader className="p-4 pb-2">
          <div className="flex items-center gap-2">
            <Eye className="h-4 w-4 text-primary" />
            <CardTitle className="text-sm">Modo Visual</CardTitle>
          </div>
          <CardDescription className="text-[10px]">Alterna entre modo oscuro y claro</CardDescription>
        </CardHeader>
        <CardContent className="p-4 pt-0">
          <div className="flex gap-3">
            <button
              onClick={() => cambiarModo('dark')}
              className={cn(
                'flex-1 flex flex-col items-center gap-2 rounded-xl border-2 p-4 transition-all',
                modo === 'dark'
                  ? 'border-primary bg-primary/5 shadow-sm'
                  : 'border-border hover:border-primary/40'
              )}
            >
              <Moon className={cn('h-6 w-6', modo === 'dark' ? 'text-primary' : 'text-muted-foreground')} />
              <p className={cn('text-xs font-medium', modo === 'dark' && 'text-primary')}>Oscuro</p>
            </button>
            <button
              onClick={() => cambiarModo('light')}
              className={cn(
                'flex-1 flex flex-col items-center gap-2 rounded-xl border-2 p-4 transition-all',
                modo === 'light'
                  ? 'border-primary bg-primary/5 shadow-sm'
                  : 'border-border hover:border-primary/40'
              )}
            >
              <Sun className={cn('h-6 w-6', modo === 'light' ? 'text-primary' : 'text-muted-foreground')} />
              <p className={cn('text-xs font-medium', modo === 'light' && 'text-primary')}>Claro</p>
            </button>
          </div>
        </CardContent>
      </Card>

      {/* Editor de colores avanzado */}
      <Card>
        <CardHeader className="p-4 pb-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Palette className="h-4 w-4 text-primary" />
              <CardTitle className="text-sm">Editor de Colores</CardTitle>
            </div>
            <div className="flex gap-1">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setEditMode(!editMode)}
                className="h-7 text-[9px] px-2 gap-1"
              >
                <Eye className="h-3 w-3" />
                {editMode ? 'Ocultar editor' : 'Editar colores'}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleCopyConfig}
                className="h-7 text-[9px] px-2 gap-1"
              >
                {copiado ? <Check className="h-3 w-3 text-emerald-500" /> : <Copy className="h-3 w-3" />}
                Copiar
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleResetPalette}
                className="h-7 text-[9px] px-2 gap-1"
              >
                <RotateCcw className="h-3 w-3" />
                Reset
              </Button>
            </div>
          </div>
          <CardDescription className="text-[10px]">
            Personaliza cada variable de color del sistema. Los cambios se aplican en vivo.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-4 pt-0">
          <div className="space-y-4">
            {COLOR_GROUPS.map((group) => (
              <div key={group.label}>
                <p className="text-[10px] font-semibold text-muted-foreground mb-2 uppercase tracking-wider">
                  {group.label}
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
                  {group.keys.map((key) => {
                    const hex = valoresActuales[key] || '#000000';
                    return (
                      <div key={key} className="flex items-center gap-2 rounded-lg border border-border/50 p-2">
                        <div className="relative shrink-0">
                          <input
                            type="color"
                            value={hex}
                            onChange={(e) => handleColorChange(key, e.target.value)}
                            className="absolute inset-0 h-8 w-8 cursor-pointer opacity-0"
                          />
                          <div
                            className="h-8 w-8 rounded-lg border border-border/50"
                            style={{ backgroundColor: hex }}
                          />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-[9px] font-medium truncate">{COLOR_LABELS[key] || key}</p>
                          <p className="text-[8px] text-muted-foreground font-mono">{hex}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <Separator className="mt-3 opacity-30" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export { PALETAS_PREDEFINIDAS_UI };