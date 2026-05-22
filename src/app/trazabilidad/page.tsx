'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Route, Package, MapPin, Clock,
  AlertTriangle, BarChart3,
  Warehouse, Truck, ClipboardList, QrCode,
  ScanLine, Boxes, ArrowRight,
} from 'lucide-react';
import { WmsLayout } from '@/components/wms-layout';
import { ModuleHeader } from '@/components/shared/ModuleHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/cn';

interface EventoTrazabilidad {
  id: string;
  tipo: 'recepcion' | 'inventario' | 'picking' | 'packing' | 'despacho' | 'incidencia';
  accion: string;
  producto: string;
  sku: string;
  ubicacion: string;
  usuario: string;
  timestamp: string;
  detalle?: string;
}

const EVENTOS_MOCK: EventoTrazabilidad[] = [
  { id: 'EVT-001', tipo: 'recepcion', accion: 'Ingreso de mercancía', producto: 'Caja Tornillos M8 x 100', sku: 'SKU-8842', ubicacion: 'Muelle 1', usuario: 'Carlos M.', timestamp: 'Hoy 08:15', detalle: '120 unidades recibidas, verificación completada' },
  { id: 'EVT-002', tipo: 'inventario', accion: 'Actualización de stock', producto: 'Sensor Temperatura T200', sku: 'SKU-2391', ubicacion: 'Zona C', usuario: 'Sistema', timestamp: 'Hoy 08:30', detalle: 'Stock actualizado: 48 unidades' },
  { id: 'EVT-003', tipo: 'picking', accion: 'Asignación de picking', producto: 'Kit Juntas Hidráulicas', sku: 'SKU-5610', ubicacion: 'Pasillo B', usuario: 'Pedro R.', timestamp: 'Hoy 09:00', detalle: '24 unidades, prioridad normal' },
  { id: 'EVT-004', tipo: 'packing', accion: 'Empaque completado', producto: 'Rodamiento SKF 6205', sku: 'SKU-7734', ubicacion: 'Estación 1', usuario: 'Ana G.', timestamp: 'Hoy 09:45', detalle: 'Caja 50×40×30 cm, 15.0 kg' },
  { id: 'EVT-005', tipo: 'despacho', accion: 'Despacho generado', producto: 'Filtro Aceite F-450', sku: 'SKU-1209', ubicacion: 'Muelle 3', usuario: 'Luis F.', timestamp: 'Hoy 10:00', detalle: 'EXP-4526, transportista: ExpressLog' },
  { id: 'EVT-006', tipo: 'incidencia', accion: 'Producto dañado', producto: 'Válvula Solenoide 24V', sku: 'SKU-3312', ubicacion: 'Zona Recepción', usuario: 'María L.', timestamp: 'Hoy 10:30', detalle: '2 unidades con daño en embalaje' },
  { id: 'EVT-007', tipo: 'recepcion', accion: 'Ingreso de mercancía', producto: 'Actuador Neumático', sku: 'SKU-4410', ubicacion: 'Muelle 2', usuario: 'Carlos M.', timestamp: 'Hoy 11:00' },
  { id: 'EVT-008', tipo: 'picking', accion: 'Picking completado', producto: 'Terminal Touchscreen 15"', sku: 'SKU-5500', ubicacion: 'Cinta 2', usuario: 'Pedro R.', timestamp: 'Hoy 11:30' },
];

