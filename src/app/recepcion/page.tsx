'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Truck, Search, Filter, Plus, Clock, QrCode,
  Package, User, CheckCircle2, AlertCircle, ChevronRight,
  FileUp, Download, ScanLine, ArrowRight, Warehouse,
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
import type { AlertaWMS } from '@/types/wms';

/* ───────────────────────────────────────
   Mock data — Recepción
   TODO: Backend endpoint para recepción
   TODO: Integración futura con escáner y API logística
   ─────────────────────────────────────── */

interface LoteRecepcion {
  id: string;
  proveedor: string;
  ordenCompra: string;
  sku: string;
  producto: string;
  cantidadEsperada: number;
  cantidadRecibida: number;
  fechaProgramada: string;
  fechaRecepcion: string | null;
  estado: 'pendiente' | 'parcial' | 'completado' | 'inspeccion' | 'rechazado';
  prioridad: 'normal' | 'urgente' | 'express';
  operador: string | null;
  dock: string;
  notas: string;
}

const LOTES_MOCK: LoteRecepcion[] = [
  { id: 'RCP-001', proveedor: 'LogisCorp S.A.', ordenCompra: 'OC-2024-4521', sku: 'SKU-8842', producto: 'Caja Tornillos M8 x 100', cantidadEsperada: 240, cantidadRecibida: 240, fechaProgramada: 'Hoy 08:00', fechaRecepcion: 'Hoy 08:45', estado: 'completado', prioridad: 'normal', operador: 'Carlos M.', dock: 'Dock 2', notas: 'Todo conforme' },
  { id: 'RCP-002', proveedor: 'Suministros Industriales', ordenCompra: 'OC-2024-4522', sku: 'SKU-2391', producto: 'Sensor Temperatura T200', cantidadEsperada: 48, cantidadRecibida: 48, fechaProgramada: 'Hoy 09:30', fechaRecepcion: 'Hoy 10:15', estado: 'completado', prioridad: 'urgente', operador: 'María L.', dock: 'Dock 1', notas: 'Verificar calibración' },
  { id: 'RCP-003', proveedor: 'TechParts Global', ordenCompra: 'OC-2024-4523', sku: 'SKU-5610', producto: 'Kit Juntas Hidráulicas', cantidadEsperada: 120, cantidadRecibida: 80, fechaProgramada: 'Hoy 11:00', fechaRecepcion: null, estado: 'parcial', prioridad: 'urgente', operador: 'Pedro R.', dock: 'Dock 3', notas: 'Faltan 40 unidades, pendiente de segundo envío' },
  { id: 'RCP-004', proveedor: 'Distribuidora del Sur', ordenCompra: 'OC-2024-4524', sku: 'SKU-7734', producto: 'Rodamiento SKF 6205', cantidadEsperada: 300, cantidadRecibida: 0, fechaProgramada: 'Hoy 14:00', fechaRecepcion: null, estado: 'pendiente', prioridad: 'express', operador: null, dock: 'Dock 2', notas: 'Cliente VIP — prioridad máxima' },
  { id: 'RCP-005', proveedor: 'EMQ Logística', ordenCompra: 'OC-2024-4525', sku: 'SKU-1209', producto: 'Filtro Aceite F-450', cantidadEsperada: 144, cantidadRecibida: 144, fechaProgramada: 'Ayer 16:00', fechaRecepcion: 'Ayer 16:30', estado: 'completado', prioridad: 'normal', operador: 'Ana G.', dock: 'Dock 1', notas: '' },
  { id: 'RCP-006', proveedor: 'Proveedor Express', ordenCompra: 'OC-2024-4526', sku: 'SKU-3312', producto: 'Válvula Solenoide 24V', cantidadEsperada: 60, cantidadRecibida: 60, fechaProgramada: 'Hoy 07:00', fechaRecepcion: 'Hoy 07:20', estado: 'inspeccion', prioridad: 'urgente', operador: 'Luis F.', dock: 'Dock 3', notas: 'Pendiente de inspección de calidad' },
  { id: 'RCP-007', proveedor: 'Importaciones del Norte', ordenCompra: 'OC-2024-4527', sku: 'SKU-6654', producto: 'Cinta Transportadora 3m', cantidadEsperada: 10, cantidadRecibida: 6, fechaProgramada: 'Hoy 06:00', fechaRecepcion: 'Hoy 06:45', estado: 'rechazado', prioridad: 'normal', operador: 'Carlos M.', dock: 'Dock 2', notas: '4 unidades con daños visibles — rechazado parcialmente' },
];

