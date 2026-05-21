'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Package, Search, Filter, Plus, Clock, Database,
  ArrowUpDown, MoreHorizontal, CircleDot, TrendingUp,
  TrendingDown, AlertTriangle, BarChart3,
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
import {
  DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/cn';
import type { ProductoResumen } from '@/types/wms';

/* ───────────────────────────────────────
   Mock data — Inventario
   TODO: Backend endpoint para inventario
   TODO: Real-time inventory stream pending backend
   ─────────────────────────────────────── */

const PRODUCTOS_MOCK: ProductoResumen[] = [
  { sku: 'SKU-8842', nombre: 'Caja Tornillos M8 x 100', categoria: 'Ferretería', stock: 1240, ubicacion: 'A1-01', estado: 'disponible' },
  { sku: 'SKU-2391', nombre: 'Sensor Temperatura T200', categoria: 'Electrónica', stock: 48, ubicacion: 'A1-05', estado: 'disponible' },
  { sku: 'SKU-5610', nombre: 'Kit Juntas Hidráulicas', categoria: 'Industrial', stock: 80, ubicacion: 'B1-03', estado: 'disponible' },
  { sku: 'SKU-7734', nombre: 'Rodamiento SKF 6205', categoria: 'Industrial', stock: 300, ubicacion: 'A2-08', estado: 'disponible' },
  { sku: 'SKU-1209', nombre: 'Filtro Aceite F-450', categoria: 'Automotriz', stock: 12, ubicacion: 'C1-02', estado: 'bajo_stock' },
  { sku: 'SKU-3312', nombre: 'Válvula Solenoide 24V', categoria: 'Electrónica', stock: 60, ubicacion: 'B1-07', estado: 'disponible' },
  { sku: 'SKU-6654', nombre: 'Cinta Transportadora 3m', categoria: 'Industrial', stock: 6, ubicacion: 'B2-04', estado: 'bajo_stock' },
  { sku: 'SKU-4410', nombre: 'Actuador Neumático', categoria: 'Industrial', stock: 0, ubicacion: '—', estado: 'agotado' },
  { sku: 'SKU-5578', nombre: 'Sensor Óptico O500', categoria: 'Electrónica', stock: 85, ubicacion: 'A2-12', estado: 'disponible' },
  { sku: 'SKU-9901', nombre: 'Cable Industrial 10mm', categoria: 'Eléctrico', stock: 500, ubicacion: 'C1-09', estado: 'disponible' },
  { sku: 'SKU-2234', nombre: 'Motor DC 24V 200W', categoria: 'Electrónica', stock: 24, ubicacion: 'B1-11', estado: 'disponible' },
  { sku: 'SKU-6721', nombre: 'Resistencia Calefactora', categoria: 'Eléctrico', stock: 150, ubicacion: 'C2-03', estado: 'disponible' },
  { sku: 'SKU-3387', nombre: 'Válvula Mariposa 4"', categoria: 'Industrial', stock: 0, ubicacion: '—', estado: 'agotado' },
  { sku: 'SKU-8102', nombre: 'Filtro de Aire Industrial', categoria: 'Industrial', stock: 30, ubicacion: 'B2-08', estado: 'en_transito' },
  { sku: 'SKU-4499', nombre: 'PLC ControlLogix 5580', categoria: 'Electrónica', stock: 5, ubicacion: 'A1-03', estado: 'bajo_stock' },
  { sku: 'SKU-5500', nombre: 'Terminal Touchscreen 15"', categoria: 'Electrónica', stock: 18, ubicacion: 'A2-06', estado: 'disponible' },
];

const FLUJO_INVENTARIO = [
  { label: 'Recepción', href: '/recepcion', completado: true },
  { label: 'Inventario', href: '/inventario', completado: true },
  { label: 'Mapeo Bodega', href: '/mapeo-bodega' },
  { label: 'Picking', href: '/picking' },
  { label: 'Packing', href: '/packing' },
  { label: 'Despacho', href: '/despacho' },
];

const CATEGORIAS = ['Todas', 'Ferretería', 'Electrónica', 'Industrial', 'Automotriz', 'Eléctrico'];

export default function InventarioPage() {
  const [busqueda, setBusqueda] = useState('');
  const [filtroEstado, setFiltroEstado] = useState<string>('todos');
  const [filtroCategoria, setFiltroCategoria] = useState('Todas');
  const [ordenStock, setOrdenStock] = useState<'asc' | 'desc' | null>(null);

  const filtrarProductos = () => {
    let items = PRODUCTOS_MOCK;

    if (busqueda) {
      const q = busqueda.toLowerCase();
      items = items.filter(p => p.sku.toLowerCase().includes(q) || p.nombre.toLowerCase().includes(q));
    }

    if (filtroEstado !== 'todos') {
      items = items.filter(p => p.estado === filtroEstado);
    }

    if (filtroCategoria !== 'Todas') {
      items = items.filter(p => p.categoria === filtroCategoria);
    }

    if (ordenStock === 'asc') items.sort((a, b) => a.stock - b.stock);
    else if (ordenStock === 'desc') items.sort((a, b) => b.stock - a.stock);

    return items;
  };

  const productosFiltrados = filtrarProductos();

  const stats = {
    totalSKU: PRODUCTOS_MOCK.length,
    totalStock: PRODUCTOS_MOCK.reduce((a, p) => a + p.stock, 0),
    bajoStock: PRODUCTOS_MOCK.filter(p => p.estado === 'bajo_stock').length,
    agotados: PRODUCTOS_MOCK.filter(p => p.estado === 'agotado').length,
    enTransito: PRODUCTOS_MOCK.filter(p => p.estado === 'en_transito').length,
  };

  return (
    <WmsLayout>
      <ModuleHeader
        titulo="Inventario"
        descripcion="Gestión de stock, existencias y control de inventario del almacén."
        icono={Package}
        badge={{ texto: 'Base de datos simulada', variant: 'warning' }}
        stats={[
          { label: 'Total SKUs', valor: String(stats.totalSKU) },
          { label: 'Stock total', valor: stats.totalStock.toLocaleString() },
          { label: 'Bajo stock', valor: String(stats.bajoStock) },
        ]}
      />

      <FlowNavigator pasos={FLUJO_INVENTARIO} pasoActual="/inventario" />

      {/* ── Stats Cards ── */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 my-3">
        {[
          { label: 'Total SKUs', valor: String(stats.totalSKU), icon: Package, color: 'text-blue-500', bg: 'bg-blue-500/10' },
          { label: 'Stock Total', valor: stats.totalStock.toLocaleString(), icon: Database, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
          { label: 'Bajo Stock', valor: String(stats.bajoStock), icon: TrendingDown, color: 'text-amber-500', bg: 'bg-amber-500/10' },
          { label: 'Agotados', valor: String(stats.agotados), icon: AlertTriangle, color: 'text-red-500', bg: 'bg-red-500/10' },
          { label: 'En Tránsito', valor: String(stats.enTransito), icon: TrendingUp, color: 'text-violet-500', bg: 'bg-violet-500/10' },
        ].map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.label} className="transition-all hover:border-primary/20">
              <CardContent className="p-3">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-medium text-muted-foreground">{stat.label}</span>
                  <div className={cn('rounded-md p-1', stat.bg)}>
                    <Icon className={cn('h-3 w-3', stat.color)} />
                  </div>
                </div>
                <p className="text-lg font-bold">{stat.valor}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* ── Filtros y búsqueda ── */}
      <Card className="mb-3">
        <CardContent className="p-3">
          <div className="flex flex-col sm:flex-row gap-2 items-start sm:items-center justify-between mb-2">
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
              <Input
                placeholder="Buscar por SKU, nombre..."
                className="pl-8 h-8 text-[11px]"
                value={busqueda}
                onChange={e => setBusqueda(e.target.value)}
              />
            </div>
            <div className="flex gap-1.5 w-full sm:w-auto">
              <Button variant="outline" size="sm" className="h-7 text-[10px] gap-1 px-2">
                <Filter className="h-3 w-3" /> Filtros
              </Button>
              <Button size="sm" className="h-7 text-[10px] gap-1 px-2">
                <Plus className="h-3 w-3" /> Nuevo Producto
              </Button>
            </div>
          </div>

          {/* Filtros rápidos */}
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-[9px] text-muted-foreground mr-1">Estado:</span>
            {['todos', 'disponible', 'bajo_stock', 'agotado', 'en_transito'].map(est => (
              <button
                key={est}
                onClick={() => setFiltroEstado(est === filtroEstado ? 'todos' : est)}
                className={cn(
                  'rounded-full px-2 py-0.5 text-[9px] font-medium transition-all border',
                  filtroEstado === est
                    ? 'bg-primary text-primary-foreground border-primary'
                    : 'bg-card text-muted-foreground border-border hover:border-primary/30'
                )}
              >
                {est === 'todos' ? 'Todos' : est === 'bajo_stock' ? 'Bajo Stock' : est === 'en_transito' ? 'En Tránsito' : est.charAt(0).toUpperCase() + est.slice(1)}
              </button>
            ))}
            <Separator orientation="vertical" className="h-4 mx-1" />
            <span className="text-[9px] text-muted-foreground mr-1">Categoría:</span>
            <select
              value={filtroCategoria}
              onChange={e => setFiltroCategoria(e.target.value)}
              className="h-5 rounded-md border bg-card px-1.5 text-[9px] text-muted-foreground"
            >
              {CATEGORIAS.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
        </CardContent>
      </Card>

      {/* ── Tabla Enterprise ── */}
      <Card>
        <ScrollArea className="h-[420px]">
          <div className="min-w-[700px]">
            {/* Header de tabla */}
            <div className="grid grid-cols-[60px_1.5fr_1fr_80px_100px_100px_40px] gap-2 px-3 py-2 text-[9px] font-semibold text-muted-foreground uppercase tracking-wider bg-muted/30 border-b">
              <span>SKU</span>
              <span>Producto</span>
              <span>Categoría</span>
              <span className="text-right">Stock</span>
              <span>Ubicación</span>
              <span>Estado</span>
              <span />
            </div>

            {productosFiltrados.length === 0 ? (
              <EmptyState
                titulo="Sin resultados"
                descripcion="No se encontraron productos con los filtros seleccionados."
                icono={Package}
                className="m-4"
              />
            ) : (
              productosFiltrados.map((prod, idx) => (
                <motion.div
                  key={prod.sku}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.15, delay: idx * 0.01 }}
                  className="grid grid-cols-[60px_1.5fr_1fr_80px_100px_100px_40px] gap-2 px-3 py-2.5 text-[10px] items-center border-b border-border/40 hover:bg-accent/20 transition-colors group"
                >
                  <span className="font-mono font-medium text-[9px]">{prod.sku}</span>
                  <div className="min-w-0">
                    <p className="font-medium truncate">{prod.nombre}</p>
                  </div>
                  <span className="text-muted-foreground">{prod.categoria}</span>
                  <div className="text-right">
                    <span className={cn(
                      'font-semibold',
                      prod.estado === 'bajo_stock' && 'text-amber-500',
                      prod.estado === 'agotado' && 'text-red-500',
                      prod.estado === 'en_transito' && 'text-violet-500',
                    )}>
                      {prod.stock}
                    </span>
                  </div>
                  <span className="font-mono text-[9px] text-muted-foreground">{prod.ubicacion}</span>
                  <StatusBadge estado={prod.estado} dot={false} />
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity">
                        <MoreHorizontal className="h-3 w-3" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="text-[10px]">
                      <DropdownMenuItem className="text-[10px]">Ver detalle</DropdownMenuItem>
                      <DropdownMenuItem className="text-[10px]">Mover ubicación</DropdownMenuItem>
                      <DropdownMenuItem className="text-[10px]">Ajustar stock</DropdownMenuItem>
                      <DropdownMenuItem className="text-[10px]">Historial</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </motion.div>
              ))
            )}
          </div>
        </ScrollArea>
      </Card>

      {/* ── Alertas de inventario ── */}
      <div className="grid gap-3 lg:grid-cols-2 mt-3">
        <Card>
          <CardHeader className="p-3 pb-2">
            <CardTitle className="text-xs flex items-center gap-1.5">
              <AlertTriangle className="h-3 w-3 text-amber-500" />
              Alertas de Stock
            </CardTitle>
            <CardDescription className="text-[9px]">Productos que requieren atención</CardDescription>
          </CardHeader>
          <CardContent className="p-3 pt-0 space-y-1.5">
            {PRODUCTOS_MOCK.filter(p => p.estado === 'bajo_stock' || p.estado === 'agotado').map(prod => (
              <div key={prod.sku} className="flex items-center justify-between rounded-lg border border-border/50 p-2 text-[10px]">
                <div className="flex items-center gap-2 min-w-0">
                  <div className={cn(
                    'h-2 w-2 rounded-full shrink-0',
                    prod.estado === 'agotado' ? 'bg-red-500' : 'bg-amber-500'
                  )} />
                  <div className="min-w-0">
                    <p className="font-medium truncate">{prod.nombre}</p>
                    <p className="text-[9px] text-muted-foreground font-mono">{prod.sku}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className={cn(
                    'font-bold',
                    prod.estado === 'agotado' ? 'text-red-500' : 'text-amber-500'
                  )}>
                    {prod.stock} uds
                  </span>
                  <StatusBadge estado={prod.estado} dot={false} />
                </div>
              </div>
            ))}
            {PRODUCTOS_MOCK.filter(p => p.estado === 'bajo_stock' || p.estado === 'agotado').length === 0 && (
              <p className="text-[10px] text-muted-foreground text-center py-4">No hay alertas de stock activas</p>
            )}
          </CardContent>
        </Card>

        {/* Resumen de categorías */}
        <Card>
          <CardHeader className="p-3 pb-2">
            <CardTitle className="text-xs flex items-center gap-1.5">
              <BarChart3 className="h-3 w-3 text-primary" />
              Resumen por Categoría
            </CardTitle>
            <CardDescription className="text-[9px]">Distribución de productos</CardDescription>
          </CardHeader>
          <CardContent className="p-3 pt-0 space-y-2">
            {['Ferretería', 'Electrónica', 'Industrial', 'Automotriz', 'Eléctrico'].map(cat => {
              const items = PRODUCTOS_MOCK.filter(p => p.categoria === cat);
              const total = items.reduce((a, p) => a + p.stock, 0);
              const maxTotal = Math.max(...['Ferretería', 'Electrónica', 'Industrial', 'Automotriz', 'Eléctrico'].map(c =>
                PRODUCTOS_MOCK.filter(p => p.categoria === c).reduce((a, p) => a + p.stock, 0)
              ));
              return (
                <div key={cat} className="space-y-1">
                  <div className="flex items-center justify-between text-[10px]">
                    <span className="font-medium">{cat}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-muted-foreground">{items.length} SKUs</span>
                      <span className="font-semibold">{total.toLocaleString()} uds</span>
                    </div>
                  </div>
                  <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-blue-500 to-violet-500"
                      style={{ width: `${(total / maxTotal) * 100}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>
      </div>

      {/* Nota de integración */}
      <Card className="bg-muted/10 border-dashed border-border/50 mt-3">
        <CardContent className="p-2.5">
          <div className="flex items-start gap-1.5 text-[9px] text-muted-foreground">
            <Clock className="h-2.5 w-2.5 mt-0.5 shrink-0" />
            <div>
              <p className="font-medium text-foreground mb-0.5">Demo de inventario</p>
              <p>
                {/* TODO: Backend endpoint para inventario */}
                {/* TODO: Real-time inventory stream pending backend */}
                Datos simulados para demostración. Conectar con <code className="bg-muted px-1 rounded">GET /api/inventario</code> para datos en tiempo real.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </WmsLayout>
  );
}