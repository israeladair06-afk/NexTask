'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  Package,
  LayoutDashboard,
  Warehouse,
  ArrowRight,
  Clock,
} from 'lucide-react';
import { WmsLayout } from '@/components/wms-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/boton';
import { Badge } from '@/components/ui/badge';
import { MODULOS_WMS } from '@/config/navegacion';

const stats = [
  { label: 'Órdenes activas', value: '—', desc: 'Pendiente de integración con backend' },
  { label: 'SKUs en inventario', value: '—', desc: 'Pendiente de integración con backend' },
  { label: 'Alertas activas', value: '3', desc: 'Notificaciones del sistema' },
  { label: 'Operaciones hoy', value: '—', desc: 'Pendiente de integración con backend' },
];

const accesosRapidos = MODULOS_WMS.filter((m) => m.estado === 'activo').slice(0, 6);

export default function LobbyPage() {
  return (
    <WmsLayout>
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <div className="rounded-2xl border bg-gradient-to-br from-card via-card to-primary/5 p-8 shadow-sm">
          <div className="flex items-start justify-between">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Warehouse className="h-5 w-5 text-primary" />
                <span className="text-xs font-medium uppercase tracking-widest text-primary">
                  Centro de Control WMS
                </span>
              </div>
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Bienvenido a NexTask
              </h1>
              <p className="max-w-2xl text-muted-foreground leading-relaxed">
                Plataforma Enterprise de Gestión de Almacenes. Seleccione un módulo para comenzar
                o diríjase al Dashboard para una vista general del sistema.
              </p>
              <div className="flex flex-wrap gap-3 pt-2">
                <Link href="/dashboard">
                  <Button className="gap-2">
                    <LayoutDashboard className="h-4 w-4" />
                    Ir al Dashboard
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/inventario">
                  <Button variant="outline" className="gap-2">
                    <Package className="h-4 w-4" />
                    Gestionar Inventario
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Quick Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
      >
        {stats.map((stat) => (
          <Card key={stat.label} className="transition-all hover:border-primary/30 hover:shadow-md">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.label}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{stat.value}</p>
              <p className="mt-1 text-xs text-muted-foreground">{stat.desc}</p>
            </CardContent>
          </Card>
        ))}
      </motion.div>

      {/* Quick Access Modules */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Acceso Rápido a Módulos</h2>
          <Link href="/dashboard" className="text-sm text-primary hover:underline flex items-center gap-1">
            Ver todos <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          {accesosRapidos.map((modulo, i) => {
            const Icono = modulo.icono;
            return (
              <motion.div
                key={modulo.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 + i * 0.05 }}
              >
                <Link href={modulo.href}>
                  <Card className="group cursor-pointer transition-all hover:border-primary/40 hover:shadow-md h-full">
                    <CardContent className="p-5">
                      <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary transition-transform group-hover:scale-110">
                        <Icono className="h-5 w-5" />
                      </div>
                      <CardTitle className="text-sm mb-1">{modulo.nombre}</CardTitle>
                      <CardDescription className="text-xs line-clamp-2">
                        {modulo.descripcion}
                      </CardDescription>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Pending Modules */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Módulos en Preparación</h2>
          <Badge variant="warning" className="text-xs">
            Próximamente
          </Badge>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {MODULOS_WMS.filter((m) => m.estado !== 'activo').map((modulo, i) => {
            const Icono = modulo.icono;
            return (
              <motion.div
                key={modulo.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.2 + i * 0.03 }}
              >
                <Card className="opacity-60 hover:opacity-80 transition-opacity">
                  <CardContent className="p-4 flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted">
                      <Icono className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium truncate">{modulo.nombre}</p>
                      <p className="text-xs text-muted-foreground truncate">{modulo.descripcion}</p>
                    </div>
                    <Badge variant="outline" className="shrink-0 text-[9px]">
                      {modulo.estado === 'preparado' ? 'Pendiente' : 'Pronto'}
                    </Badge>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Footer note */}
      <div className="mt-8 rounded-xl border border-dashed bg-card/30 p-6 text-center">
        <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
          <Clock className="h-4 w-4" />
          <span>
            Los datos mostrados son representativos. La lógica de negocio y conexión con backend
            se integrará en fases posteriores.
          </span>
        </div>
      </div>
    </WmsLayout>
  );
}