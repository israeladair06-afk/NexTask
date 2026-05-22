'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Truck, Search, Filter, Plus, Clock,
  Package, User, CheckCircle2, AlertCircle, ChevronRight,
  FileUp, Download, ScanLine, Warehouse,
  Building2, Calendar, Weight, BarChart3, TrendingUp,
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

interface LoteRecepcion {
  id: string;
  proveedor: string;
  productos: number;
  skus: number;
  peso: string;
  estado: 'programado' | 'en_curso' | 'completado' | 'incidencia';
  muelle: string;
  operador: string;
  hora: string;
  nota?: string;
}

const RECEPCIONES_MOCK: LoteRecepcion[] = [
  { id: 'RCP-001', proveedor: 'Distribuidora Industrial S.A.', productos: 120, skus: 15, peso: '450 kg', estado: 'en_curso', muelle: 'Muelle 1', operador: 'Carlos M.', hora: '08:30 - 10:15', nota: 'Verificar integridad de embalajes' },
  { id: 'RCP-002', proveedor: 'Suministros Logísticos Pana', productos: 48, skus: 8, peso: '120 kg', estado: 'programado', muelle: 'Muelle 2', operador: 'María L.', hora: '10:00 - 12:00' },
  { id: 'RCP-003', proveedor: 'Corporación de Insumos Global', productos: 200, skus: 25, peso: '890 kg', estado: 'programado', muelle: 'Muelle 1', operador: 'Pedro R.', hora: '13:00 - 16:00' },
  { id: 'RCP-004', proveedor: 'Comercial del Istmo S.A.', productos: 36, skus: 5, peso: '68 kg', estado: 'completado', muelle: 'Muelle 3', operador: 'Ana G.', hora: '07:00 - 08:45' },
  { id: 'RCP-005', proveedor: 'Almacenes Unidos del Pacífico', productos: 84, skus: 12, peso: '320 kg', estado: 'en_curso', muelle: 'Muelle 2', operador: 'Luis F.', hora: '09:30 - 11:20', nota: 'Documentación pendiente de aduana' },
  { id: 'RCP-006', proveedor: 'Importaciones y Exportaciones ZL', productos: 60, skus: 10, peso: '210 kg', estado: 'incidencia', muelle: 'Muelle 4', operador: 'Carlos M.', hora: '11:00 - 12:30', nota: 'Producto dañado en tránsito - revisión requerida' },
  { id: 'RCP-007', proveedor: 'Proveedora Logística del Sur', productos: 150, skus: 20, peso: '560 kg', estado: 'programado', muelle: 'Muelle 1', operador: 'María L.', hora: '14:00 - 17:00' },
];

const FLUJO_RECEPCION = [
  { label: 'Recepción', href: '/recepcion', completado: true },
  { label: 'Inventario', href: '/inventario', completado: false },
  { label: 'Mapeo Bodega', href: '/mapeo-bodega', completado: false },
  { label: 'Picking', href: '/picking', completado: false },
  { label: 'Packing', href: '/packing', completado: false },
  { label: 'Despacho', href: '/despacho', completado: false },
];

