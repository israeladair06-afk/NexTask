'use client';

import { Menu, Moon, Search, Settings, Sun } from 'lucide-react';
import Link from 'next/link';
import { Boton } from '@/components/ui/boton';
import { useTema } from '@/config/tema';

interface HeaderProps {
  /** Callback para abrir el sidebar en móvil */
  onAbrirMenuMovil?: () => void;
}

/**
 * Header superior del dashboard.
 * Contiene: menú hamburguesa (móvil), título, búsqueda placeholder, toggle de tema y configuración.
 */
export function Header({ onAbrirMenuMovil }: HeaderProps) {
  const { temaActual, cambiarTema } = useTema();

  return (
    <header className="sticky top-0 z-30 border-b bg-background/85 backdrop-blur-xl lg:pl-72">
      <div className="flex h-16 items-center justify-between gap-4 px-4 sm:px-6">
        {/* Zona izquierda: hamburguesa + título */}
        <div className="flex min-w-0 items-center gap-3">
          <Boton
            variante="fantasma"
            tamano="icono"
            className="lg:hidden"
            onClick={onAbrirMenuMovil}
            aria-label="Abrir menú lateral"
          >
            <Menu className="h-5 w-5" />
          </Boton>

          <div className="hidden min-w-0 sm:block">
            <p className="text-sm font-semibold text-foreground">Panel administrativo</p>
            <p className="truncate text-xs text-muted-foreground">
              Base profesional para módulos ITSM/helpdesk
            </p>
          </div>
        </div>

        {/* Zona central: búsqueda global placeholder */}
        <div className="hidden flex-1 justify-center md:flex">
          <div className="flex w-full max-w-md items-center gap-2 rounded-xl border bg-card px-3 py-2 text-sm text-muted-foreground">
            <Search className="h-4 w-4 shrink-0" />
            <span className="truncate">Búsqueda global futura...</span>
          </div>
        </div>

        {/* Zona derecha: acciones */}
        <div className="flex items-center gap-1 sm:gap-2">
          {/* Toggle de tema */}
          <Boton
            type="button"
            variante="fantasma"
            tamano="icono"
            onClick={() => cambiarTema(temaActual === 'dark' ? 'light' : 'dark')}
            title={`Cambiar a tema ${temaActual === 'dark' ? 'claro' : 'oscuro'}`}
          >
            {temaActual === 'dark' ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </Boton>

          {/* Enlace a configuración */}
          <Link href="/configuracion" aria-label="Ir a configuración">
            <Boton variante="fantasma" tamano="icono" type="button">
              <Settings className="h-5 w-5" />
            </Boton>
          </Link>
        </div>
      </div>
    </header>
  );
}