'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Route, Search, Filter, Clock, MapPin, Package,
  User, QrCode, ArrowRight, ChevronRight, Circle,
  AlertCircle, CheckCircle2, Truck, Boxes, ScanLine,
  ClipboardList, FileSearch,
} from 'lucide-react';
import { WmsLayout } from '@/components/wms-layout';
import { ModuleHeader } from '@/components/shared/ModuleHeader';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { EmptyState } from '@/components/shared/EmptyState';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/boton';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/cn';

/* ───────────────────────────────────────
   Mock data — Trazabilidad
   TODO: Backend endpoint for traceability
   TODO: Connect warehouse analytics service
   ─────────────────────────────────────── */

interface EventoTrazabilidad {
  id: string;
  tipo: 'recepcion' | 'inventario' | 'ubicacion' | 'picking' | 'packing' | 'despacho' | 'control' | 'incidencia';
  titulo: string;
  descripcion: string;
  producto: string;
  sku: string;
  ubicacion: string;
  operador: string;
  timestamp: string;
  icono: string;
}

const EVENTOS_MOCK: EventoTrazabilidad[] = [
  { id: 'EVT-001', tipo: 'recepcion', titulo: 'Mercancía recibida', descripcion: '240 unidades de Caja Tornillos M8 x 100 ingresadas al almacén', producto: 'Caja Tornillos M8 x 100', sku: 'SKU-8842', ubicacion: 'Dock 2 → Zona A', operador: 'Carlos M.', timestamp: 'Hoy 08:45', icono: 'Truck' },
  { id: 'EVT-002', tipo: 'control', titulo: 'Control de calidad superado', descripcion: 'Inspección visual y conteo validado - Lote conforme', producto: 'Caja Tornillos M8 x 100', sku: 'SKU-8842', ubicacion: 'Zona A - QC', operador: 'Lab. Calidad', timestamp: 'Hoy 09:15', icono: 'CheckCircle2' },
  { id: 'EVT-003', tipo: 'ubicacion', titulo: 'Asignación de ubicación', descripcion: 'Producto almacenado en rack A1-01, nivel 2', producto: 'Caja Tornillos M8 x 100', sku: 'SKU-8842', ubicacion: 'A1-01 (Nivel 2)', operador: 'Sistema', timestamp: 'Hoy 09:40', icono: 'MapPin' },
  { id: 'EVT-004', tipo: 'picking', titulo: 'Pickeo de producto', descripcion: '48 unidades retiradas para orden EXP-4521', producto: 'Caja Tornillos M8 x 100', sku: 'SKU-8842', ubicacion: 'A1-01 → Dock 3', operador: 'María L.', timestamp: 'Hoy 10:30', icono: 'ClipboardList' },
  { id: 'EVT-005', tipo: 'packing', titulo: 'Empaque completado', descripcion: 'Producto embalado en caja de cartón, peso 12.5 kg', producto: 'Caja Tornillos M8 x 100', sku: 'SKU-8842', ubicacion: 'Estación Packing #2', operador: 'Pedro R.', timestamp: 'Hoy 11:00', icono: 'Boxes' },
  { id: 'EVT-006', tipo: 'despacho', titulo: 'Despacho realizado', descripcion: 'Envío EXP-4521 cargado en muelle 1, transportista ExpressLog', producto: 'Caja Tornillos M8 x 100', sku: 'SKU-8842', ubicacion: 'Muelle 1', operador: 'Carlos M.', timestamp: 'Hoy 14:00', icono: 'Truck' },
  { id: 'EVT-007', tipo: 'incidencia', titulo: 'Incidencia registrada', descripcion: '4 unidades con daños visibles en recepción - rechazado parcial', producto: 'Cinta Transportadora 3m', sku: 'SKU-6654', ubicacion: 'Dock 2', operador: 'Carlos M.', timestamp: 'Hoy 06:45', icono: 'AlertCircle' },
  { id: 'EVT-008', tipo: 'recepcion', titulo: 'Mercancía recibida (parcial)', descripcion: '80 de 120 unidades recibidas de Kit Juntas Hidráulicas', producto: 'Kit Juntas Hidráulicas', sku: 'SKU-5610', ubicacion: 'Dock 3', operador: 'Pedro R.', timestamp: 'Hoy 11:30', icono: 'Truck' },
];

