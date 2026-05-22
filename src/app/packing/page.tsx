'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Boxes, Search, Filter, Plus,
  Package, User, CheckCircle2, ChevronRight,
  Ruler, Weight, ScanLine, Printer,
  BarChart3, TrendingUp, Timer, ClipboardList,
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
import { cn } from '@/lib/cn';

interface OrdenPacking {
  id: string;
  orden: string;
  producto: string;
  cantidad: number;
  tipo: 'caja' | 'pallet' | 'sobre' | 'tubo';
  peso: string;
  dimensiones: string;
  estado: 'pendiente' | 'empaquetando' | 'completado';
  operador: string;
  destinatario: string;
}

const ORDENES_PACKING: OrdenPacking[] = [
  { id: 'PCK-001', orden: 'EXP-4521', producto: 'Kit Tornillos + Tuercas M8', cantidad: 48, tipo: 'caja', peso: '12.5 kg', dimensiones: '40×30×25 cm', estado: 'empaquetando', operador: 'Carlos M.', destinatario: 'Sucursal Norte' },
  { id: 'PCK-002', orden: 'EXP-4522', producto: 'Sensor Temperatura T200', cantidad: 12, tipo: 'caja', peso: '3.2 kg', dimensiones: '30×20×15 cm', estado: 'pendiente', operador: 'María L.', destinatario: 'Bodega Central' },
  { id: 'PCK-003', orden: 'EXP-4523', producto: 'Kit Juntas Hidráulicas', cantidad: 24, tipo: 'pallet', peso: '8.7 kg', dimensiones: '120×80×60 cm', estado: 'pendiente', operador: 'Pedro R.', destinatario: 'Zona Libre' },
  { id: 'PCK-004', orden: 'EXP-4524', producto: 'Rodamiento SKF 6205', cantidad: 60, tipo: 'caja', peso: '15.0 kg', dimensiones: '50×40×30 cm', estado: 'completado', operador: 'Ana G.', destinatario: 'Distribuidora del Sur' },
  { id: 'PCK-005', orden: 'EXP-4525', producto: 'Filtro Aceite F-450', cantidad: 36, tipo: 'pallet', peso: '22.0 kg', dimensiones: '120×80×80 cm', estado: 'empaquetando', operador: 'Luis F.', destinatario: 'Puerto de Balboa' },
  { id: 'PCK-006', orden: 'EXP-4526', producto: 'Válvula Solenoide 24V', cantidad: 8, tipo: 'caja', peso: '2.1 kg', dimensiones: '25×20×15 cm', estado: 'completado', operador: 'Carlos M.', destinatario: 'Sucursal Oeste' },
  { id: 'PCK-007', orden: 'EXP-4527', producto: 'Documentos Corporativos', cantidad: 5, tipo: 'sobre', peso: '0.5 kg', dimensiones: '35×25×2 cm', estado: 'pendiente', operador: 'María L.', destinatario: 'Cliente Corp' },
  { id: 'PCK-008', orden: 'EXP-4528', producto: 'Eje Transmisión 2m', cantidad: 1, tipo: 'tubo', peso: '6.8 kg', dimensiones: '200×20×20 cm', estado: 'pendiente', operador: 'Pedro R.', destinatario: 'Centro Logístico' },
];

const FLUJO_PACKING = [
  { label: 'Recepción', href: '/recepcion', completado: true },
  { label: 'Inventario', href: '/inventario', completado: true },
  { label: 'Mapeo Bodega', href: '/mapeo-bodega', completado: true },
  { label: 'Picking', href: '/picking', completado: true },
  { label: 'Packing', href: '/packing', completado: true },
  { label: 'Despacho', href: '/despacho', completado: false },
];

const tipoPackingMap: Record<string, { label: string; icon: React.ComponentType<{ className?: string }> }> = {
  caja: { label: 'Caja', icon: Package },
  pallet: { label: 'Pallet', icon: Boxes },
  sobre: { label: 'Sobre', icon: Package },
  tubo: { label: 'Tubo', icon: Package },
};