export default function RecepcionPage() {
  const [filtroEstado, setFiltroEstado] = useState('todas');
  const [loteSeleccionado, setLoteSeleccionado] = useState<string | null>(null);

  const itemsFiltrados = useMemo(() => {
    if (filtroEstado === 'todas') return RECEPCIONES_MOCK;
    return RECEPCIONES_MOCK.filter(l => l.estado === filtroEstado);
  }, [filtroEstado]);

  const stats = useMemo(() => ({
    programados: RECEPCIONES_MOCK.filter(l => l.estado === 'programado').length,
    enCurso: RECEPCIONES_MOCK.filter(l => l.estado === 'en_curso').length,
    completados: RECEPCIONES_MOCK.filter(l => l.estado === 'completado').length,
    totalProductos: RECEPCIONES_MOCK.reduce((acc, l) => acc + l.productos, 0),
  }), []);

  const pesoTotal = RECEPCIONES_MOCK.reduce((acc, l) => acc + parseInt(l.peso), 0);

  return (
    <WmsLayout>
      <ModuleHeader
        titulo="Recepción"
        descripcion="Recepción de mercancía, validación de ingreso y registro de proveedores."
        icono={Truck}
        badge={{ texto: 'Tiempo real', variant: 'success' }}
        stats={[
          { label: 'Programados', valor: String(stats.programados) },
          { label: 'En curso', valor: String(stats.enCurso) },
          { label: 'Hoy', valor: `${stats.completados} completados` },
        ]}
      />

      <FlowNavigator pasos={FLUJO_RECEPCION} pasoActual="/recepcion" />

      {/* KPIs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 my-3">
        {[
          { label: 'Programados', valor: String(stats.programados), icon: Calendar, color: 'text-slate-500', bg: 'bg-slate-500/10', desc: 'Por recibir' },
          { label: 'En Curso', valor: String(stats.enCurso), icon: Truck, color: 'text-amber-500', bg: 'bg-amber-500/10', desc: 'Recibiendo ahora' },
          { label: 'Productos', valor: String(stats.totalProductos), icon: Package, color: 'text-blue-500', bg: 'bg-blue-500/10', desc: 'Unidades totales' },
          { label: 'Peso Total', valor: `${(pesoTotal / 1000).toFixed(1)}T`, icon: Weight, color: 'text-emerald-500', bg: 'bg-emerald-500/10', desc: 'Mercancía recibida' },
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
        {/* Lista principal */}
        <div className="space-y-3">
          <Card>
            <CardContent className="p-2.5">
              <div className="flex flex-col sm:flex-row gap-2 items-start sm:items-center justify-between mb-2">
                <div className="relative w-full sm:w-72">
                  <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                  <Input placeholder="Buscar recepción, proveedor..." className="pl-8 h-8 text-[11px]" />
                </div>
                <div className="flex gap-1.5 w-full sm:w-auto">
                  <Button variant="outline" size="sm" className="h-7 text-[10px] gap-1 px-2"><Filter className="h-3 w-3" /> Filtros</Button>
                  <Button size="sm" className="h-7 text-[10px] gap-1 px-2"><Plus className="h-3 w-3" /> Nueva Recepción</Button>
                </div>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {['todas', 'programado', 'en_curso', 'completado', 'incidencia'].map(est => (
                  <button key={est} onClick={() => setFiltroEstado(est)}
                    className={cn('rounded-full px-2 py-0.5 text-[9px] font-medium transition-all border',
                      filtroEstado === est ? 'bg-primary text-primary-foreground border-primary' : 'bg-card text-muted-foreground border-border hover:border-primary/30'
                    )}
                  >
                    {est === 'todas' ? 'Todas' : est === 'en_curso' ? 'En Curso' : est.charAt(0).toUpperCase() + est.slice(1)}
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <div className="flex items-center justify-between px-3 pt-2.5 pb-1">
              <span className="text-[10px] font-semibold text-muted-foreground">Recepciones ({itemsFiltrados.length})</span>
              <div className="flex items-center gap-2 text-[8px] text-muted-foreground">
                <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-emerald-500" /> {stats.completados} completados</span>
                <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-amber-500" /> {stats.enCurso} en curso</span>
              </div>
            </div>
            <ScrollArea className="h-[460px]">
              <div className="p-1 space-y-1">
                {itemsFiltrados.map((lote, idx) => (
                  <motion.div
                    key={lote.id}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.15, delay: idx * 0.02 }}
                    onClick={() => setLoteSeleccionado(loteSeleccionado === lote.id ? null : lote.id)}
                    className={cn(
                      'rounded-lg border p-2.5 transition-all cursor-pointer',
                      loteSeleccionado === lote.id ? 'border-primary/40 bg-primary/5' : 'hover:bg-accent/20 border-border/50'
                    )}
                  >
                    <div className="flex items-start gap-2.5">
                      <div className={cn(
                        'flex h-9 w-9 items-center justify-center rounded-xl shrink-0',
                        lote.estado === 'programado' && 'bg-slate-500/10 text-slate-500',
                        lote.estado === 'en_curso' && 'bg-amber-500/10 text-amber-500',
                        lote.estado === 'completado' && 'bg-emerald-500/10 text-emerald-500',
                        lote.estado === 'incidencia' && 'bg-red-500/10 text-red-500',
                      )}>
                        {lote.estado === 'completado' ? <CheckCircle2 className="h-4 w-4" /> : <Package className="h-4 w-4" />}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="text-[11px] font-semibold">{lote.id}</span>
                          <StatusBadge estado={lote.estado} dot={false} />
                          {lote.estado === 'incidencia' && (
                            <Badge variant="destructive" className="text-[8px] h-3.5 px-1">Alerta</Badge>
                          )}
                        </div>
                        <p className="text-[11px] font-medium mt-0.5">{lote.proveedor}</p>
                        <div className="flex items-center gap-2 mt-0.5 text-[9px] text-muted-foreground flex-wrap">
                          <span><Package className="h-2.5 w-2.5 inline" /> {lote.productos} productos</span>
                          <span>•</span>
                          <span>{lote.skus} SKUs</span>
                          <span>•</span>
                          <span><Weight className="h-2.5 w-2.5 inline" /> {lote.peso}</span>
                          <span>•</span>
                          <span>{lote.hora}</span>
                        </div>
                        <div className="flex items-center gap-2 mt-0.5 text-[9px] text-muted-foreground">
                          <Building2 className="h-2.5 w-2.5" />
                          <span>{lote.muelle}</span>
                          <span>•</span>
                          <User className="h-2.5 w-2.5" />
                          <span>{lote.operador}</span>
                        </div>
                      </div>

                      <ChevronRight className={cn(
                        'h-3 w-3 text-muted-foreground shrink-0 mt-2 transition-transform',
                        loteSeleccionado === lote.id ? 'rotate-90' : ''
                      )} />
                    </div>

                    {loteSeleccionado === lote.id && lote.nota && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="mt-2 pt-2 border-t border-border/30"
                      >
                        <div className="flex items-start gap-1.5 text-[9px] text-muted-foreground bg-amber-500/5 rounded-lg p-2">
                          <AlertCircle className="h-3 w-3 text-amber-500 mt-0.5 shrink-0" />
                          <p>{lote.nota}</p>
                        </div>
                      </motion.div>
                    )}
                  </motion.div>
                ))}
              </div>
            </ScrollArea>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-3">
          <Card>
            <CardHeader className="p-3 pb-2">
              <CardTitle className="text-xs flex items-center gap-1.5">
                <Calendar className="h-3 w-3 text-primary" />
                Recepciones Hoy
              </CardTitle>
            </CardHeader>
            <CardContent className="p-3 pt-0 space-y-1.5">
              {RECEPCIONES_MOCK.filter(l => l.estado !== 'completado').slice(0, 4).map(l => (
                <div key={l.id} className="flex items-center justify-between text-[10px] p-1.5 rounded-lg border border-border/50">
                  <div className="min-w-0">
                    <p className="font-medium truncate">{l.id}</p>
                    <p className="text-[8px] text-muted-foreground">{l.muelle} • {l.hora.split(' - ')[0]}</p>
                  </div>
                  <StatusBadge estado={l.estado} dot={false} />
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Proveedores destacados */}
          <Card>
            <CardHeader className="p-3 pb-2">
              <CardTitle className="text-xs flex items-center gap-1.5">
                <Building2 className="h-3 w-3 text-primary" />
                Proveedores
              </CardTitle>
            </CardHeader>
            <CardContent className="p-3 pt-0 space-y-1.5 text-[10px]">
              {['Distribuidora Industrial S.A.', 'Suministros Logísticos Pana', 'Corporación de Insumos Global'].map((prov, i) => (
                <div key={prov} className="flex items-center gap-2 p-1 rounded-lg hover:bg-accent/20">
                  <div className={cn(
                    'flex h-6 w-6 items-center justify-center rounded-full text-[8px] font-bold text-white',
                    i === 0 ? 'bg-violet-500' : i === 1 ? 'bg-blue-500' : 'bg-emerald-500'
                  )}>
                    {prov.split(' ')[0][0]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{prov}</p>
                    <p className="text-[8px] text-muted-foreground">{[3, 2, 1][i]} recepciones hoy</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Resumen rápido */}
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
                  <p className="text-sm font-bold text-amber-500">{stats.enCurso}</p>
                  <p className="text-[8px] text-muted-foreground">En curso</p>
                </div>
                <div className="rounded-lg bg-card/60 p-1.5 text-center border border-border/30">
                  <p className="text-sm font-bold text-blue-500">{stats.totalProductos}</p>
                  <p className="text-[8px] text-muted-foreground">Productos</p>
                </div>
                <div className="rounded-lg bg-card/60 p-1.5 text-center border border-border/30">
                  <p className="text-sm font-bold text-violet-500">{RECEPCIONES_MOCK.filter(l => l.estado === 'incidencia').length}</p>
                  <p className="text-[8px] text-muted-foreground">Incidencias</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-muted/10 border-dashed border-border/50">
            <CardContent className="p-2.5">
              <div className="flex items-start gap-1.5 text-[9px] text-muted-foreground">
                <ScanLine className="h-2.5 w-2.5 mt-0.5 shrink-0" />
                <div>
                  <p className="font-medium text-foreground mb-0.5">Escaneo de recepción</p>
                  <p>Use el escáner para validar el ingreso de productos por código de barras.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </WmsLayout>
  );
}