const tipoEventoConfig = {
  recepcion: { label: 'Recepción', color: 'border-emerald-500', bg: 'bg-emerald-500/10', text: 'text-emerald-600 dark:text-emerald-400', dot: 'bg-emerald-500' },
  inventario: { label: 'Inventario', color: 'border-blue-500', bg: 'bg-blue-500/10', text: 'text-blue-600 dark:text-blue-400', dot: 'bg-blue-500' },
  ubicacion: { label: 'Ubicación', color: 'border-violet-500', bg: 'bg-violet-500/10', text: 'text-violet-600 dark:text-violet-400', dot: 'bg-violet-500' },
  picking: { label: 'Picking', color: 'border-amber-500', bg: 'bg-amber-500/10', text: 'text-amber-600 dark:text-amber-400', dot: 'bg-amber-500' },
  packing: { label: 'Packing', color: 'border-orange-500', bg: 'bg-orange-500/10', text: 'text-orange-600 dark:text-orange-400', dot: 'bg-orange-500' },
  despacho: { label: 'Despacho', color: 'border-teal-500', bg: 'bg-teal-500/10', text: 'text-teal-600 dark:text-teal-400', dot: 'bg-teal-500' },
  control: { label: 'Control', color: 'border-sky-500', bg: 'bg-sky-500/10', text: 'text-sky-600 dark:text-sky-400', dot: 'bg-sky-500' },
  incidencia: { label: 'Incidencia', color: 'border-red-500', bg: 'bg-red-500/10', text: 'text-red-600 dark:text-red-400', dot: 'bg-red-500' },
};

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Truck, CheckCircle2, MapPin, ClipboardList, Boxes, AlertCircle,
};

const PRODUCTOS_TRAZA = ['SKU-8842 — Caja Tornillos M8 x 100', 'SKU-6654 — Cinta Transportadora 3m', 'SKU-5610 — Kit Juntas Hidráulicas'];