const alertasRecepcion: AlertaWMS[] = [
  { id: 'AL-R1', tipo: 'critico', mensaje: 'Recepción RCP-004 con prioridad EXPRESS no iniciada', modulo: 'Recepción', timestamp: 'Hace 15 min', prioridad: 1 },
  { id: 'AL-R2', tipo: 'advertencia', mensaje: 'Lote RCP-003 recibido parcialmente (80/120)', modulo: 'Recepción', timestamp: 'Hace 1 h', prioridad: 2 },
  { id: 'AL-R3', tipo: 'info', mensaje: 'Proveedor LogisCorp con 3 recepciones exitosas hoy', modulo: 'Recepción', timestamp: 'Hace 2 h', prioridad: 3 },
];

const FLUJO_RECEPCION = [
  { label: 'Recepción', href: '/recepcion', completado: true },
  { label: 'Inventario', href: '/inventario' },
  { label: 'Mapeo Bodega', href: '/mapeo-bodega' },
  { label: 'Picking', href: '/picking' },
  { label: 'Packing', href: '/packing' },
  { label: 'Despacho', href: '/despacho' },
];

const estadoLoteConfig = {
  pendiente: { label: 'Pendiente', classes: 'bg-slate-500/15 text-slate-600 border-slate-500/30 dark:text-slate-400' },
  parcial: { label: 'Parcial', classes: 'bg-amber-500/15 text-amber-600 border-amber-500/30 dark:text-amber-400' },
  completado: { label: 'Completado', classes: 'bg-emerald-500/15 text-emerald-600 border-emerald-500/30 dark:text-emerald-400' },
  inspeccion: { label: 'Inspección', classes: 'bg-blue-500/15 text-blue-600 border-blue-500/30 dark:text-blue-400' },
  rechazado: { label: 'Rechazado', classes: 'bg-red-500/15 text-red-600 border-red-500/30 dark:text-red-400' },
};

const prioridadRecepcion = {
  normal: { label: 'Normal', classes: 'bg-slate-500/15 text-slate-600 dark:text-slate-400' },
  urgente: { label: 'Urgente', classes: 'bg-orange-500/15 text-orange-600 dark:text-orange-400' },
  express: { label: 'Express', classes: 'bg-red-500/15 text-red-600 dark:text-red-400' },
};

