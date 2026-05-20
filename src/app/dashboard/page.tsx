'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Package,
  Warehouse,
  Activity,
  TrendingUp,
  Clock,
  AlertTriangle,
  BarChart3,

  Map,
  ScanLine,
  PackageCheck,
  ClipboardList,
  Boxes,
  Truck,
  AlertCircle,
  Info,
  ChevronRight,
  CircleDot,

  Zap,
} from 'lucide-react';
import Link from 'next/link';
import { WmsLayout } from '@/components/wms-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/boton';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/cn';
import type { TareaUrgente, AlertaWMS, OcupacionZona, InstruccionPicking, EstadoSistema } from '@/types/wms';

/* ───────────────────────────────────────
   Mock data — reemplazar con llamadas API
   ─────────────────────────────────────── */

const KPIS = [
  { titulo: 'SKUs en Stock', valor: '12,450', icono: Package, color: 'text-blue-500', bg: 'bg-blue-500/10', cambio: '+3.2%', tendencia: 'up' as const },
  { titulo: 'Órdenes Activas', valor: '247', icono: Activity, color: 'text-emerald-500', bg: 'bg-emerald-500/10', cambio: '+12', tendencia: 'up' as const },
  { titulo: 'Capacidad Ocupada', valor: '72%', icono: Warehouse, color: 'text-amber-500', bg: 'bg-amber-500/10', cambio: '84% disp.', tendencia: 'neutral' as const },
  { titulo: 'Picking Pendiente', valor: '89', icono: ClipboardList, color: 'text-violet-500', bg: 'bg-violet-500/10', cambio: '34 urgentes', tendencia: 'down' as const },
  { titulo: 'Recepciones', valor: '16', icono: Truck, color: 'text-cyan-500', bg: 'bg-cyan-500/10', cambio: '+3 hoy', tendencia: 'up' as const },
  { titulo: 'Packing Pendiente', valor: '45', icono: Boxes, color: 'text-orange-500', bg: 'bg-orange-500/10', cambio: '12 críticos', tendencia: 'down' as const },
  { titulo: 'Despachos', valor: '23', icono: PackageCheck, color: 'text-teal-500', bg: 'bg-teal-500/10', cambio: '+8 hoy', tendencia: 'up' as const },
  { titulo: 'Alertas Críticas', valor: '7', icono: AlertTriangle, color: 'text-red-500', bg: 'bg-red-500/10', cambio: '+2 últ. hora', tendencia: 'down' as const },
  { titulo: 'Ubicaciones', valor: '2,400', icono: Map, color: 'text-sky-500', bg: 'bg-sky-500/10', cambio: '82% ocupado', tendencia: 'neutral' as const },
  { titulo: 'Productividad', valor: '94%', icono: BarChart3, color: 'text-indigo-500', bg: 'bg-indigo-500/10', cambio: '+1.5%', tendencia: 'up' as const },
];

const tareasUrgentes: TareaUrgente[] = [
  { id: 'T-001', tipo: 'picking', titulo: 'Pedido EXP-4521 - Urgente (Cliente VIP)', prioridad: 'critica', origen: 'B-12-04', destino: 'Dock 3', fechaLimite: 'Hoy 14:00', estado: 'pendiente' },
  { id: 'T-002', tipo: 'despacho', titulo: 'Envío pendiente a Sucursal Norte', prioridad: 'alta', origen: 'Zona C', destino: 'Muelle 1', fechaLimite: 'Hoy 16:00', estado: 'en_progreso' },
  { id: 'T-003', tipo: 'recepcion', titulo: 'Recepción de proveedor LogisCorp', prioridad: 'alta', origen: 'Dock 2', destino: 'Zona A', fechaLimite: 'Hoy 12:30', estado: 'pendiente' },
  { id: 'T-004', tipo: 'packing', titulo: 'Consolidación pedido múltiple #889', prioridad: 'media', origen: 'Mesa 4', destino: 'Cinta 2', fechaLimite: 'Hoy 17:00', estado: 'en_progreso' },
  { id: 'T-005', tipo: 'inventario', titulo: 'Conteo cíclico Zona B - Pasillo 5', prioridad: 'critica', origen: 'B-05', destino: 'Oficina', fechaLimite: 'Mañana 09:00', estado: 'pendiente' },
  { id: 'T-006', tipo: 'picking', titulo: 'Pedido EXP-4590 - Reposición farmacia', prioridad: 'media', origen: 'C-08-12', destino: 'Dock 1', fechaLimite: 'Hoy 18:00', estado: 'pendiente' },
];