export default function TrazabilidadPage() {
  const [productoSeleccionado, setProductoSeleccionado] = useState(PRODUCTOS_TRAZA[0]);

  return (
    <WmsLayout>
      <ModuleHeader
        titulo="Trazabilidad"
        descripcion="Historial completo de movimientos, eventos y tracking de productos en el almacén."
        icono={Route}
        badge={{ texto: 'Tiempo real', variant: 'success' }}
        stats={[
          { label: 'Eventos hoy', valor: '128' },
          { label: 'Productos trackeados', valor: '342' },
          { label: 'Incidencias', valor: '3' },
        ]}
      />

      <div className="grid gap-3 lg:grid-cols-[260px_1fr]">
        {/* Sidebar de selección */}
        <div className="space-y-3">
          <Card>
            <CardHeader className="p-3 pb-2">
              <CardTitle className="text-xs flex items-center gap-1.5"><Package className="h-3 w-3 text-primary" /> Producto</CardTitle>
              <CardDescription className="text-[9px]">Seleccione un producto para ver su trazabilidad</CardDescription>
            </CardHeader>
            <CardContent className="p-3 pt-0 space-y-1.5">
              {PRODUCTOS_TRAZA.map(prod => (
                <button
                  key={prod}
                  onClick={() => setProductoSeleccionado(prod)}
                  className={cn(
                    'w-full text-left rounded-lg border p-2 text-[10px] transition-all',
                    productoSeleccionado === prod
                      ? 'border-primary/40 bg-primary/5'
                      : 'border-border/50 hover:border-primary/20 hover:bg-accent/20'
                  )}
                >
                  <p className={cn('font-medium', productoSeleccionado === prod && 'text-primary')}>{prod.split('—')[1]?.trim() || prod}</p>
                  <p className="text-[9px] text-muted-foreground font-mono mt-0.5">{prod.split('—')[0]?.trim()}</p>
                </button>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="p-3 pb-2">
              <CardTitle className="text-xs flex items-center gap-1.5"><Filter className="h-3 w-3 text-primary" /> Filtros</CardTitle>
            </CardHeader>
            <CardContent className="p-3 pt-0 space-y-1.5 text-[10px]">
              {['Todos', 'Hoy', 'Última semana', 'Último mes'].map(f => (
                <label key={f} className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="periodo" defaultChecked={f === 'Todos'} className="h-3 w-3 accent-primary" />
                  {f}
                </label>
              ))}
              <Separator className="opacity-50" />
              {Object.entries(tipoEventoConfig).map(([key, val]) => (
                <label key={key} className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" defaultChecked className="h-3 w-3 accent-primary" />
                  <span className={cn('h-2 w-2 rounded-full', val.dot)} />
                  {val.label}
                </label>
              ))}
            </CardContent>
          </Card>

          <Card className="bg-muted/10 border-dashed border-border/50">
            <CardContent className="p-2.5">
              <div className="flex items-start gap-1.5 text-[9px] text-muted-foreground">
                <FileSearch className="h-2.5 w-2.5 mt-0.5 shrink-0" />
                <div>
                  <p className="font-medium text-foreground mb-0.5">Trazabilidad completa</p>
                  <p>Los eventos se cargarán desde el backend al conectar el servicio de trazabilidad.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Timeline */}
        <div className="space-y-3">
          {/* Info del producto seleccionado */}
          <Card>
            <CardContent className="p-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                    <Package className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold">{productoSeleccionado.split('—')[1]?.trim()}</p>
                    <p className="text-[10px] text-muted-foreground font-mono">{productoSeleccionado.split('—')[0]?.trim()} • 6 eventos registrados</p>
                  </div>
                </div>
                <Badge variant="success" className="text-[9px] h-5">Trazabilidad activa</Badge>
              </div>
            </CardContent>
          </Card>

          {/* Timeline visual */}
          <Card>
            <ScrollArea className="h-[520px]">
              <div className="p-4">
                {EVENTOS_MOCK.filter(e => productoSeleccionado.includes(e.sku)).map((evento, i) => {
                  const cfg = tipoEventoConfig[evento.tipo];
                  const Icono = iconMap[evento.icono] || Circle;
                  const eventosFiltrados = EVENTOS_MOCK.filter(e => productoSeleccionado.includes(e.sku));
                  return (
                    <motion.div
                      key={evento.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: i * 0.05 }}
                      className="flex gap-4"
                    >
                      {/* Línea temporal */}
                      <div className="flex flex-col items-center">
                        <div className={cn('flex h-8 w-8 items-center justify-center rounded-full', cfg.bg)}>
                          <Icono className={cn('h-4 w-4', cfg.text)} />
                        </div>
                        {i < eventosFiltrados.length - 1 && (
                          <div className="w-px flex-1 bg-gradient-to-b from-border to-transparent min-h-[30px]" />
                        )}
                      </div>

                      {/* Contenido */}
                      <div className={cn('flex-1 pb-6 border-l-2 pl-4 -ml-[1px]', cfg.color)}>
                        <div className="flex items-center gap-2 mb-0.5">
                          <span className="text-[10px] font-semibold">{evento.titulo}</span>
                          <Badge variant="outline" className={cn('text-[8px] h-3.5 px-1 border-0 font-medium', cfg.text)}>
                            {cfg.label}
                          </Badge>
                        </div>
                        <p className="text-[10px] text-muted-foreground leading-relaxed mb-1">{evento.descripcion}</p>
                        <div className="flex flex-wrap items-center gap-x-3 gap-y-0.5 text-[9px] text-muted-foreground">
                          <span className="flex items-center gap-1"><MapPin className="h-2.5 w-2.5" /> {evento.ubicacion}</span>
                          <span className="flex items-center gap-1"><User className="h-2.5 w-2.5" /> {evento.operador}</span>
                          <span className="flex items-center gap-1"><Clock className="h-2.5 w-2.5" /> {evento.timestamp}</span>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </ScrollArea>
          </Card>

          {/* Mapa de flujo del producto */}
          <Card>
            <CardHeader className="p-3 pb-2">
              <CardTitle className="text-xs flex items-center gap-1.5"><Route className="h-3 w-3 text-primary" /> Flujo del Producto</CardTitle>
              <CardDescription className="text-[9px]">Recorrido visual del producto en el almacén</CardDescription>
            </CardHeader>
            <CardContent className="p-3 pt-0">
              <div className="flex items-center gap-1 overflow-x-auto pb-1">
                {['Recepción', 'Control', 'Ubicación', 'Picking', 'Packing', 'Despacho'].map((step, i) => (
                  <div key={step} className="flex items-center gap-1 shrink-0">
                    <div className="flex h-7 items-center gap-1.5 rounded-lg bg-primary/10 px-2 py-1 text-[9px] font-medium text-primary whitespace-nowrap">
                      <CheckCircle2 className="h-2.5 w-2.5" />
                      {step}
                    </div>
                    {i < 5 && <ChevronRight className="h-3 w-3 text-muted-foreground/30" />}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </WmsLayout>
  );
}