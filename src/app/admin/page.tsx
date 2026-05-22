'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  UserCog, Users, Search, Filter, Mail, Phone, MapPin,
  Calendar, Shield, X, ChevronDown, Building2,
  BarChart3,
} from 'lucide-react';
import { WmsLayout } from '@/components/wms-layout';
import { ModuleHeader } from '@/components/shared/ModuleHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/boton';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/cn';
import { EMPLEADOS_MOCK, type Empleado, DEPARTAMENTOS } from '@/features/usuarios/data/empleados';
import { SecurityBadge } from '@/components/shared/SecurityBadge';

const ESTADO_CONFIG: Record<string, { label: string; classes: string }> = {
  activo: { label: 'Activo', classes: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/30 dark:text-emerald-400' },
  inactivo: { label: 'Inactivo', classes: 'bg-red-500/10 text-red-600 border-red-500/30 dark:text-red-400' },
  vacaciones: { label: 'Vacaciones', classes: 'bg-amber-500/10 text-amber-600 border-amber-500/30 dark:text-amber-400' },
};

const ROL_CONFIG = {
  admin: { label: 'Admin', classes: 'bg-purple-500/10 text-purple-600 border-purple-500/30 dark:text-purple-400' },
  operador: { label: 'Operador', classes: 'bg-blue-500/10 text-blue-600 border-blue-500/30 dark:text-blue-400' },
  supervisor: { label: 'Supervisor', classes: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/30 dark:text-emerald-400' },
};

function EmpleadoDetail({ empleado, onClose }: { empleado: Empleado; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.2 }}
        className="relative w-full max-w-lg rounded-2xl border bg-card shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 via-transparent to-transparent pointer-events-none" />
        
        <div className="relative p-6">
          <button
            onClick={onClose}
            className="absolute right-4 top-4 rounded-lg p-1 text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
          >
            <X className="h-4 w-4" />
          </button>

          <div className="flex items-center gap-4 mb-6">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-primary/80 text-primary-foreground text-xl font-bold shadow-lg">
              {empleado.nombre.split(' ').map(n => n[0]).join('').slice(0, 2)}
            </div>
            <div>
              <h2 className="text-lg font-bold">{empleado.nombre}</h2>
              <p className="text-sm text-muted-foreground">{empleado.cargo}</p>
              <div className="flex gap-1.5 mt-1">
                <Badge variant="outline" className={cn('text-[9px] h-4.5 px-1.5 border', ESTADO_CONFIG[empleado.estado].classes)}>
                  {ESTADO_CONFIG[empleado.estado].label}
                </Badge>
                <Badge variant="outline" className={cn('text-[9px] h-4.5 px-1.5 border', ROL_CONFIG[empleado.rol].classes)}>
                  {ROL_CONFIG[empleado.rol].label}
                </Badge>
              </div>
            </div>
          </div>

          <Separator className="mb-4" />

          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div className="flex items-center gap-2 text-[11px]">
                <Mail className="h-3.5 w-3.5 text-primary/60" />
                <span className="text-muted-foreground truncate">{empleado.email}</span>
              </div>
              <div className="flex items-center gap-2 text-[11px]">
                <Phone className="h-3.5 w-3.5 text-primary/60" />
                <span className="text-muted-foreground">{empleado.telefono}</span>
              </div>
              <div className="flex items-center gap-2 text-[11px]">
                <Building2 className="h-3.5 w-3.5 text-primary/60" />
                <span className="text-muted-foreground">{empleado.departamento}</span>
              </div>
              <div className="flex items-center gap-2 text-[11px]">
                <Calendar className="h-3.5 w-3.5 text-primary/60" />
                <span className="text-muted-foreground">Ingreso: {empleado.fechaIngreso}</span>
              </div>
              <div className="flex items-center gap-2 text-[11px] col-span-2">
                <MapPin className="h-3.5 w-3.5 text-primary/60" />
                <span className="text-muted-foreground truncate">{empleado.ubicacion}</span>
              </div>
            </div>

            <Separator />

            <div>
              <p className="text-[10px] font-semibold text-muted-foreground mb-2 flex items-center gap-1">
                <Shield className="h-3 w-3" />
                Permisos del Sistema
              </p>
              <div className="flex flex-wrap gap-1.5">
                {empleado.permisos.map((perm) => (
                  <Badge
                    key={perm}
                    variant="outline"
                    className="text-[8px] h-4 px-1.5 border-primary/20 bg-primary/5"
                  >
                    {perm}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function AdminPage() {
  const [busqueda, setBusqueda] = useState('');
  const [departamentoFiltro, setDepartamentoFiltro] = useState<string>('todos');
  const [estadoFiltro, setEstadoFiltro] = useState<string>('todos');
  const [empleadoSeleccionado, setEmpleadoSeleccionado] = useState<Empleado | null>(null);

  const empleadosFiltrados = useMemo(() => {
    return EMPLEADOS_MOCK.filter((emp) => {
      if (busqueda && !emp.nombre.toLowerCase().includes(busqueda.toLowerCase()) &&
          !emp.email.toLowerCase().includes(busqueda.toLowerCase()) &&
          !emp.cargo.toLowerCase().includes(busqueda.toLowerCase())) {
        return false;
      }
      if (departamentoFiltro !== 'todos' && emp.departamento !== departamentoFiltro) return false;
      if (estadoFiltro !== 'todos' && emp.estado !== estadoFiltro) return false;
      return true;
    });
  }, [busqueda, departamentoFiltro, estadoFiltro]);

  const stats = useMemo(() => ({
    total: EMPLEADOS_MOCK.length,
    activos: EMPLEADOS_MOCK.filter(e => e.estado === 'activo').length,
    porDepartamento: DEPARTAMENTOS.map(d => ({
      departamento: d,
      count: EMPLEADOS_MOCK.filter(e => e.departamento === d).length,
    })),
  }), []);

  return (
    <WmsLayout>
      <ModuleHeader
        titulo="Administración"
        descripcion="Panel de administración de empleados, departamentos y permisos del sistema."
        icono={UserCog}
        badge={{ texto: 'Admin', variant: 'secondary' }}
        stats={[
          { label: 'Total Empleados', valor: String(stats.total) },
          { label: 'Activos', valor: String(stats.activos) },
          { label: 'Departamentos', valor: String(DEPARTAMENTOS.length) },
        ]}
      />

      {/* KPIs */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-3"
      >
        {stats.porDepartamento.map((depto, i) => (
          <motion.div
            key={depto.departamento}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2, delay: i * 0.03 }}
          >
            <Card className="border-border/60">
              <CardContent className="p-3">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-medium text-muted-foreground truncate">{depto.departamento}</span>
                  <Building2 className="h-3 w-3 text-primary/40" />
                </div>
                <p className="text-lg font-bold">{depto.count}</p>
                <p className="text-[9px] text-muted-foreground">
                  {Math.round((depto.count / stats.total) * 100)}% del total
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      <div className="grid gap-3 lg:grid-cols-[1fr_280px]">
        {/* Main: Employee Table */}
        <div className="space-y-3">
          {/* Filters */}
          <Card>
            <CardContent className="p-3">
              <div className="flex flex-wrap items-center gap-2">
                <div className="relative flex-1 min-w-[200px]">
                  <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                  <Input
                    placeholder="Buscar por nombre, email o cargo..."
                    value={busqueda}
                    onChange={(e) => setBusqueda(e.target.value)}
                    className="pl-8 h-8 text-[11px]"
                  />
                </div>
                <select
                  value={departamentoFiltro}
                  onChange={(e) => setDepartamentoFiltro(e.target.value)}
                  className="h-8 rounded-lg border border-input bg-card px-2.5 text-[10px] focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  <option value="todos">Todos los departamentos</option>
                  {DEPARTAMENTOS.map((d) => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
                <select
                  value={estadoFiltro}
                  onChange={(e) => setEstadoFiltro(e.target.value)}
                  className="h-8 rounded-lg border border-input bg-card px-2.5 text-[10px] focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  <option value="todos">Todos los estados</option>
                  <option value="activo">Activo</option>
                  <option value="inactivo">Inactivo</option>
                  <option value="vacaciones">Vacaciones</option>
                </select>
                <Button size="sm" variant="outline" className="h-8 text-[10px] gap-1 px-2">
                  <Filter className="h-3 w-3" />
                  Filtros
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Employee list */}
          <Card>
            <ScrollArea className="h-[460px]">
              <div className="p-1 space-y-1">
                {empleadosFiltrados.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <Users className="h-10 w-10 text-muted-foreground/30 mb-3" />
                    <p className="text-sm font-medium text-muted-foreground">No se encontraron empleados</p>
                    <p className="text-[10px] text-muted-foreground/60">Intenta con otros filtros de búsqueda</p>
                  </div>
                ) : (
                  empleadosFiltrados.map((emp, idx) => (
                    <motion.div
                      key={emp.id}
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.15, delay: idx * 0.015 }}
                      onClick={() => setEmpleadoSeleccionado(emp)}
                      className="flex items-center gap-3 rounded-lg border border-border/50 p-2.5 hover:bg-accent/30 transition-colors cursor-pointer"
                    >
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 text-primary text-xs font-bold">
                        {emp.nombre.split(' ').map(n => n[0]).join('').slice(0, 2)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="text-[11px] font-semibold">{emp.nombre}</span>
                          <Badge variant="outline" className={cn('text-[8px] h-3.5 px-1 border', ROL_CONFIG[emp.rol].classes)}>
                            {ROL_CONFIG[emp.rol].label}
                          </Badge>
                          <Badge variant="outline" className={cn('text-[8px] h-3.5 px-1 border', ESTADO_CONFIG[emp.estado].classes)}>
                            {ESTADO_CONFIG[emp.estado].label}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2 text-[9px] text-muted-foreground mt-0.5">
                          <span>{emp.cargo}</span>
                          <span>•</span>
                          <span>{emp.departamento}</span>
                          <span>•</span>
                          <span>{emp.email}</span>
                        </div>
                      </div>
                      <ChevronDown className="h-3.5 w-3.5 text-muted-foreground shrink-0 -rotate-90" />
                    </motion.div>
                  ))
                )}
              </div>
            </ScrollArea>
          </Card>
        </div>

        {/* Sidebar: Security & Info */}
        <div className="space-y-3">
          <Card>
            <CardHeader className="p-3 pb-2">
              <CardTitle className="text-xs flex items-center gap-1.5">
                <Shield className="h-3 w-3 text-primary" />
                Seguridad del Sistema
              </CardTitle>
            </CardHeader>
            <CardContent className="p-3 pt-0 space-y-2">
              <SecurityBadge tipo="sesion" />
              <SecurityBadge tipo="entorno" />
              <SecurityBadge tipo="huella" />
              <SecurityBadge tipo="log" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="p-3 pb-2">
              <CardTitle className="text-xs flex items-center gap-1.5">
                <BarChart3 className="h-3 w-3 text-primary" />
                Resumen Rápido
              </CardTitle>
            </CardHeader>
            <CardContent className="p-3 pt-0 space-y-1.5 text-[10px]">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Total empleados</span>
                <span className="font-semibold">{stats.total}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Activos ahora</span>
                <span className="font-semibold text-emerald-500">{stats.activos}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Inactivos</span>
                <span className="font-semibold text-red-500">
                  {EMPLEADOS_MOCK.filter(e => e.estado === 'inactivo').length}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">En vacaciones</span>
                <span className="font-semibold text-amber-500">
                  {EMPLEADOS_MOCK.filter(e => e.estado === 'vacaciones').length}
                </span>
              </div>
              <Separator className="opacity-50" />
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Departamentos</span>
                <span className="font-semibold">{DEPARTAMENTOS.length}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Modal de detalle */}
      <AnimatePresence>
        {empleadoSeleccionado && (
          <EmpleadoDetail
            empleado={empleadoSeleccionado}
            onClose={() => setEmpleadoSeleccionado(null)}
          />
        )}
      </AnimatePresence>
    </WmsLayout>
  );
}