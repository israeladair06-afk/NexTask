'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Map, Clock, Warehouse,
  Package, ArrowRight, Truck, ClipboardList, Boxes,
  Layers,
} from 'lucide-react';
import { WmsLayout } from '@/components/wms-layout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/boton';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/cn';
import type { ZonaBodega } from '@/types/wms';

/* ───────────────────────────────────────
   Tipos y datos del layout de bodega
   ─────────────────────────────────────── */

interface Pasillo {
  id: string;
  nombre: string;
  tipo: 'almacenamiento' | 'recepcion' | 'despacho' | 'picking' | 'transito';
  racks: RackInfo[];
}

interface RackInfo {
  id: string;
  codigo: string;
  estado: 'disponible' | 'parcial' | 'lleno' | 'bloqueado' | 'mantenimiento';
  nivel: number;
  porcentajeOcupacion: number;
}

const tipoPasillo = {
  almacenamiento: { label: 'Almacenamiento', color: 'border-blue-400 bg-blue-50 dark:bg-blue-950/30 dark:border-blue-800', text: 'text-blue-700 dark:text-blue-300', icon: Package },
  recepcion:      { label: 'Recepción',      color: 'border-emerald-400 bg-emerald-50 dark:bg-emerald-950/30 dark:border-emerald-800', text: 'text-emerald-700 dark:text-emerald-300', icon: Truck },
  despacho:       { label: 'Despacho',        color: 'border-violet-400 bg-violet-50 dark:bg-violet-950/30 dark:border-violet-800', text: 'text-violet-700 dark:text-violet-300', icon: Boxes },
  picking:        { label: 'Picking',         color: 'border-amber-400 bg-amber-50 dark:bg-amber-950/30 dark:border-amber-800', text: 'text-amber-700 dark:text-amber-300', icon: ClipboardList },
  transito:       { label: 'Tránsito',        color: 'border-slate-300 bg-slate-50 dark:bg-slate-900/50 dark:border-slate-600', text: 'text-slate-600 dark:text-slate-400', icon: ArrowRight },
};

const estadoRack = {
  disponible:   { label: 'Disponible', classes: 'bg-emerald-500 text-white shadow-sm shadow-emerald-500/30' },
  parcial:      { label: 'Parcial',    classes: 'bg-amber-500 text-white shadow-sm shadow-amber-500/30' },
  lleno:        { label: 'Lleno',      classes: 'bg-red-500 text-white shadow-sm shadow-red-500/30' },
  bloqueado:    { label: 'Bloqueado',  classes: 'bg-slate-500 text-white shadow-sm shadow-slate-500/30' },
  mantenimiento:{ label: 'Mant.',      classes: 'bg-blue-500 text-white shadow-sm shadow-blue-500/30' },
};

