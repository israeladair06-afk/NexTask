'use client';

import { motion } from 'framer-motion';
import { Clock, Construction, Database } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { LucideIcon } from 'lucide-react';

interface ModuloPlaceholderProps {
  titulo: string;
  descripcion: string;
  icono: LucideIcon;
  caracteristicas: string[];
  estado: 'activo' | 'preparado' | 'proximamente';
}

export function ModuloPlaceholder({
  titulo,
  descripcion,
  icono: Icono,
  caracteristicas,
  estado,
}: ModuloPlaceholderProps) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="flex items-center gap-3 mb-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Icono className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-3xl font-bold tracking-tight">{titulo}</h1>
              {estado !== 'activo' && (
                <Badge variant="warning" className="text-[10px]">
                  {estado === 'preparado' ? 'Pendiente de integración' : 'Próximamente'}
                </Badge>
              )}
            </div>
            <p className="text-muted-foreground">{descripcion}</p>
          </div>
        </div>
      </motion.div>

      <div className="grid gap-4 md:grid-cols-2">
        {/* Features card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="text-lg">Funcionalidades planificadas</CardTitle>
              <CardDescription>
                Características previstas para este módulo cuando se integre con el backend.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {caracteristicas.map((caracteristica) => (
                  <li key={caracteristica} className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                    <span className="text-sm text-muted-foreground">{caracteristica}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </motion.div>

        {/* Status card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="text-lg">Estado de desarrollo</CardTitle>
              <CardDescription>
                Información sobre el estado actual de implementación de este módulo.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-xl border border-dashed bg-muted/30 p-6 text-center">
                <Database className="mx-auto h-8 w-8 text-muted-foreground" />
                <p className="mt-3 text-sm font-medium text-foreground">
                  Pendiente de conexión con servicios
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Aquí irá próximamente la integración con el backend para operaciones en tiempo real.
                </p>
              </div>

              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Clock className="h-3.5 w-3.5" />
                <span>
                  Los datos cargados dinámicamente desde el sistema aparecerán una vez conectado el backend.
                </span>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Placeholder section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
      >
        <Card>
          <CardContent className="p-8 text-center">
            <Construction className="mx-auto h-12 w-12 text-muted-foreground/40" />
            <h3 className="mt-4 text-lg font-semibold">Módulo en preparación</h3>
            <p className="mt-2 max-w-md mx-auto text-sm text-muted-foreground">
              Este módulo se encuentra en fase de diseño y desarrollo. La interfaz visual está
              preparada para cuando la lógica de negocio y los servicios estén disponibles.
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}