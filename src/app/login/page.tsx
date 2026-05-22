'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Package, ArrowRight, Loader2, Warehouse, Shield, Cpu, TrendingUp, Globe, Lock, UserCheck } from 'lucide-react';
import { cn } from '@/lib/cn';
import { useAuth, type RolUsuario } from '@/features/usuarios/AuthContext';

const ROLES: { rol: RolUsuario; label: string; desc: string; icono: React.ComponentType<{ className?: string }>; color: string }[] = [
  { rol: 'admin', label: 'Administrador', desc: 'Control total del sistema WMS', icono: Shield, color: 'from-violet-600 to-indigo-600' },
  { rol: 'supervisor', label: 'Supervisor', desc: 'Supervisión de operaciones', icono: UserCheck, color: 'from-blue-600 to-cyan-600' },
  { rol: 'operador', label: 'Operador', desc: 'Operaciones de almacén', icono: Package, color: 'from-emerald-600 to-teal-600' },
];

const STEPS = [
  { text: 'Conectando base de datos', icon: Cpu },
  { text: 'Verificando credenciales', icon: Shield },
  { text: 'Sincronizando sistema', icon: Globe },
  { text: 'Cargando módulos WMS', icon: Package },
];

export default function LoginPage() {
  const router = useRouter();
  const { iniciarSesion, estaAutenticado } = useAuth();
  const [rolSeleccionado, setRolSeleccionado] = useState<RolUsuario | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [showSteps, setShowSteps] = useState(false);

  useEffect(() => {
    if (estaAutenticado) router.push('/lobby');
  }, [estaAutenticado, router]);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!rolSeleccionado) return;

    setIsLoading(true);
    setShowSteps(true);
    setCurrentStep(0);

    for (let i = 0; i < STEPS.length; i++) {
      await new Promise(r => setTimeout(r, 500 + Math.random() * 400));
      setCurrentStep(i + 1);
    }

    await new Promise(r => setTimeout(r, 300));
    iniciarSesion(rolSeleccionado);
  }, [rolSeleccionado, iniciarSesion]);

  return (
    <div className="relative min-h-screen flex overflow-hidden bg-slate-950">
      {/* ── Fondo animado azul profesional ── */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Gradiente base */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-950 via-indigo-950 to-slate-950" />
        
        {/* Olas animadas */}
        <motion.div
          className="absolute -bottom-40 left-0 right-0 h-[500px] opacity-30"
          style={{
            background: 'radial-gradient(ellipse at 50% 100%, rgba(59,130,246,0.3) 0%, transparent 70%)',
          }}
          animate={{ 
            scale: [1, 1.03, 0.98, 1],
            y: [0, -10, 5, 0],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute -bottom-20 left-0 right-0 h-[400px] opacity-20"
          style={{
            background: 'radial-gradient(ellipse at 30% 100%, rgba(99,102,241,0.4) 0%, transparent 60%)',
          }}
          animate={{ 
            scale: [1, 0.95, 1.05, 1],
            y: [0, 15, -5, 0],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        />

        {/* Círculos decorativos animados */}
        <motion.div
          className="absolute -top-60 -right-60 h-[600px] w-[600px] rounded-full opacity-15"
          style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.4) 0%, transparent 70%)' }}
          animate={{ scale: [1, 1.2, 0.9, 1], rotate: [0, 45, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div
          className="absolute -bottom-60 -left-60 h-[500px] w-[500px] rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.3) 0%, transparent 70%)' }}
          animate={{ scale: [1, 0.8, 1.1, 1], rotate: [0, -30, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
        />

        {/* Grid de patrón */}
        <div 
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%236366f1' fill-opacity='0.3'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />

        {/* Líneas de conexión (efecto red) */}
        <svg className="absolute inset-0 w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="line-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0" />
              <stop offset="50%" stopColor="#6366f1" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
            </linearGradient>
          </defs>
          <motion.path
            d="M0,100 Q150,50 300,150 T600,100 T900,200"
            stroke="url(#line-grad)"
            strokeWidth="1"
            fill="none"
            animate={{ d: [
              "M0,100 Q150,50 300,150 T600,100 T900,200",
              "M0,120 Q150,80 300,130 T600,90 T900,180",
              "M0,100 Q150,50 300,150 T600,100 T900,200",
            ]}}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.path
            d="M0,250 Q200,200 400,280 T700,220 T900,300"
            stroke="url(#line-grad)"
            strokeWidth="1"
            fill="none"
            animate={{ d: [
              "M0,250 Q200,200 400,280 T700,220 T900,300",
              "M0,270 Q200,230 400,260 T700,240 T900,320",
              "M0,250 Q200,200 400,280 T700,220 T900,300",
            ]}}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          />
        </svg>

        {/* Partículas flotantes */}
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-1 w-1 rounded-full bg-blue-400/30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0, 0.5, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      {/* ── Panel izquierdo: Formulario ── */}
      <div className="relative z-10 flex-1 flex items-center justify-center p-6 lg:p-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="w-full max-w-md"
        >
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex items-center gap-3 mb-8"
          >
            <motion.div
              whileHover={{ rotate: -10, scale: 1.05 }}
              className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg shadow-blue-500/30"
            >
              <Package className="h-6 w-6 text-white" />
            </motion.div>
            <div>
              <h1 className="text-xl font-bold text-white tracking-tight">NexTask WMS</h1>
              <p className="text-[11px] text-blue-300/70">Sistema Corporativo Seguro</p>
            </div>
          </motion.div>

          {!showSteps ? (
            <>
              {/* Título */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="mb-6"
              >
                <h2 className="text-2xl font-bold text-white mb-1">Acceso al Sistema</h2>
                <p className="text-sm text-blue-300/60">Seleccione su rol para ingresar al WMS</p>
              </motion.div>

              {/* Role Selector */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="space-y-2.5 mb-6"
              >
                {ROLES.map((rol, i) => {
                  const Icono = rol.icono;
                  const isSelected = rolSeleccionado === rol.rol;
                  return (
                    <motion.button
                      key={rol.rol}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.3 + i * 0.08 }}
                      onClick={() => setRolSeleccionado(rol.rol)}
                      className={cn(
                        'relative w-full text-left rounded-xl border p-3.5 transition-all group overflow-hidden',
                        isSelected
                          ? 'border-blue-500/50 bg-blue-500/10 shadow-lg shadow-blue-500/10'
                          : 'border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20'
                      )}
                    >
                      {/* Glow on selected */}
                      {isSelected && (
                        <motion.div
                          layoutId="roleGlow"
                          className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-indigo-500/5 to-transparent"
                        />
                      )}

                      <div className="relative flex items-center gap-3.5">
                        <div className={cn(
                          'flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br shadow-lg transition-transform group-hover:scale-105',
                          rol.color
                        )}>
                          <Icono className="h-5 w-5 text-white" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <p className="text-sm font-semibold text-white">{rol.label}</p>
                            {isSelected && (
                              <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="flex h-4 w-4 items-center justify-center rounded-full bg-blue-500"
                              >
                                <svg className="h-2.5 w-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                </svg>
                              </motion.div>
                            )}
                          </div>
                          <p className="text-[11px] text-blue-300/50">{rol.desc}</p>
                        </div>
                      </div>
                    </motion.button>
                  );
                })}
              </motion.div>

              {/* Botón de ingreso */}
              {rolSeleccionado && (
                <motion.form
                  key={rolSeleccionado}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  onSubmit={handleSubmit}
                >
                  <motion.button
                    type="submit"
                    disabled={isLoading}
                    whileTap={{ scale: 0.98 }}
                    className="relative w-full h-11 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm font-semibold shadow-lg shadow-blue-500/30 hover:shadow-blue-500/40 transition-all overflow-hidden group disabled:opacity-50"
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                      animate={{ x: ['-100%', '200%'] }}
                      transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                    />
                    <span className="relative flex items-center justify-center gap-2">
                      {isLoading ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <>
                          Ingresar al sistema
                          <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                        </>
                      )}
                    </span>
                  </motion.button>
                </motion.form>
              )}

              {/* Footer */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="mt-6 text-[11px] text-blue-300/30 text-center"
              >
                Al ingresar acepta los términos y condiciones del sistema NexTask WMS.
              </motion.p>
            </>
          ) : (
            /* ── Steps de carga ── */
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-6"
            >
              <div className="text-center">
                <motion.div
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 shadow-xl shadow-blue-500/30 mb-4"
                >
                  <Lock className="h-8 w-8 text-white" />
                </motion.div>
                <h2 className="text-lg font-bold text-white">Iniciando Sesión</h2>
                <p className="text-xs text-blue-300/60 mt-1">
                  {rolSeleccionado === 'admin' ? 'Administrador' : rolSeleccionado === 'supervisor' ? 'Supervisor' : 'Operador'}
                </p>
              </div>

              <div className="w-full space-y-3">
                <div className="h-1 w-full rounded-full bg-white/10 overflow-hidden">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-blue-500 to-indigo-500"
                    initial={{ width: '0%' }}
                    animate={{ width: `${(currentStep / STEPS.length) * 100}%` }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                  />
                </div>

                <div className="space-y-2.5">
                  {STEPS.map((step, i) => {
                    const Icon = step.icon;
                    const isActive = i === currentStep;
                    const isDone = i < currentStep;
                    return (
                      <motion.div
                        key={step.text}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: isDone || isActive ? 1 : 0.4, x: 0 }}
                        transition={{ duration: 0.3 }}
                        className={cn(
                          'flex items-center gap-2.5 text-xs',
                          isDone ? 'text-emerald-400' : isActive ? 'text-blue-300' : 'text-white/30'
                        )}
                      >
                        <div className={cn(
                          'flex h-6 w-6 items-center justify-center rounded-full',
                          isDone ? 'bg-emerald-500/20' : isActive ? 'bg-blue-500/20' : 'bg-white/5'
                        )}>
                          {isDone ? (
                            <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          ) : (
                            <Icon className={cn('h-3 w-3', isActive ? 'text-blue-400' : 'text-white/30')} />
                          )}
                        </div>
                        <span className={cn(isActive && 'font-medium')}>{step.text}</span>
                        {isActive && <Loader2 className="h-3 w-3 animate-spin ml-auto text-blue-400" />}
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* ── Panel derecho: Hero branding ── */}
      <div className="hidden lg:flex relative w-[45%] bg-gradient-to-br from-blue-900/40 via-indigo-900/30 to-transparent items-center justify-center p-16">
        <div className="relative z-10 space-y-8 max-w-lg">
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1 text-[11px] text-blue-300 mb-6"
            >
              <Shield className="h-3 w-3" />
              <span>Sistema Corporativo Seguro</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-4xl font-bold text-white leading-tight mb-4"
            >
              Gestión Inteligente
              <br />
              <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                de tu Almacén
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-sm text-blue-300/60 leading-relaxed"
            >
              Plataforma integral WMS con IA integrada. Controla inventario, picking,
              packing y despacho en tiempo real con seguridad de nivel empresarial.
            </motion.p>
          </motion.div>

          {/* Features */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="space-y-4"
          >
            <div className="flex items-center gap-4">
              <motion.div whileHover={{ scale: 1.05 }} className="flex items-center gap-3 bg-white/5 rounded-xl p-3 border border-white/10 flex-1">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/20">
                  <Warehouse className="h-5 w-5 text-blue-400" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">Control Total</p>
                  <p className="text-[11px] text-blue-300/50">Gestión de inventario en tiempo real</p>
                </div>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} className="flex items-center gap-3 bg-white/5 rounded-xl p-3 border border-white/10 flex-1">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-500/20">
                  <TrendingUp className="h-5 w-5 text-indigo-400" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">Analítica IA</p>
                  <p className="text-[11px] text-blue-300/50">Reportes y predicciones inteligentes</p>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="flex items-center gap-8 pt-4 border-t border-white/10"
          >
            {[
              { label: 'Módulos', value: '15+' },
              { label: 'Tiempo real', value: '24/7' },
              { label: 'Seguridad', value: 'SSL' },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-lg font-bold text-white">{stat.value}</p>
                <p className="text-[10px] text-blue-300/40">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Gradiente decorativo */}
        <div className="absolute inset-0 bg-gradient-to-l from-transparent via-blue-900/20 to-transparent pointer-events-none" />
      </div>
    </div>
  );
}