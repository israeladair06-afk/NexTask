import { Header } from './header';
import { Sidebar } from './sidebar';

/**
 * Layout principal del dashboard administrativo.
 * Mantiene separadas las zonas de navegación, encabezado y contenido para facilitar escalabilidad.
 */
export function LayoutDashboard({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <Header />

      <main className="min-h-[calc(100vh-4rem)] lg:pl-72">
        <div className="container-base py-6 sm:py-8">{children}</div>
      </main>
    </div>
  );
}
