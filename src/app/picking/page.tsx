'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ClipboardList, Search, Filter, Plus, Clock, User,
  CheckCircle2, AlertCircle, ChevronRight, Route,
  MapPin, Zap, ArrowRight, Package,
} from 'lucide-react';
import { WmsLayout } from '@/components/wms-layout';
import { ModuleHeader } from '@/components/shared/ModuleHeader';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { EmptyState } from '@/components/shared/EmptyState';
import { FlowNavigator } from '@/components/layout/FlowNavigator';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/boton';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/cn';
import type { InstruccionPicking } from '@/types/wms';

/* ───────────────────────────────────────
   Mock data — Picking
   TODO: Backend endpoint for picking orders
   TODO: Connect warehouse analytics service
   ─────────────────────────────────────── */

const ORDENES_PICKING: InstruccionPicking[] = [
  { id: 'PK-001', orden: 'EXP-4521', sku: 'SKU-8842', producto: 'Caja Tornillos M8 x 100', cantidad: 48, ubicacion: 'B-12-04', destino: 'Dock 3', prioridad: 'express', estado: 'pendiente' },
  { id: 'PK-002', orden: 'EXP-4522', sku: 'SKU-2391', producto: 'Sensor Temperatura T200', cantidad: 12, ubicacion: 'C-04-08', destino: 'Dock 3', prioridad: 'urgente', estado: 'asignado' },
  { id: 'PK-003', orden: 'EXP-4523', sku: 'SKU-5610', producto: 'Kit Juntas Hidráulicas', cantidad: 24, ubicacion: 'B-08-02', destino: 'Dock 1', prioridad: 'normal', estado: 'en_curso' },
  { id: 'PK-004', orden: 'EXP-4524', sku: 'SKU-7734', producto: 'Rodamiento SKF 6205', cantidad: 60, ubicacion: 'C-02-16', destino: 'Dock 2', prioridad: 'urgente', estado: 'pendiente' },
  { id: 'PK-005', orden: 'EXP-4525', sku: 'SKU-1209', producto: 'Filtro Aceite F-450', cantidad: 36, ubicacion: 'B-15-11', destino: 'Cinta 4', prioridad: 'normal', estado: 'completado' },
  { id: 'PK-006', orden: 'EXP-4526', sku: 'SKU-3312', producto: 'Válvula Solenoide 24V', cantidad: 8, ubicacion: 'B-07-03', destino: 'Dock 1', prioridad: 'urgente', estado: 'asignado' },
  { id: 'PK-007', orden: 'EXP-4527', sku: 'SKU-4410', producto: 'Actuador Neumático', cantidad: 4, ubicacion: 'A-11-08', destino: 'Cinta 2', prioridad: 'express', estado: 'pendiente' },
  { id: 'PK-008', orden: 'EXP-4528', sku: 'SKU-5500', producto: 'Terminal Touchscreen 15"', cantidad: 2, ubicacion: 'A-06-14', destino: 'Dock 3', prioridad: 'normal', estado: 'en_curso' },
];

const OPERADORES = [
  { nombre: 'Carlos M.', activo: 3, completado: 12, foto: 'CM' },
  { nombre: 'María L.', activo: 2, completado: 15, foto: 'ML' },
  { nombre: 'Pedro R.', activo: 4, completado: 8, foto: 'PR' },
  { nombre: 'Ana G.', activo: 1, completado: 18, foto: 'AG' },
];

const FLUJO_PICKING = [
  { label: 'Recepción', href: '/recepcion', completado: true },
  { label: 'Inventario', href: '/inventario', completado: true },
  { label: 'Mapeo Bodega', href: '/mapeo-bodega', completado: true },
  { label: 'Picking', href: '/picking', completado: true },
  { label: 'Packing', href: '/packing' },
  { label: 'Despacho', href: '/despacho' },
];

const prioridadPicking = {
  normal: { label: 'Normal', classes: 'bg-slate-500/15 text-slate-600 dark:text-slate-400' },
  urgente: { label: 'Urgente', classes: 'bg-orange-500/15 text-orange-600 dark:text-orange-400' },
  express: { label: 'Express', classes: 'bg-red-500/15 text-red-600 dark:text-red-400' },
};

