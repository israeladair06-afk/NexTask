'use client';

import React, { useState } from 'react';
import { BarChart3, BookOpen, LayoutDashboard, Menu, Settings, Ticket, Users, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/cn';
import { Boton } from '@/components/ui/boton';

interface ItemNavegacion {
  nombre: string;
  href: string;
  descripcion: string;
  icono: React.ReactNode;
  grupo: 'General' | 'Operación' | 'Análisis' | 'Sistema';
}

const ITEMS_NAVEGACION: ItemNavegacion[] = [
  {
    nombre: 'Dashboard',
    href: '/dashboard',
    descripcion: 'Aquí vivirá el resumen ejecutivo del sistema ITSM.',
    icono: <LayoutDashboard className="h-5 w-5" />,
    grupo: 'General',
  },
  {
    nombre: 'Tickets',
    href: '/tickets',
    descripcion: 'Aquí irán los módulos de tickets, SLA, prioridades y asignaciones.',
    icono: <Ticket className="h-5 w-5" />,
    grupo: 'Operación',
  },
  {
    nombre: 'Usuarios',
    href: '/usuarios',
    descripcion: 'Aquí irá la administración de usuarios, roles, permisos y equipos.',
    icono: <Users className="h-5 w-5" />,
    grupo: 'Operación',
  },
  {
    nombre: 'Base de conocimiento',
    href: '/base-conocimiento',
    descripcion: 'Aquí irá el sistema RAG, artículos, embeddings y búsqueda inteligente.',
    icono: <BookOpen className="h-5 w-5" />,
    grupo: 'General',
  },
  {
    nombre: 'Reportes',
    href: '/reportes',
    descripcion: 'Aquí irán métricas, analítica, KPIs, exportaciones y tableros BI.',
    icono: <BarChart3 className="h-5 w-5" />,
    grupo: 'Análisis',
  },
  {
    nombre: 'Configuración',
    href: '/configuracion',
    descripcion: 'Aquí irá la configuración del sistema, integraciones y auditoría.',
    icono: <Settings className="h-5 w-5" />,
    grupo: 'Sistema',
  },
];

const GRUPOS: ItemNavegacion['grupo'][] = ['General', 'Operación', 'Análisis', 'Sistema'];

export function Sidebar() {
  const [abierto, setAbierto] = useState(true);
  const pathname = usePathname();

  return (
    <aside
      className={cn(
        'fixed inset-y-0 left-0 z-40 hidden shrink-0 border-r bg-card/95 backdrop-blur-xl transition-all duration-300 lg:flex lg:flex-col',
        abierto ? 'lg:w-72' : 'lg:w-20'
      )}
    >
      <div className="flex h-16 items-center justify-between border-b px-4">
        <Link href="/dashboard" className="flex items-center gap-3 overflow-hidden">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary text-sm font-bold text-primary-foreground shadow-sm">
            NT
          </div>
          {abierto && (
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold leading-none">NexTask</p>
              <p className="mt-1 truncate text-xs text-muted-foreground">ITSM Workspace</p>
            </div>
          )}
        </Link>

        <Boton
          type="button"
          variante="fantasma"
          tamano="icono"
          onClick={() => setAbierto((valor) => !valor)}
          aria-label="Colapsar o expandir sidebar"
        >
          {abierto ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </Boton>
      </div>

      <nav className="flex-1 space-y-6 overflow-y-auto px-3 py-5">
        {GRUPOS.map((grupo) => {
          const items = ITEMS_NAVEGACION.filter((item) => item.grupo === grupo);

          return (
            <div key={grupo} className="space-y-2">
              {abierto && <p className="px-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">{grupo}</p>}

              <div className="space-y-1">
                {items.map((item) => {
                  const activo = pathname === item.href || pathname?.startsWith(`${item.href}/`);

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      title={abierto ? item.descripcion : item.nombre}
                      className={cn(
                        'group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-all',
                        activo
                          ? 'bg-primary text-primary-foreground shadow-sm'
                          : 'text-muted-foreground hover:bg-accent hover:text-foreground',
                        !abierto && 'justify-center px-0'
                      )}
                    >
                      <span className="shrink-0 transition-transform group-hover:scale-105">{item.icono}</span>
                      {abierto && <span className="truncate">{item.nombre}</span>}
                    </Link>
                  );
                })}
              </div>
            </div>
          );
        })}
      </nav>

      {abierto && (
        <div className="border-t p-4">
          <div className="rounded-2xl border bg-background/60 p-4">
            <p className="text-xs font-semibold text-foreground">Plantilla base</p>
            <p className="mt-1 text-xs leading-5 text-muted-foreground">
              UI preparada para autenticación, tickets, RAG, reportes y APIs futuras.
            </p>
          </div>
        </div>
      )}
    </aside>
  );
}
