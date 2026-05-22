'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowRightLeft, Search, Filter, Plus, Truck,
  CheckCircle2, AlertCircle, ChevronRight, Package,
  Calendar, Globe, Download, FileText, MapPin,
  Clock, Weight, Boxes, Phone, User, TrendingUp,
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
  contacto?: string;
  valor?: string;
}

const DESPACHOS_MOCK: DespachoOrden[] = [
  { id: 'DSP-001', orden: 'EXP-4521', destino: 'Sucursal Norte, Ciudad de Panamá', transportista: 'ExpressLog', tipoEnvio: 'Terrestre', peso: '12.5 kg', bultos: 2, fechaSalida: 'Hoy', horaSalida: '14:00', estado: 'cargando', muelle: 'Muelle 1', operador: 'Carlos M.', tracking: 'EXP-4521-TRK-001', contacto: '+507 6000-1122', valor: '$1,250' },
  { id: 'DSP-002', orden: 'EXP-4522', destino: 'Bodega Central, Colón', transportista: 'CargaPacífico', tipoEnvio: 'Terrestre', peso: '3.2 kg', bultos: 1, fechaSalida: 'Hoy', horaSalida: '16:00', estado: 'pendiente', muelle: 'Muelle 2', operador: 'María L.', tracking: 'EXP-4522-TRK-002', valor: '$420' },
  { id: 'DSP-003', orden: 'EXP-4523', destino: 'Cliente VIP, Zona Libre', transportista: 'AirCargo', tipoEnvio: 'Aereo', peso: '8.7 kg', bultos: 1, fechaSalida: 'Hoy', horaSalida: '18:00', estado: 'pendiente', muelle: 'Muelle 3', operador: 'Pedro R.', tracking: 'EXP-4523-TRK-003', valor: '$2,890' },
  { id: 'DSP-004', orden: 'EXP-4524', destino: 'Distribuidora del Sur, David', transportista: 'PanamáLog', tipoEnvio: 'Terrestre', peso: '15.0 kg', bultos: 3, fechaSalida: 'Ayer', horaSalida: '10:00', estado: 'en_transito', muelle: 'Muelle 1', operador: 'Ana G.', tracking: 'EXP-4524-TRK-004', valor: '$1,100' },
  { id: 'DSP-005', orden: 'EXP-4525', destino: 'Puerto de Balboa — Exportación', transportista: 'OceanicLines', tipoEnvio: 'Maritimo', peso: '22.0 kg', bultos: 1, fechaSalida: 'Ayer', horaSalida: '08:00', estado: 'en_transito', muelle: 'Muelle 4', operador: 'Carlos M.', tracking: 'EXP-4525-TRK-005', valor: '$5,200' },
  { id: 'DSP-006', orden: 'EXP-4526', destino: 'Sucursal Oeste, La Chorrera', transportista: 'ExpressLog', tipoEnvio: 'Terrestre', peso: '2.1 kg', bultos: 1, fechaSalida: 'Anteayer', horaSalida: '11:00', estado: 'entregado', muelle: 'Muelle 2', operador: 'Luis F.', tracking: 'EXP-4526-TRK-006', valor: '$310' },
  { id: 'DSP-007', orden: 'EXP-4527', destino: 'Cliente Corp, Costa del Este', transportista: 'FastDelivery', tipoEnvio: 'Terrestre', peso: '45.0 kg', bultos: 5, fechaSalida: 'Hoy', horaSalida: '09:00', estado: 'incidencia', muelle: 'Muelle 1', operador: 'María L.', tracking: 'EXP-4527-TRK-007', valor: '$3,450' },
  { id: 'DSP-008', orden: 'EXP-4528', destino: 'Centro Logístico Oeste', transportista: 'CargaRápida', tipoEnvio: 'Terrestre', peso: '6.8 kg', bultos: 2, fechaSalida: 'Mañana', horaSalida: '09:00', estado: 'pendiente', muelle: 'Muelle 2', operador: 'Pedro R.', tracking: 'EXP-4528-TRK-008', valor: '$890' },
];

