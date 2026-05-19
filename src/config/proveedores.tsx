'use client';

import { ProveedorTema } from './tema';
import { ThemeConfigProvider } from './theme-config';
import { Toaster } from 'sonner';

export function ProveedoresGlobales({ children }: { children: React.ReactNode }) {
  return (
    <ProveedorTema>
      <ThemeConfigProvider>
        {children}
        <Toaster position="top-right" richColors closeButton />
      </ThemeConfigProvider>
    </ProveedorTema>
  );
}