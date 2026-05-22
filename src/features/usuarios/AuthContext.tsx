'use client';

import { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';

export type RolUsuario = 'admin' | 'operador' | 'supervisor';

export interface UsuarioSesion {
  id: string;
  nombre: string;
  email: string;
  rol: RolUsuario;
  avatar?: string;
  departamento: string;
  cargo: string;
}

interface AuthContextValue {
  usuario: UsuarioSesion | null;
  estaAutenticado: boolean;
  rol: RolUsuario | null;
  iniciarSesion: (rol: RolUsuario) => void;
  cerrarSesion: () => void;
  tieneAcceso: (modulo: string) => boolean;
  tiempoSesion: string;
}

const ROL_PERMISOS: Record<RolUsuario, string[]> = {
  admin: [
    'dashboard', 'inventario', 'recepcion', 'picking', 'packing',
    'despacho', 'trazabilidad', 'acondicionamiento', 'etiquetado',
    'mapeo-bodega', 'alertas', 'reportes', 'alice', 'configuracion', 'admin',
  ],
  operador: [
    'dashboard', 'inventario', 'recepcion', 'picking', 'packing',
    'despacho', 'etiquetado',
  ],
  supervisor: [
    'dashboard', 'trazabilidad', 'reportes', 'alertas',
    'acondicionamiento', 'mapeo-bodega', 'inventario',
  ],
};

const USUARIOS_MOCK: Record<RolUsuario, UsuarioSesion> = {
  admin: {
    id: 'USR-001',
    nombre: 'Israel Vergara',
    email: 'admin@nextask.com',
    rol: 'admin',
    departamento: 'Sistemas',
    cargo: 'Administrador del Sistema',
  },
  operador: {
    id: 'USR-002',
    nombre: 'Carlos Mendoza',
    email: 'operador@nextask.com',
    rol: 'operador',
    departamento: 'Operaciones',
    cargo: 'Operador de Almacén',
  },
  supervisor: {
    id: 'USR-003',
    nombre: 'María Jiménez',
    email: 'supervisor@nextask.com',
    rol: 'supervisor',
    departamento: 'Logística',
    cargo: 'Supervisor de Turno',
  },
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const ROL_CONFIG: Record<RolUsuario, { color: string; icono: string }> = {
  admin: { color: 'text-purple-500', icono: 'Shield' },
  operador: { color: 'text-blue-500', icono: 'User' },
  supervisor: { color: 'text-emerald-500', icono: 'UserCheck' },
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [usuario, setUsuario] = useState<UsuarioSesion | null>(null);
  const [inicioSesion, setInicioSesion] = useState<number | null>(null);
  const [tiempoSesion, setTiempoSesion] = useState('0s');

  useEffect(() => {
    const saved = localStorage.getItem('nex-task-auth');
    if (saved) {
      try {
        const parsed = JSON.parse(saved) as { usuario: UsuarioSesion; inicioSesion: number };
        setUsuario(parsed.usuario);
        setInicioSesion(parsed.inicioSesion);
      } catch {
        localStorage.removeItem('nex-task-auth');
      }
    }
  }, []);

  useEffect(() => {
    if (!inicioSesion) return;
    const interval = setInterval(() => {
      const diff = Date.now() - inicioSesion;
      const hrs = Math.floor(diff / 3600000);
      const mins = Math.floor((diff % 3600000) / 60000);
      const secs = Math.floor((diff % 60000) / 1000);
      if (hrs > 0) setTiempoSesion(`${hrs}h ${mins}m`);
      else if (mins > 0) setTiempoSesion(`${mins}m ${secs}s`);
      else setTiempoSesion(`${secs}s`);
    }, 1000);
    return () => clearInterval(interval);
  }, [inicioSesion]);

  const iniciarSesion = useCallback((rol: RolUsuario) => {
    const user = USUARIOS_MOCK[rol];
    const now = Date.now();
    setUsuario(user);
    setInicioSesion(now);
    localStorage.setItem('nex-task-auth', JSON.stringify({ usuario: user, inicioSesion: now }));
  }, []);

  const cerrarSesion = useCallback(() => {
    setUsuario(null);
    setInicioSesion(null);
    setTiempoSesion('0s');
    localStorage.removeItem('nex-task-auth');
  }, []);

  const tieneAcceso = useCallback((modulo: string): boolean => {
    if (!usuario) return false;
    return ROL_PERMISOS[usuario.rol]?.includes(modulo) ?? false;
  }, [usuario]);

  const value = useMemo(() => ({
    usuario,
    estaAutenticado: usuario !== null,
    rol: usuario?.rol ?? null,
    iniciarSesion,
    cerrarSesion,
    tieneAcceso,
    tiempoSesion,
  }), [usuario, iniciarSesion, cerrarSesion, tieneAcceso, tiempoSesion]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth debe usarse dentro de AuthProvider');
  return context;
}

export { ROL_CONFIG, ROL_PERMISOS, USUARIOS_MOCK };