const FLUJO_DESPACHO = [
  { label: 'Recepción', href: '/recepcion', completado: true },
  { label: 'Inventario', href: '/inventario', completado: true },
  { label: 'Mapeo Bodega', href: '/mapeo-bodega', completado: true },
  { label: 'Picking', href: '/picking', completado: true },
  { label: 'Packing', href: '/packing', completado: true },
  { label: 'Despacho', href: '/despacho', completado: true },
];

export default function DespachoPage() {
  const [filtroEstado, setFiltroEstado] = useState('todas');
  const [seleccionado, setSeleccionado] = useState<string | null>(null);

  const items = useMemo(() => {
    if (filtroEstado === 'todas') return DESPACHOS_MOCK;
    if (filtroEstado === 'activas') return DESPACHOS_MOCK.filter(o => o.estado !== 'entregado');
    return DESPACHOS_MOCK.filter(o => o.estado === filtroEstado);
  }, [filtroEstado]);

  const hoy = DESPACHOS_MOCK.filter(o => o.fechaSalida === 'Hoy');
  const enTransito = DESPACHOS_MOCK.filter(o => o.estado === 'en_transito');
  const ingresosHoy = DESPACHOS_MOCK.filter(o => o.fechaSalida === 'Hoy').reduce((acc, o) => acc + parseFloat(o.peso.replace(' kg', '')), 0);
  const valorTotalHoy = DESPACHOS_MOCK.filter(o => o.fechaSalida === 'Hoy').reduce((acc, o) => acc + parseInt(o.valor?.replace(/[$,]/g, '') ?? '0'), 0);

  const getStatusColor = (estado: string) => {
    const map: Record<string, string> = {
      pendiente: 'bg-slate-500/10 text-slate-500',
      cargando: 'bg-amber-500/10 text-amber-500',
      en_transito: 'bg-blue-500/10 text-blue-500',
      entregado: 'bg-emerald-500/10 text-emerald-500',
      incidencia: 'bg-red-500/10 text-red-500',
    };
    return map[estado] || map.pendiente;
  };

  return (
    <WmsLayout>
      <ModuleHeader
        titulo="Despacho"
        descripcion="Gestión de salidas, envíos, transportistas y documentación de despacho."
        icono={ArrowRightLeft}
        badge={{ texto: 'Centro logístico', variant: 'success' }}
        stats={[
          { label: 'Programados hoy', valor: String(hoy.length) },
          { label: 'En tránsito', valor: String(enTransito.length) },
          { label: 'Entregados', valor: String(DESPACHOS_MOCK.filter(o => o.estado === 'entregado').length) },
        ]}
      />

      <FlowNavigator pasos={FLUJO_DESPACHO} pasoActual="/despacho" />

      {/* ── KPIs mejorados ── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 my-3">
        {[
          { label: 'Pendientes', valor: String(DESPACHOS_MOCK.filter(o => o.estado === 'pendiente').length), icon: Package, color: 'text-slate-500', bg: 'bg-slate-500/10', desc: 'Por despachar' },
          { label: 'Cargando', valor: String(DESPACHOS_MOCK.filter(o => o.estado === 'cargando').length), icon: Truck, color: 'text-amber-500', bg: 'bg-amber-500/10', desc: 'En preparación' },
          { label: 'En Tránsito', valor: String(enTransito.length), icon: Globe, color: 'text-blue-500', bg: 'bg-blue-500/10', desc: 'En ruta' },
          { label: 'Hoy: ${ingresosHoy} kg', valor: `$${(valorTotalHoy / 1000).toFixed(1)}K`, icon: TrendingUp, color: 'text-emerald-500', bg: 'bg-emerald-500/10', desc: 'Valor total' },
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
        {/* ── Lista principal ── */}
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
            <div className="flex items-center justify-between px-3 pt-2.5 pb-1">
              <span className="text-[10px] font-semibold text-muted-foreground">Órdenes de Despacho ({items.length})</span>
              <div className="flex items-center gap-2">
                <span className="flex items-center gap-1 text-[8px] text-muted-foreground">
                  <span className="h-2 w-2 rounded-full bg-emerald-500" /> {DESPACHOS_MOCK.filter(o => o.estado === 'entregado').length} entregados
                </span>
                <span className="flex items-center gap-1 text-[8px] text-muted-foreground">
                  <span className="h-2 w-2 rounded-full bg-amber-500" /> {DESPACHOS_MOCK.filter(o => o.estado !== 'entregado').length} activos
                </span>
              </div>
            </div>
            <ScrollArea className="h-[440px]">
              <div className="p-1 space-y-1">
                {items.map((despacho, idx) => (
                  <motion.div
                    key={despacho.id}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.15, delay: idx * 0.02 }}
                    onClick={() => setSeleccionado(seleccionado === despacho.id ? null : despacho.id)}
                    className={cn(
                      'rounded-lg border p-2.5 transition-all cursor-pointer',
                      seleccionado === despacho.id ? 'border-primary/40 bg-primary/5' : 'hover:bg-accent/20 border-border/50'
                    )}
                  >
                    <div className="flex items-start gap-2.5">
                      <div className={cn('flex h-8 w-8 items-center justify-center rounded-lg shrink-0', getStatusColor(despacho.estado))}>
                        {despacho.estado === 'entregado' ? <CheckCircle2 className="h-4 w-4" /> : <Package className="h-4 w-4" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="text-[11px] font-semibold">{despacho.id}</span>
                          <StatusBadge estado={despacho.estado} dot={false} />
                          <Badge variant="outline" className="text-[8px] h-3.5 px-1">{despacho.tipoEnvio}</Badge>
                          {despacho.estado === 'en_transito' && (
                            <span className="flex items-center gap-0.5 text-[8px] text-blue-500">
                              <Clock className="h-2.5 w-2.5" /> Tracking activo
                            </span>
                          )}
                        </div>
                        <p className="text-[10px] font-medium mt-0.5 truncate">{despacho.destino}</p>
                        <div className="flex items-center gap-2 mt-0.5 text-[9px] text-muted-foreground flex-wrap">
                          <span className="flex items-center gap-1"><Truck className="h-2.5 w-2.5" /> {despacho.transportista}</span>
                          <span>•</span>
                          <span><Weight className="h-2.5 w-2.5 inline" /> {despacho.peso}</span>
                          <span>•</span>
                          <span><Boxes className="h-2.5 w-2.5 inline" /> {despacho.bultos} bultos</span>
                          {despacho.valor && (
                            <>
                              <span>•</span>
                              <span className="font-semibold text-foreground/60">{despacho.valor}</span>
                            </>
                          )}
                        </div>
                        <div className="flex items-center gap-2 mt-0.5 text-[9px] text-muted-foreground">
                          <MapPin className="h-2.5 w-2.5" />
                          <span>{despacho.muelle}</span>
                          <span>•</span>
                          <Calendar className="h-2.5 w-2.5" />
                          <span>{despacho.horaSalida}</span>
                          <span>•</span>
                          <span className="font-mono text-[8px]">{despacho.tracking}</span>
                        </div>
                      </div>
                      <ChevronRight className={cn(
                        'h-3 w-3 text-muted-foreground shrink-0 mt-2 transition-transform',
                        seleccionado === despacho.id ? 'rotate-90' : ''
                      )} />
                    </div>

                    {/* Expandir detalle */}
                    {seleccionado === despacho.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="mt-2 pt-2 border-t border-border/30"
                      >
                        <div className="grid grid-cols-2 gap-2 text-[9px]">
                          <div>
                            <span className="text-muted-foreground">Operador:</span>
                            <p className="font-medium flex items-center gap-1"><User className="h-2.5 w-2.5" /> {despacho.operador}</p>
                          </div>
                          {despacho.contacto && (
                            <div>
                              <span className="text-muted-foreground">Contacto:</span>
                              <p className="font-medium flex items-center gap-1"><Phone className="h-2.5 w-2.5" /> {despacho.contacto}</p>
                            </div>
                          )}
                          <div className="col-span-2">
                            <span className="text-muted-foreground">Tracking:</span>
                            <p className="font-mono text-[8px]">{despacho.tracking}</p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </motion.div>
                ))}
              </div>
            </ScrollArea>
          </Card>
        </div>

        {/* ── Sidebar ── */}
        <div className="space-y-3">
          {/* Despachos de hoy */}
          <Card>
            <CardHeader className="p-3 pb-2">
              <CardTitle className="text-xs flex items-center gap-1.5">
                <Calendar className="h-3 w-3 text-primary" />
                Hoy
                <Badge variant="secondary" className="text-[8px] h-3.5 px-1 ml-auto">{hoy.length}</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-3 pt-0 space-y-1.5">
              {hoy.length === 0 ? (
                <p className="text-[9px] text-muted-foreground text-center py-4">Sin despachos programados hoy</p>
              ) : (
                hoy.map(d => (
                  <div key={d.id} className="flex items-center justify-between text-[10px] p-1.5 rounded-lg border border-border/50">
                    <div className="min-w-0">
                      <p className="font-medium truncate">{d.id}</p>
                      <p className="text-[8px] text-muted-foreground">{d.horaSalida} • {d.muelle}</p>
                    </div>
                    <StatusBadge estado={d.estado} dot={false} />
                  </div>
                ))
              )}
            </CardContent>
          </Card>

          {/* Estadísticas rápidas */}
          <Card className="bg-gradient-to-br from-primary/5 via-transparent to-transparent border-primary/10">
            <CardContent className="p-3 space-y-2">
              <div className="flex items-center gap-1.5 text-[10px] font-medium">
                <TrendingUp className="h-3 w-3 text-primary" />
                Resumen del Día
              </div>
              <div className="grid grid-cols-2 gap-1.5">
                <div className="rounded-lg bg-card/60 p-1.5 text-center border border-border/30">
                  <p className="text-sm font-bold text-emerald-500">{DESPACHOS_MOCK.filter(o => o.estado === 'entregado').length}</p>
                  <p className="text-[8px] text-muted-foreground">Entregados</p>
                </div>
                <div className="rounded-lg bg-card/60 p-1.5 text-center border border-border/30">
                  <p className="text-sm font-bold text-amber-500">{DESPACHOS_MOCK.filter(o => o.estado === 'cargando').length}</p>
                  <p className="text-[8px] text-muted-foreground">Cargando</p>
                </div>
                <div className="rounded-lg bg-card/60 p-1.5 text-center border border-border/30">
                  <p className="text-sm font-bold text-blue-500">{ingresosHoy} kg</p>
                  <p className="text-[8px] text-muted-foreground">Peso total</p>
                </div>
                <div className="rounded-lg bg-card/60 p-1.5 text-center border border-border/30">
                  <p className="text-sm font-bold text-violet-500">${(valorTotalHoy / 1000).toFixed(1)}K</p>
                  <p className="text-[8px] text-muted-foreground">Valor total</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Documentación */}
          <Card>
            <CardHeader className="p-3 pb-2">
              <CardTitle className="text-xs flex items-center gap-1.5">
                <FileText className="h-3 w-3 text-primary" />
                Documentación
              </CardTitle>
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
                  <p className="font-medium text-foreground mb-0.5">Tracking en tiempo real</p>
                  <p>La integración con APIs de tracking estará disponible próximamente.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </WmsLayout>
  );
}