const ocupacionZonas: OcupacionZona[] = [
  { zona: 'A — Recepción', total: 240, ocupado: 192, disponible: 48, porcentajeOcupacion: 80 },
  { zona: 'B — Almacenaje', total: 960, ocupado: 768, disponible: 192, porcentajeOcupacion: 80 },
  { zona: 'C — Picking', total: 480, ocupado: 326, disponible: 154, porcentajeOcupacion: 68 },
  { zona: 'D — Despacho', total: 360, ocupado: 252, disponible: 108, porcentajeOcupacion: 70 },
  { zona: 'E — Devoluciones', total: 120, ocupado: 42, disponible: 78, porcentajeOcupacion: 35 },
  { zona: 'F — Cuarentena', total: 240, ocupado: 18, disponible: 222, porcentajeOcupacion: 7.5 },
];

const alertas: AlertaWMS[] = [
  { id: 'AL-001', tipo: 'critico', mensaje: 'Stock crítico: SKU-8842 por debajo del mínimo', modulo: 'Inventario', timestamp: 'Hace 5 min', prioridad: 1 },
  { id: 'AL-002', tipo: 'critico', mensaje: 'Temperatura fuera de rango en Zona B - Cámara 3', modulo: 'Monitoreo', timestamp: 'Hace 12 min', prioridad: 1 },
  { id: 'AL-003', tipo: 'advertencia', mensaje: 'Ubicación B-12-09 bloqueada por mantenimiento', modulo: 'Mapeo', timestamp: 'Hace 23 min', prioridad: 2 },
  { id: 'AL-004', tipo: 'advertencia', mensaje: '3 pedidos picking sobrepasan tiempo estimado', modulo: 'Picking', timestamp: 'Hace 31 min', prioridad: 2 },
  { id: 'AL-005', tipo: 'info', mensaje: 'Sincronización con ERP completada correctamente', modulo: 'Sistema', timestamp: 'Hace 1 h', prioridad: 3 },
  { id: 'AL-006', tipo: 'info', mensaje: 'Nuevo operador registrado en turno vespertino', modulo: 'Usuarios', timestamp: 'Hace 2 h', prioridad: 3 },
];

const pickingInstrucciones: InstruccionPicking[] = [
  { id: 'PK-001', orden: 'EXP-4521', sku: 'SKU-8842', producto: 'Caja Tornillos M8 x 100', cantidad: 48, ubicacion: 'B-12-04', destino: 'Dock 3', prioridad: 'express', estado: 'pendiente' },
  { id: 'PK-002', orden: 'EXP-4522', sku: 'SKU-2391', producto: 'Sensor Temperatura T200', cantidad: 12, ubicacion: 'C-04-08', destino: 'Dock 3', prioridad: 'urgente', estado: 'asignado' },
  { id: 'PK-003', orden: 'EXP-4523', sku: 'SKU-5610', producto: 'Kit Juntas Hidráulicas', cantidad: 24, ubicacion: 'B-08-02', destino: 'Dock 1', prioridad: 'normal', estado: 'en_curso' },
  { id: 'PK-004', orden: 'EXP-4524', sku: 'SKU-7734', producto: 'Rodamiento SKF 6205', cantidad: 60, ubicacion: 'C-02-16', destino: 'Dock 2', prioridad: 'urgente', estado: 'pendiente' },
  { id: 'PK-005', orden: 'EXP-4525', sku: 'SKU-1209', producto: 'Filtro Aceite F-450', cantidad: 36, ubicacion: 'B-15-11', destino: 'Cinta 4', prioridad: 'normal', estado: 'completado' },
];

const actividadMock = {
  hoy: { recepciones: 16, pickings: 89, packings: 45, despachos: 23, totalOperaciones: 173 },
  semana: { recepciones: 92, pickings: 523, packings: 271, despachos: 148, totalOperaciones: 1034 },
  mes: { recepciones: 384, pickings: 2150, packings: 1082, despachos: 596, totalOperaciones: 4212 },
};

const estadoSistema: EstadoSistema = {
  version: 'v1.0.0',
  frontend: 'completo',
  backend: 'pendiente',
  baseDatos: 'pendiente',
  api: 'no_conectada',
  ultimaSync: '—',
};



/* ───────────────────────────────────
   Componentes internos
   ─────────────────────────────────── */

