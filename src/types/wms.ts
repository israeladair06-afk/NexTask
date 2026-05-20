export interface KpiWMS {
  skuTotales: number;
  ordenesActivas: number;
  capacidadOcupada: number;
  alertasCriticas: number;
  ubicacionesTotales: number;
  ubicacionesDisponibles: number;
  pickingPendientes: number;
  packingPendientes: number;
  recepcionesPendientes: number;
  despachosPendientes: number;
}

export interface TareaUrgente {
  id: string;
  tipo: 'picking' | 'packing' | 'recepcion' | 'despacho' | 'inventario';
  titulo: string;
  prioridad: 'critica' | 'alta' | 'media' | 'baja';
  origen: string;
  destino: string;
  fechaLimite: string;
  estado: 'pendiente' | 'en_progreso' | 'completada';
}

export interface AlertaWMS {
  id: string;
  tipo: 'critico' | 'advertencia' | 'info';
  mensaje: string;
  modulo: string;
  timestamp: string;
  prioridad: 1 | 2 | 3;
}

export interface EstadoUbicacion {
  id: string;
  codigo: string;
  zona: string;
  pasillo: string;
  rack: string;
  nivel: string;
  capacidad: number;
  ocupado: number;
  estado: 'disponible' | 'parcial' | 'lleno' | 'bloqueado';
}

export interface ZonaBodega {
  id: string;
  nombre: string;
  color: 'emerald' | 'blue' | 'amber' | 'violet';
  pasillos: number;
  totalUbicaciones: number;
  ocupadas: number;
}

export interface ProductoResumen {
  sku: string;
  nombre: string;
  categoria: string;
  stock: number;
  ubicacion: string;
  estado: 'disponible' | 'bajo_stock' | 'agotado' | 'en_transito';
}

export interface ActividadAlmacen {
  hora: string;
  recepciones: number;
  pickings: number;
  packings: number;
  despachos: number;
}

export interface EstadoSistema {
  version: string;
  frontend: 'completo' | 'parcial';
  backend: 'pendiente' | 'parcial' | 'completo';
  baseDatos: 'pendiente' | 'conectado';
  api: 'no_conectada' | 'conectada';
  ultimaSync: string;
}

export interface ModuloWMS {
  id: string;
  nombre: string;
  descripcion: string;
  href: string;
  icono: string;
  grupo: 'Operaciones' | 'Inventario' | 'Logística' | 'Monitoreo' | 'Configuración';
  estado: 'activo' | 'preparado' | 'proximamente';
}

export interface OcupacionZona {
  zona: string;
  total: number;
  ocupado: number;
  disponible: number;
  porcentajeOcupacion: number;
}

export interface InstruccionPicking {
  id: string;
  orden: string;
  sku: string;
  producto: string;
  cantidad: number;
  ubicacion: string;
  destino: string;
  prioridad: 'normal' | 'urgente' | 'express';
  estado: 'pendiente' | 'asignado' | 'en_curso' | 'completado';
}