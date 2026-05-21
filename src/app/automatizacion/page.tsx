'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Cpu, Search, Plus, Clock, Play, Pause,
  CheckCircle2, AlertCircle, ChevronRight, Zap,
  Settings, Workflow, GitBranch, ToggleLeft,
} from 'lucide-react';
import { WmsLayout } from '@/components/wms-layout';
import { ModuleHeader } from '@/components/shared/ModuleHeader';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/boton';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/cn';

/* ───────────────────────────────────────
   Mock data — Automatización
   TODO: Backend endpoint for automation rules
   TODO: Webhook integration for external events
   ─────────────────────────────────────── */

interface ReglaAutomatizacion {
  id: string;
  nombre: string;
  descripcion: string;
  modulo: string;
  disparador: string;
  accion: string;
  estado: 'activo' | 'pausado' | 'prueba';
  ultimaEjecucion: string;
  ejecuciones: number;
}

const REGLAS_MOCK: ReglaAutomatizacion[] = [
  { id: 'RLA-001', nombre: 'Asignación automática de ubicación', descripcion: 'Asigna ubicación óptima basada en rotación del producto al recibir mercancía', modulo: 'Recepción', disparador: 'Recepción completada', accion: 'Asignar ubicación en zona correspondiente', estado: 'activo', ultimaEjecucion: 'Hace 2 min', ejecuciones: 284 },
  { id: 'RLA-002', nombre: 'Alerta de stock mínimo', descripcion: 'Notifica cuando un producto alcanza el nivel mínimo configurado', modulo: 'Inventario', disparador: 'Stock < mínimo', accion: 'Enviar alerta crítica', estado: 'activo', ultimaEjecucion: 'Hace 15 min', ejecuciones: 47 },
  { id: 'RLA-003', nombre: 'Ola de picking automática', descripcion: 'Agrupa pedidos en olas de picking cada hora', modulo: 'Picking', disparador: 'Cada hora (programado)', accion: 'Generar ola de picking', estado: 'activo', ultimaEjecucion: 'Hace 45 min', ejecuciones: 156 },
  { id: 'RLA-004', nombre: 'Verificación de temperatura', descripcion: 'Monitorea sensores de temperatura en zonas críticas', modulo: 'Monitoreo', disparador: 'Temperatura > umbral', accion: 'Activar alerta y notificar', estado: 'activo', ultimaEjecucion: 'Hace 5 min', ejecuciones: 892 },
  { id: 'RLA-005', nombre: 'Consolidación de despachos', descripcion: 'Agrupa envíos por transportista para optimizar carga', modulo: 'Despacho', disparador: 'Pedido completado', accion: 'Agrupar en despacho consolidado', estado: 'pausado', ultimaEjecucion: 'Ayer 16:00', ejecuciones: 63 },
  { id: 'RLA-006', nombre: 'Reorden automático', descripcion: 'Genera orden de compra cuando stock cae bajo mínimo', modulo: 'Inventario', disparador: 'Stock crítico', accion: 'Generar OC pendiente de aprobación', estado: 'prueba', ultimaEjecucion: 'Hace 1 h', ejecuciones: 12 },
];

const MODULOS_AUTOMATIZACION = ['Recepción', 'Inventario', 'Picking', 'Monitoreo', 'Despacho'];