/* ── Layout de bodega profesional ── */
const LAYOUT_BODEGA: Pasillo[] = [
  {
    id: 'dock-rec', nombre: 'Dock Recepción', tipo: 'recepcion',
    racks: Array.from({ length: 8 }, (_, i) => ({
      id: `REC-${i + 1}`, codigo: `REC-${String(i + 1).padStart(2, '0')}`,
      estado: (['disponible', 'parcial', 'lleno', 'disponible', 'parcial', 'disponible', 'lleno', 'disponible'] as const)[i],
      nivel: 1, porcentajeOcupacion: [0, 35, 90, 0, 45, 0, 80, 0][i],
    })),
  },
  {
    id: 'pas-a1', nombre: 'Pasillo A1 — Alta Rotación', tipo: 'almacenamiento',
    racks: Array.from({ length: 12 }, (_, i) => ({
      id: `A1-${i + 1}`, codigo: `A1-${String(i + 1).padStart(2, '0')}`,
      estado: (['parcial', 'lleno', 'lleno', 'parcial', 'disponible', 'lleno', 'parcial', 'lleno', 'lleno', 'parcial', 'disponible', 'parcial'] as const)[i],
      nivel: 2 + (i % 3), porcentajeOcupacion: [45, 92, 88, 55, 0, 95, 60, 85, 90, 50, 0, 65][i],
    })),
  },
  {
    id: 'pas-a2', nombre: 'Pasillo A2 — Media Rotación', tipo: 'almacenamiento',
    racks: Array.from({ length: 12 }, (_, i) => ({
      id: `A2-${i + 1}`, codigo: `A2-${String(i + 1).padStart(2, '0')}`,
      estado: (['disponible', 'parcial', 'lleno', 'disponible', 'parcial', 'parcial', 'lleno', 'disponible', 'parcial', 'lleno', 'parcial', 'disponible'] as const)[i],
      nivel: 2 + (i % 3), porcentajeOcupacion: [0, 40, 82, 0, 35, 50, 78, 0, 45, 85, 55, 0][i],
    })),
  },
  {
    id: 'zona-pick', nombre: 'Zona Picking — Prep. Pedidos', tipo: 'picking',
    racks: Array.from({ length: 10 }, (_, i) => ({
      id: `PK-${i + 1}`, codigo: `PK-${String(i + 1).padStart(2, '0')}`,
      estado: (['parcial', 'parcial', 'disponible', 'lleno', 'parcial', 'disponible', 'parcial', 'lleno', 'parcial', 'disponible'] as const)[i],
      nivel: 1, porcentajeOcupacion: [30, 55, 0, 75, 40, 0, 35, 70, 50, 0][i],
    })),
  },
  {
    id: 'pas-b1', nombre: 'Pasillo B1 — Reserva', tipo: 'almacenamiento',
    racks: Array.from({ length: 10 }, (_, i) => ({
      id: `B1-${i + 1}`, codigo: `B1-${String(i + 1).padStart(2, '0')}`,
      estado: (['lleno', 'lleno', 'parcial', 'lleno', 'bloqueado', 'parcial', 'lleno', 'parcial', 'lleno', 'disponible'] as const)[i],
      nivel: 3 + (i % 2), porcentajeOcupacion: [95, 90, 60, 88, 100, 55, 85, 50, 92, 0][i],
    })),
  },
  {
    id: 'dock-desp', nombre: 'Dock Despacho', tipo: 'despacho',
    racks: Array.from({ length: 8 }, (_, i) => ({
      id: `DES-${i + 1}`, codigo: `DES-${String(i + 1).padStart(2, '0')}`,
      estado: (['parcial', 'disponible', 'lleno', 'parcial', 'disponible', 'parcial', 'disponible', 'parcial'] as const)[i],
      nivel: 1, porcentajeOcupacion: [45, 0, 85, 30, 0, 50, 0, 40][i],
    })),
  },
  {
    id: 'transito', nombre: 'Pasillo Central — Tránsito', tipo: 'transito',
    racks: Array.from({ length: 6 }, (_, i) => ({
      id: `TR-${i + 1}`, codigo: `TR-${String(i + 1).padStart(2, '0')}`,
      estado: 'disponible', nivel: 1, porcentajeOcupacion: 0,
    })),
  },
];

/* ── Resumen de zonas ── */
const ZONAS_RESUMEN: ZonaBodega[] = [
  { id: 'recepcion', nombre: 'Recepción', color: 'emerald', pasillos: 1, totalUbicaciones: 8, ocupadas: 4 },
  { id: 'almacenaje', nombre: 'Almacenaje', color: 'blue', pasillos: 3, totalUbicaciones: 34, ocupadas: 26 },
  { id: 'picking', nombre: 'Picking', color: 'amber', pasillos: 1, totalUbicaciones: 10, ocupadas: 6 },
  { id: 'despacho', nombre: 'Despacho', color: 'violet', pasillos: 1, totalUbicaciones: 8, ocupadas: 4 },
];

const colorZonaMap = {
  emerald: { dot: 'bg-emerald-500', bg: 'bg-emerald-50 dark:bg-emerald-950/30', text: 'text-emerald-700 dark:text-emerald-300', border: 'border-emerald-200 dark:border-emerald-800' },
  blue:    { dot: 'bg-blue-500',    bg: 'bg-blue-50 dark:bg-blue-950/30',    text: 'text-blue-700 dark:text-blue-300',    border: 'border-blue-200 dark:border-blue-800' },
  amber:   { dot: 'bg-amber-500',   bg: 'bg-amber-50 dark:bg-amber-950/30',  text: 'text-amber-700 dark:text-amber-300',  border: 'border-amber-200 dark:border-amber-800' },
  violet:  { dot: 'bg-violet-500',  bg: 'bg-violet-50 dark:bg-violet-950/30', text: 'text-violet-700 dark:text-violet-300', border: 'border-violet-200 dark:border-violet-800' },
};

