import {
  LayoutDashboard,
  Package,
  Truck,
  ClipboardList,
  ScanLine,
  Route,
  Boxes,
  Tags,
  Map,
  AlertTriangle,
  Cpu,
  BarChart3,
  Settings,
  ArrowRightLeft,
  Bot,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export interface ItemNavegacion {
  nombre: string;
  href: string;
  descripcion: string;
  icono: LucideIcon;
  grupo: 'Operaciones' | 'Inventario' | 'Logística' | 'Monitoreo' | 'Configuración';
  estado: 'activo' | 'preparado' | 'proximamente';
}

export const MODULOS_WMS: ItemNavegacion[] = [
  {
    nombre: 'Dashboard',
    href: '/dashboard',
    descripcion: 'Centro de control y monitoreo general del WMS',
    icono: LayoutDashboard,
    grupo: 'Operaciones',
    estado: 'activo',
  },
  {
    nombre: 'Inventario',
    href: '/inventario',
    descripcion: 'Gestión de inventario, stock y existencias',
    icono: Package,
    grupo: 'Inventario',
    estado: 'activo',
  },
  {
    nombre: 'Recepción',
    href: '/recepcion',
    descripcion: 'Recepción de mercancía y validación de ingreso',
    icono: Truck,
    grupo: 'Operaciones',
    estado: 'activo',
  },
  {
    nombre: 'Picking',
    href: '/picking',
    descripcion: 'Preparación de pedidos y consolidación',
    icono: ClipboardList,
    grupo: 'Logística',
    estado: 'activo',
  },
  {
    nombre: 'Packing',
    href: '/packing',
    descripcion: 'Empaque, embalaje y etiquetado de salida',
    icono: Boxes,
    grupo: 'Logística',
    estado: 'activo',
  },
  {
    nombre: 'Despacho',
    href: '/despacho',
    descripcion: 'Gestión de salidas y envíos',
    icono: ArrowRightLeft,
    grupo: 'Logística',
    estado: 'activo',
  },
  {
    nombre: 'Trazabilidad',
    href: '/trazabilidad',
    descripcion: 'Historial de movimientos y trazabilidad de productos',
    icono: Route,
    grupo: 'Monitoreo',
    estado: 'activo',
  },
  {
    nombre: 'Acondicionamiento',
    href: '/acondicionamiento',
    descripcion: 'Reempaque, reetiquetado y preparación de productos',
    icono: ScanLine,
    grupo: 'Operaciones',
    estado: 'activo',
  },
  {
    nombre: 'Etiquetado',
    href: '/etiquetado',
    descripcion: 'Generación y gestión de etiquetas y códigos',
    icono: Tags,
    grupo: 'Operaciones',
    estado: 'activo',
  },
  {
    nombre: 'Mapeo Bodega',
    href: '/mapeo-bodega',
    descripcion: 'Visualización y gestión del layout de la bodega',
    icono: Map,
    grupo: 'Inventario',
    estado: 'activo',
  },
  {
    nombre: 'Alertas',
    href: '/alertas',
    descripcion: 'Alertas operativas, stock crítico y notificaciones',
    icono: AlertTriangle,
    grupo: 'Monitoreo',
    estado: 'activo',
  },
  {
    nombre: 'Automatización',
    href: '/automatizacion',
    descripcion: 'Reglas de negocio, workflows y automatización',
    icono: Cpu,
    grupo: 'Configuración',
    estado: 'activo',
  },
  {
    nombre: 'Reportes',
    href: '/reportes',
    descripcion: 'KPIs, métricas y reportes operativos',
    icono: BarChart3,
    grupo: 'Monitoreo',
    estado: 'activo',
  },
  {
    nombre: 'ALICE - IA',
    href: '/alice',
    descripcion: 'Asistente operativo inteligente con IA y RAG',
    icono: Bot,
    grupo: 'Monitoreo',
    estado: 'activo',
  },
  {
    nombre: 'Configuración',
    href: '/configuracion',
    descripcion: 'Configuración del sistema y parámetros WMS',
    icono: Settings,
    grupo: 'Configuración',
    estado: 'activo',
  },
];

export const GRUPOS_WMS: ItemNavegacion['grupo'][] = [
  'Operaciones',
  'Inventario',
  'Logística',
  'Monitoreo',
  'Configuración',
];