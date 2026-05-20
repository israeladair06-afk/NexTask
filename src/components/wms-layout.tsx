'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { WmsSidebar } from './wms-sidebar';
import { WmsHeader } from './wms-header';

export function WmsLayout({ children }: { children: React.ReactNode }) {
  const [sidebarMovilAbierto, setSidebarMovilAbierto] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <WmsSidebar
        abiertoMovil={sidebarMovilAbierto}
        onCerrarMovil={() => setSidebarMovilAbierto(false)}
      />
      <WmsHeader onAbrirMenuMovil={() => setSidebarMovilAbierto(true)} />

      <main className="min-h-[calc(100vh-4rem)] lg:pl-64">
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