export default function RecepcionPage() {
  const [tabActivo, setTabActivo] = useState('activas');
  const [loteSeleccionado, setLoteSeleccionado] = useState<string | null>(null);

  const lotesFiltrados = LOTES_MOCK.filter(l => {
    if (tabActivo === 'activas') return l.estado === 'pendiente' || l.estado === 'parcial' || l.estado === 'inspeccion';
    if (tabActivo === 'hoy') return l.fechaProgramada.includes('Hoy');
    return true;
  });

  const statsResumen = {
    pendientes: LOTES_MOCK.filter(l => l.estado === 'pendiente').length,
    enProceso: LOTES_MOCK.filter(l => l.estado === 'parcial' || l.estado === 'inspeccion').length,
    completadosHoy: LOTES_MOCK.filter(l => l.estado === 'completado' && l.fechaProgramada.includes('Hoy')).length,
    totalHoy: LOTES_MOCK.filter(l => l.fechaProgramada.includes('Hoy')).length,
  };

  return (
    <WmsLayout>
      <ModuleHeader
        titulo="Recepción"
        descripcion="Gestión de ingreso de mercancía, validación de documentos y control de calidad."
        icono={Truck}
        badge={{ texto: 'Operativo', variant: 'success' }}
        stats={[
          { label: 'Pendientes', valor: String(statsResumen.pendientes) },
          { label: 'En proceso', valor: String(statsResumen.enProceso) },
          { label: 'Hoy', valor: `${statsResumen.completadosHoy}/${statsResumen.totalHoy}` },
        ]}
      />

      {/* ── Flow Navigator ── */}
      <FlowNavigator pasos={FLUJO_RECEPCION} pasoActual="/recepcion" />

      {/* ── Stats Cards ── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 my-3">
        {[
          { label: 'Pendientes', valor: String(statsResumen.pendientes), desc: 'Lotés por recibir', color: 'text-slate-500', bg: 'bg-slate-500/10' },
          { label: 'En Progreso', valor: String(statsResumen.enProceso), desc: 'Recepción en curso', color: 'text-amber-500', bg: 'bg-amber-500/10' },
          { label: 'Completados Hoy', valor: String(statsResumen.completadosHoy), desc: 'Recepciones finalizadas', color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
          { label: 'En Inspección', valor: String(LOTES_MOCK.filter(l => l.estado === 'inspeccion').length), desc: 'Control de calidad', color: 'text-blue-500', bg: 'bg-blue-500/10' },
        ].map((stat) => (
          <Card key={stat.label} className="transition-all hover:border-primary/20">
            <CardContent className="p-3">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-medium text-muted-foreground">{stat.label}</span>
                <div className={cn('rounded-md p-1', stat.bg)}>
                  <div className={cn('h-2 w-2 rounded-full', stat.color.replace('text-', 'bg-'))} />
                </div>
              </div>
              <p className="text-lg font-bold">{stat.valor}</p>
              <p className="text-[9px] text-muted-foreground">{stat.desc}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* ── Grid principal ── */}
      <div className="grid gap-3 lg:grid-cols-[1fr_280px]">
        <div className="space-y-3">
          {/* Search & Actions */}
          <Card>
            <CardContent className="p-2.5">
              <div className="flex flex-col sm:flex-row gap-2 items-start sm:items-center justify-between">
                <div className="relative w-full sm:w-72">
                  <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                  <Input placeholder="Buscar recepción, proveedor, orden..." className="pl-8 h-8 text-[11px]" />
                </div>
                <div className="flex gap-1.5 w-full sm:w-auto">
                  <Button variant="outline" size="sm" className="h-7 text-[10px] gap-1 px-2">
                    <Filter className="h-3 w-3" /> Filtros
                  </Button>
                  <Button variant="outline" size="sm" className="h-7 text-[10px] gap-1 px-2">
                    <ScanLine className="h-3 w-3" /> Escanear
                  </Button>
                  <Button size="sm" className="h-7 text-[10px] gap-1 px-2">
                    <Plus className="h-3 w-3" /> Nueva Recepción
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tabs */}
          <Tabs defaultValue="activas" value={tabActivo} onValueChange={setTabActivo}>
            <TabsList className="h-7">
              <TabsTrigger value="activas" className="text-[10px] px-2.5 py-0.5 h-5">Activas</TabsTrigger>
              <TabsTrigger value="hoy" className="text-[10px] px-2.5 py-0.5 h-5">Hoy</TabsTrigger>
              <TabsTrigger value="todas" className="text-[10px] px-2.5 py-0.5 h-5">Todas</TabsTrigger>
            </TabsList>
          </Tabs>

          {/* Tabla de lotes */}
          <Card>
            <ScrollArea className="h-[400px]">
              <div className="p-1 space-y-1">
                {lotesFiltrados.length === 0 ? (
                  <EmptyState
                    titulo="Sin recepciones activas"
                    descripcion="Las recepciones de mercancía aparecerán aquí cuando se registren en el sistema."
                    icono={Truck}
                  />
                ) : (
                  lotesFiltrados.map((lote, idx) => {
                    const estado = estadoLoteConfig[lote.estado];
                    const prioridad = prioridadRecepcion[lote.prioridad];
                    return (
                      <motion.div
                        key={lote.id}
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.15, delay: idx * 0.02 }}
                      >
                        <div
                          className={cn(
                            'flex items-start gap-2.5 rounded-lg border p-2.5 transition-all cursor-pointer hover:bg-accent/30',
                            loteSeleccionado === lote.id && 'border-primary/30 bg-accent/20'
                          )}
                          onClick={() => setLoteSeleccionado(loteSeleccionado === lote.id ? null : lote.id)}
                        >
                          {/* Indicador visual de estado */}
                          <div className={cn(
                            'flex h-8 w-8 items-center justify-center rounded-lg shrink-0',
                            lote.estado === 'completado' && 'bg-emerald-500/10 text-emerald-500',
                            lote.estado === 'pendiente' && 'bg-slate-500/10 text-slate-500',
                            lote.estado === 'parcial' && 'bg-amber-500/10 text-amber-500',
                            lote.estado === 'inspeccion' && 'bg-blue-500/10 text-blue-500',
                            lote.estado === 'rechazado' && 'bg-red-500/10 text-red-500',
                          )}>
                            {lote.estado === 'completado' ? <CheckCircle2 className="h-4 w-4" /> : <Package className="h-4 w-4" />}
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-1.5 flex-wrap">
                              <span className="text-[11px] font-semibold">{lote.id}</span>
                              <Badge variant="outline" className={cn('text-[8px] h-3.5 px-1 border-0 font-medium', estado.classes)}>
                                {estado.label}
                              </Badge>
                              <Badge variant="outline" className={cn('text-[8px] h-3.5 px-1 border-0 font-medium', prioridad.classes)}>
                                {prioridad.label}
                              </Badge>
                            </div>
                            <p className="text-[11px] font-medium mt-0.5">{lote.producto}</p>
                            <div className="flex items-center gap-3 mt-0.5 text-[9px] text-muted-foreground">
                              <span>{lote.proveedor}</span>
                              <span>•</span>
                              <span>OC: {lote.ordenCompra}</span>
                              <span>•</span>
                              <span>{lote.cantidadRecibida}/{lote.cantidadEsperada} uds</span>
                            </div>

                            {/* Barra de progreso de recepción */}
                            <div className="mt-1.5 flex items-center gap-2">
                              <div className="flex-1 h-1 rounded-full bg-muted overflow-hidden">
                                <motion.div
                                  initial={{ width: 0 }}
                                  animate={{ width: `${(lote.cantidadRecibida / lote.cantidadEsperada) * 100}%` }}
                                  transition={{ duration: 0.5 }}
                                  className={cn(
                                    'h-full rounded-full',
                                    lote.estado === 'completado' && 'bg-emerald-500',
                                    lote.estado === 'parcial' && 'bg-amber-500',
                                    lote.estado === 'pendiente' && 'bg-slate-300',
                                    lote.estado === 'inspeccion' && 'bg-blue-500',
                                    lote.estado === 'rechazado' && 'bg-red-500',
                                  )}
                                />
                              </div>
                              <span className="text-[9px] text-muted-foreground shrink-0">
                                {Math.round((lote.cantidadRecibida / lote.cantidadEsperada) * 100)}%
                              </span>
                            </div>

                            <div className="flex items-center gap-2 mt-1 text-[9px] text-muted-foreground">
                              <Clock className="h-2.5 w-2.5" />
                              <span>{lote.fechaProgramada}</span>
                              {lote.operador && (
                                <>
                                  <span>•</span>
                                  <User className="h-2.5 w-2.5" />
                                  <span>{lote.operador}</span>
                                </>
                              )}
                              <span>•</span>
                              <span>{lote.dock}</span>
                            </div>

                            {/* Detalles expandidos */}
                            {loteSeleccionado === lote.id && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                className="mt-2 pt-2 border-t border-border/50"
                              >
                                <div className="grid grid-cols-2 gap-2 text-[10px]">
                                  <div>
                                    <span className="text-muted-foreground">SKU:</span>
                                    <span className="ml-1 font-mono font-medium">{lote.sku}</span>
                                  </div>
                                  <div>
                                    <span className="text-muted-foreground">Cantidad:</span>
                                    <span className="ml-1 font-medium">{lote.cantidadRecibida}/{lote.cantidadEsperada}</span>
                                  </div>
                                  <div className="col-span-2">
                                    <span className="text-muted-foreground">Notas:</span>
                                    <span className="ml-1">{lote.notas || '—'}</span>
                                  </div>
                                </div>
                                <div className="flex gap-1.5 mt-2">
                                  <Button size="sm" className="h-6 text-[9px] gap-1 px-2">
                                    <CheckCircle2 className="h-2.5 w-2.5" /> Confirmar
                                  </Button>
                                  <Button variant="outline" size="sm" className="h-6 text-[9px] gap-1 px-2">
                                    <ScanLine className="h-2.5 w-2.5" /> Escanear
                                  </Button>
                                  <Button variant="outline" size="sm" className="h-6 text-[9px] gap-1 px-2">
                                    <FileUp className="h-2.5 w-2.5" /> Documentos
                                  </Button>
                                </div>
                                {/* TODO: Backend endpoint para confirmar recepción */}
                              </motion.div>
                            )}
                          </div>

                          <ChevronRight className={cn(
                            'h-3.5 w-3.5 text-muted-foreground shrink-0 mt-2 transition-transform',
                            loteSeleccionado === lote.id && 'rotate-90'
                          )} />
                        </div>
                      </motion.div>
                    );
                  })
                )}
              </div>
            </ScrollArea>
          </Card>

          {/* Timeline visual de recepción del día */}
          <Card>
            <CardHeader className="p-3 pb-2">
              <CardTitle className="text-xs flex items-center gap-1.5">
                <Clock className="h-3 w-3 text-primary" />
                Timeline de Recepción — Hoy
              </CardTitle>
              <CardDescription className="text-[9px]">Línea de tiempo de recepciones del día</CardDescription>
            </CardHeader>
            <CardContent className="p-3 pt-0">
              <div className="space-y-2">
                {LOTES_MOCK.filter(l => l.fechaProgramada.includes('Hoy')).map((lote, i) => (
                  <div key={lote.id} className="flex gap-3">
                    <div className="flex flex-col items-center">
                      <div className={cn(
                        'h-3 w-3 rounded-full border-2',
                        lote.estado === 'completado' ? 'border-emerald-500 bg-emerald-500/20' :
                        lote.estado === 'parcial' || lote.estado === 'inspeccion' ? 'border-amber-500 bg-amber-500/20' :
                        'border-slate-300 bg-slate-500/10'
                      )} />
                      {i < LOTES_MOCK.filter(l => l.fechaProgramada.includes('Hoy')).length - 1 && (
                        <div className="w-px flex-1 bg-border/50 min-h-[20px]" />
                      )}
                    </div>
                    <div className="flex-1 pb-2">
                      <div className="flex items-center gap-1.5 text-[10px]">
                        <span className="font-medium">{lote.fechaProgramada.split(' ')[1]}</span>
                        <span className="text-muted-foreground">—</span>
                        <span className="font-mono text-[9px]">{lote.id}</span>
                        <StatusBadge estado={lote.estado} dot={false} />
                      </div>
                      <p className="text-[10px] font-medium mt-0.5">{lote.producto}</p>
                      <p className="text-[9px] text-muted-foreground">{lote.proveedor} • {lote.dock} {lote.operador ? `• ${lote.operador}` : ''}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* ── Sidebar derecho ── */}
        <div className="space-y-3">
          {/* Alertas */}
          <Card>
            <CardHeader className="p-3 pb-2">
              <CardTitle className="text-xs flex items-center gap-1.5">
                <AlertCircle className="h-3 w-3 text-red-400" />
                Alertas
              </CardTitle>
            </CardHeader>
            <CardContent className="p-3 pt-0 space-y-1.5">
              {alertasRecepcion.map(alerta => (
                <div key={alerta.id} className={cn(
                  'rounded-lg border p-2 text-[10px]',
                  alerta.tipo === 'critico' && 'bg-red-500/5 border-red-500/20',
                  alerta.tipo === 'advertencia' && 'bg-amber-500/5 border-amber-500/20',
                  alerta.tipo === 'info' && 'bg-blue-500/5 border-blue-500/20',
                )}>
                  <div className="flex items-start gap-1.5">
                    <AlertCircle className={cn(
                      'h-3 w-3 mt-0.5 shrink-0',
                      alerta.tipo === 'critico' && 'text-red-500',
                      alerta.tipo === 'advertencia' && 'text-amber-500',
                      alerta.tipo === 'info' && 'text-blue-500',
                    )} />
                    <div>
                      <p className="font-medium leading-tight">{alerta.mensaje}</p>
                      <p className="text-[8px] text-muted-foreground mt-0.5">{alerta.timestamp}</p>
                    </div>
                  </div>
                </div>
              ))}
              <Button variant="link" size="sm" className="h-5 text-[9px] w-full">
                Ver todas las alertas →
              </Button>
            </CardContent>
          </Card>

          {/* Acciones rápidas */}
          <Card>
            <CardHeader className="p-3 pb-2">
              <CardTitle className="text-xs flex items-center gap-1.5">
                <QrCode className="h-3 w-3 text-primary" />
                Acciones Rápidas
              </CardTitle>
            </CardHeader>
            <CardContent className="p-3 pt-0 space-y-1.5">
              <Button variant="outline" size="sm" className="w-full h-7 text-[10px] gap-1.5 justify-start px-2">
                <ScanLine className="h-3 w-3" /> Escanear código de barras
              </Button>
              <Button variant="outline" size="sm" className="w-full h-7 text-[10px] gap-1.5 justify-start px-2">
                <Download className="h-3 w-3" /> Importar orden de compra
              </Button>
              <Button variant="outline" size="sm" className="w-full h-7 text-[10px] gap-1.5 justify-start px-2">
                <FileUp className="h-3 w-3" /> Generar reporte de recepción
              </Button>
            </CardContent>
          </Card>

          {/* Proveedores activos */}
          <Card>
            <CardHeader className="p-3 pb-2">
              <CardTitle className="text-xs flex items-center gap-1.5">
                <Warehouse className="h-3 w-3 text-primary" />
                Proveedores Hoy
              </CardTitle>
            </CardHeader>
            <CardContent className="p-3 pt-0 space-y-1.5">
              {Array.from(new Set(LOTES_MOCK.map(l => l.proveedor))).map(prov => {
                const lotes = LOTES_MOCK.filter(l => l.proveedor === prov);
                return (
                  <div key={prov} className="flex items-center justify-between text-[10px]">
                    <span className="font-medium truncate">{prov}</span>
                    <div className="flex items-center gap-1.5 shrink-0">
                      <span className="text-muted-foreground">{lotes.filter(l => l.estado === 'completado').length}/{lotes.length}</span>
                      <div className="h-1.5 w-12 rounded-full bg-muted overflow-hidden">
                        <div
                          className="h-full rounded-full bg-emerald-500"
                          style={{ width: `${(lotes.filter(l => l.estado === 'completado').length / lotes.length) * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>

          {/* Nota de integración */}
          <Card className="bg-muted/10 border-dashed border-border/50">
            <CardContent className="p-2.5">
              <div className="flex items-start gap-1.5 text-[9px] text-muted-foreground">
                <Clock className="h-2.5 w-2.5 mt-0.5 shrink-0" />
                <div>
                  <p className="font-medium text-foreground mb-0.5">Demo de recepción</p>
                  <p>
                    {/* TODO: Backend endpoint para recepción */}
                    {/* TODO: Integración futura con escáner y API logística */}
                    Datos simulados. Conectar con <code className="bg-muted px-1 rounded">GET /api/recepcion</code> y escáner RFID.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </WmsLayout>
  );
}