export default function PackingPage() {
  const [filtroEstado, setFiltroEstado] = useState('todas');

  const itemsFiltrados = useMemo(() => {
    if (filtroEstado === 'todas') return ORDENES_PACKING;
    if (filtroEstado === 'activas') return ORDENES_PACKING.filter(o => o.estado !== 'completado');
    return ORDENES_PACKING.filter(o => o.estado === filtroEstado);
  }, [filtroEstado]);

  const stats = useMemo(() => ({
    pendientes: ORDENES_PACKING.filter(o => o.estado === 'pendiente').length,
    empaquetando: ORDENES_PACKING.filter(o => o.estado === 'empaquetando').length,
    completados: ORDENES_PACKING.filter(o => o.estado === 'completado').length,
    total: ORDENES_PACKING.length,
  }), []);

  return (
    <WmsLayout>
      <ModuleHeader
        titulo="Packing"
        descripcion="Empaque, embalaje, pesaje y etiquetado de productos para despacho."
        icono={Boxes}
        badge={{ texto: 'Estación activa', variant: 'success' }}
        stats={[
          { label: 'Pendientes', valor: String(stats.pendientes) },
          { label: 'Empaquetando', valor: String(stats.empaquetando) },
          { label: 'Hoy', valor: `${stats.completados} completados` },
        ]}
      />

      <FlowNavigator pasos={FLUJO_PACKING} pasoActual="/packing" />

      {/* KPIs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 my-3">
        {[
          { label: 'Pendientes', valor: String(stats.pendientes), icon: Package, color: 'text-slate-500', bg: 'bg-slate-500/10', desc: 'Por empacar' },
          { label: 'Empaquetando', valor: String(stats.empaquetando), icon: Boxes, color: 'text-amber-500', bg: 'bg-amber-500/10', desc: 'En progreso' },
          { label: 'Completados', valor: String(stats.completados), icon: CheckCircle2, color: 'text-emerald-500', bg: 'bg-emerald-500/10', desc: 'Listos para despacho' },
          { label: 'Rendimiento', valor: '96%', icon: TrendingUp, color: 'text-violet-500', bg: 'bg-violet-500/10', desc: 'Eficiencia promedio' },
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

      <div className="grid gap-3 lg:grid-cols-[1fr_280px]">
        <div className="space-y-3">
          <Card>
            <CardContent className="p-2.5">
              <div className="flex flex-col sm:flex-row gap-2 items-start sm:items-center justify-between mb-2">
                <div className="relative w-full sm:w-72">
                  <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                  <Input placeholder="Buscar orden de packing..." className="pl-8 h-8 text-[11px]" />
                </div>
                <div className="flex gap-1.5 w-full sm:w-auto">
                  <Button variant="outline" size="sm" className="h-7 text-[10px] gap-1 px-2"><Filter className="h-3 w-3" /> Filtros</Button>
                  <Button size="sm" className="h-7 text-[10px] gap-1 px-2"><Plus className="h-3 w-3" /> Nueva Orden</Button>
                </div>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {['todas', 'pendiente', 'empaquetando', 'completado'].map(est => (
                  <button key={est} onClick={() => setFiltroEstado(est)}
                    className={cn('rounded-full px-2 py-0.5 text-[9px] font-medium transition-all border',
                      filtroEstado === est ? 'bg-primary text-primary-foreground border-primary' : 'bg-card text-muted-foreground border-border hover:border-primary/30'
                    )}
                  >
                    {est === 'todas' ? 'Todas' : est === 'empaquetando' ? 'Empaquetando' : est.charAt(0).toUpperCase() + est.slice(1)}
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <div className="flex items-center justify-between px-3 pt-2.5 pb-1">
              <span className="text-[10px] font-semibold text-muted-foreground">Órdenes de Packing ({itemsFiltrados.length})</span>
              <div className="flex items-center gap-2 text-[8px] text-muted-foreground">
                <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-emerald-500" /> {stats.completados} completados</span>
                <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-amber-500" /> {stats.empaquetando} en curso</span>
              </div>
            </div>
            <ScrollArea className="h-[460px]">
              <div className="p-1 space-y-1">
                {itemsFiltrados.map((orden, idx) => {
                  const TipoInfo = tipoPackingMap[orden.tipo];
                  const TipoIcon = TipoInfo?.icon || Package;
                  return (
                    <motion.div
                      key={orden.id}
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.15, delay: idx * 0.02 }}
                      className="flex items-start gap-2.5 rounded-lg border p-2.5 transition-all hover:bg-accent/20 hover:border-primary/20 cursor-pointer group"
                    >
                      <div className={cn(
                        'flex h-9 w-9 items-center justify-center rounded-xl shrink-0',
                        orden.estado === 'pendiente' && 'bg-slate-500/10 text-slate-500',
                        orden.estado === 'empaquetando' && 'bg-amber-500/10 text-amber-500',
                        orden.estado === 'completado' && 'bg-emerald-500/10 text-emerald-500',
                      )}>
                        <TipoIcon className="h-4 w-4" />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="text-[11px] font-semibold">{orden.id}</span>
                          <StatusBadge estado={orden.estado} dot={false} />
                          <Badge variant="outline" className="text-[8px] h-3.5 px-1">{TipoInfo?.label || orden.tipo}</Badge>
                          {orden.estado === 'empaquetando' && (
                            <span className="flex items-center gap-0.5 text-[8px] text-amber-500">
                              <Timer className="h-2.5 w-2.5" /> En estación
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] font-medium mt-0.5">{orden.producto}</p>
                        <div className="flex items-center gap-2 mt-0.5 text-[9px] text-muted-foreground flex-wrap">
                          <span>{orden.cantidad} uds</span>
                          <span>•</span>
                          <span><Weight className="h-2.5 w-2.5 inline" /> {orden.peso}</span>
                          <span>•</span>
                          <span><Ruler className="h-2.5 w-2.5 inline" /> {orden.dimensiones}</span>
                        </div>
                        <div className="flex items-center gap-2 mt-0.5 text-[9px] text-muted-foreground">
                          <User className="h-2.5 w-2.5" />
                          <span>{orden.operador}</span>
                          <span>•</span>
                          <span>→ {orden.destinatario}</span>
                        </div>
                      </div>

                      <ChevronRight className="h-3.5 w-3.5 text-muted-foreground shrink-0 mt-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </motion.div>
                  );
                })}
              </div>
            </ScrollArea>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-3">
          <Card>
            <CardHeader className="p-3 pb-2">
              <CardTitle className="text-xs flex items-center gap-1.5">
                <ClipboardList className="h-3 w-3 text-primary" />
                Tipos de Empaque
              </CardTitle>
            </CardHeader>
            <CardContent className="p-3 pt-0 space-y-1.5 text-[10px]">
              {Object.entries(tipoPackingMap).map(([key, val]) => {
                const Icon = val.icon;
                const count = ORDENES_PACKING.filter(o => o.tipo === key).length;
                return (
                  <div key={key} className="flex items-center gap-2">
                    <Icon className="h-3 w-3 text-primary/60" />
                    <span className="flex-1">{val.label}</span>
                    <Badge variant="outline" className="text-[8px] h-4">{count}</Badge>
                  </div>
                );
              })}
            </CardContent>
          </Card>

          {/* Estaciones activas */}
          <Card>
            <CardHeader className="p-3 pb-2">
              <CardTitle className="text-xs flex items-center gap-1.5">
                <ScanLine className="h-3 w-3 text-primary" />
                Estaciones
              </CardTitle>
            </CardHeader>
            <CardContent className="p-3 pt-0 space-y-1.5 text-[10px]">
              {[
                { nombre: 'Estación 1', activo: true, operador: 'Carlos M.', items: 2 },
                { nombre: 'Estación 2', activo: true, operador: 'María L.', items: 1 },
                { nombre: 'Estación 3', activo: false, operador: '—', items: 0 },
              ].map(est => (
                <div key={est.nombre} className={cn(
                  'flex items-center justify-between p-1.5 rounded-lg border',
                  est.activo ? 'border-emerald-500/20 bg-emerald-500/5' : 'border-border/30'
                )}>
                  <div>
                    <p className="font-medium">{est.nombre}</p>
                    <p className="text-[8px] text-muted-foreground">{est.activo ? `${est.operador} • ${est.items} items` : 'Inactiva'}</p>
                  </div>
                  <span className={cn('h-2 w-2 rounded-full', est.activo ? 'bg-emerald-500' : 'bg-slate-300')} />
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Resumen */}
          <Card className="bg-gradient-to-br from-primary/5 via-transparent to-transparent border-primary/10">
            <CardContent className="p-3 space-y-2">
              <div className="flex items-center gap-1.5 text-[10px] font-medium">
                <BarChart3 className="h-3 w-3 text-primary" />
                Resumen del Día
              </div>
              <div className="grid grid-cols-2 gap-1.5">
                <div className="rounded-lg bg-card/60 p-1.5 text-center border border-border/30">
                  <p className="text-sm font-bold text-emerald-500">{stats.completados}</p>
                  <p className="text-[8px] text-muted-foreground">Completados</p>
                </div>
                <div className="rounded-lg bg-card/60 p-1.5 text-center border border-border/30">
                  <p className="text-sm font-bold text-amber-500">{stats.empaquetando}</p>
                  <p className="text-[8px] text-muted-foreground">En proceso</p>
                </div>
                <div className="rounded-lg bg-card/60 p-1.5 text-center border border-border/30">
                  <p className="text-sm font-bold text-blue-500">{stats.total}</p>
                  <p className="text-[8px] text-muted-foreground">Total hoy</p>
                </div>
                <div className="rounded-lg bg-card/60 p-1.5 text-center border border-border/30">
                  <p className="text-sm font-bold text-violet-500">4</p>
                  <p className="text-[8px] text-muted-foreground">Estaciones</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-muted/10 border-dashed border-border/50">
            <CardContent className="p-2.5">
              <div className="flex items-start gap-1.5 text-[9px] text-muted-foreground">
                <Printer className="h-2.5 w-2.5 mt-0.5 shrink-0" />
                <div>
                  <p className="font-medium text-foreground mb-0.5">Impresión de etiquetas</p>
                  <p>Genere e imprima etiquetas de empaque directamente desde la estación.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </WmsLayout>
  );
}