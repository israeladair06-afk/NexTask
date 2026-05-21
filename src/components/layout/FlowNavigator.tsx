'use client';

import Link from 'next/link';
import { cn } from '@/lib/cn';
import { ChevronRight } from 'lucide-react';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';

interface FlowStep {
  label: string;
  href: string;
  activo?: boolean;
  completado?: boolean;
}

interface FlowNavigatorProps {
  pasos: FlowStep[];
  pasoActual: string;
}

export function FlowNavigator({ pasos, pasoActual }: FlowNavigatorProps) {
  return (
    <div className="rounded-xl border bg-card/50 p-1.5">
      <ScrollArea className="w-full">
        <div className="flex items-center gap-0 min-w-max px-1">
          {pasos.map((paso, i) => {
            const esActivo = paso.href === pasoActual;
            const esCompletado = paso.completado;
            return (
              <div key={paso.href} className="flex items-center">
                <Link
                  href={paso.href}
                  className={cn(
                    'flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-[10px] font-medium transition-all whitespace-nowrap',
                    esActivo
                      ? 'bg-primary text-primary-foreground shadow-sm'
                      : esCompletado
                        ? 'text-muted-foreground hover:text-foreground hover:bg-accent'
                        : 'text-muted-foreground/60 hover:text-muted-foreground hover:bg-accent/50'
                  )}
                >
                  <span className={cn(
                    'flex h-4 w-4 items-center justify-center rounded-full text-[8px] font-bold',
                    esActivo ? 'bg-primary-foreground/20' : esCompletado ? 'bg-emerald-500/20 text-emerald-500' : 'bg-muted'
                  )}>
                    {esCompletado ? '✓' : i + 1}
                  </span>
                  {paso.label}
                </Link>
                {i < pasos.length - 1 && (
                  <ChevronRight className="mx-1 h-3 w-3 text-muted-foreground/30 shrink-0" />
                )}
              </div>
            );
          })}
        </div>
        <ScrollBar orientation="horizontal" className="h-1" />
      </ScrollArea>
    </div>
  );
}