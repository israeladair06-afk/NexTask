'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { Loader2, Package, BarChart3, ScanLine, ClipboardList, Truck, Boxes, Map, AlertTriangle, Settings, UserCog, Route, Tags, Bot } from 'lucide-react';

interface ModuleLoadingConfig {
  mensajes: string[];
  icono: React.ElementType;
}

const MODULE_LOADING_MAP: Record<string, ModuleLoadingConfig> = {
  '/dashboard': {
    mensajes: [
      'Compilando indicadores de rendimiento...',
      'Cargando KPIs del sistema...',
      'Sincronizando métricas operativas...',
      'Preparando panel de control...',
    ],
    icono: BarChart3,
  },
  '/inventario': {
    mensajes: [
      'Consultando base de datos de inventario...',
      'Cargando existencias y ubicaciones...',
      'Sincronizando niveles de stock...',
      'Preparando módulo de inventario...',
    ],
    icono: Package,
  },
  '/picking': {
    mensajes: [
      'Preparando órdenes de picking activas...',
      'Cargando lista de pedidos pendientes...',
      'Sincronizando estaciones de picking...',
      'Optimizando rutas de preparación...',
    ],
    icono: ClipboardList,
  },
  '/packing': {
    mensajes: [
      'Preparando estaciones de empaque...',
      'Cargando órdenes de packing...',
      'Sincronizando materiales de embalaje...',
    ],
    icono: Boxes,
  },
  '/recepcion': {
    mensajes: [
      'Sincronizando recepciones pendientes...',
      'Cargando programación de proveedores...',
      'Preparando muelles de recepción...',
      'Validando documentos de ingreso...',
    ],
    icono: Truck,
  },
  '/despacho': {
    mensajes: [
      'Preparando módulo de despachos...',
      'Cargando rutas de envío...',
      'Sincronizando transportistas...',
      'Generando documentación de salida...',
    ],
    icono: Truck,
  },
  '/trazabilidad': {
    mensajes: [
      'Cargando historial de movimientos...',
      'Indexando trazabilidad de productos...',
      'Preparando línea de tiempo...',
      'Compilando registros de auditoría...',
    ],
    icono: Route,
  },
  '/reportes': {
    mensajes: [
      'Generando reportes analíticos...',
      'Compilando datos de rendimiento...',
      'Preparando visualizaciones...',
      'Exportando métricas del período...',
    ],
    icono: BarChart3,
  },
  '/admin': {
    mensajes: [
      'Cargando panel administrativo...',
      'Verificando permisos de seguridad...',
      'Cargando directorio de empleados...',
      'Preparando dashboard de administración...',
    ],
    icono: UserCog,
  },
  '/alertas': {
    mensajes: [
      'Cargando alertas del sistema...',
      'Verificando umbrales críticos...',
      'Sincronizando notificaciones...',
    ],
    icono: AlertTriangle,
  },
  '/configuracion': {
    mensajes: [
      'Cargando configuración del sistema...',
      'Preparando parámetros ajustables...',
      'Inicializando preferencias...',
    ],
    icono: Settings,
  },
  '/mapeo-bodega': {
    mensajes: [
      'Cargando layout de la bodega...',
      'Renderizando mapa interactivo...',
      'Sincronizando ubicaciones...',
    ],
    icono: Map,
  },
  '/etiquetado': {
    mensajes: [
      'Preparando módulo de etiquetado...',
      'Cargando plantillas de etiquetas...',
      'Inicializando impresoras...',
    ],
    icono: Tags,
  },
  '/acondicionamiento': {
    mensajes: [
      'Preparando zona de acondicionamiento...',
      'Cargando órdenes de reempaque...',
      'Sincronizando materiales...',
    ],
    icono: ScanLine,
  },
  '/alice': {
    mensajes: [
      'Inicializando asistente IA...',
      'Cargando base de conocimiento...',
      'Preparando modelo de lenguaje...',
      'Estableciendo conexión con ALICE...',
    ],
    icono: Bot,
  },
};

const DEFAULT_CONFIG: ModuleLoadingConfig = {
  mensajes: ['Cargando módulo...', 'Preparando interfaz...', 'Inicializando componentes...'],
  icono: Package,
};

