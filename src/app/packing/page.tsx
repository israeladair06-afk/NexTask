'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Boxes, Search, Filter, Plus, Clock, CheckCircle2,
  Scale, Ruler, Printer, QrCode, Barcode, Package,
  CheckSquare, AlertCircle, ChevronRight, ScanLine,
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
   Mock data — Packing
   TODO: Backend endpoint for packing operations
   TODO: Printing integration for labels, QR, barcodes
   ─────────────────────────────────────── */

interface OrdenPacking {
  id: string;
  orden: string;
  producto: string;
  sku: string;
  cantidad: number;
  peso: string;
  dimensiones: string;
  tipoEmbalaje: string;
  estado: 'pendiente' | 'en_curso' | 'verificado' | 'completado';
  operador: string;
  notas: string;
}

const ORDENES_PACKING: OrdenPacking[] = [
  { id: 'PCK-001', orden: 'EXP-4521', producto: 'Caja Tornillos M8 x 100', sku: 'SKU-8842', cantidad: 48, peso: '12.5 kg', dimensiones: '40x30x25 cm', tipoEmbalaje: 'Caja de cartón', estado: 'verificado', operador: 'María L.', notas: '' },
  { id: 'PCK-002', orden: 'EXP-4522', producto: 'Sensor Temperatura T200', sku: 'SKU-2391', cantidad: 12, peso: '3.2 kg', dimensiones: '30x20x15 cm', tipoEmbalaje: 'Caja con protección', estado: 'completado', operador: 'Carlos M.', notas: 'Empaque con burbuja' },
  { id: 'PCK-003', orden: 'EXP-4523', producto: 'Kit Juntas Hidráulicas', sku: 'SKU-5610', cantidad: 24, peso: '8.7 kg', dimensiones: '50x30x20 cm', tipoEmbalaje: 'Caja reforzada', estado: 'en_curso', operador: 'Pedro R.', notas: '' },
  { id: 'PCK-004', orden: 'EXP-4524', producto: 'Rodamiento SKF 6205', sku: 'SKU-7734', cantidad: 60, peso: '15.0 kg', dimensiones: '60x40x30 cm', tipoEmbalaje: 'Caja industrial', estado: 'pendiente', operador: '—', notas: 'Requiere material antiestático' },
  { id: 'PCK-005', orden: 'EXP-4525', producto: 'Filtro Aceite F-450', sku: 'SKU-1209', cantidad: 36, peso: '22.0 kg', dimensiones: '80x40x35 cm', tipoEmbalaje: 'Pallet', estado: 'pendiente', operador: '—', notas: '' },
  { id: 'PCK-006', orden: 'EXP-4526', producto: 'Válvula Solenoide 24V', sku: 'SKU-3312', cantidad: 8, peso: '2.1 kg', dimensiones: '25x15x12 cm', tipoEmbalaje: 'Caja pequeña', estado: 'completado', operador: 'Ana G.', notas: '' },
];

const FLUJO_PACKING = [
  { label: 'Recepción', href: '/recepcion', completado: true },
  { label: 'Inventario', href: '/inventario', completado: true },
  { label: 'Mapeo Bodega', href: '/mapeo-bodega', completado: true },
  { label: 'Picking', href: '/picking', completado: true },
  { label: 'Packing', href: '/packing', completado: true },
  { label: 'Despacho', href: '/despacho' },
];

const TIPOS_EMBALAJE = ['Caja de cartón', 'Caja reforzada', 'Pallet', 'Sobre acolchado', 'Caja industrial', 'Tambor'];

