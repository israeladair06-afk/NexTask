'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Map, ZoomIn, ZoomOut, RotateCcw, Clock } from 'lucide-react';
import { WmsLayout } from '@/components/wms-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/boton';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/cn';

interface RackCell {
  id: string;
  zona: string;
  codigo: string;
  estado: 'disponible' | 'parcial' | 'lleno' | 'bloqueado' | 'mantenimiento';
  nivel: number;
}

const ZONAS = [
  { id: 'A', nombre: 'Zona A — Recepción' },
  { id: 'B', nombre: 'Zona B — Almacenaje General' },
  { id: 'C', nombre: 'Zona C — Picking' },
  { id: 'D', nombre: 'Zona D — Despacho' },
];

function generarRacks(zona: string): RackCell[] {
  const estados: RackCell['estado'][] = ['disponible', 'parcial', 'lleno', 'bloqueado', 'mantenimiento'];
  return Array.from({ length: 12 }, (_, i) => ({
    id: `${zona}-${i + 1}`,
    zona,
    codigo: `${zona}-${String(i + 1).padStart(2, '0')}`,
    estado: estados[Math.floor(Math.random() * estados.length)],
    nivel: Math.floor(Math.random() * 4) + 1,
  }));
}

const estadoConfig: Record<RackCell['estado'], { label: string; classes: string }> = {
  disponible: { label: 'Disponible', classes: 'bg-emerald-500/20 border-emerald-500/40 text-emerald-600 dark:text-emerald-400' },
  parcial: { label: 'Parcial', classes: 'bg-amber-500/20 border-amber-500/40 text-amber-600 dark:text-amber-400' },
  lleno: { label: 'Lleno', classes: 'bg-red-500/20 border-red-500/40 text-red-600 dark:text-red-400' },
  bloqueado: { label: 'Bloqueado', classes: 'bg-slate-500/20 border-slate-500/40 text-slate-600 dark:text-slate-400' },
  mantenimiento: { label: 'Mantenimiento', classes: 'bg-blue-500/20 border-blue-500/40 text-blue-600 dark:text-blue-400' },
};

export default function MapeoBodegaPage() {
  const [zonaActiva, setZonaActiva] = useState('A');
  const racks = generarRacks(zonaActiva);

  return (
    <WmsLayout>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <div className="flex items-center gap-3 mb-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Map className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Mapeo de Bodega</h1>
            <p className="text-muted-foreground">Visualización y gestión del layout de la bodega.</p>
          </div>
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.1 }} className="mt-6 mb-6">
        <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
          <Tabs defaultValue="A" value={zonaActiva} onValueChange={setZonaActiva}>
            <TabsList>
              {ZONAS.map((z) => (
                <TabsTrigger key={z.id} value={z.id}>{z.nombre.split(' — ')[0]}</TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="gap-1"><ZoomIn className="h-4 w-4" />Acercar</Button>
            <Button variant="outline" size="sm" className="gap-1"><ZoomOut className="h-4 w-4" />Alejar</Button>
            <Button variant="outline" size="sm" className="gap-1"><RotateCcw className="h-4 w-4" />Reset</Button>
          </div>
        </div>
      </motion.div>

      <div className="grid gap-4 lg:grid-cols-[1fr_280px]">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.2 }}>
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm">{ZONAS.find(z => z.id === zonaActiva)?.nombre}</CardTitle>
                <Badge variant="outline" className="text-[10px]">{racks.length} ubicaciones</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
                {racks.map((rack) => {
                  const cfg = estadoConfig[rack.estado];
                  return (
                    <button
                      key={rack.id}
                      className={cn('flex flex-col items-center justify-center rounded-xl border-2 p-3 text-xs transition-all hover:scale-105 cursor-pointer', cfg.classes)}
                      title={`${rack.codigo} — ${cfg.label} — Nivel ${rack.nivel}`}
                    >
                      <span className="font-bold text-sm">{rack.codigo}</span>
                      <span className="text-[9px] mt-1 opacity-70">Nv.{rack.nivel}</span>
                    </button>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.25 }} className="space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Leyenda</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {Object.entries(estadoConfig).map(([key, val]) => (
                <div key={key} className="flex items-center gap-2 text-xs">
                  <span className={cn('h-3 w-3 rounded border', val.classes.split(' ').slice(0, 2).join(' '))} />
                  <span>{val.label}</span>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Resumen Zona</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-xs">
              <div className="flex justify-between"><span className="text-muted-foreground">Disponible</span><span className="font-medium">—</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Parcial</span><span className="font-medium">—</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Lleno</span><span className="font-medium">—</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Bloqueado</span><span className="font-medium">—</span></div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <div className="mt-6 rounded-xl border border-dashed bg-card/30 p-4 text-center">
        <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
          <Clock className="h-3.5 w-3.5" />
          <span>Representación visual de la bodega. Los datos de ocupación se cargarán desde el backend.</span>
        </div>
      </div>
    </WmsLayout>
  );
}