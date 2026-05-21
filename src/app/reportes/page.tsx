'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  BarChart3, Search, Download, Clock, TrendingUp,
  TrendingDown, Package, Truck, ClipboardList, Boxes,
  DollarSign, Target, Users, Activity,
} from 'lucide-react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, AreaChart, Area, PieChart, Pie, Cell, Legend,
} from 'recharts';
import { WmsLayout } from '@/components/wms-layout';
import { ModuleHeader } from '@/components/shared/ModuleHeader';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/boton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/cn';

/* ───────────────────────────────────────
   Mock data — Reportes
   TODO: Backend endpoint for reports & analytics
   TODO: Connect warehouse analytics service
   ─────────────────────────────────────── */

const dataOperaciones = [
  { hora: '06:00', recepciones: 2, pickings: 5, packings: 3, despachos: 1 },
  { hora: '07:00', recepciones: 4, pickings: 8, packings: 6, despachos: 2 },
  { hora: '08:00', recepciones: 6, pickings: 14, packings: 10, despachos: 4 },
  { hora: '09:00', recepciones: 8, pickings: 18, packings: 14, despachos: 6 },
  { hora: '10:00', recepciones: 5, pickings: 22, packings: 16, despachos: 8 },
  { hora: '11:00', recepciones: 7, pickings: 20, packings: 18, despachos: 7 },
  { hora: '12:00', recepciones: 3, pickings: 12, packings: 10, despachos: 4 },
  { hora: '13:00', recepciones: 6, pickings: 16, packings: 12, despachos: 5 },
  { hora: '14:00', recepciones: 4, pickings: 10, packings: 8, despachos: 3 },
];

const dataOcupacionZonas = [
  { name: 'Recepción', valor: 80 },
  { name: 'Almacenaje', valor: 72 },
  { name: 'Picking', valor: 68 },
  { name: 'Despacho', valor: 70 },
  { name: 'Devoluciones', valor: 35 },
  { name: 'Cuarentena', valor: 8 },
];

const dataProductividad = [
  { mes: 'Ene', eficiencia: 92, objetivo: 85 },
  { mes: 'Feb', eficiencia: 88, objetivo: 85 },
  { mes: 'Mar', eficiencia: 94, objetivo: 85 },
  { mes: 'Abr', eficiencia: 91, objetivo: 85 },
  { mes: 'May', eficiencia: 96, objetivo: 85 },
  { mes: 'Jun', eficiencia: 93, objetivo: 85 },
];

const dataCategorias = [
  { name: 'Ferretería', value: 35 },
  { name: 'Electrónica', value: 25 },
  { name: 'Industrial', value: 22 },
  { name: 'Automotriz', value: 10 },
  { name: 'Eléctrico', value: 8 },
];

const COLORS = ['hsl(var(--chart-1))', 'hsl(var(--chart-2))', 'hsl(var(--chart-3))', 'hsl(var(--chart-4))', 'hsl(var(--chart-5)))'];

