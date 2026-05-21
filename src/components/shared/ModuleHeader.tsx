'use client';

import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import type { LucideIcon } from 'lucide-react';

interface ModuleHeaderProps {
  titulo: string;
  descripcion: string;
  icono: LucideIcon;
  accion?: React.ReactNode;
  badge?: { texto: string; variant?: 'default' | 'secondary' | 'destructive' | 'outline' | 'success' | 'warning' };
  stats?: { label: string; valor: string }[];
}

export function ModuleHeader({ titulo, descripcion, icono: Icono, accion, badge, stats }: ModuleHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="mb-3"
    >
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10">
            <Icono className="h-3.5 w-3.5 text-primary" />
          </div>
          <div className="flex items-center gap-2">
            <h1 className="text-lg font-bold tracking-tight leading-tight">{titulo}</h1>
            {badge && (
              <Badge variant={badge.variant ?? 'outline'} className="h-5 text-[9px] px-1.5">
                {badge.texto}
              </Badge>
            )}
          </div>
        </div>
        {accion && <div className="flex items-center gap-2">{accion}</div>}
      </div>
      <p className="text-[11px] text-muted-foreground mt-0.5">{descripcion}</p>
      {stats && (
        <div className="flex flex-wrap gap-3 mt-2">
          {stats.map((s) => (
            <div key={s.label} className="flex items-center gap-1 text-[10px]">
              <span className="text-muted-foreground">{s.label}:</span>
              <span className="font-semibold">{s.valor}</span>
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
}