function IndicadorCambio({ cambio, tendencia }: { cambio: string; tendencia: 'up' | 'down' | 'neutral' }) {
  return (
    <span className={cn(
      'inline-flex items-center gap-0.5 text-[10px] font-medium',
      tendencia === 'up' && 'text-emerald-500',
      tendencia === 'down' && 'text-red-500',
      tendencia === 'neutral' && 'text-muted-foreground',
    )}>
      {tendencia === 'up' && <TrendingUp className="h-2.5 w-2.5" />}
      {tendencia === 'down' && <TrendingUp className="h-2.5 w-2.5 rotate-180" />}
      {cambio}
    </span>
  );
}

function BarraOcupacion({ zona, disponible, porcentaje }: { zona: string; total: number; ocupado: number; disponible: number; porcentaje: number }) {
  const colorBarra = porcentaje > 85 ? 'bg-red-500' : porcentaje > 65 ? 'bg-amber-500' : 'bg-emerald-500';
  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between text-xs">
        <span className="font-medium truncate">{zona}</span>
        <span className="text-muted-foreground shrink-0 ml-2">{porcentaje.toFixed(0)}%</span>
      </div>
      <div className="flex items-center gap-2">
        <div className="flex-1 h-1.5 rounded-full bg-muted overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${porcentaje}%` }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className={cn('h-full rounded-full', colorBarra)}
          />
        </div>
        <span className="text-[10px] text-muted-foreground shrink-0 w-14 text-right">{disponible} libres</span>
      </div>
    </div>
  );
}

const prioridadConfig = {
  critica: { label: 'Crítica', classes: 'bg-red-500/10 text-red-600 border-red-500/30 dark:text-red-400' },
  alta:    { label: 'Alta',    classes: 'bg-orange-500/10 text-orange-600 border-orange-500/30 dark:text-orange-400' },
  media:   { label: 'Media',   classes: 'bg-amber-500/10 text-amber-600 border-amber-500/30 dark:text-amber-400' },
  baja:    { label: 'Baja',    classes: 'bg-slate-500/10 text-slate-600 border-slate-500/30 dark:text-slate-400' },
};

const tipoIcono = {
  picking:    { icon: ClipboardList, color: 'text-violet-500' },
  packing:    { icon: Boxes,        color: 'text-orange-500' },
  recepcion:  { icon: Truck,        color: 'text-cyan-500' },
  despacho:   { icon: PackageCheck, color: 'text-teal-500' },
  inventario: { icon: ScanLine,     color: 'text-blue-500' },
};

const alertaConfig = {
  critico:     { icon: AlertCircle, bg: 'bg-red-500/10 border-red-500/30', text: 'text-red-600 dark:text-red-400', dot: 'bg-red-500' },
  advertencia: { icon: AlertTriangle, bg: 'bg-amber-500/10 border-amber-500/30', text: 'text-amber-600 dark:text-amber-400', dot: 'bg-amber-500' },
  info:        { icon: Info,        bg: 'bg-blue-500/10 border-blue-500/30', text: 'text-blue-600 dark:text-blue-400', dot: 'bg-blue-500' },
};

const pickingPrioridadBadge = {
  express: 'bg-red-500/15 text-red-600 border-red-500/30 dark:text-red-400',
  urgente: 'bg-orange-500/15 text-orange-600 border-orange-500/30 dark:text-orange-400',
  normal:  'bg-slate-500/15 text-slate-600 border-slate-500/30 dark:text-slate-400',
};

const estadoPickBadge = {
  pendiente:  'bg-muted text-muted-foreground border-border',
  asignado:   'bg-blue-500/15 text-blue-600 border-blue-500/30 dark:text-blue-400',
  en_curso:   'bg-amber-500/15 text-amber-600 border-amber-500/30 dark:text-amber-400',
  completado: 'bg-emerald-500/15 text-emerald-600 border-emerald-500/30 dark:text-emerald-400',
};