const KPIS_REPORTES = [
  { label: 'Órdenes Procesadas', valor: '1,452', cambio: '+12.3%', tendencia: 'up' as const, icon: Activity, color: 'text-blue-500', bg: 'bg-blue-500/10' },
  { label: 'Tiempo Prom. Picking', valor: '4.2 min', cambio: '-0.8 min', tendencia: 'up' as const, icon: ClipboardList, color: 'text-violet-500', bg: 'bg-violet-500/10' },
  { label: 'Precisión Inventario', valor: '98.5%', cambio: '+0.3%', tendencia: 'up' as const, icon: Target, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
  { label: 'Productividad Operador', valor: '94.2%', cambio: '+1.5%', tendencia: 'up' as const, icon: Users, color: 'text-amber-500', bg: 'bg-amber-500/10' },
  { label: 'Órdenes por Hora', valor: '18.6', cambio: '+2.1', tendencia: 'up' as const, icon: TrendingUp, color: 'text-cyan-500', bg: 'bg-cyan-500/10' },
  { label: 'Costo Operativo', valor: '$12,450', cambio: '-3.2%', tendencia: 'down' as const, icon: DollarSign, color: 'text-rose-500', bg: 'bg-rose-500/10' },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-xl border bg-card p-2 shadow-lg text-[10px]">
        <p className="font-semibold mb-1">{label}</p>
        {payload.map((p: any, i: number) => (
          <div key={i} className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full" style={{ background: p.color }} />
            <span>{p.name}: <strong>{p.value}</strong></span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export default function ReportesPage() {
  const [periodo, setPeriodo] = useState('hoy');

  return (
    <WmsLayout>
      <ModuleHeader
        titulo="Reportes y Analytics"
        descripcion="KPIs, métricas operativas, gráficos y análisis de rendimiento del almacén."
        icono={BarChart3}
        badge={{ texto: 'Dashboard analítico', variant: 'success' }}
        stats={[
          { label: 'Órdenes hoy', valor: '1,452' },
          { label: 'Eficiencia', valor: '94.2%' },
          { label: 'Precisión', valor: '98.5%' },
        ]}
      />

      {/* KPIs grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 mb-3">
        {KPIS_REPORTES.map((kpi, i) => {
          const Icon = kpi.icon;
          return (
            <motion.div key={kpi.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}>
              <Card className="transition-all hover:border-primary/20">
                <CardContent className="p-2.5">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[9px] font-medium text-muted-foreground">{kpi.label}</span>
                    <div className={cn('rounded-md p-0.5', kpi.bg)}>
                      <Icon className={cn('h-3 w-3', kpi.color)} />
                    </div>
                  </div>
                  <p className="text-sm font-bold">{kpi.valor}</p>
                  <span className={cn(
                    'text-[8px] font-medium',
                    kpi.tendencia === 'up' ? 'text-emerald-500' : 'text-red-500'
                  )}>
                    {kpi.cambio}
                  </span>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      <Tabs defaultValue="operaciones" className="mb-3">
        <TabsList className="h-7">
          <TabsTrigger value="operaciones" className="text-[10px] px-3 py-0.5 h-5">Operaciones</TabsTrigger>
          <TabsTrigger value="ocupacion" className="text-[10px] px-3 py-0.5 h-5">Ocupación</TabsTrigger>
          <TabsTrigger value="rendimiento" className="text-[10px] px-3 py-0.5 h-5">Rendimiento</TabsTrigger>
          <TabsTrigger value="inventario" className="text-[10px] px-3 py-0.5 h-5">Inventario</TabsTrigger>
        </TabsList>

        <TabsContent value="operaciones" className="mt-3">
          <div className="grid gap-3 lg:grid-cols-2">
            <Card>
              <CardHeader className="p-3 pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xs">Operaciones por Hora</CardTitle>
                  <div className="flex gap-1">
                    {['hoy', 'semana', 'mes'].map(p => (
                      <button key={p} onClick={() => setPeriodo(p)}
                        className={cn('px-1.5 py-0.5 text-[8px] rounded border transition-all',
                          periodo === p ? 'bg-primary text-primary-foreground border-primary' : 'bg-card text-muted-foreground border-border'
                        )}
                      >
                        {p === 'hoy' ? 'Hoy' : p === 'semana' ? 'Sem' : 'Mes'}
                      </button>
                    ))}
                  </div>
                </div>
                <CardDescription className="text-[9px]">Volumen de operaciones del almacén</CardDescription>
              </CardHeader>
              <CardContent className="p-3 pt-0">
                <div className="h-[220px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={dataOperaciones} barGap={2} barCategoryGap={8}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis dataKey="hora" tick={{ fontSize: 9 }} stroke="hsl(var(--muted-foreground))" />
                      <YAxis tick={{ fontSize: 9 }} stroke="hsl(var(--muted-foreground))" />
                      <Tooltip content={<CustomTooltip />} />
                      <Bar dataKey="recepciones" name="Recepción" fill="hsl(var(--chart-1))" radius={[2, 2, 0, 0]} />
                      <Bar dataKey="pickings" name="Picking" fill="hsl(var(--chart-2))" radius={[2, 2, 0, 0]} />
                      <Bar dataKey="packings" name="Packing" fill="hsl(var(--chart-3))" radius={[2, 2, 0, 0]} />
                      <Bar dataKey="despachos" name="Despacho" fill="hsl(var(--chart-4))" radius={[2, 2, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="p-3 pb-2">
                <CardTitle className="text-xs">Tendencia de Operaciones</CardTitle>
                <CardDescription className="text-[9px]">Evolución del flujo de trabajo</CardDescription>
              </CardHeader>
              <CardContent className="p-3 pt-0">
                <div className="h-[220px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={dataOperaciones}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis dataKey="hora" tick={{ fontSize: 9 }} stroke="hsl(var(--muted-foreground))" />
                      <YAxis tick={{ fontSize: 9 }} stroke="hsl(var(--muted-foreground))" />
                      <Tooltip content={<CustomTooltip />} />
                      <Area type="monotone" dataKey="pickings" name="Picking" stroke="hsl(var(--chart-2))" fill="hsl(var(--chart-2) / 0.15)" strokeWidth={2} />
                      <Area type="monotone" dataKey="packings" name="Packing" stroke="hsl(var(--chart-3))" fill="hsl(var(--chart-3) / 0.15)" strokeWidth={2} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="ocupacion" className="mt-3">
          <div className="grid gap-3 lg:grid-cols-2">
            <Card>
              <CardHeader className="p-3 pb-2">
                <CardTitle className="text-xs">Ocupación por Zona</CardTitle>
                <CardDescription className="text-[9px]">Porcentaje de ocupación actual</CardDescription>
              </CardHeader>
              <CardContent className="p-3 pt-0">
                <div className="h-[260px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={dataOcupacionZonas} layout="vertical" barSize={20}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" horizontal={false} />
                      <XAxis type="number" tick={{ fontSize: 9 }} stroke="hsl(var(--muted-foreground))" domain={[0, 100]} />
                      <YAxis type="category" dataKey="name" tick={{ fontSize: 9 }} stroke="hsl(var(--muted-foreground))" width={80} />
                      <Tooltip content={<CustomTooltip />} />
                      <Bar dataKey="valor" name="Ocupación %" radius={[0, 4, 4, 0]}>
                        {dataOcupacionZonas.map((_, i) => (
                          <Cell key={i} fill={`hsl(var(--chart-${(i % 5) + 1}))`} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="p-3 pb-2">
                <CardTitle className="text-xs">Distribución de Productos</CardTitle>
                <CardDescription className="text-[9px]">Por categoría</CardDescription>
              </CardHeader>
              <CardContent className="p-3 pt-0">
                <div className="h-[260px] flex items-center justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={dataCategorias} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={2} dataKey="value">
                        {dataCategorias.map((_, i) => (
                          <Cell key={i} fill={`hsl(var(--chart-${(i % 5) + 1}))`} />
                        ))}
                      </Pie>
                      <Tooltip content={<CustomTooltip />} />
                      <Legend wrapperStyle={{ fontSize: '9px' }} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="rendimiento" className="mt-3">
          <Card>
            <CardHeader className="p-3 pb-2">
              <CardTitle className="text-xs">Eficiencia Operativa</CardTitle>
              <CardDescription className="text-[9px]">Comparativa mensual vs objetivo</CardDescription>
            </CardHeader>
            <CardContent className="p-3 pt-0">
              <div className="h-[280px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={dataProductividad}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="mes" tick={{ fontSize: 9 }} stroke="hsl(var(--muted-foreground))" />
                    <YAxis domain={[75, 100]} tick={{ fontSize: 9 }} stroke="hsl(var(--muted-foreground))" />
                    <Tooltip content={<CustomTooltip />} />
                    <Line type="monotone" dataKey="eficiencia" name="Eficiencia" stroke="hsl(var(--chart-2))" strokeWidth={2} dot={{ r: 3 }} />
                    <Line type="monotone" dataKey="objetivo" name="Objetivo" stroke="hsl(var(--muted-foreground))" strokeWidth={1.5} strokeDasharray="5 5" dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="inventario" className="mt-3">
          <Card>
            <CardContent className="p-6 text-center text-sm text-muted-foreground">
              <BarChart3 className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
              <p className="font-medium text-foreground">Reportes de inventario en preparación</p>
              <p className="text-xs mt-1">Rotación, valor de stock, y análisis ABC próximamente.</p>
              {/* TODO: Backend endpoint for inventory analytics */}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex items-center justify-center gap-2 text-[10px] text-muted-foreground mt-2">
        <Clock className="h-3 w-3" />
        <span>Dashboard analítico con datos simulados. Conectar con APIs backend para datos reales.</span>
      </div>
    </WmsLayout>
  );
}