'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ScanLine, Search, Plus, Package,
  CheckCircle2, ChevronRight, Tags,
  QrCode, Boxes, Recycle, User, Palette,
} from 'lucide-react';
import { WmsLayout } from '@/components/wms-layout';
import { ModuleHeader } from '@/components/shared/ModuleHeader';
import { StatusBadge } from '@/components/shared/StatusBadge';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/boton';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/cn';

/* ───────────────────────────────────────
   Mock data — Acondicionamiento
   TODO: Backend endpoint for conditioning operations
   ─────────────────────────────────────── */

interface OrdenAcondicionamiento {
  id: string;
  producto: string;
  sku: string;
  tipo: 'reempaque' | 'reetiquetado' | 'kit' | 'consolidacion';
  cantidad: number;
  origen: string;
  destino: string;
  estado: 'pendiente' | 'en_curso' | 'completado';
  operador: string;
}

const ORDENES_ACOND: OrdenAcondicionamiento[] = [
  { id: 'ACD-001', producto: 'Kit Promocional Tornillos + Tuercas', sku: 'KIT-001', tipo: 'kit', cantidad: 50, origen: 'A1-01, A1-03', destino: 'Zona Kitting', estado: 'en_curso', operador: 'María L.' },
  { id: 'ACD-002', producto: 'Reempaque Sensores T200 — presentación x6', sku: 'SKU-2391', tipo: 'reempaque', cantidad: 20, origen: 'A1-05', destino: 'Zona Reempaque', estado: 'pendiente', operador: '—' },
  { id: 'ACD-003', producto: 'Reetiquetado Válvulas — nuevo código', sku: 'SKU-3312', tipo: 'reetiquetado', cantidad: 60, origen: 'B1-07', destino: 'Estación Etiquetado', estado: 'pendiente', operador: '—' },
  { id: 'ACD-004', producto: 'Consolidación Pedido Múltiple #890', sku: 'MULTI-001', tipo: 'consolidacion', cantidad: 3, origen: 'Varios', destino: 'Mesa Consolidación', estado: 'completado', operador: 'Pedro R.' },
  { id: 'ACD-005', producto: 'Kit Mantenimiento Industrial', sku: 'KIT-002', tipo: 'kit', cantidad: 25, origen: 'B1-03, B2-08', destino: 'Zona Kitting', estado: 'pendiente', operador: '—' },
];

const tipoAcond = {
  reempaque: { label: 'Reempaque', icon: Boxes },
  reetiquetado: { label: 'Reetiquetado', icon: Tags },
  kit: { label: 'Armado Kit', icon: Package },
  consolidacion: { label: 'Consolidación', icon: Recycle },
};

