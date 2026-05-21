'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowRightLeft, Search, Filter, Plus, Clock, Truck,
  MapPin, CheckCircle2, AlertCircle, ChevronRight, Package,
  User, Calendar, Globe, Download, FileText,
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

/* ───────────────────────────────────────
   Mock data — Despacho
   TODO: Backend endpoint for dispatch operations
   TODO: Real-time tracking integration
   ─────────────────────────────────────── */

interface DespachoOrden {
  id: string;
  orden: string;
  destino: string;
  transportista: string;
  tipoEnvio: 'Terrestre' | 'Aereo' | 'Maritimo';
  peso: string;
  bultos: number;
  fechaSalida: string;
  horaSalida: string;
  estado: 'pendiente' | 'cargando' | 'en_transito' | 'entregado' | 'incidencia';
  muelle: string;
  operador: string;
  tracking: string;
}

const DESPACHOS_MOCK: DespachoOrden[] = [
  { id: 'DSP-001', orden: 'EXP-4521', destino: 'Sucursal Norte, Ciudad de Panamá', transportista: 'ExpressLog', tipoEnvio: 'Terrestre', peso: '12.5 kg', bultos: 2, fechaSalida: 'Hoy', horaSalida: '14:00', estado: 'cargando', muelle: 'Muelle 1', operador: 'Carlos M.', tracking: 'EXP-4521-TRK-001' },
  { id: 'DSP-002', orden: 'EXP-4522', destino: 'Bodega Central, Colón', transportista: 'CargaPacífico', tipoEnvio: 'Terrestre', peso: '3.2 kg', bultos: 1, fechaSalida: 'Hoy', horaSalida: '16:00', estado: 'pendiente', muelle: 'Muelle 2', operador: 'María L.', tracking: 'EXP-4522-TRK-002' },
  { id: 'DSP-003', orden: 'EXP-4523', destino: 'Cliente VIP, Zona Libre', transportista: 'AirCargo', tipoEnvio: 'Aereo', peso: '8.7 kg', bultos: 1, fechaSalida: 'Hoy', horaSalida: '18:00', estado: 'pendiente', muelle: 'Muelle 3', operador: 'Pedro R.', tracking: 'EXP-4523-TRK-003' },
  { id: 'DSP-004', orden: 'EXP-4524', destino: 'Distribuidora del Sur, David', transportista: 'PanamáLog', tipoEnvio: 'Terrestre', peso: '15.0 kg', bultos: 3, fechaSalida: 'Ayer', horaSalida: '10:00', estado: 'en_transito', muelle: 'Muelle 1', operador: 'Ana G.', tracking: 'EXP-4524-TRK-004' },
  { id: 'DSP-005', orden: 'EXP-4525', destino: 'Puerto de Balboa — Exportación', transportista: 'OceanicLines', tipoEnvio: 'Maritimo', peso: '22.0 kg', bultos: 1, fechaSalida: 'Ayer', horaSalida: '08:00', estado: 'en_transito', muelle: 'Muelle 4', operador: 'Carlos M.', tracking: 'EXP-4525-TRK-005' },
  { id: 'DSP-006', orden: 'EXP-4526', destino: 'Sucursal Oeste, La Chorrera', transportista: 'ExpressLog', tipoEnvio: 'Terrestre', peso: '2.1 kg', bultos: 1, fechaSalida: 'Anteayer', horaSalida: '11:00', estado: 'entregado', muelle: 'Muelle 2', operador: 'Luis F.', tracking: 'EXP-4526-TRK-006' },
  { id: 'DSP-007', orden: 'EXP-4527', destino: 'Cliente Corp, Costa del Este', transportista: 'FastDelivery', tipoEnvio: 'Terrestre', peso: '45.0 kg', bultos: 5, fechaSalida: 'Hoy', horaSalida: '09:00', estado: 'incidencia', muelle: 'Muelle 1', operador: 'María L.', tracking: 'EXP-4527-TRK-007' },
];

const FLUJO_DESPACHO = [
  { label: 'Recepción', href: '/recepcion', completado: true },
  { label: 'Inventario', href: '/inventario', completado: true },
  { label: 'Mapeo Bodega', href: '/mapeo-bodega', completado: true },
  { label: 'Picking', href: '/picking', completado: true },
  { label: 'Packing', href: '/packing', completado: true },
  { label: 'Despacho', href: '/despacho', completado: true },
];

