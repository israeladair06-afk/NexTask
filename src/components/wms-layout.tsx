'use client';

import { motion } from 'framer-motion';
import { useSidebar } from '@/components/providers/sidebar-context';
import { WmsSidebar } from './wms-sidebar';
import { WmsHeader } from './wms-header';
import { useAuth } from '@/features/usuarios/AuthContext';

export function WmsLayout({ children }: { children: React.ReactNode }) {
  const { colapsado } = useSidebar();
  const { estaAutenticado } = useAuth();

  // If not authenticated, just render children (for login page etc.)
  if (!estaAutenticado) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-background">
      <WmsSidebar />
      <WmsHeader />

      <main
        className="min-h-[calc(100vh-4rem)] transition-all duration-300 ease-in-out"
        style={{ marginLeft: colapsado ? '5rem' : '16rem' }}
      >
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4 max-w-full"
        >
          {children}
        </motion.div>
      </main>
    </div>
  );
}