'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  AlertTriangle, Search, Clock, Bell,
  AlertCircle, Info, CheckCircle2, ChevronRight, Settings, Cpu,
} from 'lucide-react';
import { WmsLayout } from '@/components/wms-layout';
import { ModuleHeader } from '@/components/shared/ModuleHeader';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/boton';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/cn';
import type { AlertaWMS } from '@/types/wms';

/* ───────────────────────────────────────
   Mock data — Alertas
   TODO: Backend endpoint for alerts & notifications
   ─────────────────────────────────────── */

const ALERTAS_MOCK: AlertaWMS[] = [
  { id: 'AL-001', tipo: 'critico', mensaje: 'Stock crítico: SKU-8842 por debajo del mínimo de seguridad', modulo: 'Inventario', timestamp: 'Hace 5 min', prioridad: 1 },
  { id: 'AL-002', tipo: 'critico', mensaje: 'Temperatura fuera de rango en Zona B - Cámara 3', modulo: 'Monitoreo', timestamp: 'Hace 12 min', prioridad: 1 },
  { id: 'AL-003', tipo: 'advertencia', mensaje: 'Ubicación B-12-09 bloqueada por mantenimiento programado', modulo: 'Mapeo Bodega', timestamp: 'Hace 23 min', prioridad: 2 },
  { id: 'AL-004', tipo: 'advertencia', mensaje: '3 pedidos picking sobrepasan tiempo estimado de preparación', modulo: 'Picking', timestamp: 'Hace 31 min', prioridad: 2 },
  { id: 'AL-005', tipo: 'advertencia', mensaje: 'Recepción RCP-003 recibida parcialmente (80/120)', modulo: 'Recepción', timestamp: 'Hace 45 min', prioridad: 2 },
  { id: 'AL-006', tipo: 'info', mensaje: 'Sincronización con ERP completada correctamente', modulo: 'Sistema', timestamp: 'Hace 1 h', prioridad: 3 },
  { id: 'AL-007', tipo: 'info', mensaje: 'Nuevo operador registrado en turno vespertino', modulo: 'Usuarios', timestamp: 'Hace 2 h', prioridad: 3 },
  { id: 'AL-008', tipo: 'critico', mensaje: 'Incidencia en Despacho DSP-007 - Documentación incompleta', modulo: 'Despacho', timestamp: 'Hace 10 min', prioridad: 1 },
  { id: 'AL-009', tipo: 'advertencia', mensaje: 'Capacidad de almacenaje en Zona A al 85%', modulo: 'Mapeo Bodega', timestamp: 'Hace 30 min', prioridad: 2 },
  { id: 'AL-010', tipo: 'info', mensaje: 'Reporte diario de productividad disponible', modulo: 'Reportes', timestamp: 'Hace 3 h', prioridad: 3 },
];

const alertaConfig = {
  critico: { label: 'Crítico', icon: AlertCircle, color: 'border-red-500', bg: 'bg-red-500/5', text: 'text-red-500', dot: 'bg-red-500' },
  advertencia: { label: 'Advertencia', icon: AlertTriangle, color: 'border-amber-500', bg: 'bg-amber-500/5', text: 'text-amber-500', dot: 'bg-amber-500' },
  info: { label: 'Informativo', icon: Info, color: 'border-blue-500', bg: 'bg-blue-500/5', text: 'text-blue-500', dot: 'bg-blue-500' },
};

