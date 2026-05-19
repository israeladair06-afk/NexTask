export interface ModuloWMS {
  id: string;
  nombre: string;
  descripcion: string;
  href: string;
  icono: string;
  grupo: 'Operaciones' | 'Inventario' | 'Logística' | 'Monitoreo' | 'Configuración';
  estado: 'activo' | 'preparado' | 'proximamente';
}

export interface AlertaWMS {
  id: string;
  tipo: 'critico' | 'advertencia' | 'info';
  mensaje: string;
  modulo: string;
  timestamp: string;
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

export interface ProductoResumen {
  sku: string;
  nombre: string;
  categoria: string;
  stock: number;
  ubicacion: string;
  estado: 'disponible' | 'bajo_stock' | 'agotado' | 'en_transito';
}