'use client';

import { createContext, useContext, useEffect, useMemo, useState } from 'react';

type Tema = 'light' | 'dark' | 'system';

interface TemaContextoValor {
  tema: Tema;
  temaActual: 'light' | 'dark';
  cambiarTema: (tema: Tema) => void;
}

const TemaContexto = createContext<TemaContextoValor | undefined>(undefined);

function resolverTema(tema: Tema): 'light' | 'dark' {
  if (tema === 'system' && typeof window !== 'undefined') {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  return tema === 'light' ? 'light' : 'dark';
}

/**
 * Proveedor de tema global.
 * Dark mode es el valor por defecto para mantener una estética enterprise ITSM.
 */
export function ProveedorTema({ children }: { children: React.ReactNode }) {
  const [tema, setTema] = useState<Tema>('dark');
  const [temaActual, setTemaActual] = useState<'light' | 'dark'>('dark');

  useEffect(() => {
    const temaGuardado = (window.localStorage.getItem('nex-task-tema') as Tema | null) ?? 'dark';
    const temaResuelto = resolverTema(temaGuardado);

    setTema(temaGuardado);
    setTemaActual(temaResuelto);
    document.documentElement.classList.toggle('dark', temaResuelto === 'dark');
  }, []);

  const cambiarTema = (nuevoTema: Tema) => {
    const temaResuelto = resolverTema(nuevoTema);

    setTema(nuevoTema);
    setTemaActual(temaResuelto);
    window.localStorage.setItem('nex-task-tema', nuevoTema);
    document.documentElement.classList.toggle('dark', temaResuelto === 'dark');
  };

  const valor = useMemo(() => ({ tema, temaActual, cambiarTema }), [tema, temaActual]);

  return <TemaContexto.Provider value={valor}>{children}</TemaContexto.Provider>;
}

export function useTema() {
  const contexto = useContext(TemaContexto);

  if (!contexto) {
    throw new Error('useTema debe usarse dentro de ProveedorTema');
  }

  return contexto;
}
