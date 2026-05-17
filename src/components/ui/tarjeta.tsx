import * as React from 'react';
import { cn } from '@/lib/cn';

export function Tarjeta({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <section className={cn('rounded-2xl border bg-card p-6 shadow-sm', className)} {...props} />;
}

export function TarjetaTitulo({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return <h3 className={cn('font-semibold tracking-tight text-foreground', className)} {...props} />;
}

export function TarjetaDescripcion({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn('text-sm text-muted-foreground', className)} {...props} />;
}