export default function PickingPage() {
  const [filtroEstado, setFiltroEstado] = useState('todas');

  const filtrarOrdenes = () => {
    if (filtroEstado === 'todas') return ORDENES_PICKING;
    if (filtroEstado === 'activas') return ORDENES_PICKING.filter(o => o.estado !== 'completado');
    return ORDENES_PICKING.filter(o => o.estado === filtroEstado);
  };

  const ordenesFiltradas = filtrarOrdenes();

  const stats = {
    pendientes: ORDENES_PICKING.filter(o => o.estado === 'pendiente').length,
    enCurso: ORDENES_PICKING.filter(o => o.estado === 'en_curso').length,
    completados: ORDENES_PICKING.filter(o => o.estado === 'completado').length,
    total: ORDENES_PICKING.length,
  };

  return (
    <WmsLayout>
      <ModuleHeader
        titulo="Picking"
        descripcion="Preparación de pedidos, asignación de rutas y consolidación de productos."
        icono={ClipboardList}
        badge={{ texto: 'Tiempo real', variant: 'success' }}
        stats={[
          { label: 'Pendientes', valor: String(stats.pendientes) },
          { label: 'En curso', valor: String(stats.enCurso) },
          { label: 'Hoy', valor: `${stats.completados} completados` },
        ]}
      />

      <FlowNavigator pasos={FLUJO_PICKING} pasoActual="/picking" />

      {/* Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 my-3">
        {[
          { label: 'Órdenes Activas', valor: String(ORDENES_PICKING.filter(o => o.estado !== 'completado').length), icon: ClipboardList, color: 'text-violet-500', bg: 'bg-violet-500/10', desc: 'Pendientes + en curso' },
          { label: 'Express', valor: String(ORDENES_PICKING.filter(o => o.prioridad === 'express').length), icon: Zap, color: 'text-red-500', bg: 'bg-red-500/10', desc: 'Prioridad máxima' },
          { label: 'Operadores', valor: String(OPERADORES.length), icon: User, color: 'text-blue-500', bg: 'bg-blue-500/10', desc: 'En turno activo' },
          { label: 'Rendimiento', valor: '94%', icon: Route, color: 'text-emerald-500', bg: 'bg-emerald-500/10', desc: 'Eficiencia promedio' },
        ].map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.label} className="transition-all hover:border-primary/20">
              <CardContent className="p-3">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-medium text-muted-foreground">{stat.label}</span>
                  <div className={cn('rounded-md p-1', stat.bg)}><Icon className={cn('h-3 w-3', stat.color)} /></div>
                </div>
                <p className="text-lg font-bold">{stat.valor}</p>
                <p className="text-[9px] text-muted-foreground">{stat.desc}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Grid principal */}
      <div className="grid gap-3 lg:grid-cols-[1fr_260px]">
        <div className="space-y-3">
          {/* Search & Filters */}
          <Card>
            <CardContent className="p-2.5">
              <div className="flex flex-col sm:flex-row gap-2 items-start sm:items-center justify-between mb-2">
                <div className="relative w-full sm:w-72">
                  <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                  <Input placeholder="Buscar orden, SKU, producto..." className="pl-8 h-8 text-[11px]" />
                </div>
                <div className="flex gap-1.5 w-full sm:w-auto">
                  <Button variant="outline" size="sm" className="h-7 text-[10px] gap-1 px-2">
                    <Filter className="h-3 w-3" /> Filtros
                  </Button>
                  <Button size="sm" className="h-7 text-[10px] gap-1 px-2">
                    <Plus className="h-3 w-3" /> Nueva Ola
                  </Button>
                </div>
              </div>

              <div className="flex flex-wrap gap-1.5">
                {['todas', 'pendiente', 'asignado', 'en_curso', 'completado'].map(est => (
                  <button
                    key={est}
                    onClick={() => setFiltroEstado(est)}
                    className={cn(
                      'rounded-full px-2 py-0.5 text-[9px] font-medium transition-all border',
                      filtroEstado === est
                        ? 'bg-primary text-primary-foreground border-primary'
                        : 'bg-card text-muted-foreground border-border hover:border-primary/30'
                    )}
                  >
                    {est === 'todas' ? 'Todas' : est === 'en_curso' ? 'En Curso' : est.charAt(0).toUpperCase() + est.slice(1)}
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Lista de órdenes de picking */}
          <Card>
            <ScrollArea className="h-[420px]">
              <div className="p-1 space-y-1">
                {ordenesFiltradas.map((orden, idx) => {
                  const prioridad = prioridadPicking[orden.prioridad];
                  return (
                    <motion.div
                      key={orden.id}
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.15, delay: idx * 0.02 }}
                      className="flex items-start gap-2.5 rounded-lg border p-2.5 transition-all hover:bg-accent/20 cursor-pointer"
                    >
                      {/* Indicador visual */}
                      <div className={cn(
                        'flex h-8 w-8 items-center justify-center rounded-lg shrink-0',
                        orden.estado === 'pendiente' && 'bg-slate-500/10 text-slate-500',
                        orden.estado === 'asignado' && 'bg-blue-500/10 text-blue-500',
                        orden.estado === 'en_curso' && 'bg-amber-500/10 text-amber-500',
                        orden.estado === 'completado' && 'bg-emerald-500/10 text-emerald-500',
                      )}>
                        {orden.estado === 'completado' ? <CheckCircle2 className="h-4 w-4" /> : <Package className="h-4 w-4" />}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="text-[11px] font-semibold">{orden.id}</span>
                          <StatusBadge estado={orden.estado} dot={false} />
                          <Badge variant="outline" className={cn('text-[8px] h-3.5 px-1 border-0 font-medium', prioridad.classes)}>
                            {prioridad.label}
                          </Badge>
                        </div>
                        <p className="text-[11px] font-medium mt-0.5">{orden.producto}</p>
                        <div className="flex items-center gap-2 mt-0.5 text-[9px] text-muted-foreground">
                          <span className="font-mono">{orden.orden}</span>
                          <span>•</span>
                          <span>{orden.cantidad}x {orden.sku}</span>
                        </div>

                        {/* Ruta: ubicación → destino */}
                        <div className="flex items-center gap-1.5 mt-1 text-[9px]">
                          <div className="flex items-center gap-1 rounded-md bg-blue-500/10 px-1.5 py-0.5 text-blue-600 dark:text-blue-400">
                            <MapPin className="h-2.5 w-2.5" />
                            {orden.ubicacion}
                          </div>
                          <ArrowRight className="h-2.5 w-2.5 text-muted-foreground" />
                          <div className="flex items-center gap-1 rounded-md bg-emerald-500/10 px-1.5 py-0.5 text-emerald-600 dark:text-emerald-400">
                            <MapPin className="h-2.5 w-2.5" />
                            {orden.destino}
                          </div>
                        </div>
                      </div>

                      <ChevronRight className="h-3 w-3 text-muted-foreground shrink-0 mt-2" />
                    </motion.div>
                  );
                })}
              </div>
            </ScrollArea>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-3">
          {/* Operadores activos */}
          <Card>
            <CardHeader className="p-3 pb-2">
              <CardTitle className="text-xs flex items-center gap-1.5">
                <User className="h-3 w-3 text-primary" />
                Operadores en Turno
              </CardTitle>
            </CardHeader>
            <CardContent className="p-3 pt-0 space-y-2">
              {OPERADORES.map(op => (
                <div key={op.nombre} className="flex items-center gap-2 text-[10px]">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-[8px] font-semibold text-primary">
                    {op.foto}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{op.nombre}</p>
                    <p className="text-[9px] text-muted-foreground">{op.activo} activas • {op.completado} hoy</p>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className={cn(
                      'h-1.5 w-1.5 rounded-full',
                      op.activo > 2 ? 'bg-emerald-500' : op.activo > 0 ? 'bg-amber-500' : 'bg-slate-300'
                    )} />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Progreso de olas */}
          <Card>
            <CardHeader className="p-3 pb-2">
              <CardTitle className="text-xs flex items-center gap-1.5">
                <Route className="h-3 w-3 text-primary" />
                Olas de Picking
              </CardTitle>
            </CardHeader>
            <CardContent className="p-3 pt-0 space-y-2">
              {['Ola 1 — Mañana', 'Ola 2 — Tarde', 'Ola 3 — Nocturna'].map((ola, i) => {
                const pct = [85, 45, 10][i];
                return (
                  <div key={ola} className="space-y-1">
                    <div className="flex items-center justify-between text-[10px]">
                      <span className="font-medium">{ola}</span>
                      <span className="text-muted-foreground">{pct}%</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${pct}%` }}
                        transition={{ duration: 0.8 }}
                        className={cn(
                          'h-full rounded-full',
                          pct > 80 ? 'bg-emerald-500' : pct > 40 ? 'bg-amber-500' : 'bg-blue-500'
                        )}
                      />
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>

          {/* Resumen de ruta */}
          <Card className="bg-muted/10 border-dashed border-border/50">
            <CardContent className="p-2.5">
              <div className="flex items-start gap-1.5 text-[9px] text-muted-foreground">
                <Route className="h-2.5 w-2.5 mt-0.5 shrink-0" />
                <div>
                  <p className="font-medium text-foreground mb-0.5">Rutas simuladas</p>
                  <p>Las rutas de picking se optimizarán automáticamente con el backend.</p>
                  {/* TODO: Backend endpoint for picking optimization */}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </WmsLayout>
  );
}