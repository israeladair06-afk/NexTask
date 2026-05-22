'use client';

import { motion } from 'framer-motion';
import { Shield, ShieldCheck, ShieldAlert, Lock, Fingerprint, Clock, Eye, Server } from 'lucide-react';
import { cn } from '@/lib/cn';

interface SecurityBadgeProps {
  tipo?: 'sesion' | 'entorno' | 'huella' | 'log';
  className?: string;
}

export function SecurityBadge({ tipo = 'sesion', className }: SecurityBadgeProps) {
  return (
    <div className={cn('space-y-2', className)}>
      {tipo === 'sesion' && <SesionSegura />}
      {tipo === 'entorno' && <EntornoSeguro />}
      {tipo === 'huella' && <HuellaDigital />}
      {tipo === 'log' && <LogActividad />}
    </div>
  );
}

function SesionSegura() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center gap-2 rounded-lg border border-emerald-500/30 bg-emerald-500/5 p-2.5"
    >
      <div className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-500/20">
        <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[10px] font-medium text-emerald-600 dark:text-emerald-400">Sesión Segura</p>
        <p className="text-[8px] text-muted-foreground truncate">Conexión cifrada TLS 1.3</p>
      </div>
      <motion.div
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="h-2 w-2 rounded-full bg-emerald-500"
      />
    </motion.div>
  );
}

function EntornoSeguro() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center gap-2 rounded-lg border border-blue-500/30 bg-blue-500/5 p-2.5"
    >
      <div className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-500/20">
        <Lock className="h-3.5 w-3.5 text-blue-500" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[10px] font-medium text-blue-600 dark:text-blue-400">Entorno Seguro</p>
        <p className="text-[8px] text-muted-foreground truncate">HTTPS • Proxy seguro • WAF activo</p>
      </div>
    </motion.div>
  );
}

function HuellaDigital() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center gap-2 rounded-lg border border-violet-500/30 bg-violet-500/5 p-2.5"
    >
      <div className="flex h-7 w-7 items-center justify-center rounded-full bg-violet-500/20">
        <Fingerprint className="h-3.5 w-3.5 text-violet-500" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[10px] font-medium text-violet-600 dark:text-violet-400">Huella Digital</p>
        <p className="text-[8px] text-muted-foreground truncate">
          {/* In a real app this would be a real fingerprint */}
          Dispositivo: {typeof navigator !== 'undefined' ? navigator.platform : 'Unknown'}
        </p>
      </div>
    </motion.div>
  );
}

function LogActividad() {
  const logs = [
    { accion: 'Inicio de sesión', hora: 'Hace 5 min', icon: LogIn },
    { accion: 'Acceso a configuración', hora: 'Hace 15 min', icon: Eye },
    { accion: 'Reporte generado', hora: 'Hace 30 min', icon: Server },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-lg border border-border/50 p-2.5 space-y-2"
    >
      <div className="flex items-center gap-1.5 text-[10px] font-medium text-muted-foreground">
        <Clock className="h-3 w-3" />
        <span>Actividad reciente de la sesión</span>
      </div>
      <div className="space-y-1.5">
        {logs.map((log, i) => {
          const Icon = log.icon;
          return (
            <div key={i} className="flex items-center gap-2 text-[9px]">
              <Icon className="h-2.5 w-2.5 text-primary/60" />
              <span className="flex-1 text-muted-foreground">{log.accion}</span>
              <span className="text-muted-foreground/60">{log.hora}</span>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}

function LogIn(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
    </svg>
  );
}

export { SesionSegura, EntornoSeguro, HuellaDigital, LogActividad };