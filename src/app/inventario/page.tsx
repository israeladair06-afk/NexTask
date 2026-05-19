'use client';

import { motion } from 'framer-motion';
import { Package, Search, Filter, Plus, Clock, Database } from 'lucide-react';
import { WmsLayout } from '@/components/wms-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/boton';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function InventarioPage() {
  return (
    <WmsLayout>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <div className="flex items-center gap-3 mb-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Package className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Inventario</h1>
            <p className="text-muted-foreground">Gestión de inventario, stock y existencias del almacén.</p>
          </div>
        </div>
      </motion.div>

      {/* Search & Actions */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.1 }} className="mt-6 mb-6">
        <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Buscar por SKU, nombre o ubicación..." className="pl-9 h-10" />
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <Button variant="outline" size="sm" className="gap-2">
              <Filter className="h-4 w-4" />
              Filtros
            </Button>
            <Button size="sm" className="gap-2">
              <Plus className="h-4 w-4" />
              Nuevo Producto
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Tabs & Placeholder */}
      <Tabs defaultValue="todos">
        <TabsList className="mb-4">
          <TabsTrigger value="todos">Todos los productos</TabsTrigger>
          <TabsTrigger value="bajo-stock">Stock bajo</TabsTrigger>
          <TabsTrigger value="movimientos">Movimientos</TabsTrigger>
        </TabsList>
        <TabsContent value="todos">
          <Card>
            <CardContent className="p-10 text-center">
              <Database className="mx-auto h-10 w-10 text-muted-foreground" />
              <p className="mt-3 text-sm font-medium text-foreground">Sin productos registrados</p>
              <p className="mt-1 text-xs text-muted-foreground max-w-md mx-auto">
                El listado de productos aparecerá aquí una vez que el backend esté conectado.
                Los datos se cargarán dinámicamente desde el sistema de gestión de inventario.
              </p>
              <div className="flex items-center justify-center gap-2 mt-4 text-xs text-muted-foreground">
                <Clock className="h-3.5 w-3.5" />
                <span>Pendiente de integración con servicios</span>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="bajo-stock">
          <Card><CardContent className="p-10 text-center text-sm text-muted-foreground">No hay productos con stock bajo registrados.</CardContent></Card>
        </TabsContent>
        <TabsContent value="movimientos">
          <Card><CardContent className="p-10 text-center text-sm text-muted-foreground">El historial de movimientos estará disponible próximamente.</CardContent></Card>
        </TabsContent>
      </Tabs>

      {/* Stats */}
      <div className="mt-6 grid gap-3 sm:grid-cols-3">
        {[
          { label: 'Total SKUs', value: '—' },
          { label: 'Ubicaciones ocupadas', value: '—' },
          { label: 'Productos bajo stock', value: '—' },
        ].map((stat) => (
          <Card key={stat.label}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-muted-foreground">{stat.label}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{stat.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </WmsLayout>
  );
}