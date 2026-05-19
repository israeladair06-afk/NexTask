'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/cn';
import { Button } from '@/components/ui/boton';
import { ScrollArea } from '@/components/ui/scroll-area';
import { MODULOS_WMS, GRUPOS_WMS } from '@/config/navegacion';
import { ChevronLeft, ChevronRight, Package } from 'lucide-react';

interface WmsSidebarProps {
  abiertoMovil: boolean;
  onCerrarMovil: () => void;
}

export function WmsSidebar({ abiertoMovil, onCerrarMovil }: WmsSidebarProps) {
  const [colapsado, setColapsado] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (abiertoMovil && onCerrarMovil) {
      onCerrarMovil();
    }
  }, [pathname]);

  const sidebarContent = (
    <>
      {/* Logo */}
      <div className="flex h-16 items-center justify-between border-b px-4">
        <Link href="/lobby" className="flex items-center gap-3 overflow-hidden">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary shadow-sm">
            <Package className="h-5 w-5 text-primary-foreground" />
          </div>
          {!colapsado && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="min-w-0"
            >
              <p className="truncate text-sm font-semibold leading-none">NexTask</p>
              <p className="mt-0.5 truncate text-[10px] uppercase tracking-wider text-muted-foreground">
                WMS Enterprise
              </p>
            </motion.div>
          )}
        </Link>

        <Button
          variant="ghost"
          size="icon"
          onClick={() => setColapsado((v) => !v)}
          className="hidden lg:inline-flex h-8 w-8"
          aria-label={colapsado ? 'Expandir sidebar' : 'Colapsar sidebar'}
        >
          {colapsado ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </div>

      {/* Navegación */}
      <ScrollArea className="flex-1 px-3 py-4">
        <nav className="space-y-6">
          {GRUPOS_WMS.map((grupo) => {
            const items = MODULOS_WMS.filter((item) => item.grupo === grupo);
            return (
              <div key={grupo} className="space-y-1">
                {!colapsado && (
                  <p className="px-3 pb-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                    {grupo}
                  </p>
                )}
                <div className="space-y-0.5">
                  {items.map((item) => {
                    const activo = pathname === item.href || pathname?.startsWith(`${item.href}/`);
                    const Icono = item.icono;
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        title={item.nombre}
                        className={cn(
                          'group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-all duration-200',
                          activo
                            ? 'bg-primary text-primary-foreground shadow-sm'
                            : 'text-muted-foreground hover:bg-accent hover:text-foreground',
                          colapsado && 'justify-center px-2'
                        )}
                      >
                        <span className="shrink-0 transition-transform group-hover:scale-105">
                          <Icono className={cn('h-5 w-5', item.estado === 'proximamente' && 'opacity-40')} />
                        </span>
                        {!colapsado && (
                          <span className="flex items-center gap-2 truncate">
                            <span>{item.nombre}</span>
                            {item.estado === 'preparado' && (
                              <span className="h-1.5 w-1.5 rounded-full bg-amber-500 shrink-0" />
                            )}
                            {item.estado === 'proximamente' && (
                              <span className="rounded-full bg-muted-foreground/20 px-1.5 py-0.5 text-[9px] uppercase tracking-wider text-muted-foreground">
                                Pronto
                              </span>
                            )}
                          </span>
                        )}
                      </Link>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </nav>
      </ScrollArea>

      {/* Footer */}
      {!colapsado && (
        <div className="border-t p-4">
          <div className="rounded-xl border bg-card/50 p-3">
            <p className="text-[10px] font-semibold text-foreground">NexTask WMS v1.0</p>
            <p className="mt-1 text-[10px] leading-relaxed text-muted-foreground">
              Plataforma de gestión de almacenes. Integración con backend pendiente.
            </p>
          </div>
        </div>
      )}
    </>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-40 hidden shrink-0 border-r bg-card/95 backdrop-blur-xl transition-all duration-300 lg:flex lg:flex-col',
          colapsado ? 'lg:w-20' : 'lg:w-64'
        )}
      >
        {sidebarContent}
      </aside>

      {/* Mobile overlay */}
      <AnimatePresence>
        {abiertoMovil && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={onCerrarMovil}
            />
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="relative flex h-full w-72 flex-col border-r bg-card shadow-2xl"
            >
              <div className="flex h-16 items-center justify-between border-b px-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary shadow-sm">
                    <Package className="h-5 w-5 text-primary-foreground" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold">NexTask</p>
                    <p className="text-[10px] uppercase tracking-wider text-muted-foreground">WMS Enterprise</p>
                  </div>
                </div>
                <Button variant="ghost" size="icon" onClick={onCerrarMovil} className="h-8 w-8">
                  <ChevronLeft className="h-4 w-4" />
                </Button>
              </div>

              <ScrollArea className="flex-1 px-3 py-4">
                <nav className="space-y-6">
                  {GRUPOS_WMS.map((grupo) => {
                    const items = MODULOS_WMS.filter((item) => item.grupo === grupo);
                    return (
                      <div key={grupo} className="space-y-1">
                        <p className="px-3 pb-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                          {grupo}
                        </p>
                        <div className="space-y-0.5">
                          {items.map((item) => {
                            const activo = pathname === item.href || pathname?.startsWith(`${item.href}/`);
                            const Icono = item.icono;
                            return (
                              <Link
                                key={item.href}
                                href={item.href}
                                onClick={onCerrarMovil}
                                className={cn(
                                  'flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-all',
                                  activo
                                    ? 'bg-primary text-primary-foreground shadow-sm'
                                    : 'text-muted-foreground hover:bg-accent hover:text-foreground'
                                )}
                              >
                                <Icono className={cn('h-5 w-5 shrink-0', item.estado === 'proximamente' && 'opacity-40')} />
                                <span className="truncate">{item.nombre}</span>
                              </Link>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </nav>
              </ScrollArea>
            </motion.aside>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}