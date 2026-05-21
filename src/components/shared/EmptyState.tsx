'use client';

import { motion } from 'framer-motion';
import { Inbox, LucideIcon } from 'lucide-react';
import { cn } from '@/lib/cn';

interface EmptyStateProps {
  icono?: LucideIcon;
  titulo: string;
  descripcion: string;
  accion?: React.ReactNode;
  className?: string;
}

export function EmptyState({ icono: Icono = Inbox, titulo, descripcion, accion, className }: EmptyStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={cn(
        'flex flex-col items-center justify-center rounded-xl border border-dashed bg-muted/20 p-8 text-center',
        className
      )}
    >
      <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-muted/50">
        <Icono className="h-6 w-6 text-muted-foreground/60" />
      </div>
      <h3 className="text-sm font-semibold text-foreground mb-1">{titulo}</h3>
      <p className="text-xs text-muted-foreground max-w-sm leading-relaxed">{descripcion}</p>
      {accion && <div className="mt-4">{accion}</div>}
    </motion.div>
  );
}