export default function AcondicionamientoPage() {
  const [filtro, setFiltro] = useState('todas');

  const items = filtro === 'todas' ? ORDENES_ACOND : ORDENES_ACOND.filter(o => o.estado === filtro);

  return (
    <WmsLayout>
      <ModuleHeader
        titulo="Acondicionamiento"
        descripcion="Reempaque, reetiquetado, armado de kits y consolidación de productos."
        icono={ScanLine}
        stats={[
          { label: 'Pendientes', valor: String(ORDENES_ACOND.filter(o => o.estado === 'pendiente').length) },
          { label: 'En curso', valor: String(ORDENES_ACOND.filter(o => o.estado === 'en_curso').length) },
          { label: 'Hoy', valor: `${ORDENES_ACOND.filter(o => o.estado === 'completado').length} completados` },
        ]}
      />

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 my-3">
        {[
          { label: 'Por Acondicionar', valor: String(ORDENES_ACOND.filter(o => o.estado === 'pendiente').length), icon: Package, color: 'text-slate-500', bg: 'bg-slate-500/10' },
          { label: 'En Proceso', valor: String(ORDENES_ACOND.filter(o => o.estado === 'en_curso').length), icon: ScanLine, color: 'text-amber-500', bg: 'bg-amber-500/10' },
          { label: 'Kits Armados', valor: String(ORDENES_ACOND.filter(o => o.tipo === 'kit').length), icon: Boxes, color: 'text-violet-500', bg: 'bg-violet-500/10' },
          { label: 'Completados', valor: String(ORDENES_ACOND.filter(o => o.estado === 'completado').length), icon: CheckCircle2, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
        ].map((stat) => {
          const Icon = stat.icon;
          return (<Card key={stat.label} className="transition-all hover:border-primary/20">
            <CardContent className="p-3">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-medium text-muted-foreground">{stat.label}</span>
                <div className={cn('rounded-md p-1', stat.bg)}><Icon className={cn('h-3 w-3', stat.color)} /></div>
              </div>
              <p className="text-lg font-bold">{stat.valor}</p>
            </CardContent>
          </Card>);
        })}
      </div>

      <div className="grid gap-3 lg:grid-cols-[1fr_260px]">
        <div className="space-y-3">
          <Card>
            <CardContent className="p-2.5">
              <div className="flex flex-col sm:flex-row gap-2 items-start sm:items-center justify-between mb-2">
                <div className="relative w-full sm:w-72">
                  <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                  <Input placeholder="Buscar orden de acondicionamiento..." className="pl-8 h-8 text-[11px]" />
                </div>
                <Button size="sm" className="h-7 text-[10px] gap-1 px-2"><Plus className="h-3 w-3" /> Nueva Orden</Button>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {['todas', 'pendiente', 'en_curso', 'completado'].map(est => (
                  <button key={est} onClick={() => setFiltro(est)}
                    className={cn('rounded-full px-2 py-0.5 text-[9px] font-medium transition-all border',
                      filtro === est ? 'bg-primary text-primary-foreground border-primary' : 'bg-card text-muted-foreground border-border hover:border-primary/30'
                    )}
                  >
                    {est === 'todas' ? 'Todas' : est === 'en_curso' ? 'En Curso' : est.charAt(0).toUpperCase() + est.slice(1)}
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <ScrollArea className="h-[420px]">
              <div className="p-1 space-y-1">
                {items.map((orden, idx) => {
                  const Tipo = tipoAcond[orden.tipo];
                  const TipoIcon = Tipo?.icon || Package;
                  return (
                    <motion.div key={orden.id} initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.15, delay: idx * 0.02 }}
                      className="flex items-start gap-2.5 rounded-lg border p-2.5 transition-all hover:bg-accent/20 cursor-pointer"
                    >
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary shrink-0">
                        <TipoIcon className="h-4 w-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="text-[11px] font-semibold">{orden.id}</span>
                          <StatusBadge estado={orden.estado} dot={false} />
                          <Badge variant="outline" className="text-[8px] h-3.5 px-1 border-0">{Tipo?.label || orden.tipo}</Badge>
                        </div>
                        <p className="text-[11px] font-medium mt-0.5">{orden.producto}</p>
                        <div className="flex items-center gap-2 mt-0.5 text-[9px] text-muted-foreground">
                          <span>SKU: {orden.sku}</span>
                          <span>•</span>
                          <span>{orden.cantidad} uds</span>
                          <span>•</span>
                          <span>{orden.origen} → {orden.destino}</span>
                        </div>
                        {orden.operador !== '—' && <p className="text-[9px] text-muted-foreground mt-0.5"><User className="h-2.5 w-2.5 inline" /> {orden.operador}</p>}
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
              <CardTitle className="text-xs flex items-center gap-1.5"><Palette className="h-3 w-3 text-primary" /> Tipos de Operación</CardTitle>
            </CardHeader>
            <CardContent className="p-3 pt-0 space-y-2 text-[10px]">
              {Object.entries(tipoAcond).map(([key, val]) => {
                const Icon = val.icon;
                const count = ORDENES_ACOND.filter(o => o.tipo === key).length;
                return (
                  <div key={key} className="flex items-center gap-2">
                    <Icon className="h-3 w-3 text-primary" />
                    <span className="flex-1">{val.label}</span>
                    <Badge variant="outline" className="text-[8px] h-4">{count}</Badge>
                  </div>
                );
              })}
            </CardContent>
          </Card>

          <Card className="bg-muted/10 border-dashed border-border/50">
            <CardContent className="p-2.5">
              <div className="flex items-start gap-1.5 text-[9px] text-muted-foreground">
                <QrCode className="h-2.5 w-2.5 mt-0.5 shrink-0" />
                <div>
                  <p className="font-medium text-foreground mb-0.5">Control de calidad</p>
                  <p>El flujo de acondicionamiento incluye verificación post-operación antes de reingreso a inventario.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </WmsLayout>
  );
}