export function ModuleLoading({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [mostrarLoading, setMostrarLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [key, setKey] = useState(0);

  const basePath = Object.keys(MODULE_LOADING_MAP).find((p) => pathname?.startsWith(p)) ?? '';
  const config = basePath ? MODULE_LOADING_MAP[basePath] : DEFAULT_CONFIG;

  useEffect(() => {
    setKey((k) => k + 1);
    setMostrarLoading(false);
    setCurrentStep(0);

    // Only show loading if module takes more than 300ms
    const timer = setTimeout(() => {
      setMostrarLoading(true);
    }, 300);

    // Auto-hide after steps complete
    const hideTimer = setTimeout(() => {
      setMostrarLoading(false);
    }, config.mensajes.length * 500 + 800);

    return () => {
      clearTimeout(timer);
      clearTimeout(hideTimer);
    };
  }, [pathname]);

  useEffect(() => {
    if (!mostrarLoading) return;
    if (currentStep >= config.mensajes.length - 1) return;
    const timer = setTimeout(() => setCurrentStep((s) => s + 1), 400 + Math.random() * 300);
    return () => clearTimeout(timer);
  }, [currentStep, mostrarLoading, config.mensajes.length]);

  const Icono = config.icono;

  return (
    <>
      {/* Loading overlay */}
      <AnimatePresence mode="wait">
        {mostrarLoading && (
          <motion.div
            key={`loading-${key}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-background/90 backdrop-blur-sm"
          >
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <motion.div
                className="absolute -top-40 -right-40 h-[400px] w-[400px] rounded-full bg-primary/5 blur-3xl"
                animate={{ scale: [1, 1.2, 0.9, 1], rotate: [0, 30, 0] }}
                transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
              />
              <motion.div
                className="absolute -bottom-40 -left-40 h-[350px] w-[350px] rounded-full bg-primary/8 blur-3xl"
                animate={{ scale: [1, 0.8, 1.1, 1], rotate: [0, -30, 0] }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              />
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="relative z-10 flex flex-col items-center gap-5 max-w-sm w-full px-6"
            >
              {/* Icon */}
              <motion.div
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary shadow-xl shadow-primary/20"
              >
                <Icono className="h-7 w-7 text-primary-foreground" />
              </motion.div>

              <div className="text-center space-y-1">
                <h2 className="text-lg font-bold">Cargando Módulo</h2>
                <p className="text-xs text-muted-foreground">
                  {basePath
                    ? `Preparando ${basePath.replace('/', '')}...`
                    : 'Inicializando sistema...'}
                </p>
              </div>

              {/* Progress */}
              <div className="w-full space-y-3">
                <div className="h-1 w-full rounded-full bg-muted overflow-hidden">
                  <motion.div
                    key={key}
                    className="h-full rounded-full bg-primary"
                    initial={{ width: '0%' }}
                    animate={{
                      width: `${((currentStep + 1) / config.mensajes.length) * 100}%`,
                    }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                  />
                </div>

                <div className="space-y-2.5">
                  {config.mensajes.map((msg, i) => {
                    const isActive = i === currentStep;
                    const isDone = i < currentStep;
                    return (
                      <motion.div
                        key={msg}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{
                          opacity: isDone || isActive ? 1 : 0.4,
                          x: 0,
                        }}
                        transition={{ duration: 0.3 }}
                        className={`flex items-center gap-2.5 text-xs ${
                          isDone
                            ? 'text-emerald-500'
                            : isActive
                              ? 'text-foreground'
                              : 'text-muted-foreground'
                        }`}
                      >
                        <div
                          className={`flex h-5 w-5 items-center justify-center rounded-full ${
                            isDone
                              ? 'bg-emerald-500/20'
                              : isActive
                                ? 'bg-primary/20'
                                : 'bg-muted'
                          }`}
                        >
                          {isDone ? (
                            <svg
                              className="h-3 w-3"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                          ) : (
                            <div
                              className={`h-2 w-2 rounded-full ${
                                isActive ? 'bg-primary' : 'bg-muted-foreground/30'
                              }`}
                            />
                          )}
                        </div>
                        <span className={isActive ? 'font-medium' : ''}>{msg}</span>
                        {isActive && (
                          <Loader2 className="h-3 w-3 animate-spin ml-auto text-primary" />
                        )}
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Content */}
      {children}
    </>
  );
}