export default function PackingPage() {
  const [filtroEstado, setFiltroEstado] = useState('todas');

  const filtrar = () => {
    if (filtroEstado === 'todas') return ORDENES_PACKING;
    if (filtroEstado === 'activas') return ORDENES_PACKING.filter(o => o.estado !== 'completado');
    return ORDENES_PACKING.filter(o => o.estado === filtroEstado);
  };

  const items = filtrar();

  const stats = {
    pendientes: ORDENES_PACKING.filter(o => o.estado === 'pendiente').length,
    enCurso: ORDENES_PACKING.filter(o => o.estado === 'en_curso').length,
    completados: ORDENES_PACKING.filter(o => o.estado === 'completado').length,
    verificados: ORDENES_PACKING.filter(o => o.estado === 'verificado').length,
  };

  return (
    <WmsLayout>
      <ModuleHeader
        titulo="Packing"
        descripcion="Empaque, embalaje, verificación de peso y dimensiones para envío."
        icono={Boxes}
        badge={{ texto: 'Estación activa', variant: 'success' }}
        stats={[
          { label: 'Pendientes', valor: String(stats.pendientes) },
          { label: 'En curso', valor: String(stats.enCurso) },
          { label: 'Verificados', valor: String(stats.verificados) },
        ]}
      />

      <FlowNavigator pasos={FLUJO_PACKING} pasoActual="/packing" />

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 my-3">
        {[
          { label: 'Por Empaquetar', valor: String(stats.pendientes), icon: Package, color: 'text-slate-500', bg: 'bg-slate-500/10' },
          { label: 'En Empaque', valor: String(stats.enCurso), icon: Boxes, color: 'text-amber-500', bg: 'bg-amber-500/10' },
          { label: 'Verificados', valor: String(stats.verificados), icon: CheckSquare, color: 'text-blue-500', bg: 'bg-blue-500/10' },
          { label: 'Completados', valor: String(stats.completados), icon: CheckCircle2, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
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

      {/* Grid */}
      <div className="grid gap-3 lg:grid-cols-[1fr_280px]">
        <div className="space-y-3">
          {/* Search & filters */}
          <Card>
            <CardContent className="p-2.5">
              <div className="flex flex-col sm:flex-row gap-2 items-start sm:items-center justify-between mb-2">
                <div className="relative w-full sm:w-72">
                  <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                  <Input placeholder="Buscar orden de packing..." className="pl-8 h-8 text-[11px]" />
                </div>
                <div className="flex gap-1.5 w-full sm:w-auto">
                  <Button variant="outline" size="sm" className="h-7 text-[10px] gap-1 px-2"><Filter className="h-3 w-3" /> Filtros</Button>
                  <Button size="sm" className="h-7 text-[10px] gap-1 px-2"><Plus className="h-3 w-3" /> Nueva estación</Button>
                </div>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {['todas', 'pendiente', 'en_curso', 'verificado', 'completado'].map(est => (
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

          {/* Orders list */}
          <Card>
            <ScrollArea className="h-[420px]">
              <div className="p-1 space-y-1">
                {items.map((orden, idx) => (
                  <motion.div key={orden.id} initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.15, delay: idx * 0.02 }}
                    className="flex items-start gap-2.5 rounded-lg border p-2.5 transition-all hover:bg-accent/20 cursor-pointer"
                  >
                    <div className={cn(
                      'flex h-8 w-8 items-center justify-center rounded-lg shrink-0',
                      orden.estado === 'pendiente' && 'bg-slate-500/10 text-slate-500',
                      orden.estado === 'en_curso' && 'bg-amber-500/10 text-amber-500',
                      orden.estado === 'verificado' && 'bg-blue-500/10 text-blue-500',
                      orden.estado === 'completado' && 'bg-emerald-500/10 text-emerald-500',
                    )}>
                      {orden.estado === 'completado' ? <CheckCircle2 className="h-4 w-4" /> : <Package className="h-4 w-4" />}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="text-[11px] font-semibold">{orden.id}</span>
                        <StatusBadge estado={orden.estado} dot={false} />
                      </div>
                      <p className="text-[11px] font-medium mt-0.5">{orden.producto}</p>
                      <div className="flex items-center gap-3 mt-0.5 text-[9px] text-muted-foreground">
                        <span className="flex items-center gap-1"><Scale className="h-2.5 w-2.5" /> {orden.peso}</span>
                        <span className="flex items-center gap-1"><Ruler className="h-2.5 w-2.5" /> {orden.dimensiones}</span>
                        <span>•</span>
                        <span>{orden.tipoEmbalaje}</span>
                      </div>
                      <div className="flex items-center gap-2 mt-1 text-[9px] text-muted-foreground">
                        <span>Operador: {orden.operador}</span>
                        <span>•</span>
                        <span>{orden.cantidad} uds</span>
                      </div>
                      {orden.notas && (
                        <p className="text-[9px] text-amber-500 mt-0.5 italic">{orden.notas}</p>
                      )}

                      {/* Espacio preparado para QR/Barcode */}
                      <div className="flex items-center gap-1.5 mt-1.5">
                        <Button variant="outline" size="sm" className="h-5 text-[8px] gap-1 px-1.5">
                          <QrCode className="h-2.5 w-2.5" /> QR
                        </Button>
                        <Button variant="outline" size="sm" className="h-5 text-[8px] gap-1 px-1.5">
                          <Barcode className="h-2.5 w-2.5" /> Código
                        </Button>
                        <Button variant="outline" size="sm" className="h-5 text-[8px] gap-1 px-1.5">
                          <Printer className="h-2.5 w-2.5" /> Imprimir
                        </Button>
                        {/* TODO: Printing integration for labels, QR, barcodes */}
                      </div>
                    </div>

                    <ChevronRight className="h-3 w-3 text-muted-foreground shrink-0 mt-2" />
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
              <CardTitle className="text-xs flex items-center gap-1.5"><Boxes className="h-3 w-3 text-primary" /> Materiales de Empaque</CardTitle>
            </CardHeader>
            <CardContent className="p-3 pt-0 space-y-2">
              {TIPOS_EMBALAJE.map(tipo => (
                <div key={tipo} className="flex items-center justify-between text-[10px]">
                  <span>{tipo}</span>
                  <Badge variant="outline" className="text-[8px] h-4">Disponible</Badge>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="p-3 pb-2">
              <CardTitle className="text-xs flex items-center gap-1.5"><ScanLine className="h-3 w-3 text-primary" /> Verificación</CardTitle>
            </CardHeader>
            <CardContent className="p-3 pt-0 space-y-1.5 text-[10px]">
              <div className="flex items-center gap-1.5"><CheckSquare className="h-3 w-3 text-emerald-500" /> Peso verificado</div>
              <div className="flex items-center gap-1.5"><CheckSquare className="h-3 w-3 text-emerald-500" /> Dimensiones correctas</div>
              <div className="flex items-center gap-1.5"><CheckSquare className="h-3 w-3 text-muted-foreground" /> Etiqueta generada</div>
              <Separator className="opacity-50" />
              <p className="text-[9px] text-muted-foreground">Checklist de verificación previo al despacho.</p>
            </CardContent>
          </Card>

          <Card className="bg-muted/10 border-dashed border-border/50">
            <CardContent className="p-2.5">
              <div className="flex items-start gap-1.5 text-[9px] text-muted-foreground">
                <Printer className="h-2.5 w-2.5 mt-0.5 shrink-0" />
                <div>
                  <p className="font-medium text-foreground mb-0.5">Impresión futura</p>
                  <p>Preparado para integración con impresoras Zebra, etiquetas RFID y QR.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </WmsLayout>
  );
}