const tipoEnvioIcon = {
  Terrestre: Truck,
  Aereo: Globe,
  Maritimo: Globe,
};

export default function DespachoPage() {
  const [filtroEstado, setFiltroEstado] = useState('todas');

  const filtrar = () => {
    if (filtroEstado === 'todas') return DESPACHOS_MOCK;
    if (filtroEstado === 'activas') return DESPACHOS_MOCK.filter(o => o.estado !== 'entregado');
    return DESPACHOS_MOCK.filter(o => o.estado === filtroEstado);
  };

  const items = filtrar();
  const hoy = DESPACHOS_MOCK.filter(o => o.fechaSalida === 'Hoy');

  return (
    <WmsLayout>
      <ModuleHeader
        titulo="Despacho"
        descripcion="Gestión de salidas, envíos, transportistas y documentación de despacho."
        icono={ArrowRightLeft}
        badge={{ texto: 'Centro logístico', variant: 'success' }}
        stats={[
          { label: 'Programados hoy', valor: String(hoy.length) },
          { label: 'En tránsito', valor: String(DESPACHOS_MOCK.filter(o => o.estado === 'en_transito').length) },
          { label: 'Entregados', valor: String(DESPACHOS_MOCK.filter(o => o.estado === 'entregado').length) },
        ]}
      />

      <FlowNavigator pasos={FLUJO_DESPACHO} pasoActual="/despacho" />

      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 my-3">
        {[
          { label: 'Pendientes', valor: String(DESPACHOS_MOCK.filter(o => o.estado === 'pendiente').length), icon: Package, color: 'text-slate-500', bg: 'bg-slate-500/10' },
          { label: 'Cargando', valor: String(DESPACHOS_MOCK.filter(o => o.estado === 'cargando').length), icon: Truck, color: 'text-amber-500', bg: 'bg-amber-500/10' },
          { label: 'En Tránsito', valor: String(DESPACHOS_MOCK.filter(o => o.estado === 'en_transito').length), icon: Globe, color: 'text-blue-500', bg: 'bg-blue-500/10' },
          { label: 'Entregados', valor: String(DESPACHOS_MOCK.filter(o => o.estado === 'entregado').length), icon: CheckCircle2, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
          { label: 'Incidencias', valor: String(DESPACHOS_MOCK.filter(o => o.estado === 'incidencia').length), icon: AlertCircle, color: 'text-red-500', bg: 'bg-red-500/10' },
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
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid gap-3 lg:grid-cols-[1fr_260px]">
        <div className="space-y-3">
          <Card>
            <CardContent className="p-2.5">
              <div className="flex flex-col sm:flex-row gap-2 items-start sm:items-center justify-between mb-2">
                <div className="relative w-full sm:w-72">
                  <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                  <Input placeholder="Buscar despacho, tracking..." className="pl-8 h-8 text-[11px]" />
                </div>
                <div className="flex gap-1.5 w-full sm:w-auto">
                  <Button variant="outline" size="sm" className="h-7 text-[10px] gap-1 px-2"><Filter className="h-3 w-3" /> Filtros</Button>
                  <Button size="sm" className="h-7 text-[10px] gap-1 px-2"><Plus className="h-3 w-3" /> Nuevo Despacho</Button>
                </div>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {['todas', 'pendiente', 'cargando', 'en_transito', 'entregado', 'incidencia'].map(est => (
                  <button key={est} onClick={() => setFiltroEstado(est)}
                    className={cn('rounded-full px-2 py-0.5 text-[9px] font-medium transition-all border',
                      filtroEstado === est ? 'bg-primary text-primary-foreground border-primary' : 'bg-card text-muted-foreground border-border hover:border-primary/30'
                    )}
                  >
                    {est === 'todas' ? 'Todas' : est === 'en_transito' ? 'En Tránsito' : est.charAt(0).toUpperCase() + est.slice(1)}
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <ScrollArea className="h-[420px]">
              <div className="p-1 space-y-1">
                {items.map((despacho, idx) => {
                  const TipoIcon = tipoEnvioIcon[despacho.tipoEnvio] || Truck;
                  return (
                    <motion.div key={despacho.id} initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.15, delay: idx * 0.02 }}
                      className="flex items-start gap-2.5 rounded-lg border p-2.5 transition-all hover:bg-accent/20 cursor-pointer"
                    >
                      <div className={cn(
                        'flex h-8 w-8 items-center justify-center rounded-lg shrink-0',
                        despacho.estado === 'pendiente' && 'bg-slate-500/10 text-slate-500',
                        despacho.estado === 'cargando' && 'bg-amber-500/10 text-amber-500',
                        despacho.estado === 'en_transito' && 'bg-blue-500/10 text-blue-500',
                        despacho.estado === 'entregado' && 'bg-emerald-500/10 text-emerald-500',
                        despacho.estado === 'incidencia' && 'bg-red-500/10 text-red-500',
                      )}>
                        {despacho.estado === 'entregado' ? <CheckCircle2 className="h-4 w-4" /> : <Truck className="h-4 w-4" />}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="text-[11px] font-semibold">{despacho.id}</span>
                          <StatusBadge estado={despacho.estado} dot={false} />
                          <Badge variant="outline" className="text-[8px] h-3.5 px-1 border-0">{despacho.tipoEnvio}</Badge>
                        </div>
                        <p className="text-[10px] font-medium mt-0.5 truncate">{despacho.destino}</p>
                        <div className="flex items-center gap-2 mt-0.5 text-[9px] text-muted-foreground flex-wrap">
                          <span className="flex items-center gap-1"><Truck className="h-2.5 w-2.5" /> {despacho.transportista}</span>
                          <span>•</span>
                          <span>{despacho.peso} • {despacho.bultos} bultos</span>
                        </div>
                        <div className="flex items-center gap-2 mt-0.5 text-[9px] text-muted-foreground">
                          <Calendar className="h-2.5 w-2.5" />
                          <span>{despacho.fechaSalida} {despacho.horaSalida}</span>
                          <span>•</span>
                          <span>{despacho.muelle}</span>
                          <span>•</span>
                          <span className="font-mono">{despacho.tracking}</span>
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

        <div className="space-y-3">
          <Card>
            <CardHeader className="p-3 pb-2">
              <CardTitle className="text-xs flex items-center gap-1.5"><Calendar className="h-3 w-3 text-primary" /> Despachos Hoy</CardTitle>
            </CardHeader>
            <CardContent className="p-3 pt-0 space-y-2">
              {hoy.map(d => (
                <div key={d.id} className="flex items-center justify-between text-[10px] p-1.5 rounded-lg border border-border/50">
                  <div>
                    <p className="font-medium">{d.id}</p>
                    <p className="text-[9px] text-muted-foreground">{d.horaSalida} • {d.muelle}</p>
                  </div>
                  <StatusBadge estado={d.estado} dot={false} />
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="p-3 pb-2">
              <CardTitle className="text-xs flex items-center gap-1.5"><FileText className="h-3 w-3 text-primary" /> Documentación</CardTitle>
            </CardHeader>
            <CardContent className="p-3 pt-0 space-y-1.5">
              <Button variant="outline" size="sm" className="w-full h-7 text-[10px] gap-1.5 justify-start px-2"><Download className="h-3 w-3" /> Guías de remisión</Button>
              <Button variant="outline" size="sm" className="w-full h-7 text-[10px] gap-1.5 justify-start px-2"><Download className="h-3 w-3" /> Manifiesto de carga</Button>
              <Button variant="outline" size="sm" className="w-full h-7 text-[10px] gap-1.5 justify-start px-2"><Download className="h-3 w-3" /> Etiquetas de envío</Button>
            </CardContent>
          </Card>

          <Card className="bg-muted/10 border-dashed border-border/50">
            <CardContent className="p-2.5">
              <div className="flex items-start gap-1.5 text-[9px] text-muted-foreground">
                <Globe className="h-2.5 w-2.5 mt-0.5 shrink-0" />
                <div>
                  <p className="font-medium text-foreground mb-0.5">Tracking simulado</p>
                  <p>La integración con APIs de tracking en tiempo real estará disponible próximamente.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </WmsLayout>
  );
}