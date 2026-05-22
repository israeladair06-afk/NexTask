'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  ClipboardList, Search, Filter, Plus, Clock, User,
  CheckCircle2, AlertCircle, ChevronRight, Route,
  MapPin, Zap, ArrowRight, Package, BarChart3,
  TrendingUp, GanttChartSquare, Timer, Target,
} from 'lucide-react';
import { WmsLayout } from '@/components/wms-layout';
import { ModuleHeader } from '@/components/shared/ModuleHeader';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { FlowNavigator } from '@/components/layout/FlowNavigator';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/boton';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/cn';

interface InstruccionPicking {
  id: string;
  orden: string;
  sku: string;
  producto: string;
  cantidad: number;
  ubicacion: string;
  destino: string;
  prioridad: 'normal' | 'urgente' | 'express';
  estado: 'pendiente' | 'asignado' | 'en_curso' | 'completado';
}

const ORDENES_PICKING: InstruccionPicking[] = [
  { id: 'PK-001', orden: 'EXP-4521', sku: 'SKU-8842', producto: 'Caja Tornillos M8 x 100', cantidad: 48, ubicacion: 'B-12-04', destino: 'Dock 3', prioridad: 'express', estado: 'pendiente' },
  { id: 'PK-002', orden: 'EXP-4522', sku: 'SKU-2391', producto: 'Sensor Temperatura T200', cantidad: 12, ubicacion: 'C-04-08', destino: 'Dock 3', prioridad: 'urgente', estado: 'asignado' },
  { id: 'PK-003', orden: 'EXP-4523', sku: 'SKU-5610', producto: 'Kit Juntas Hidráulicas', cantidad: 24, ubicacion: 'B-08-02', destino: 'Dock 1', prioridad: 'normal', estado: 'en_curso' },
  { id: 'PK-004', orden: 'EXP-4524', sku: 'SKU-7734', producto: 'Rodamiento SKF 6205', cantidad: 60, ubicacion: 'C-02-16', destino: 'Dock 2', prioridad: 'urgente', estado: 'pendiente' },
  { id: 'PK-005', orden: 'EXP-4525', sku: 'SKU-1209', producto: 'Filtro Aceite F-450', cantidad: 36, ubicacion: 'B-15-11', destino: 'Cinta 4', prioridad: 'normal', estado: 'completado' },
  { id: 'PK-006', orden: 'EXP-4526', sku: 'SKU-3312', producto: 'Válvula Solenoide 24V', cantidad: 8, ubicacion: 'B-07-03', destino: 'Dock 1', prioridad: 'urgente', estado: 'asignado' },
  { id: 'PK-007', orden: 'EXP-4527', sku: 'SKU-4410', producto: 'Actuador Neumático', cantidad: 4, ubicacion: 'A-11-08', destino: 'Cinta 2', prioridad: 'express', estado: 'pendiente' },
  { id: 'PK-008', orden: 'EXP-4528', sku: 'SKU-5500', producto: 'Terminal Touchscreen 15"', cantidad: 2, ubicacion: 'A-06-14', destino: 'Dock 3', prioridad: 'normal', estado: 'en_curso' },
  { id: 'PK-009', orden: 'EXP-4529', sku: 'SKU-6611', producto: 'Motorreductor 1.5HP', cantidad: 3, ubicacion: 'A-03-09', destino: 'Dock 2', prioridad: 'normal', estado: 'pendiente' },
  { id: 'PK-010', orden: 'EXP-4530', sku: 'SKU-1122', producto: 'Cinta Transportadora 3m', cantidad: 1, ubicacion: 'D-01-05', destino: 'Cinta 1', prioridad: 'urgente', estado: 'asignado' },
];

const OPERADORES = [
  { nombre: 'Carlos M.', activo: 3, completado: 12, foto: 'CM', eficiencia: 96, tiempo: '4.2 min' },
  { nombre: 'María L.', activo: 2, completado: 15, foto: 'ML', eficiencia: 98, tiempo: '3.8 min' },
  { nombre: 'Pedro R.', activo: 4, completado: 8, foto: 'PR', eficiencia: 82, tiempo: '5.1 min' },
  { nombre: 'Ana G.', activo: 1, completado: 18, foto: 'AG', eficiencia: 99, tiempo: '3.5 min' },
];

