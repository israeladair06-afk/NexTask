'use client';

import { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';

interface SidebarContextValue {
  colapsado: boolean;
  toggleColapsado: () => void;
  sidebarWidth: number;
  abiertoMovil: boolean;
  setAbiertoMovil: (open: boolean) => void;
  toggleMobile: () => void;
}

const SidebarContext = createContext<SidebarContextValue | undefined>(undefined);

export function SidebarProvider({ children }: { children: React.ReactNode }) {
  const [colapsado, setColapsado] = useState(false);
  const [abiertoMovil, setAbiertoMovil] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('sidebar-colapsado');
    if (saved === 'true') setColapsado(true);
  }, []);

  const toggleColapsado = useCallback(() => {
    setColapsado((v) => {
      const nuevo = !v;
      localStorage.setItem('sidebar-colapsado', String(nuevo));
      return nuevo;
    });
  }, []);

  const toggleMobile = useCallback(() => {
    setAbiertoMovil((v) => !v);
  }, []);

  const value = useMemo(() => ({
    colapsado,
    toggleColapsado,
    sidebarWidth: colapsado ? 80 : 256,
    abiertoMovil,
    setAbiertoMovil,
    toggleMobile,
  }), [colapsado, toggleColapsado, abiertoMovil, toggleMobile]);

  return (
    <SidebarContext.Provider value={value}>
      {children}
    </SidebarContext.Provider>
  );
}

export function useSidebar() {
  const context = useContext(SidebarContext);
  if (!context) throw new Error('useSidebar must be used within SidebarProvider');
  return context;
}