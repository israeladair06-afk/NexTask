/**
 * Tipos comunes y globales del sistema
 */

// ID universales
export type ID = string | number;

// Estados comunes
export enum EstadoGeneral {
  ACTIVO = 'activo',
  INACTIVO = 'inactivo',
  PENDIENTE = 'pendiente',
  ERROR = 'error',
}

// Respuesta de API estándar
export interface RespuestaAPI<T = unknown> {
  exito: boolean;
  datos?: T;
  error?: string;
  mensaje?: string;
}

// Paginación
export interface ParametrosPaginacion {
  pagina: number;
  limite: number;
  ordenarPor?: string;
  orden?: 'asc' | 'desc';
}

export interface ResultadoPaginado<T> {
  items: T[];
  total: number;
  pagina: number;
  totalPaginas: number;
}

// Usuario (será actualizado por feature auth)
export interface UsuarioBasico {
  id: ID;
  nombre: string;
  email: string;
  avatar?: string;
}

// Filtros comunes
export interface FiltrosBasico {
  busqueda?: string;
  estado?: string;
  fechaDesde?: Date;
  fechaHasta?: Date;
}