const tipoConfig: Record<string, { label: string; color: string; bg: string }> = {
  recepcion: { label: 'Recepción', color: 'text-blue-500', bg: 'bg-blue-500/10' },
  inventario: { label: 'Inventario', color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
  picking: { label: 'Picking', color: 'text-amber-500', bg: 'bg-amber-500/10' },
  packing: { label: 'Packing', color: 'text-violet-500', bg: 'bg-violet-500/10' },
  despacho: { label: 'Despacho', color: 'text-sky-500', bg: 'bg-sky-500/10' },
  incidencia: { label: 'Incidencia', color: 'text-red-500', bg: 'bg-red-500/10' },
};

const tipoIcon: Record<string, React.ComponentType<{ className?: string }>> = {
  recepcion: Truck,
  inventario: Package,
  picking: ClipboardList,
  packing: Boxes,
  despacho: Truck,
  incidencia: AlertTriangle,
};

// Zonas del mapa de bodega
const ZONAS = [
  { id: 'recepcion', label: 'Recepción', icon: Truck, x: 5, y: 50, color: 'text-blue-500', bg: 'bg-blue-500' },
  { id: 'inventario', label: 'Inventario', icon: Package, x: 25, y: 30, color: 'text-emerald-500', bg: 'bg-emerald-500' },
  { id: 'picking', label: 'Picking', icon: ClipboardList, x: 45, y: 60, color: 'text-amber-500', bg: 'bg-amber-500' },
  { id: 'packing', label: 'Packing', icon: Boxes, x: 65, y: 35, color: 'text-violet-500', bg: 'bg-violet-500' },
  { id: 'despacho', label: 'Despacho', icon: Truck, x: 85, y: 55, color: 'text-sky-500', bg: 'bg-sky-500' },
];

export default function TrazabilidadPage() {
  const [filtroTipo, setFiltroTipo] = useState('todos');
  const [zonaSeleccionada, setZonaSeleccionada] = useState<string | null>(null);

  const items = useMemo(() => 
    filtroTipo === 'todos' ? EVENTOS_MOCK : EVENTOS_MOCK.filter(e => e.tipo === filtroTipo),
  [filtroTipo]);

  const incidencias = EVENTOS_MOCK.filter(e => e.tipo === 'incidencia');

  const eventosZona = useMemo(() => {
    if (!zonaSeleccionada) return [];
    return EVENTOS_MOCK.filter(e => e.tipo === zonaSeleccionada);
  }, [zonaSeleccionada]);

  return (
    <WmsLayout>
      <ModuleHeader
        titulo="Trazabilidad"
        descripcion="Mapa interactivo del flujo de productos en el almacén con trazabilidad completa."
        icono={Route}
        badge={{ texto: 'Tiempo real', variant: 'success' }}
        stats={[
          { label: 'Eventos hoy', valor: String(EVENTOS_MOCK.length) },
          { label: 'Incidencias', valor: String(incidencias.length) },
          { label: 'Zonas activas', valor: '5' },
        ]}
      />

      {/* ── MAPA DE BODEGA ── */}
      <Card className="mb-3 overflow-hidden">
        <CardContent className="p-0">
          <div className="relative h-[280px] bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
            {/* Grid del mapa */}
            <div className="absolute inset-0 opacity-10" style={{
              backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
              backgroundSize: '40px 40px',
            }} />
            
            {/* Líneas de conexión entre zonas */}
            <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
              {ZONAS.slice(0, -1).map((zona, i) => {
                const next = ZONAS[i + 1];
                return (
                  <motion.line
                    key={`line-${zona.id}`}
                    x1={`${zona.x}%`}
                    y1={`${zona.y}%`}
                    x2={`${next.x}%`}
                    y2={`${next.y}%`}
                    stroke="rgba(99,102,241,0.3)"
                    strokeWidth="2"
                    strokeDasharray="6,4"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.5, delay: i * 0.2 }}
                  />
                );
              })}
              {/* Flecha animada recorriendo la ruta */}
              <motion.circle
                r="4"
                fill="#6366f1"
                animate={{
                  cx: ['5%', '25%', '45%', '65%', '85%'],
                  cy: ['50%', '30%', '60%', '35%', '55%'],
                }}
                transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
              />
            </svg>

            {/* Zonas clickeables */}
            {ZONAS.map((zona, i) => {
              const Icon = zona.icon;
              const eventosCount = EVENTOS_MOCK.filter(e => e.tipo === zona.id).length;
              const isSelected = zonaSeleccionada === zona.id;
              return (
                <motion.button
                  key={zona.id}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  onClick={() => setZonaSeleccionada(zonaSeleccionada === zona.id ? null : zona.id)}
                  className={cn(
                    'absolute transform -translate-x-1/2 -translate-y-1/2 transition-all cursor-pointer group',
                  )}
                  style={{ left: `${zona.x}%`, top: `${zona.y}%` }}
                >
                  <div className={cn(
                    'flex flex-col items-center gap-1',
                    isSelected && 'scale-110'
                  )}>
                    <div className={cn(
                      'flex h-12 w-12 items-center justify-center rounded-2xl shadow-lg transition-all',
                      isSelected ? `${zona.bg} shadow-${zona.color.replace('text-', '')}/30 scale-110` : 'bg-slate-800/80 border border-slate-700/50 group-hover:border-slate-600'
                    )}>
                      <Icon className={cn('h-5 w-5', isSelected ? 'text-white' : zona.color)} />
                    </div>
                    <span className={cn(
                      'text-[9px] font-medium px-1.5 py-0.5 rounded-md',
                      isSelected ? 'bg-primary/20 text-primary' : 'bg-slate-900/80 text-slate-400'
                    )}>
                      {zona.label}
                    </span>
                    {eventosCount > 0 && (
                      <span className={cn(
                        'text-[8px] px-1 rounded-full',
                        isSelected ? 'bg-primary/20 text-primary' : 'text-slate-500'
                      )}>
                        {eventosCount} eventos
                      </span>
                    )}
                  </div>
                </motion.button>
              );
            })}

            {/* Header del mapa */}
            <div className="absolute top-3 left-3 flex items-center gap-1.5">
              <MapPin className="h-3 w-3 text-indigo-400" />
              <span className="text-[10px] font-medium text-slate-400">Plano de Bodega</span>
            </div>
            <div className="absolute top-3 right-3 flex items-center gap-2">
              <span className="flex items-center gap-1 text-[8px] text-slate-500">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> Activo
              </span>
              <span className="flex items-center gap-1 text-[8px] text-slate-500">
                <span className="h-1.5 w-1.5 rounded-full bg-indigo-400" /> En ruta
              </span>
            </div>
          </div>

          {/* Leyenda del mapa */}
          <div className="flex items-center gap-3 px-3 py-2 bg-slate-900/50 border-t border-slate-800">
            <QrCode className="h-3 w-3 text-slate-500" />
            <span className="text-[9px] text-slate-500">Seleccione una zona para ver sus eventos de trazabilidad</span>
            <div className="ml-auto flex items-center gap-1 text-[8px] text-slate-600">
              <ArrowRight className="h-2.5 w-2.5" /> 
              <span>Ruta del producto</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-3 lg:grid-cols-[1fr_280px]">
        {/* ── Eventos ── */}
        <div className="space-y-3">
          {/* Filtros */}
          <Card>
            <CardContent className="p-2.5">
              <div className="flex flex-wrap items-center gap-1.5">
                {['todos', 'recepcion', 'inventario', 'picking', 'packing', 'despacho', 'incidencia'].map(t => (
                  <button key={t} onClick={() => setFiltroTipo(t)}
                    className={cn('rounded-full px-2 py-0.5 text-[9px] font-medium transition-all border',
                      filtroTipo === t ? 'bg-primary text-primary-foreground border-primary' : 'bg-card text-muted-foreground border-border hover:border-primary/30'
                    )}
                  >
                    {t === 'todos' ? 'Todos' : tipoConfig[t]?.label || t}
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Lista timeline */}
          <Card>
            <div className="flex items-center justify-between px-3 pt-2.5 pb-1">
              <span className="text-[10px] font-semibold text-muted-foreground">
                {zonaSeleccionada 
                  ? `Eventos en ${tipoConfig[zonaSeleccionada]?.label || zonaSeleccionada} (${eventosZona.length})`
                  : `Línea de Tiempo (${items.length} eventos)`}
              </span>
              <div className="flex items-center gap-1 text-[8px] text-muted-foreground">
                <Clock className="h-2.5 w-2.5" /> Hoy
              </div>
            </div>
            <ScrollArea className="h-[380px]">
              <div className="p-1 space-y-0">
                {(zonaSeleccionada ? eventosZona : items).length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <Route className="h-10 w-10 text-muted-foreground/30 mb-3" />
                    <p className="text-sm font-medium text-muted-foreground">Sin eventos en esta zona</p>
                    <p className="text-[10px] text-muted-foreground/60">Seleccione otra zona o filtro</p>
                  </div>
                ) : (
                  (zonaSeleccionada ? eventosZona : items).map((evento, idx) => {
                    const cfg = tipoConfig[evento.tipo];
                    const Icono = tipoIcon[evento.tipo] || Package;
                    const esUltimo = idx === (zonaSeleccionada ? eventosZona : items).length - 1;
                    return (
                      <div key={evento.id} className="relative flex gap-3 pb-2">
                        {!esUltimo && <div className="absolute left-[17px] top-8 bottom-0 w-px bg-border/50" />}
                        <div className="relative z-10 mt-1">
                          <div className={cn('flex h-8 w-8 items-center justify-center rounded-xl', cfg.bg, cfg.color)}>
                            <Icono className="h-4 w-4" />
                          </div>
                        </div>
                        <motion.div
                          initial={{ opacity: 0, x: -5 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.2, delay: idx * 0.02 }}
                          className="flex-1 min-w-0 rounded-lg border border-border/40 p-2.5 hover:bg-accent/20 transition-colors"
                        >
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span className="text-[11px] font-semibold">{evento.accion}</span>
                            <Badge variant="outline" className={cn('text-[8px] h-3.5 px-1 border-0', cfg.color, cfg.bg)}>
                              {cfg?.label}
                            </Badge>
                          </div>
                          <p className="text-[10px] font-medium mt-0.5">{evento.producto}</p>
                          <div className="flex items-center gap-2 mt-0.5 text-[9px] text-muted-foreground flex-wrap">
                            <ScanLine className="h-2.5 w-2.5 inline" />
                            <span className="font-mono">{evento.sku}</span>
                            <span>•</span>
                            <MapPin className="h-2.5 w-2.5 inline" />
                            <span>{evento.ubicacion}</span>
                          </div>
                          {evento.detalle && (
                            <p className="text-[8px] text-muted-foreground mt-1 italic">{evento.detalle}</p>
                          )}
                          <div className="flex items-center gap-2 mt-1 text-[8px] text-muted-foreground">
                            <span>{evento.usuario}</span>
                            <span>•</span>
                            <span>{evento.timestamp}</span>
                          </div>
                        </motion.div>
                      </div>
                    );
                  })
                )}
              </div>
            </ScrollArea>
          </Card>
        </div>

        {/* ── Sidebar ── */}
        <div className="space-y-3">
          {/* Mapa de calor (mini) */}
          <Card>
            <CardHeader className="p-3 pb-2">
              <CardTitle className="text-xs flex items-center gap-1.5">
                <BarChart3 className="h-3 w-3 text-primary" />
                Actividad por Zona
              </CardTitle>
            </CardHeader>
            <CardContent className="p-3 pt-0 space-y-1.5">
              {ZONAS.map(zona => {
                const count = EVENTOS_MOCK.filter(e => e.tipo === zona.id).length;
                const max = Math.max(...ZONAS.map(z => EVENTOS_MOCK.filter(e => e.tipo === z.id).length));
                const pct = max > 0 ? (count / max) * 100 : 0;
                return (
                  <button
                    key={zona.id}
                    onClick={() => setZonaSeleccionada(zonaSeleccionada === zona.id ? null : zona.id)}
                    className={cn(
                      'w-full flex items-center gap-2 text-[10px] p-1.5 rounded-lg transition-all',
                      zonaSeleccionada === zona.id ? 'bg-primary/10 border border-primary/20' : 'hover:bg-accent/20'
                    )}
                  >
                    <div className={cn('flex h-5 w-5 items-center justify-center rounded-md', zona.bg)}>
                      <zona.icon className="h-3 w-3 text-white" />
                    </div>
                    <span className="flex-1 text-left">{zona.label}</span>
                    <span className="text-muted-foreground">{count}</span>
                    <div className="h-1.5 w-12 rounded-full bg-muted overflow-hidden">
                      <div className={cn('h-full rounded-full', zona.bg.replace('bg-', 'bg-').replace('500', '500'))} style={{ width: `${pct}%` }} />
                    </div>
                  </button>
                );
              })}
            </CardContent>
          </Card>

          {/* Incidencias */}
          {incidencias.length > 0 && (
            <Card className="border-red-500/20">
              <CardHeader className="p-3 pb-2">
                <CardTitle className="text-xs flex items-center gap-1.5">
                  <AlertTriangle className="h-3 w-3 text-red-500" />
                  Incidencias
                  <Badge variant="destructive" className="text-[8px] h-3.5 px-1 ml-auto">{incidencias.length}</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-3 pt-0 space-y-1.5">
                {incidencias.map(inc => (
                  <div key={inc.id} className="rounded-lg border border-red-500/10 bg-red-500/5 p-1.5 text-[9px]">
                    <p className="font-medium">{inc.accion}</p>
                    <p className="text-[8px] text-muted-foreground">{inc.producto} • {inc.timestamp}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {/* Resumen */}
          <Card className="bg-gradient-to-br from-primary/5 via-transparent to-transparent border-primary/10">
            <CardContent className="p-3 space-y-2">
              <div className="flex items-center gap-1.5 text-[10px] font-medium">
                <BarChart3 className="h-3 w-3 text-primary" />
                Resumen
              </div>
              <div className="grid grid-cols-2 gap-1.5">
                <div className="rounded-lg bg-card/60 p-1.5 text-center border border-border/30">
                  <p className="text-sm font-bold text-emerald-500">{EVENTOS_MOCK.filter(e => e.tipo !== 'incidencia').length}</p>
                  <p className="text-[8px] text-muted-foreground">Eventos OK</p>
                </div>
                <div className="rounded-lg bg-card/60 p-1.5 text-center border border-border/30">
                  <p className="text-sm font-bold text-red-500">{incidencias.length}</p>
                  <p className="text-[8px] text-muted-foreground">Incidencias</p>
                </div>
                <div className="rounded-lg bg-card/60 p-1.5 text-center border border-border/30">
                  <p className="text-sm font-bold text-blue-500">{new Set(EVENTOS_MOCK.map(e => e.sku)).size}</p>
                  <p className="text-[8px] text-muted-foreground">SKUs</p>
                </div>
                <div className="rounded-lg bg-card/60 p-1.5 text-center border border-border/30">
                  <p className="text-sm font-bold text-violet-500">{ZONAS.length}</p>
                  <p className="text-[8px] text-muted-foreground">Zonas</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </WmsLayout>
  );
}