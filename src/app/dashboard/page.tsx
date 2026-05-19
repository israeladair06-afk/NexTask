'use client';

import { motion } from 'framer-motion';
import {
  Package,
  Warehouse,
  Activity,
  TrendingUp,
  Clock,
  AlertTriangle,
  BarChart3,
  ArrowUpRight,
} from 'lucide-react';
import Link from 'next/link';
import { WmsLayout } from '@/components/wms-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/boton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MODULOS_WMS } from '@/config/navegacion';

const kpis = [
  {
    titulo: 'SKUs en Stock',
    valor: '—',
    descripcion: 'Total de productos almacenados',
    icono: Package,
    color: 'text-blue-500',
    bg: 'bg-blue-500/10',
  },
  {
    titulo: 'Órdenes Activas',
    valor: '—',
    descripcion: 'Pendiente de integración con backend',
    icono: Activity,
    color: 'text-emerald-500',
    bg: 'bg-emerald-500/10',
  },
  {
    titulo: 'Capacidad Ocupada',
    valor: '— %',
    descripcion: 'Porcentaje de ocupación del almacén',
    icono: Warehouse,
    color: 'text-amber-500',
    bg: 'bg-amber-500/10',
  },
  {
    titulo: 'Alertas',
    valor: '3',
    descripcion: 'Notificaciones activas del sistema',
    icono: AlertTriangle,
    color: 'text-red-500',
    bg: 'bg-red-500/10',
  },
];

const modulosDashboard = MODULOS_WMS.filter((m) => m.estado === 'activo');

export default function DashboardPage() {
  return (
    <WmsLayout>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-8"
      >
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 text-sm text-primary mb-1">
              <BarChart3 className="h-4 w-4" />
              <span className="font-medium">Panel de Control</span>
            </div>
            <h1 className="text-3xl font-bold tracking-tight">Dashboard WMS</h1>
            <p className="text-muted-foreground mt-1">
              Centro de monitoreo general del sistema de gestión de almacenes.
            </p>
          </div>
          <Link href="/lobby">
            <Button variant="outline" size="sm" className="gap-2">
              <Warehouse className="h-4 w-4" />
              Ir al Lobby
            </Button>
          </Link>
        </div>
      </motion.div>

      {/* KPIs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
      >
        {kpis.map((kpi, i) => {
          const Icono = kpi.icono;
          return (
            <motion.div
              key={kpi.titulo}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.15 + i * 0.05 }}
            >
              <Card className="transition-all hover:border-primary/30 hover:shadow-md">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {kpi.titulo}
                  </CardTitle>
                  <div className={`rounded-xl p-2 ${kpi.bg}`}>
                    <Icono className={`h-4 w-4 ${kpi.color}`} />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{kpi.valor}</div>
                  <p className="mt-1 text-xs text-muted-foreground">{kpi.descripcion}</p>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Main Content */}
      <div className="grid gap-4 lg:grid-cols-[1.5fr_1fr] mb-8">
        {/* Main area */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Actividad del Almacén</CardTitle>
                  <CardDescription>
                    Resumen operativo del sistema. Los datos aparecerán al conectar el backend.
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="hoy" className="w-full">
                <TabsList className="mb-4">
                  <TabsTrigger value="hoy">Hoy</TabsTrigger>
                  <TabsTrigger value="semana">Esta semana</TabsTrigger>
                  <TabsTrigger value="mes">Este mes</TabsTrigger>
                </TabsList>
                <TabsContent value="hoy">
                  <div className="rounded-xl border border-dashed bg-muted/30 p-10 text-center">
                    <Activity className="mx-auto h-10 w-10 text-muted-foreground" />
                    <p className="mt-3 text-sm font-medium text-foreground">
                      Sin datos disponibles
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      La actividad del almacén se mostrará aquí una vez que el backend esté
                      integrado y las operaciones comiencen a registrarse.
                    </p>
                  </div>
                </TabsContent>
                <TabsContent value="semana">
                  <div className="rounded-xl border border-dashed bg-muted/30 p-10 text-center">
                    <Clock className="mx-auto h-10 w-10 text-muted-foreground" />
                    <p className="mt-3 text-sm font-medium text-foreground">
                      Datos semanales próximamente
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      Esta vista se activará cuando el sistema tenga datos históricos.
                    </p>
                  </div>
                </TabsContent>
                <TabsContent value="mes">
                  <div className="rounded-xl border border-dashed bg-muted/30 p-10 text-center">
                    <TrendingUp className="mx-auto h-10 w-10 text-muted-foreground" />
                    <p className="mt-3 text-sm font-medium text-foreground">
                      Reportes mensuales pendientes
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      Aquí se integrarán los KPIs mensuales y tendencias operativas.
                    </p>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </motion.div>

        {/* Side panel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.25 }}
          className="space-y-4"
        >
          <Card>
            <CardHeader>
              <CardTitle>Módulos Activos</CardTitle>
              <CardDescription>Acceso rápido a los módulos disponibles.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {modulosDashboard.map((modulo) => {
                const Icono = modulo.icono;
                return (
                  <Link
                    key={modulo.href}
                    href={modulo.href}
                    className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors hover:bg-accent group"
                  >
                    <Icono className="h-4 w-4 text-muted-foreground group-hover:text-foreground" />
                    <span className="flex-1">{modulo.nombre}</span>
                    <ArrowUpRight className="h-3 w-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                );
              })}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Estado del Sistema</CardTitle>
              <CardDescription>Resumen de la plataforma WMS.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Versión</span>
                <span className="font-medium">v1.0.0</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Frontend</span>
                <Badge variant="success">Completo</Badge>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Backend</span>
                <Badge variant="warning">Pendiente</Badge>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Base de datos</span>
                <Badge variant="warning">Pendiente</Badge>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">API</span>
                <Badge variant="outline">No conectada</Badge>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Footer note */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
      >
        <Card className="bg-muted/20 border-dashed">
          <CardContent className="p-6 text-center">
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span>
                Funcionalidad pendiente de conexión con servicios. Los indicadores y datos
                operativos se cargarán dinámicamente desde el sistema una vez integrado el backend.
              </span>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </WmsLayout>
  );
}