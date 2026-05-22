'use client';

import { Menu, Moon, Sun, Bell, Search, LogOut, Maximize2, Minimize2, User, Shield, UserCheck, Settings, UserCog } from 'lucide-react';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { useSidebar } from '@/components/providers/sidebar-context';
import { useAuth } from '@/features/usuarios/AuthContext';
import { Button } from '@/components/ui/boton';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/cn';
import { toast } from 'sonner';

const ROL_CONFIG = {
  admin: { icon: Shield, color: 'text-purple-500', bg: 'bg-purple-500/10', label: 'Admin' },
  operador: { icon: User, color: 'text-blue-500', bg: 'bg-blue-500/10', label: 'Operador' },
  supervisor: { icon: UserCheck, color: 'text-emerald-500', bg: 'bg-emerald-500/10', label: 'Supervisor' },
};

export function WmsHeader() {
  const { theme, setTheme } = useTheme();
  const { toggleMobile, colapsado } = useSidebar();
  const { usuario, rol, cerrarSesion, tiempoSesion } = useAuth();
  const [mounted, setMounted] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const [menuAbierto, setMenuAbierto] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen()
        .then(() => setFullscreen(true))
        .catch(() => undefined);
    } else {
      document.exitFullscreen()
        .then(() => setFullscreen(false))
        .catch(() => undefined);
    }
  };

  const handleNotificaciones = () => {
    toast('Notificaciones', {
      description: 'Tienes 3 notificaciones sin leer. Módulo completo próximamente.',
      duration: 3000,
    });
  };

  const handleLogout = () => {
    toast.success('Cerrando sesión...', { duration: 1500 });
    setMenuAbierto(false);
    setTimeout(() => {
      cerrarSesion();
      window.location.href = '/login';
    }, 500);
  };

  const rolConfig = rol ? ROL_CONFIG[rol] : null;

  return (
    <header
      className={cn(
        'sticky top-0 z-30 border-b border-border/50 bg-background/80 backdrop-blur-2xl transition-all duration-300 ease-in-out',
      )}
      style={{ marginLeft: colapsado ? '5rem' : '16rem' }}
    >
      <div className="flex h-16 items-center justify-between gap-4 px-4 sm:px-6">
        {/* Left */}
        <div className="flex min-w-0 items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden h-8 w-8"
            onClick={toggleMobile}
            aria-label="Abrir menú lateral"
          >
            <Menu className="h-4 w-4" />
          </Button>

          <div className="min-w-0">
            <p className="text-sm font-semibold text-foreground">WMS Enterprise</p>
            <p className="truncate text-[10px] text-muted-foreground">
              Sistema de Gestión de Almacenes
            </p>
          </div>

          {/* Role badge */}
          {rol && (
            <div className={cn(
              'hidden sm:flex items-center gap-1.5 rounded-full px-2.5 py-1',
              rol === 'admin' && 'bg-purple-500/10',
              rol === 'operador' && 'bg-blue-500/10',
              rol === 'supervisor' && 'bg-emerald-500/10',
            )}>
              <span className={cn(
                'text-[9px] font-medium',
                rol === 'admin' && 'text-purple-500',
                rol === 'operador' && 'text-blue-500',
                rol === 'supervisor' && 'text-emerald-500',
              )}>{rolConfig?.label || rol}</span>
            </div>
          )}
        </div>

        {/* Center: Search */}
        <div className="hidden flex-1 justify-center md:flex">
          <div className="group relative w-full max-w-md">
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative flex items-center gap-2 rounded-xl border border-border/50 bg-card/50 px-3 py-2 text-sm text-muted-foreground transition-all group-hover:border-primary/30 group-hover:bg-card/80">
              <Search className="h-4 w-4 shrink-0 text-muted-foreground/60" />
              <span className="truncate text-[11px]">Búsqueda global — próximamente...</span>
              <kbd className="ml-auto hidden shrink-0 items-center gap-1 rounded-md border border-border/50 bg-muted/50 px-1.5 py-0.5 text-[9px] text-muted-foreground sm:flex">
                <span>⌘</span>K
              </kbd>
            </div>
          </div>
        </div>

        {/* Right */}
        <div className="flex items-center gap-1.5">
          {/* Session time */}
          {tiempoSesion && (
            <div className="hidden lg:flex items-center gap-1.5 rounded-lg border border-border/30 px-2 py-1">
              <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[9px] text-muted-foreground font-mono">{tiempoSesion}</span>
            </div>
          )}

          {/* Fullscreen toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 hidden lg:inline-flex"
            onClick={toggleFullscreen}
            aria-label="Pantalla completa"
          >
            {fullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
          </Button>

          {/* Notifications */}
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 relative"
            aria-label="Notificaciones"
            onClick={handleNotificaciones}
          >
            <Bell className="h-4 w-4" />
            <Badge className="absolute -right-0.5 -top-0.5 h-3.5 w-3.5 rounded-full p-0 text-[7px]" variant="destructive">
              3
            </Badge>
          </Button>

          {/* Theme toggle */}
          {mounted && (
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              aria-label="Cambiar tema"
            >
              {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
          )}

          {/* User Avatar + Dropdown */}
          <div className="relative">
            <button
              onClick={() => setMenuAbierto(!menuAbierto)}
              className="flex items-center gap-2 pl-2 border-l border-border/40 hover:bg-accent/30 rounded-lg transition-colors pr-2 py-1"
              aria-label="Menú de usuario"
            >
              <Avatar className="h-7 w-7 ring-2 ring-primary/10">
                <AvatarFallback className="text-[9px] bg-gradient-to-br from-primary to-primary/80 text-primary-foreground font-medium">
                  {usuario?.nombre?.split(' ').map(n => n[0]).join('').slice(0, 2) || 'OP'}
                </AvatarFallback>
              </Avatar>
              <div className="hidden sm:block text-left">
                <p className="text-[10px] font-medium leading-tight">{usuario?.nombre || 'Usuario'}</p>
                <p className="text-[8px] text-muted-foreground">{rolConfig?.label || '—'}</p>
              </div>
            </button>

            {/* Dropdown */}
            {menuAbierto && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setMenuAbierto(false)} />
                <div className="absolute right-0 top-full mt-1 z-50 w-56 rounded-xl border border-border/50 bg-card shadow-2xl overflow-hidden">
                  <div className="p-3 border-b border-border/30">
                    <p className="text-[11px] font-semibold">{usuario?.nombre}</p>
                    <p className="text-[9px] text-muted-foreground">{usuario?.email}</p>
                    <div className="flex items-center gap-1.5 mt-1.5">
                      <Badge variant="outline" className={cn('text-[8px] h-4 px-1.5 border', rolConfig?.bg ? `border-${rolConfig.color.replace('text-', '')}/30` : '')}>
                        {rolConfig?.label}
                      </Badge>
                      <span className="text-[8px] text-muted-foreground font-mono">{tiempoSesion}</span>
                    </div>
                  </div>

                  <div className="p-1">
                    <Link
                      href="/configuracion"
                      onClick={() => setMenuAbierto(false)}
                      className="flex items-center gap-2 rounded-lg px-2.5 py-2 text-[11px] hover:bg-accent/50 transition-colors"
                    >
                      <Settings className="h-3.5 w-3.5 text-muted-foreground" />
                      Configuración
                    </Link>
                    {rol === 'admin' && (
                      <Link
                        href="/admin"
                        onClick={() => setMenuAbierto(false)}
                        className="flex items-center gap-2 rounded-lg px-2.5 py-2 text-[11px] hover:bg-accent/50 transition-colors"
                      >
                        <UserCog className="h-3.5 w-3.5 text-muted-foreground" />
                        Administración
                      </Link>
                    )}
                  </div>

                  <div className="border-t border-border/30 p-1">
                    <button
                      onClick={handleLogout}
                      className="flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-[11px] text-red-500 hover:bg-red-500/10 transition-colors"
                    >
                      <LogOut className="h-3.5 w-3.5" />
                      Cerrar Sesión
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}