const FLUJO_PICKING = [
  { label: 'Recepción', href: '/recepcion', completado: true },
  { label: 'Inventario', href: '/inventario', completado: true },
  { label: 'Mapeo Bodega', href: '/mapeo-bodega', completado: true },
  { label: 'Picking', href: '/picking', completado: true },
  { label: 'Packing', href: '/packing', completado: false },
  { label: 'Despacho', href: '/despacho', completado: false },
];

const prioridadPicking = {
  normal: { label: 'Normal', classes: 'bg-slate-500/15 text-slate-600 dark:text-slate-400' },
  urgente: { label: 'Urgente', classes: 'bg-orange-500/15 text-orange-600 dark:text-orange-400' },
  express: { label: 'Express', classes: 'bg-red-500/15 text-red-600 dark:text-red-400' },
};

export default function PickingPage() {
  const [filtroEstado, setFiltroEstado] = useState('todas');
  const [olaActiva, setOlaActiva] = useState(0);

  const ordenesFiltradas = useMemo(() => {
    if (filtroEstado === 'todas') return ORDENES_PICKING;
    if (filtroEstado === 'activas') return ORDENES_PICKING.filter(o => o.estado !== 'completado');
    return ORDENES_PICKING.filter(o => o.estado === filtroEstado);
  }, [filtroEstado]);

  const stats = useMemo(() => ({
    pendientes: ORDENES_PICKING.filter(o => o.estado === 'pendiente').length,
    asignados: ORDENES_PICKING.filter(o => o.estado === 'asignado').length,
    enCurso: ORDENES_PICKING.filter(o => o.estado === 'en_curso').length,
    completados: ORDENES_PICKING.filter(o => o.estado === 'completado').length,
    total: ORDENES_PICKING.length,
    express: ORDENES_PICKING.filter(o => o.prioridad === 'express').length,
  }), []);

  const olas = [
    { nombre: 'Ola Matutina', progreso: 85, items: ORDENES_PICKING.filter(o => o.estado !== 'completado').slice(0, 3), color: 'bg-emerald-500' },
    { nombre: 'Ola Vespertina', progreso: 45, items: ORDENES_PICKING.filter(o => o.estado === 'pendiente').slice(0, 2), color: 'bg-amber-500' },
    { nombre: 'Ola Nocturna', progreso: 10, items: ORDENES_PICKING.filter(o => o.estado === 'pendiente').slice(2, 4), color: 'bg-blue-500' },
  ];

  const eficienciaPromedio = Math.round(OPERADORES.reduce((acc, op) => acc + op.eficiencia, 0) / OPERADORES.length);

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

      {/* ── KPIs mejorados ── */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2 my-3">
        {[
          { label: 'Pendientes', valor: String(stats.pendientes), icon: Clock, color: 'text-slate-500', bg: 'bg-slate-500/10' },
          { label: 'Asignados', valor: String(stats.asignados), icon: User, color: 'text-blue-500', bg: 'bg-blue-500/10' },
          { label: 'En Curso', valor: String(stats.enCurso), icon: Zap, color: 'text-amber-500', bg: 'bg-amber-500/10' },
          { label: 'Completados', valor: String(stats.completados), icon: CheckCircle2, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
          { label: 'Express', valor: String(stats.express), icon: AlertCircle, color: 'text-red-500', bg: 'bg-red-500/10' },
          { label: 'Eficiencia', valor: `${eficienciaPromedio}%`, icon: TrendingUp, color: 'text-violet-500', bg: 'bg-violet-500/10' },
        ].map((stat, i) => {
          const Icon = stat.icon;
          return (
            <motion.div key={stat.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}>
              <Card className="transition-all hover:border-primary/20 hover:shadow-sm">
                <CardContent className="p-2.5">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[9px] font-medium text-muted-foreground truncate">{stat.label}</span>
                    <div className={cn('rounded-md p-0.5', stat.bg)}><Icon className={cn('h-2.5 w-2.5', stat.color)} /></div>
                  </div>
                  <p className="text-base font-bold">{stat.valor}</p>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      <div className="grid gap-3 lg:grid-cols-[1fr_280px]">
        {/* ── Columna principal ── */}
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
                  <button key={est} onClick={() => setFiltroEstado(est)}
                    className={cn('rounded-full px-2 py-0.5 text-[9px] font-medium transition-all border',
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

          {/* Lista de picking mejorada */}
          <Card>
            <div className="flex items-center justify-between px-3 pt-2.5 pb-1">
              <span className="text-[10px] font-semibold text-muted-foreground">
                Órdenes de Picking ({ordenesFiltradas.length})
              </span>
              <div className="flex items-center gap-2">
                <span className="flex items-center gap-1 text-[8px] text-muted-foreground">
                  <span className="h-2 w-2 rounded-full bg-emerald-500" /> {stats.completados} completados
                </span>
                <span className="flex items-center gap-1 text-[8px] text-muted-foreground">
                  <span className="h-2 w-2 rounded-full bg-amber-500" /> {stats.enCurso} en curso
                </span>
              </div>
            </div>
            <ScrollArea className="h-[460px]">
              <div className="p-1 space-y-1">
                {ordenesFiltradas.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <ClipboardList className="h-10 w-10 text-muted-foreground/30 mb-3" />
                    <p className="text-sm font-medium text-muted-foreground">No hay órdenes de picking</p>
                    <p className="text-[10px] text-muted-foreground/60">Intenta con otros filtros</p>
                  </div>
                ) : (
                  ordenesFiltradas.map((orden, idx) => {
                    const prioridad = prioridadPicking[orden.prioridad];
                    return (
                      <motion.div
                        key={orden.id}
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.15, delay: idx * 0.015 }}
                        className="flex items-start gap-2.5 rounded-lg border p-2.5 transition-all hover:bg-accent/20 hover:border-primary/20 cursor-pointer group"
                      >
                        {/* Indicador de estado + prioridad */}
                        <div className={cn(
                          'flex h-9 w-9 items-center justify-center rounded-xl shrink-0 transition-all',
                          orden.estado === 'pendiente' && 'bg-slate-500/10 text-slate-500 group-hover:bg-slate-500/15',
                          orden.estado === 'asignado' && 'bg-blue-500/10 text-blue-500 group-hover:bg-blue-500/15',
                          orden.estado === 'en_curso' && 'bg-amber-500/10 text-amber-500 group-hover:bg-amber-500/15',
                          orden.estado === 'completado' && 'bg-emerald-500/10 text-emerald-500 group-hover:bg-emerald-500/15',
                        )}>
                          {orden.estado === 'completado' ? <CheckCircle2 className="h-4 w-4" /> :
                           orden.estado === 'en_curso' ? <Zap className="h-4 w-4" /> : <Package className="h-4 w-4" />}
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span className="text-[11px] font-semibold">{orden.id}</span>
                            <StatusBadge estado={orden.estado} dot={false} />
                            <Badge variant="outline" className={cn('text-[8px] h-3.5 px-1 border', prioridad.classes)}>
                              {prioridad.label}
                            </Badge>
                            {orden.prioridad === 'express' && (
                              <span className="flex items-center gap-0.5 text-[8px] text-red-500 font-medium">
                                <Timer className="h-2.5 w-2.5" /> 15 min
                              </span>
                            )}
                          </div>

                          <p className="text-[11px] font-medium mt-0.5">{orden.producto}</p>

                          <div className="flex items-center gap-2 mt-0.5 text-[9px] text-muted-foreground">
                            <span className="font-mono text-[8px]">{orden.orden}</span>
                            <span>•</span>
                            <span>{orden.cantidad}x <span className="font-mono">{orden.sku}</span></span>
                          </div>

                          {/* Ruta visual: ubicación → destino */}
                          <div className="flex items-center gap-1.5 mt-1.5">
                            <div className="flex items-center gap-1 rounded-md bg-blue-500/10 px-1.5 py-0.5 text-[8px] text-blue-600 dark:text-blue-400 font-medium">
                              <MapPin className="h-2.5 w-2.5" />
                              {orden.ubicacion}
                            </div>
                            <ArrowRight className="h-2.5 w-2.5 text-muted-foreground" />
                            <div className="flex items-center gap-1 rounded-md bg-emerald-500/10 px-1.5 py-0.5 text-[8px] text-emerald-600 dark:text-emerald-400 font-medium">
                              <Target className="h-2.5 w-2.5" />
                              {orden.destino}
                            </div>
                          </div>
                        </div>

                        <ChevronRight className="h-3.5 w-3.5 text-muted-foreground shrink-0 mt-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </motion.div>
                    );
                  })
                )}
              </div>
            </ScrollArea>
          </Card>
        </div>

        {/* ── Sidebar mejorado ── */}
        <div className="space-y-3">
          {/* Operadores con eficiencia */}
          <Card>
            <CardHeader className="p-3 pb-2">
              <CardTitle className="text-xs flex items-center gap-1.5">
                <User className="h-3 w-3 text-primary" />
                Operadores
                <Badge variant="success" className="text-[8px] h-3.5 px-1 ml-auto">{OPERADORES.length} activos</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-3 pt-0 space-y-2">
              {OPERADORES.map(op => (
                <div key={op.nombre} className="flex items-center gap-2 text-[10px] p-1.5 rounded-lg hover:bg-accent/20 transition-colors">
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary/70 text-[8px] font-bold text-primary-foreground">
                    {op.foto}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="font-medium truncate">{op.nombre}</p>
                      <span className={cn(
                        'text-[8px] font-semibold',
                        op.eficiencia >= 95 ? 'text-emerald-500' : op.eficiencia >= 85 ? 'text-amber-500' : 'text-red-500'
                      )}>{op.eficiencia}%</span>
                    </div>
                    <div className="flex items-center gap-2 text-[8px] text-muted-foreground">
                      <span>{op.activo} activas</span>
                      <span>•</span>
                      <span>{op.completado} completadas</span>
                      <span>•</span>
                      <span>{op.tiempo}/ud</span>
                    </div>
                    {/* Barra de eficiencia */}
                    <div className="h-1 rounded-full bg-muted overflow-hidden mt-1">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${op.eficiencia}%` }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className={cn(
                          'h-full rounded-full',
                          op.eficiencia >= 95 ? 'bg-emerald-500' : op.eficiencia >= 85 ? 'bg-amber-500' : 'bg-red-500'
                        )}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Olas de picking con progreso */}
          <Card>
            <CardHeader className="p-3 pb-2">
              <CardTitle className="text-xs flex items-center gap-1.5">
                <GanttChartSquare className="h-3 w-3 text-primary" />
                Olas de Picking
              </CardTitle>
            </CardHeader>
            <CardContent className="p-3 pt-0 space-y-2.5">
              {olas.map((ola, i) => (
                <button key={ola.nombre} onClick={() => setOlaActiva(i)}
                  className={cn(
                    'w-full text-left rounded-lg border p-2 transition-all',
                    olaActiva === i ? 'border-primary/40 bg-primary/5' : 'border-border/40 hover:border-primary/20'
                  )}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] font-medium">{ola.nombre}</span>
                    <span className="text-[9px] text-muted-foreground">{ola.progreso}%</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${ola.progreso}%` }}
                      transition={{ duration: 0.8, delay: i * 0.1 }}
                      className={cn('h-full rounded-full', ola.color)}
                    />
                  </div>
                  <p className="text-[8px] text-muted-foreground mt-1">{ola.items.length} órdenes asignadas</p>
                </button>
              ))}
            </CardContent>
          </Card>

          {/* Métricas rápidas */}
          <Card className="bg-gradient-to-br from-primary/5 via-transparent to-transparent border-primary/10">
            <CardContent className="p-3 space-y-2">
              <div className="flex items-center gap-1.5 text-[10px] font-medium">
                <BarChart3 className="h-3 w-3 text-primary" />
                Resumen del Día
              </div>
              <div className="grid grid-cols-2 gap-1.5">
                <div className="rounded-lg bg-card/60 p-1.5 text-center border border-border/30">
                  <p className="text-sm font-bold text-emerald-500">{stats.completados}</p>
                  <p className="text-[8px] text-muted-foreground">Completadas</p>
                </div>
                <div className="rounded-lg bg-card/60 p-1.5 text-center border border-border/30">
                  <p className="text-sm font-bold text-amber-500">{stats.pendientes + stats.asignados}</p>
                  <p className="text-[8px] text-muted-foreground">Pendientes</p>
                </div>
                <div className="rounded-lg bg-card/60 p-1.5 text-center border border-border/30">
                  <p className="text-sm font-bold text-blue-500">{eficienciaPromedio}%</p>
                  <p className="text-[8px] text-muted-foreground">Eficiencia</p>
                </div>
                <div className="rounded-lg bg-card/60 p-1.5 text-center border border-border/30">
                  <p className="text-sm font-bold text-violet-500">4.2</p>
                  <p className="text-[8px] text-muted-foreground">Min/orden</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-muted/10 border-dashed border-border/50">
            <CardContent className="p-2.5">
              <div className="flex items-start gap-1.5 text-[9px] text-muted-foreground">
                <Route className="h-2.5 w-2.5 mt-0.5 shrink-0" />
                <div>
                  <p className="font-medium text-foreground mb-0.5">Rutas optimizadas</p>
                  <p>Las rutas se optimizarán automáticamente conectando con el backend.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </WmsLayout>
  );
}