export default function AlertasPage() {
  const [filtroTipo, setFiltroTipo] = useState<string>('todas');

  const filtrar = () => {
    if (filtroTipo === 'todas') return ALERTAS_MOCK;
    return ALERTAS_MOCK.filter(a => a.tipo === filtroTipo);
  };

  const items = filtrar();
  const criticas = ALERTAS_MOCK.filter(a => a.tipo === 'critico');
  const advertencias = ALERTAS_MOCK.filter(a => a.tipo === 'advertencia');

  return (
    <WmsLayout>
      <ModuleHeader
        titulo="Alertas"
        descripcion="Centro de notificaciones, alertas operativas, eventos y monitoreo del sistema."
        icono={AlertTriangle}
        badge={{ texto: `${criticas.length} críticas`, variant: 'destructive' }}
        stats={[
          { label: 'Críticas', valor: String(criticas.length) },
          { label: 'Advertencias', valor: String(advertencias.length) },
          { label: 'Informativas', valor: String(ALERTAS_MOCK.filter(a => a.tipo === 'info').length) },
        ]}
      />

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 my-3">
        {[
          { label: 'Críticas', valor: String(criticas.length), icon: AlertCircle, color: 'text-red-500', bg: 'bg-red-500/10', desc: 'Requieren acción inmediata' },
          { label: 'Advertencias', valor: String(advertencias.length), icon: AlertTriangle, color: 'text-amber-500', bg: 'bg-amber-500/10', desc: 'Requieren atención' },
          { label: 'Informativas', valor: String(ALERTAS_MOCK.filter(a => a.tipo === 'info').length), icon: Info, color: 'text-blue-500', bg: 'bg-blue-500/10', desc: 'Notificaciones del sistema' },
        ].map((stat) => {
          const Icon = stat.icon;
          return (<Card key={stat.label}>
            <CardContent className="p-3">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-medium text-muted-foreground">{stat.label}</span>
                <div className={cn('rounded-md p-1', stat.bg)}><Icon className={cn('h-3 w-3', stat.color)} /></div>
              </div>
              <p className="text-lg font-bold">{stat.valor}</p>
              <p className="text-[9px] text-muted-foreground">{stat.desc}</p>
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
                  <Input placeholder="Buscar alertas..." className="pl-8 h-8 text-[11px]" />
                </div>
                <Button variant="outline" size="sm" className="h-7 text-[10px] gap-1 px-2"><CheckCircle2 className="h-3 w-3" /> Marcar leídas</Button>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {['todas', 'critico', 'advertencia', 'info'].map(t => (
                  <button key={t} onClick={() => setFiltroTipo(t)}
                    className={cn('rounded-full px-2 py-0.5 text-[9px] font-medium transition-all border',
                      filtroTipo === t ? 'bg-primary text-primary-foreground border-primary' : 'bg-card text-muted-foreground border-border hover:border-primary/30'
                    )}
                  >
                    {t === 'todas' ? 'Todas' : t.charAt(0).toUpperCase() + t.slice(1)}
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <ScrollArea className="h-[440px]">
              <div className="p-1 space-y-1">
                {items.map((alerta, idx) => {
                  const cfg = alertaConfig[alerta.tipo];
                  const Icono = cfg.icon;
                  return (
                    <motion.div key={alerta.id} initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.15, delay: idx * 0.02 }}
                      className={cn('flex items-start gap-2.5 rounded-lg border-l-4 p-2.5 transition-all cursor-pointer hover:bg-accent/20', cfg.bg, cfg.color)}
                    >
                      <Icono className={cn('h-4 w-4 mt-0.5 shrink-0', cfg.text)} />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="text-[11px] font-semibold leading-tight">{alerta.mensaje}</span>
                        </div>
                        <div className="flex items-center gap-2 mt-1 text-[9px] text-muted-foreground">
                          <span className={cn('flex items-center gap-1 font-medium', cfg.text)}>
                            <span className={cn('h-1.5 w-1.5 rounded-full', cfg.dot)} />
                            {cfg.label}
                          </span>
                          <span>•</span>
                          <span>{alerta.modulo}</span>
                          <span>•</span>
                          <span><Clock className="h-2.5 w-2.5 inline" /> {alerta.timestamp}</span>
                        </div>
                      </div>
                      <ChevronRight className="h-3 w-3 text-muted-foreground shrink-0 mt-1" />
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
              <CardTitle className="text-xs flex items-center gap-1.5"><Cpu className="h-3 w-3 text-primary" /> Resumen</CardTitle>
            </CardHeader>
            <CardContent className="p-3 pt-0 space-y-2 text-[10px]">
              <div className="flex items-center justify-between"><span className="text-muted-foreground">Alertas activas</span><span className="font-semibold">{ALERTAS_MOCK.length}</span></div>
              <div className="flex items-center justify-between"><span className="text-muted-foreground">Resueltas hoy</span><span className="font-semibold text-emerald-500">12</span></div>
              <Separator className="opacity-50" />
              <div className="flex items-center justify-between"><span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-red-500" /> Críticas</span><span className="font-semibold">{criticas.length}</span></div>
              <div className="flex items-center justify-between"><span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-amber-500" /> Advertencias</span><span className="font-semibold">{advertencias.length}</span></div>
              <div className="flex items-center justify-between"><span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-blue-500" /> Información</span><span className="font-semibold">{ALERTAS_MOCK.filter(a => a.tipo === 'info').length}</span></div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="p-3 pb-2">
              <CardTitle className="text-xs flex items-center gap-1.5"><Settings className="h-3 w-3 text-primary" /> Reglas Activas</CardTitle>
            </CardHeader>
            <CardContent className="p-3 pt-0 space-y-1.5 text-[10px]">
              <div className="flex items-center justify-between"><span>Stock mínimo</span><StatusBadge estado="activo" dot={false} /></div>
              <div className="flex items-center justify-between"><span>Temperatura</span><StatusBadge estado="activo" dot={false} /></div>
              <div className="flex items-center justify-between"><span>Tiempo picking</span><StatusBadge estado="activo" dot={false} /></div>
              <div className="flex items-center justify-between"><span>Ocupación bodega</span><StatusBadge estado="activo" dot={false} /></div>
            </CardContent>
          </Card>

          <Card className="bg-muted/10 border-dashed border-border/50">
            <CardContent className="p-2.5">
              <div className="flex items-start gap-1.5 text-[9px] text-muted-foreground">
                <Bell className="h-2.5 w-2.5 mt-0.5 shrink-0" />
                <div>
                  <p className="font-medium text-foreground mb-0.5">Centro de alertas</p>
                  <p>Las notificaciones en tiempo real se conectarán con el backend de eventos.</p>
                  {/* TODO: Backend endpoint for alerts & notifications */}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </WmsLayout>
  );
}