'use client';

import { cn } from '@/lib/cn';
import { Badge } from '@/components/ui/badge';
import { Circle } from 'lucide-react';

interface StatusBadgeProps {
  estado: string;
  variant?: 'default' | 'secondary' | 'destructive' | 'outline' | 'success' | 'warning';
  dot?: boolean;
  className?: string;
}

const STATUS_MAP: Record<string, { label: string; variant: Exclude<StatusBadgeProps['variant'], undefined> }> = {
  disponible: { label: 'Disponible', variant: 'success' },
  parcial: { label: 'Parcial', variant: 'warning' },
  lleno: { label: 'Lleno', variant: 'destructive' },
  bloqueado: { label: 'Bloqueado', variant: 'outline' },
  pendiente: { label: 'Pendiente', variant: 'outline' },
  en_progreso: { label: 'En Progreso', variant: 'warning' },
  en_curso: { label: 'En Curso', variant: 'warning' },
  completado: { label: 'Completado', variant: 'success' },
  asignado: { label: 'Asignado', variant: 'secondary' },
  activo: { label: 'Activo', variant: 'success' },
  inactivo: { label: 'Inactivo', variant: 'outline' },
  // Stock states
  bajo_stock: { label: 'Bajo Stock', variant: 'warning' },
  agotado: { label: 'Agotado', variant: 'destructive' },
  en_transito: { label: 'En Tránsito', variant: 'secondary' },
  // Priority
  critica: { label: 'Crítica', variant: 'destructive' },
  alta: { label: 'Alta', variant: 'warning' },
  media: { label: 'Media', variant: 'secondary' },
  baja: { label: 'Baja', variant: 'outline' },
  urgente: { label: 'Urgente', variant: 'destructive' },
  normal: { label: 'Normal', variant: 'outline' },
};

export function StatusBadge({ estado, variant, dot = true, className }: StatusBadgeProps) {
  const config = STATUS_MAP[estado];
  const label = config?.label ?? estado;
  const v = variant ?? config?.variant ?? 'outline';

  return (
    <Badge variant={v} className={cn('h-4.5 text-[9px] px-1.5 gap-1 font-medium', className)}>
      {dot && <Circle className="h-1.5 w-1.5 fill-current" />}
      {label}
    </Badge>
  );
}