export default function AutomatizacionPage() {
  const [filtroEstado, setFiltroEstado] = useState('todas');

  const items = filtroEstado === 'todas' ? REGLAS_MOCK : REGLAS_MOCK.filter(r => r.estado === filtroEstado);

  return (
    <WmsLayout>
      <ModuleHeader
        titulo="Automatización"
        descripcion="Reglas de negocio, workflows inteligentes y automatización de procesos del WMS."
        icono={Cpu}
        badge={{ texto: `${REGLAS_MOCK.filter(r => r.estado === 'activo').length} activas`, variant: 'success' }}
        stats={[
          { label: 'Reglas activas', valor: String(REGLAS_MOCK.filter(r => r.estado === 'activo').length) },
          { label: 'Pausadas', valor: String(REGLAS_MOCK.filter(r => r.estado === 'pausado').length) },
          { label: 'Ejecuciones hoy', valor: '1,452' },
        ]}
      />

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 my-3">
        {[
          { label: 'Activas', valor: String(REGLAS_MOCK.filter(r => r.estado === 'activo').length), icon: Zap, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
          { label: 'Pausadas', valor: String(REGLAS_MOCK.filter(r => r.estado === 'pausado').length), icon: Pause, color: 'text-amber-500', bg: 'bg-amber-500/10' },
          { label: 'En Prueba', valor: String(REGLAS_MOCK.filter(r => r.estado === 'prueba').length), icon: GitBranch, color: 'text-violet-500', bg: 'bg-violet-500/10' },
          { label: 'Total Reglas', valor: String(REGLAS_MOCK.length), icon: Workflow, color: 'text-blue-500', bg: 'bg-blue-500/10' },
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

      <div className="grid gap-3 lg:grid-cols-[1fr_280px]">
        <div className="space-y-3">
          <Card>
            <CardContent className="p-2.5">
              <div className="flex items-center justify-between mb-2">
                <div className="relative w-full sm:w-72">
                  <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                  <Input placeholder="Buscar reglas de automatización..." className="pl-8 h-8 text-[11px]" />
                </div>
                <Button size="sm" className="h-7 text-[10px] gap-1 px-2"><Plus className="h-3 w-3" /> Nueva Regla</Button>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {['todas', 'activo', 'pausado', 'prueba'].map(est => (
                  <button key={est} onClick={() => setFiltroEstado(est)}
                    className={cn('rounded-full px-2 py-0.5 text-[9px] font-medium transition-all border',
                      filtroEstado === est ? 'bg-primary text-primary-foreground border-primary' : 'bg-card text-muted-foreground border-border hover:border-primary/30'
                    )}
                  >
                    {est === 'todas' ? 'Todas' : est.charAt(0).toUpperCase() + est.slice(1)}
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <ScrollArea className="h-[440px]">
              <div className="p-1 space-y-1">
                {items.map((regla, idx) => (
                  <motion.div key={regla.id} initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.15, delay: idx * 0.02 }}
                    className="flex items-start gap-2.5 rounded-lg border p-2.5 transition-all hover:bg-accent/20 cursor-pointer"
                  >
                    <div className={cn(
                      'flex h-8 w-8 items-center justify-center rounded-lg shrink-0',
                      regla.estado === 'activo' && 'bg-emerald-500/10 text-emerald-500',
                      regla.estado === 'pausado' && 'bg-amber-500/10 text-amber-500',
                      regla.estado === 'prueba' && 'bg-violet-500/10 text-violet-500',
                    )}>
                      {regla.estado === 'activo' ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="text-[11px] font-semibold">{regla.nombre}</span>
                        <StatusBadge estado={regla.estado} dot={false} />
                        <Badge variant="outline" className="text-[8px] h-3.5 px-1 border-0">{regla.modulo}</Badge>
                      </div>
                      <p className="text-[9px] text-muted-foreground mt-0.5">{regla.descripcion}</p>
                      <div className="flex items-center gap-2 mt-0.5 text-[9px] text-muted-foreground">
                        <span className="flex items-center gap-1"><Zap className="h-2.5 w-2.5" /> {regla.disparador}</span>
                        <span>→</span>
                        <span>{regla.accion}</span>
                      </div>
                      <div className="flex items-center gap-2 mt-0.5 text-[8px] text-muted-foreground">
                        <span>{regla.ejecuciones} ejecuciones</span>
                        <span>•</span>
                        <span>Última: {regla.ultimaEjecucion}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </ScrollArea>
          </Card>
        </div>

        <div className="space-y-3">
          <Card>
            <CardHeader className="p-3 pb-2">
              <CardTitle className="text-xs flex items-center gap-1.5"><Settings className="h-3 w-3 text-primary" /> Módulos</CardTitle>
            </CardHeader>
            <CardContent className="p-3 pt-0 space-y-1.5 text-[10px]">
              {MODULOS_AUTOMATIZACION.map(mod => {
                const count = REGLAS_MOCK.filter(r => r.modulo === mod).length;
                return (
                  <div key={mod} className="flex items-center justify-between">
                    <span>{mod}</span>
                    <Badge variant="outline" className="text-[8px] h-4">{count} reglas</Badge>
                  </div>
                );
              })}
            </CardContent>
          </Card>

          <Card className="bg-muted/10 border-dashed border-border/50">
            <CardContent className="p-2.5">
              <div className="flex items-start gap-1.5 text-[9px] text-muted-foreground">
                <Workflow className="h-2.5 w-2.5 mt-0.5 shrink-0" />
                <div>
                  <p className="font-medium text-foreground mb-0.5">Motor de reglas simulado</p>
                  <p>Las reglas se ejecutarán en el backend con un motor de workflows como Temporal o Camunda.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </WmsLayout>
  );
}