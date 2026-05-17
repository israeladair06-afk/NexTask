import * as React from 'react';
import { cn } from '@/lib/cn';

type VarianteBoton = 'primario' | 'secundario' | 'fantasma';
type TamanoBoton = 'sm' | 'md' | 'lg' | 'icono';

interface BotonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variante?: VarianteBoton;
  tamano?: TamanoBoton;
}

const variantes: Record<VarianteBoton, string> = {
  primario: 'bg-primary text-primary-foreground shadow-sm hover:bg-primary/90',
  secundario: 'border bg-background text-foreground hover:bg-accent hover:text-accent-foreground',
  fantasma: 'text-muted-foreground hover:bg-accent hover:text-foreground',
};

const tamanos: Record<TamanoBoton, string> = {
  sm: 'h-8 rounded-md px-3 text-xs',
  md: 'h-10 rounded-lg px-4 text-sm',
  lg: 'h-11 rounded-xl px-6 text-base',
  icono: 'h-10 w-10 rounded-lg p-0',
};

/**
 * Botón base inspirado en shadcn/ui.
 * Mantiene una API simple mientras el equipo decide si instala el CLI oficial de shadcn.
 */
export function Boton({ className, variante = 'primario', tamano = 'md', ...props }: BotonProps) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center gap-2 font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50',
        variantes[variante],
        tamanos[tamano],
        className
      )}
      {...props}
    />
  );
}
