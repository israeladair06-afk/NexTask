'use client';

import { createContext, useContext, useEffect, useMemo, useState, useCallback } from 'react';

export interface ColorScheme {
  name: string;
  label: string;
  colors: Record<string, string>;
  mode: 'light' | 'dark';
}

export const PALETAS_PREDEFINIDAS: ColorScheme[] = [
  {
    name: 'nexTask-dark',
    label: 'NexTask Oscuro',
    mode: 'dark',
    colors: {},
  },
  {
    name: 'nexTask-light',
    label: 'NexTask Claro',
    mode: 'light',
    colors: {},
  },
];

export type PaletaKey = string;

interface ThemeConfigContextValue {
  paletaActiva: ColorScheme;
  paletas: ColorScheme[];
  seleccionarPaleta: (name: string) => void;
  resetearPaleta: () => void;
  crearPaletaPersonalizada: () => void;
  modo: 'light' | 'dark';
  cambiarModo: (mode: 'light' | 'dark') => void;
}

const ThemeConfigContext = createContext<ThemeConfigContextValue | undefined>(undefined);

export function ThemeConfigProvider({ children }: { children: React.ReactNode }) {
  const [modo, setModo] = useState<'light' | 'dark'>('dark');

  useEffect(() => {
    const saved = localStorage.getItem('theme');
    if (saved === 'light' || saved === 'dark') {
      setModo(saved);
      document.documentElement.classList.toggle('dark', saved === 'dark');
    }
  }, []);

  const cambiarModo = useCallback((mode: 'light' | 'dark') => {
    setModo(mode);
    document.documentElement.classList.toggle('dark', mode === 'dark');
    localStorage.setItem('theme', mode);
  }, []);

  const value = useMemo(() => ({
    paletaActiva: PALETAS_PREDEFINIDAS[0],
    paletas: PALETAS_PREDEFINIDAS,
    seleccionarPaleta: () => {},
    resetearPaleta: () => {},
    crearPaletaPersonalizada: () => {},
    modo,
    cambiarModo,
  }), [modo, cambiarModo]);

  return (
    <ThemeConfigContext.Provider value={value}>
      {children}
    </ThemeConfigContext.Provider>
  );
}

export function useThemeConfig() {
  const context = useContext(ThemeConfigContext);
  if (!context) throw new Error('useThemeConfig must be used within ThemeConfigProvider');
  return context;
}