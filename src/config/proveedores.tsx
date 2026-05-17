'use client';

import { ProveedorTema } from './tema';

/**
 * Proveedor raíz que envuelve toda la aplicación con contextos globales
 * Aquí se agregan: Tema, Autenticación, Toasts, Modales, etc.
 */
export function ProveedoresGlobales({ children }: { children: React.ReactNode }) {
  return <ProveedorTema>{children}</ProveedorTema>;
}
