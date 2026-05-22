'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/cn';
import { Button } from '@/components/ui/boton';
import { ScrollArea } from '@/components/ui/scroll-area';
import { MODULOS_WMS, GRUPOS_WMS } from '@/config/navegacion';
import { useSidebar } from '@/components/providers/sidebar-context';
import { useAuth } from '@/features/usuarios/AuthContext';
import { ChevronLeft, ChevronRight, Package, Warehouse, Shield, User, UserCheck } from 'lucide-react';

const ROL_ICON_MAP: Record<string, React.ElementType> = {
  admin: Shield,
  operador: User,
  supervisor: UserCheck,
};

const ROL_COLOR_MAP: Record<string, string> = {
  admin: 'text-purple-500 bg-purple-500/20',
  operador: 'text-blue-500 bg-blue-500/20',
  supervisor: 'text-emerald-500 bg-emerald-500/20',
};

export function WmsSidebar() {
  const { colapsado, toggleColapsado } = useSidebar();
  const { rol, usuario } = useAuth();
  const [abiertoMovil, setAbiertoMovil] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setAbiertoMovil(false);
  }, [pathname]);

  // Filter modules by role
  const modulosFiltrados = MODULOS_WMS.filter((item) => {
    if (!item.roles) return true;
    if (!rol) return false;
    return item.roles.includes(rol);
  });

  const sidebarContent = (
    <>
      {/* Logo */}
      <div className="flex h-16 items-center justify-between border-b border-border/50 px-4">
        <Link href="/lobby" className="flex items-center gap-3 overflow-hidden">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary/80 shadow-lg shadow-primary/20 shrink-0">
            <Package className="h-5 w-5 text-primary-foreground" />
          </div>
          {!colapsado && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="min-w-0"
            >
              <p className="truncate text-sm font-bold leading-none text-foreground">NexTask</p>
              <p className="mt-0.5 truncate text-[9px] uppercase tracking-[0.2em] text-muted-foreground">
                WMS Enterprise
              </p>
            </motion.div>
          )}
        </Link>

        <Button
          variant="ghost"
          size="icon"
          onClick={toggleColapsado}
          className="hidden lg:inline-flex h-8 w-8 hover:bg-accent/50"
          aria-label={colapsado ? 'Expandir sidebar' : 'Colapsar sidebar'}
        >
          {colapsado ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </div>

      {/* Role Badge */}
      {rol && !colapsado && (
        <div className="mx-3 mt-3 mb-1">
          <div className={cn(
            'flex items-center gap-2 rounded-lg px-3 py-2 text-[10px] font-medium',
            ROL_COLOR_MAP[rol] || 'bg-muted text-muted-foreground'
          )}>
            {rol === 'admin' && <Shield className="h-3.5 w-3.5" />}
            {rol === 'operador' && <User className="h-3.5 w-3.5" />}
            {rol === 'supervisor' && <UserCheck className="h-3.5 w-3.5" />}
            <span className="capitalize">{rol}</span>
          </div>
        </div>
      )}

      {/* Navegación */}
      <ScrollArea className="flex-1 px-3 py-4">
        <nav className="space-y-5">
          {GRUPOS_WMS.map((grupo) => {
            const items = modulosFiltrados.filter((item) => item.grupo === grupo);
            if (items.length === 0) return null;
            return (
              <div key={grupo} className="space-y-0.5">
                {!colapsado && (
                  <p className="px-3 pb-1 text-[9px] font-semibold uppercase tracking-[0.2em] text-muted-foreground/60">
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
                            ? 'bg-gradient-to-r from-primary/20 to-primary/10 text-foreground font-medium shadow-sm'
                            : 'text-muted-foreground/70 hover:text-foreground hover:bg-accent/30',
                          colapsado && 'justify-center px-2'
                        )}
                      >
                        <span className={cn(
                          'shrink-0 transition-all duration-200',
                          activo ? 'text-primary' : 'text-muted-foreground/50 group-hover:text-foreground/70'
                        )}>
                          <Icono className={cn('h-5 w-5', item.estado === 'proximamente' && 'opacity-40')} />
                        </span>
                        {!colapsado && (
                          <span className="flex items-center gap-2 truncate">
                            <span className={cn(
                              'text-[11px]',
                              activo && 'font-semibold'
                            )}>{item.nombre}</span>
                          </span>
                        )}
                        {!colapsado && activo && (
                          <span className="ml-auto h-1.5 w-1.5 rounded-full bg-primary" />
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
        <div className="border-t border-border/40 p-3">
          <div className="rounded-xl bg-gradient-to-br from-primary/5 to-primary/10 p-2.5">
            <div className="flex items-center gap-2">
              <Warehouse className="h-3.5 w-3.5 text-primary/70" />
              <p className="text-[9px] font-semibold text-foreground/80">NexTask WMS v1.0</p>
            </div>
            <p className="mt-1 text-[8px] leading-relaxed text-muted-foreground/60">
              Plataforma enterprise de gestión de almacenes.
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
          'fixed inset-y-0 left-0 z-40 hidden shrink-0 border-r border-border/50 bg-card/90 backdrop-blur-2xl transition-all duration-300 ease-in-out lg:flex lg:flex-col',
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
              onClick={() => setAbiertoMovil(false)}
            />
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="relative flex h-full w-72 flex-col border-r border-border/50 bg-card shadow-2xl"
            >
              <div className="flex h-16 items-center justify-between border-b border-border/50 px-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary/80 shadow-lg">
                    <Package className="h-5 w-5 text-primary-foreground" />
                  </div>
                  <div>
                    <p className="text-sm font-bold">NexTask</p>
                    <p className="text-[9px] uppercase tracking-[0.2em] text-muted-foreground">WMS Enterprise</p>
                  </div>
                </div>
                <Button variant="ghost" size="icon" onClick={() => setAbiertoMovil(false)} className="h-8 w-8">
                  <ChevronLeft className="h-4 w-4" />
                </Button>
              </div>

              <ScrollArea className="flex-1 px-3 py-4">
                <nav className="space-y-5">
                  {GRUPOS_WMS.map((grupo) => {
                    const items = modulosFiltrados.filter((item) => item.grupo === grupo);
                    if (items.length === 0) return null;
                    return (
                      <div key={grupo} className="space-y-0.5">
                        <p className="px-3 pb-1 text-[9px] font-semibold uppercase tracking-[0.2em] text-muted-foreground/60">
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
                                onClick={() => setAbiertoMovil(false)}
                                className={cn(
                                  'flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-all',
                                  activo
                                    ? 'bg-gradient-to-r from-primary/20 to-primary/10 text-foreground font-medium'
                                    : 'text-muted-foreground/70 hover:text-foreground hover:bg-accent/30'
                                )}
                              >
                                <span className={cn(activo ? 'text-primary' : 'text-muted-foreground/50')}>
                                  <Icono className={cn('h-5 w-5 shrink-0', item.estado === 'proximamente' && 'opacity-40')} />
                                </span>
                                <span className="truncate text-[11px]">{item.nombre}</span>
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