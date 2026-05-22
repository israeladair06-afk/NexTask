'use client';

import { ProveedorTema } from './tema';
import { ThemeConfigProvider } from './theme-config';
import { SidebarProvider } from '@/components/providers/sidebar-context';
import { AuthProvider } from '@/features/usuarios/AuthContext';
import { Toaster } from 'sonner';

export function ProveedoresGlobales({ children }: { children: React.ReactNode }) {
  return (
    <ProveedorTema>
      <ThemeConfigProvider>
        <AuthProvider>
          <SidebarProvider>
            {children}
            <Toaster
              position="top-right"
              richColors
              closeButton
              toastOptions={{
                style: {
                  borderRadius: '0.75rem',
                  border: '1px solid hsl(var(--border))',
                  background: 'hsl(var(--card))',
                  color: 'hsl(var(--foreground))',
                },
              }}
            />
          </SidebarProvider>
        </AuthProvider>
      </ThemeConfigProvider>
    </ProveedorTema>
  );
}