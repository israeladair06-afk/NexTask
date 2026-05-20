'use client';

import { Menu, Moon, Sun, Bell, Search, LogOut } from 'lucide-react';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/boton';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

interface WmsHeaderProps {
  onAbrirMenuMovil?: () => void;
}

export function WmsHeader({ onAbrirMenuMovil }: WmsHeaderProps) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className="sticky top-0 z-30 border-b bg-background/90 backdrop-blur-xl lg:pl-64">
      <div className="flex h-16 items-center justify-between gap-4 px-4 sm:px-6">
        {/* Left */}
        <div className="flex min-w-0 items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={onAbrirMenuMovil}
            aria-label="Abrir menú lateral"
          >
            <Menu className="h-5 w-5" />
          </Button>

          <div className="min-w-0">
            <p className="text-sm font-semibold text-foreground">WMS Enterprise</p>
            <p className="truncate text-xs text-muted-foreground">
              Sistema de Gestión de Almacenes
            </p>
          </div>
        </div>

        {/* Center: Search */}
        <div className="hidden flex-1 justify-center md:flex">
          <div className="flex w-full max-w-md items-center gap-2 rounded-xl border bg-card px-3 py-2 text-sm text-muted-foreground">
            <Search className="h-4 w-4 shrink-0" />
            <span className="truncate">Búsqueda global — próximamente...</span>
          </div>
        </div>

        {/* Right */}
        <div className="flex items-center gap-2">
          {/* Notifications */}
          <Button variant="ghost" size="icon" className="relative" aria-label="Notificaciones">
            <Bell className="h-5 w-5" />
            <Badge className="absolute -right-1 -top-1 h-4 w-4 rounded-full p-0 text-[9px]" variant="destructive">
              3
            </Badge>
          </Button>

          {/* Theme toggle */}
          {mounted && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              aria-label="Cambiar tema"
            >
              {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
          )}

          {/* Avatar */}
          <div className="flex items-center gap-2 pl-2 border-l">
            <Avatar className="h-8 w-8">
              <AvatarFallback className="text-xs bg-primary text-primary-foreground">OP</AvatarFallback>
            </Avatar>
            <div className="hidden sm:block">
              <p className="text-xs font-medium">Operador</p>
              <p className="text-[10px] text-muted-foreground">Admin</p>
            </div>
          </div>

          <Link href="/login">
            <Button variant="ghost" size="icon" aria-label="Cerrar sesión">
              <LogOut className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}