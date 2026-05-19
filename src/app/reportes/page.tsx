'use client';

import { motion } from 'framer-motion';
import { BarChart3, Download, Clock } from 'lucide-react';
import { WmsLayout } from '@/components/wms-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/boton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function ReportesPage() {
  return (
    <WmsLayout>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <div className="flex items-center gap-3 mb-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <BarChart3 className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Reportes</h1>
            <p className="text-muted-foreground">KPIs, métricas y reportes operativos del WMS.</p>
          </div>
        </div>
      </motion.div>

      <div className="mt-6 mb-6 flex items-center justify-between">
        <Tabs defaultValue="operativos">
          <TabsList>
            <TabsTrigger value="operativos">Operativos</TabsTrigger>
            <TabsTrigger value="inventario">Inventario</TabsTrigger>
            <TabsTrigger value="rendimiento">Rendimiento</TabsTrigger>
          </TabsList>
        </Tabs>
        <Button variant="outline" size="sm" className="gap-2">
          <Download className="h-4 w-4" />
          Exportar
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-4">
        {[
          { label: 'Órdenes por hora', value: '—' },
          { label: 'Tiempo promedio picking', value: '— min' },
          { label: 'Precisión inventario', value: '— %' },
          { label: 'Productividad operador', value: '—' },
        ].map((kpi) => (
          <Card key={kpi.label}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-muted-foreground">{kpi.label}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{kpi.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Dashboard de Reportes</CardTitle>
            <CardDescription>Visualización de datos operativos y métricas del almacén.</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="tablero">
              <TabsList className="mb-4">
                <TabsTrigger value="tablero">Tablero</TabsTrigger>
                <TabsTrigger value="exportar">Exportaciones</TabsTrigger>
                <TabsTrigger value="programados">Programados</TabsTrigger>
              </TabsList>
              <TabsContent value="tablero">
                <div className="rounded-xl border border-dashed bg-muted/30 p-10 text-center">
                  <BarChart3 className="mx-auto h-10 w-10 text-muted-foreground" />
                  <p className="mt-3 text-sm font-medium text-foreground">Reportes próximamente</p>
                  <p className="mt-1 text-xs text-muted-foreground max-w-md mx-auto">
                    Los gráficos, KPIs y tableros de reportes se integrarán cuando el backend esté disponible.
                  </p>
                  <div className="flex items-center justify-center gap-2 mt-4 text-xs text-muted-foreground">
                    <Clock className="h-3.5 w-3.5" />
                    <span>Funcionalidad pendiente de conexión con servicios</span>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="exportar">
                <div className="rounded-xl border border-dashed bg-muted/30 p-10 text-center text-sm text-muted-foreground">
                  Exportaciones a CSV, PDF y Excel disponibles próximamente.
                </div>
              </TabsContent>
              <TabsContent value="programados">
                <div className="rounded-xl border border-dashed bg-muted/30 p-10 text-center text-sm text-muted-foreground">
                  Reportes programados y automáticos pendientes de implementación.
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </WmsLayout>
  );
}