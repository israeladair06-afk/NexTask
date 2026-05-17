'use client';

import { useState } from 'react';
import { Header } from './header';
import { Sidebar } from './sidebar';
/**
 * Layout principal del dashboard administrativo.
 * Maneja el estado del sidebar móvil (overlay) y la disposición del contenido.
 *
 * En desktop: sidebar colapsable + header fijo + contenido con scroll.
 * En móvil: sidebar overlay + header con hamburguesa + contenido apilado.
 */
export function LayoutDashboard({ children }: { children: React.ReactNode }) {
  const [sidebarMovilAbierto, setSidebarMovilAbierto] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Sidebar
        abiertoMovil={sidebarMovilAbierto}
        onCerrarMovil={() => setSidebarMovilAbierto(false)}
      />
      <Header onAbrirMenuMovil={() => setSidebarMovilAbierto(true)} />

      <main className="min-h-[calc(100vh-4rem)] lg:pl-72">
        <div className="container-base py-6 sm:py-8">{children}</div>
      </main>
    </div>
  );
}