export default function DashboardPage() {
  const [rangoActividad, setRangoActividad] = useState<'hoy' | 'semana' | 'mes'>('hoy');
  const dataActividad = actividadMock[rangoActividad];

  const handleRangoChange = (value: string) => {
    if (value === 'hoy' || value === 'semana' || value === 'mes') {
      setRangoActividad(value);
    }
  };

  return (
    <WmsLayout>
      {/* ── Header compacto ── */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="mb-3"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10">
              <BarChart3 className="h-3.5 w-3.5 text-primary" />
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-tight leading-tight">Dashboard WMS</h1>
              <p className="text-[11px] text-muted-foreground">Panel de control — NexTask WMS Enterprise</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="h-6 text-[10px] gap-1"><Clock className="h-3 w-3" />Actualizado: ahora</Badge>
            <Link href="/lobby">
              <Button variant="outline" size="sm" className="h-7 text-xs gap-1 px-2">
                <Warehouse className="h-3 w-3" />
                Lobby
              </Button>
            </Link>
          </div>
        </div>
      </motion.div>

      {/* ── KPIs compactos — 2 filas de 5 ── */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.05 }}
        className="mb-3 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-1.5"
      >
        {KPIS.map((kpi, i) => {
          const Icono = kpi.icono;
          return (
            <motion.div
              key={kpi.titulo}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2, delay: 0.05 + i * 0.02 }}
            >
              <Card className="transition-all hover:border-primary/20 hover:shadow-sm border-border/60">
                <CardHeader className="p-2.5 pb-1 flex flex-row items-center justify-between">
                  <CardTitle className="text-[11px] font-medium text-muted-foreground truncate pr-1">
                    {kpi.titulo}
                  </CardTitle>
                  <div className={cn('rounded-lg p-1 shrink-0', kpi.bg)}>
                    <Icono className={cn('h-3 w-3', kpi.color)} />
                  </div>
                </CardHeader>
                <CardContent className="p-2.5 pt-0.5">
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-lg font-bold leading-none">{kpi.valor}</span>
                    <IndicadorCambio cambio={kpi.cambio} tendencia={kpi.tendencia} />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </motion.div>

      {/* ── Grid principal 3 columnas ── */}
      <div className="grid gap-3 lg:grid-cols-[1.2fr_1fr_1fr] mb-3">

        {/* Col 1: Actividad del Almacén */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <Card className="h-full">
            <CardHeader className="p-3 pb-2">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-sm flex items-center gap-1.5">
                    <Activity className="h-3.5 w-3.5 text-primary" />
                    Actividad del Almacén
                  </CardTitle>
                  <CardDescription className="text-[10px]">
                    Resumen operativo del sistema.
                  </CardDescription>
                </div>
              </div>
              <Tabs defaultValue="hoy" value={rangoActividad} onValueChange={handleRangoChange} className="mt-2">
                <TabsList className="h-6">
                  <TabsTrigger value="hoy" className="text-[10px] px-2 py-0.5 h-5">Hoy</TabsTrigger>
                  <TabsTrigger value="semana" className="text-[10px] px-2 py-0.5 h-5">Semana</TabsTrigger>
                  <TabsTrigger value="mes" className="text-[10px] px-2 py-0.5 h-5">Mes</TabsTrigger>
                </TabsList>
              </Tabs>
            </CardHeader>
            <CardContent className="p-3 pt-0">
              <div className="grid grid-cols-2 gap-2 mt-1">
                {[
                  { label: 'Recepciones', value: dataActividad.recepciones, icon: Truck, color: 'text-cyan-500', bg: 'bg-cyan-500/10' },
                  { label: 'Picking', value: dataActividad.pickings, icon: ClipboardList, color: 'text-violet-500', bg: 'bg-violet-500/10' },
                  { label: 'Packing', value: dataActividad.packings, icon: Boxes, color: 'text-orange-500', bg: 'bg-orange-500/10' },
                  { label: 'Despachos', value: dataActividad.despachos, icon: PackageCheck, color: 'text-teal-500', bg: 'bg-teal-500/10' },
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.label} className="rounded-lg border border-border/50 p-2 bg-card/30">
                      <div className="flex items-center gap-1.5 mb-1">
                        <div className={cn('rounded-md p-1', item.bg)}>
                          <Icon className={cn('h-3 w-3', item.color)} />
                        </div>
                        <span className="text-[10px] text-muted-foreground">{item.label}</span>
                      </div>
                      <span className="text-base font-bold ml-1">{item.value}</span>
                    </div>
                  );
                })}
              </div>
              <div className="flex items-center justify-between mt-2 pt-1.5 border-t border-border/50 text-[10px] text-muted-foreground">
                <span>Total operaciones</span>
                <span className="font-semibold text-foreground">{dataActividad.totalOperaciones}</span>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Col 2: Tareas Urgentes */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.12 }}
        >
          <Card className="h-full">
            <CardHeader className="p-3 pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm flex items-center gap-1.5">
                  <Zap className="h-3.5 w-3.5 text-amber-500" />
                  Tareas Urgentes
                </CardTitle>
                <Badge variant="outline" className="text-[9px] h-4 px-1.5">{tareasUrgentes.filter(t => t.prioridad === 'critica' || t.prioridad === 'alta').length} críticas</Badge>
              </div>
              <CardDescription className="text-[10px]">
                Pedidos y operaciones con prioridad.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-3 pt-0">
              <ScrollArea className="h-[260px] pr-2">
                <div className="space-y-1.5">
                  {tareasUrgentes.map((tarea) => {
                    const tipo = tipoIcono[tarea.tipo];
                    const TipoIcon = tipo.icon;
                    const prioridad = prioridadConfig[tarea.prioridad];
                    return (
                      <div
                        key={tarea.id}
                        className="flex items-start gap-2 rounded-lg border border-border/50 p-2 hover:bg-accent/30 transition-colors cursor-pointer"
                      >
                        <div className={cn('rounded-md p-1 mt-0.5 shrink-0', tipo.color.replace('text-', 'bg-') + '/10')}>
                          <TipoIcon className={cn('h-3 w-3', tipo.color)} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-1.5 mb-0.5">
                            <span className="text-[11px] font-medium truncate">{tarea.titulo}</span>
                            <Badge variant="outline" className={cn('text-[8px] h-3.5 px-1 border', prioridad.classes)}>
                              {prioridad.label}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
                            <span>{tarea.origen} → {tarea.destino}</span>
                            <span>•</span>
                            <span>{tarea.fechaLimite}</span>
                          </div>
                        </div>
                        <ChevronRight className="h-3 w-3 text-muted-foreground shrink-0 mt-1" />
                      </div>
                    );
                  })}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </motion.div>

        {/* Col 3: Ocupación por Zona */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.14 }}
        >
          <Card className="h-full">
            <CardHeader className="p-3 pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm flex items-center gap-1.5">
                  <Map className="h-3.5 w-3.5 text-sky-500" />
                  Ocupación por Zona
                </CardTitle>
                <Badge variant="outline" className="text-[9px] h-4 px-1.5">
                  {ocupacionZonas.reduce((a, z) => a + z.disponible, 0)} libres
                </Badge>
              </div>
              <CardDescription className="text-[10px]">
                Disponibilidad de ubicaciones por zona.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-3 pt-0 space-y-3">
              {ocupacionZonas.map((z) => (
                <BarraOcupacion
                  key={z.zona}
                  zona={z.zona}
                  total={z.total}
                  ocupado={z.ocupado}
                  disponible={z.disponible}
                  porcentaje={z.porcentajeOcupacion}
                />
              ))}
              <div className="pt-1 flex items-center justify-between text-[10px] text-muted-foreground border-t border-border/50">
                <span>Total ubicaciones</span>
                <span className="font-semibold text-foreground">{ocupacionZonas.reduce((a, z) => a + z.total, 0).toLocaleString()}</span>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* ── Grid secundario 3 columnas ── */}
      <div className="grid gap-3 lg:grid-cols-[1fr_1fr_280px]">

        {/* Col 1: Alertas Operativas */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.16 }}
        >
          <Card>
            <CardHeader className="p-3 pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm flex items-center gap-1.5">
                  <AlertTriangle className="h-3.5 w-3.5 text-red-500" />
                  Alertas Operativas
                </CardTitle>
                <Badge variant="outline" className="text-[9px] h-4 px-1.5">{alertas.filter(a => a.tipo === 'critico').length} críticas</Badge>
              </div>
              <CardDescription className="text-[10px]">
                Notificaciones y eventos del sistema en tiempo real.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-3 pt-0">
              <ScrollArea className="h-[140px] pr-2">
                <div className="space-y-1">
                  {alertas.map((alerta) => {
                    const cfg = alertaConfig[alerta.tipo];
                    const Icono = cfg.icon;
                    return (
                      <div
                        key={alerta.id}
                        className={cn('flex items-start gap-2 rounded-lg border p-2', cfg.bg)}
                      >
                        <Icono className={cn('h-3.5 w-3.5 mt-0.5 shrink-0', cfg.text)} />
                        <div className="flex-1 min-w-0">
                          <p className="text-[10px] font-medium leading-tight">{alerta.mensaje}</p>
                          <div className="flex items-center gap-1.5 mt-0.5">
                            <span className={cn('h-1.5 w-1.5 rounded-full', cfg.dot)} />
                            <span className="text-[9px] text-muted-foreground">{alerta.modulo}</span>
                            <span className="text-[9px] text-muted-foreground">•</span>
                            <span className="text-[9px] text-muted-foreground">{alerta.timestamp}</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </motion.div>

        {/* Col 2: Últimas Instrucciones de Picking */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.18 }}
        >
          <Card>
            <CardHeader className="p-3 pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm flex items-center gap-1.5">
                  <ClipboardList className="h-3.5 w-3.5 text-violet-500" />
                  Instrucciones de Picking
                </CardTitle>
                <Badge variant="outline" className="text-[9px] h-4 px-1.5">{pickingInstrucciones.filter(p => p.estado !== 'completado').length} activas</Badge>
              </div>
              <CardDescription className="text-[10px]">
                Últimas órdenes de preparación asignadas.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-3 pt-0">
              <ScrollArea className="h-[140px] pr-2">
                <div className="space-y-1">
                  {pickingInstrucciones.map((inst) => (
                    <div
                      key={inst.id}
                      className="flex items-start gap-2 rounded-lg border border-border/50 p-2 hover:bg-accent/30 transition-colors cursor-pointer"
                    >
                      <div className="rounded-md p-1 bg-violet-500/10 mt-0.5 shrink-0">
                        <CircleDot className="h-3 w-3 text-violet-500" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5 mb-0.5">
                          <span className="text-[10px] font-medium truncate">{inst.producto}</span>
                          <Badge variant="outline" className={cn('text-[8px] h-3.5 px-1 border', pickingPrioridadBadge[inst.prioridad])}>
                            {inst.prioridad}
                          </Badge>
                          <Badge variant="outline" className={cn('text-[8px] h-3.5 px-1 border', estadoPickBadge[inst.estado])}>
                            {inst.estado === 'en_curso' ? 'curso' : inst.estado}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-1.5 text-[9px] text-muted-foreground">
                          <span className="font-mono">{inst.orden}</span>
                          <span>•</span>
                          <span>{inst.cantidad}x {inst.sku}</span>
                          <span>•</span>
                          <span>{inst.ubicacion} → {inst.destino}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </motion.div>

        {/* Col 3: Estado de Integración */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <Card>
            <CardHeader className="p-3 pb-2">
              <CardTitle className="text-sm flex items-center gap-1.5">
                <BarChart3 className="h-3.5 w-3.5 text-primary" />
                Estado del Sistema
              </CardTitle>
              <CardDescription className="text-[10px]">
                Plataforma NexTask WMS.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-3 pt-0 space-y-2">
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-muted-foreground">Versión</span>
                <span className="font-mono font-medium text-[10px]">{estadoSistema.version}</span>
              </div>
              <Separator className="opacity-50" />
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-muted-foreground">Frontend</span>
                <Badge variant="success" className="h-4.5 text-[9px] px-1.5">✓ Completo</Badge>
              </div>
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-muted-foreground">Backend</span>
                <Badge variant="warning" className="h-4.5 text-[9px] px-1.5">
                  <span className="flex items-center gap-1">
                    <Clock className="h-2.5 w-2.5" />
                    Pendiente
                  </span>
                </Badge>
              </div>
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-muted-foreground">Base de datos</span>
                <Badge variant="warning" className="h-4.5 text-[9px] px-1.5">
                  <span className="flex items-center gap-1">
                    <Clock className="h-2.5 w-2.5" />
                    Pendiente
                  </span>
                </Badge>
              </div>
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-muted-foreground">API</span>
                <Badge variant="outline" className="h-4.5 text-[9px] px-1.5">No conectada</Badge>
              </div>
              <Separator className="opacity-50" />
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-muted-foreground">Última sincronización</span>
                <span className="text-[10px] font-medium">{estadoSistema.ultimaSync}</span>
              </div>
              <div className="mt-2 rounded-lg border border-dashed bg-muted/30 p-2 text-center">
                <p className="text-[9px] text-muted-foreground leading-tight">
                  🔌 Los datos se conectarán cuando el backend esté disponible. Los valores mostrados son de demostración.
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* ── Footer: Nota de integración ── */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.25 }}
        className="mt-3"
      >
        <Card className="bg-muted/10 border-dashed border-border/50">
          <CardContent className="p-2.5">
            <div className="flex items-center justify-center gap-1.5 text-[10px] text-muted-foreground">
              <Clock className="h-3 w-3" />
              <span>
                <strong className="text-foreground font-medium">Frontend listo.</strong> Datos simulados para demostración. Pendiente de conexión con servicios backend. Los indicadores y datos operativos se cargarán dinámicamente desde <code className="text-[9px] bg-muted px-1 rounded">GET /api/*</code>.
              </span>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </WmsLayout>
  );
}