export default function MapeoBodegaPage() {
  const [pasilloActivo, setPasilloActivo] = useState(LAYOUT_BODEGA[0].id);
  const [verTodo, setVerTodo] = useState(true);

  const pasilloSeleccionado = useMemo(
    () => LAYOUT_BODEGA.find(p => p.id === pasilloActivo) ?? LAYOUT_BODEGA[0],
    [pasilloActivo]
  );

  const totalUbicaciones = useMemo(
    () => LAYOUT_BODEGA.reduce((a, p) => a + p.racks.length, 0),
    []
  );
  const totalOcupadas = useMemo(
    () => LAYOUT_BODEGA.reduce((a, p) => a + p.racks.filter(r => r.estado === 'lleno' || r.estado === 'parcial').length, 0),
    []
  );
  const totalDisponibles = useMemo(
    () => LAYOUT_BODEGA.reduce((a, p) => a + p.racks.filter(r => r.estado === 'disponible').length, 0),
    []
  );

  return (
    <WmsLayout>
      {/* ── Header ── */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="mb-3"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10">
              <Map className="h-3.5 w-3.5 text-primary" />
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-tight leading-tight">Mapeo de Bodega</h1>
              <p className="text-[11px] text-muted-foreground">Layout interactivo y gestión de ubicaciones</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="h-6 text-[10px] gap-1">
              <Layers className="h-3 w-3" />
              {totalUbicaciones} ubicaciones
            </Badge>
          </div>
        </div>
      </motion.div>

      {/* ── Grid principal ── */}
      <div className="grid gap-3 lg:grid-cols-[1fr_260px]">
        {/* ── Lado izquierdo: Layout ── */}
        <div className="space-y-3">
          {/* Selector de pasillos */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.05 }}
          >
            <Card>
              <CardHeader className="p-2.5 pb-1">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xs font-medium text-muted-foreground">Seleccionar pasillo / zona</CardTitle>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 text-[10px] gap-1"
                    onClick={() => setVerTodo(!verTodo)}
                  >
                    <Map className="h-3 w-3" />
                    {verTodo ? 'Ver detalle' : 'Vista general'}
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-2.5 pt-1">
                <div className="flex flex-wrap gap-1.5">
                  {LAYOUT_BODEGA.map((pasillo) => {
                    const cfg = tipoPasillo[pasillo.tipo];
                    const Icono = cfg.icon;
                    const activo = pasilloActivo === pasillo.id;
                    return (
                      <button
                        key={pasillo.id}
                        onClick={() => { setPasilloActivo(pasillo.id); setVerTodo(false); }}
                        className={cn(
                          'flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-[10px] transition-all',
                          cfg.color,
                          activo && !verTodo && 'ring-2 ring-primary/40 ring-offset-1 ring-offset-background',
                          verTodo && 'opacity-80'
                        )}
                      >
                        <Icono className={cn('h-3 w-3', cfg.text)} />
                        <span className={cn('font-medium', cfg.text)}>{pasillo.nombre}</span>
                        <Badge variant="outline" className={cn('h-3.5 text-[8px] px-1 border-0 ml-0.5', cfg.text)}>
                          {pasillo.racks.length}
                        </Badge>
                      </button>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Layout visual de racks */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.07 }}
          >
            {verTodo ? (
              /* ── Vista general: Todos los pasillos ── */
              <div className="space-y-2">
                {LAYOUT_BODEGA.map((pasillo) => {
                  const cfg = tipoPasillo[pasillo.tipo];
                  const Icono = cfg.icon;
                  return (
                    <Card key={pasillo.id} className={cn('border-l-4', cfg.color.replace('border-', 'border-l-'))}>
                      <CardHeader className="p-2.5 pb-1 flex flex-row items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Icono className={cn('h-3.5 w-3.5', cfg.text)} />
                          <CardTitle className={cn('text-xs', cfg.text)}>{pasillo.nombre}</CardTitle>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Badge variant="outline" className="h-4 text-[8px] px-1.5">
                            {pasillo.racks.filter(r => r.estado === 'disponible').length} libres
                          </Badge>
                          <Badge variant="outline" className="h-4 text-[8px] px-1.5">
                            {pasillo.racks.filter(r => r.estado === 'lleno' || r.estado === 'parcial').length} ocupados
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="p-2.5 pt-1">
                        <div className="flex flex-wrap gap-1">
                          {pasillo.racks.map((rack) => {
                            const est = estadoRack[rack.estado];
                            return (
                              <div
                                key={rack.id}
                                className={cn(
                                  'flex items-center justify-center rounded-md text-[8px] font-bold w-8 h-8',
                                  est.classes
                                )}
                                title={`${rack.codigo} — ${est.label} (${rack.porcentajeOcupacion}%)`}
                              >
                                {rack.porcentajeOcupacion > 0 ? rack.porcentajeOcupacion : '·'}
                              </div>
                            );
                          })}
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            ) : (
              /* ── Vista detalle: Un pasillo ── */
              <Card className={cn('border-l-4', tipoPasillo[pasilloSeleccionado.tipo].color.replace('border-', 'border-l-'))}>
                <CardHeader className="p-3 pb-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {(() => {
                        const Icono = tipoPasillo[pasilloSeleccionado.tipo].icon;
                        return <Icono className={cn('h-4 w-4', tipoPasillo[pasilloSeleccionado.tipo].text)} />;
                      })()}
                      <CardTitle className="text-sm">{pasilloSeleccionado.nombre}</CardTitle>
                    </div>
                    <Badge variant="outline" className="text-[9px] h-4 px-1.5">
                      {pasilloSeleccionado.racks.length} racks
                    </Badge>
                  </div>
                  <CardDescription className="text-[10px] flex items-center gap-2 mt-0.5">
                    <span className="flex items-center gap-1">
                      <span className="h-2 w-2 rounded-full bg-emerald-500" />
                      {pasilloSeleccionado.racks.filter(r => r.estado === 'disponible').length} disp.
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="h-2 w-2 rounded-full bg-amber-500" />
                      {pasilloSeleccionado.racks.filter(r => r.estado === 'parcial').length} parcial
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="h-2 w-2 rounded-full bg-red-500" />
                      {pasilloSeleccionado.racks.filter(r => r.estado === 'lleno').length} lleno
                    </span>
                    {pasilloSeleccionado.racks.filter(r => r.estado === 'bloqueado' || r.estado === 'mantenimiento').length > 0 && (
                      <span className="flex items-center gap-1">
                        <span className="h-2 w-2 rounded-full bg-slate-500" />
                        {pasilloSeleccionado.racks.filter(r => r.estado === 'bloqueado' || r.estado === 'mantenimiento').length} bloq.
                      </span>
                    )}
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-3 pt-0">
                  <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-1.5">
                    {pasilloSeleccionado.racks.map((rack) => {
                      const est = estadoRack[rack.estado];
                      return (
                        <button
                          key={rack.id}
                          className={cn(
                            'flex flex-col items-center justify-center rounded-lg p-2 text-xs transition-all hover:scale-105 cursor-pointer',
                            'shadow-sm',
                            est.classes
                          )}
                          title={`${rack.codigo} — ${est.label} — Nivel ${rack.nivel} — ${rack.porcentajeOcupacion}% ocupado`}
                        >
                          <span className="font-bold text-[11px] leading-tight">{rack.codigo}</span>
                          <span className="text-[8px] opacity-80 mt-0.5">Nv.{rack.nivel}</span>
                          {rack.porcentajeOcupacion > 0 && (
                            <div className="w-full mt-1 h-1 rounded-full bg-white/30 overflow-hidden">
                              <div
                                className="h-full rounded-full bg-white/60"
                                style={{ width: `${rack.porcentajeOcupacion}%` }}
                              />
                            </div>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            )}
          </motion.div>

          {/* Leyenda de colores */}
          <Card className="bg-muted/20">
            <CardContent className="p-2.5">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                <span className="text-[9px] text-muted-foreground font-medium">Leyenda:</span>
                {Object.entries(estadoRack).map(([key, val]) => (
                  <div key={key} className="flex items-center gap-1">
                    <span className={cn('h-2.5 w-2.5 rounded', val.classes.split(' ')[0])} />
                    <span className="text-[9px]">{val.label}</span>
                  </div>
                ))}
                <div className="flex items-center gap-1">
                  <span className="h-2.5 w-2.5 rounded bg-slate-500" />
                  <span className="text-[9px]">Mantenimiento</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* ── Sidebar derecho: Resumen y estadísticas ── */}
        <div className="space-y-3">
          {/* Resumen general */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <Card>
              <CardHeader className="p-3 pb-2">
                <CardTitle className="text-sm flex items-center gap-1.5">
                  <Warehouse className="h-3.5 w-3.5 text-primary" />
                  Resumen de Bodega
                </CardTitle>
              </CardHeader>
              <CardContent className="p-3 pt-0 space-y-2.5">
                <div className="grid grid-cols-3 gap-2">
                  <div className="rounded-lg bg-emerald-500/10 p-2 text-center">
                    <p className="text-lg font-bold text-emerald-600 dark:text-emerald-400">{totalDisponibles}</p>
                    <p className="text-[9px] text-muted-foreground">Disponibles</p>
                  </div>
                  <div className="rounded-lg bg-amber-500/10 p-2 text-center">
                    <p className="text-lg font-bold text-amber-600 dark:text-amber-400">{totalOcupadas}</p>
                    <p className="text-[9px] text-muted-foreground">Ocupadas</p>
                  </div>
                  <div className="rounded-lg bg-blue-500/10 p-2 text-center">
                    <p className="text-lg font-bold text-blue-600 dark:text-blue-400">7</p>
                    <p className="text-[9px] text-muted-foreground">Pasillos</p>
                  </div>
                </div>

                <Separator className="opacity-50" />

                <div className="space-y-2">
                  {ZONAS_RESUMEN.map((zona) => {
                    const cfg = colorZonaMap[zona.color];
                    return (
                      <div key={zona.id} className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2">
                          <div className={cn('h-2 w-2 rounded-full', cfg.dot)} />
                          <span>{zona.nombre}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-muted-foreground text-[10px]">{zona.ocupadas}/{zona.totalUbicaciones}</span>
                          <span className={cn('text-[10px] font-medium', cfg.text)}>
                            {Math.round((zona.ocupadas / zona.totalUbicaciones) * 100)}%
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <Separator className="opacity-50" />

                <div className="space-y-1">
                  <div className="flex items-center justify-between text-[10px]">
                    <span className="text-muted-foreground">Ocupación general</span>
                    <span className="font-medium">{Math.round((totalOcupadas / totalUbicaciones) * 100)}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-muted overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(totalOcupadas / totalUbicaciones) * 100}%` }}
                      transition={{ duration: 0.8, ease: 'easeOut' }}
                      className="h-full rounded-full bg-gradient-to-r from-emerald-500 via-amber-500 to-red-500"
                    />
                  </div>
                  <div className="flex justify-between text-[9px] text-muted-foreground">
                    <span>0%</span>
                    <span>50%</span>
                    <span>100%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Nota de integración */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.12 }}
          >
            <Card className="bg-muted/10 border-dashed border-border/50">
              <CardContent className="p-3">
                <div className="flex items-start gap-2 text-[10px] text-muted-foreground">
                  <Clock className="h-3 w-3 mt-0.5 shrink-0" />
                  <div>
                    <p className="font-medium text-foreground mb-0.5">Layout de demostración</p>
                    <p>
                      Los datos de ocupación y estado de racks son simulados para esta demo.
                      La integración con <code className="text-[9px] bg-muted px-1 rounded">GET /api/warehouse/layout</code> 
                      reemplazará estos valores con información real de la bodega.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </WmsLayout>
  );
}