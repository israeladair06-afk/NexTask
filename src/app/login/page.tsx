'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Package, Eye, EyeOff, ArrowRight, Warehouse, Shield,
  Loader2, BarChart3, ScanLine, ClipboardList, CheckCircle2
} from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/boton';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

function FloatingOrbs() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <motion.div
        className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-primary/10 blur-3xl"
        animate={{ x: [0, 50, -30, 0], y: [0, -40, 20, 0], scale: [1, 1.1, 0.95, 1] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
      />
      <motion.div
        className="absolute -bottom-40 -left-40 h-[500px] w-[500px] rounded-full bg-primary/5 blur-3xl"
        animate={{ x: [0, -60, 40, 0], y: [0, 50, -30, 0], scale: [1, 0.9, 1.1, 1] }}
        transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
      />
      <motion.div
        className="absolute top-1/3 right-1/4 h-64 w-64 rounded-full bg-primary/8 blur-3xl"
        animate={{ x: [0, 40, -50, 0], y: [0, -30, 40, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
      />
      {Array.from({ length: 6 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute h-1 w-1 rounded-full bg-primary/30"
          style={{ left: `${15 + i * 15}%`, top: `${20 + i * 12}%` }}
          animate={{ y: [0, -100, 0], opacity: [0, 0.5, 0] }}
          transition={{ duration: 4 + i * 1.5, repeat: Infinity, delay: i * 0.7, ease: 'easeInOut' }}
        />
      ))}
      <div className="absolute inset-0 bg-grid-pattern opacity-40" />
    </div>
  );
}

function LoadingOverlay() {
  const loadingSteps = [
    { text: 'Inicializando módulos del sistema...', icon: Package },
    { text: 'Cargando panel de control...', icon: BarChart3 },
    { text: 'Preparando módulo de inventario...', icon: ScanLine },
    { text: 'Sincronizando datos de operaciones...', icon: ClipboardList },
    { text: 'Listo para operar', icon: CheckCircle2 },
  ];

  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    if (currentStep >= loadingSteps.length - 1) return;
    const timer = setTimeout(() => setCurrentStep(s => s + 1), 400 + Math.random() * 300);
    return () => clearTimeout(timer);
  }, [currentStep]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/95 backdrop-blur-sm">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-40 -right-40 h-[500px] w-[500px] rounded-full bg-primary/5 blur-3xl"
          animate={{ scale: [1, 1.2, 0.9, 1], rotate: [0, 30, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 h-[400px] w-[400px] rounded-full bg-primary/8 blur-3xl"
          animate={{ scale: [1, 0.8, 1.1, 1], rotate: [0, -30, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.3 }}
        className="relative z-10 flex flex-col items-center gap-6 max-w-sm w-full px-6"
      >
        {/* Logo */}
        <motion.div
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary shadow-xl shadow-primary/20"
        >
          <Package className="h-7 w-7 text-primary-foreground" />
        </motion.div>

        <div className="text-center space-y-1">
          <h2 className="text-lg font-bold">Iniciando NexTask WMS</h2>
          <p className="text-xs text-muted-foreground">Preparando el sistema de gestión de almacenes</p>
        </div>

        {/* Progress indicator */}
        <div className="w-full space-y-3">
          <div className="h-1 w-full rounded-full bg-muted overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-primary"
              initial={{ width: '0%' }}
              animate={{ width: `${((currentStep + 1) / loadingSteps.length) * 100}%` }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            />
          </div>

          <div className="space-y-2.5">
            {loadingSteps.map((step, i) => {
              const StepIcon = step.icon;
              const isActive = i === currentStep;
              const isDone = i < currentStep;
              return (
                <motion.div
                  key={step.text}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{
                    opacity: isDone || isActive ? 1 : 0.4,
                    x: 0,
                  }}
                  transition={{ duration: 0.3 }}
                  className={`flex items-center gap-2.5 text-xs ${
                    isDone ? 'text-emerald-500' : isActive ? 'text-foreground' : 'text-muted-foreground'
                  }`}
                >
                  <div className={`flex h-5 w-5 items-center justify-center rounded-full ${
                    isDone ? 'bg-emerald-500/20' : isActive ? 'bg-primary/20' : 'bg-muted'
                  }`}>
                    {isDone ? (
                      <CheckCircle2 className="h-3 w-3" />
                    ) : (
                      <StepIcon className={`h-3 w-3 ${isActive ? 'text-primary' : ''}`} />
                    )}
                  </div>
                  <span className={isActive ? 'font-medium' : ''}>{step.text}</span>
                  {isActive && <Loader2 className="h-3 w-3 animate-spin ml-auto text-primary" />}
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showLoadingOverlay, setShowLoadingOverlay] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Mostrar overlay de carga después de breve pausa para efecto del botón
    setTimeout(() => {
      setShowLoadingOverlay(true);
    }, 300);
    // Navegar después de que el loading se haya mostrado
    setTimeout(() => {
      window.location.href = '/lobby';
    }, 2800);
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-background flex relative overflow-hidden">
      <FloatingOrbs />

      {/* Loading Overlay */}
      <AnimatePresence>
        {showLoadingOverlay && <LoadingOverlay />}
      </AnimatePresence>

      {/* Left Panel - Login */}
      <div className="relative z-10 flex-1 flex items-center justify-center p-8 lg:p-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="w-full max-w-md space-y-8"
        >
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Link href="/" className="flex items-center gap-3 mb-12 group">
              <motion.div
                whileHover={{ rotate: -10, scale: 1.05 }}
                className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary shadow-lg shadow-primary/20 group-hover:shadow-primary/30 transition-shadow"
              >
                <Package className="h-5 w-5 text-primary-foreground" />
              </motion.div>
              <div>
                <p className="text-lg font-bold">NexTask</p>
                <p className="text-[9px] uppercase tracking-[0.3em] text-muted-foreground">
                  WMS Enterprise
                </p>
              </div>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="space-y-2"
          >
            <h1 className="text-3xl font-bold tracking-tight">Acceso al sistema</h1>
            <p className="text-muted-foreground">
              Ingrese sus credenciales para acceder al panel de gestión de almacenes.
            </p>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            onSubmit={handleSubmit}
            className="space-y-5"
          >
            <div className="space-y-2">
              <Label htmlFor="email">Usuario o correo electrónico</Label>
              <Input
                id="email"
                type="email"
                placeholder="operador@nextask.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-11 bg-card/50 backdrop-blur-sm focus:bg-card transition-all"
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Contraseña</Label>
                <button type="button" className="text-xs text-primary hover:underline transition-opacity">
                  ¿Olvidó su contraseña?
                </button>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="h-11 pr-10 bg-card/50 backdrop-blur-sm focus:bg-card transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <motion.div whileTap={{ scale: 0.98 }}>
              <Button type="submit" className="w-full h-11 text-base relative overflow-hidden group" disabled={isLoading}>
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <motion.span
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      className="h-4 w-4 rounded-full border-2 border-background border-t-transparent"
                    />
                    Ingresando...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    Ingresar al sistema
                    <motion.span
                      animate={{ x: [0, 4, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <ArrowRight className="h-4 w-4" />
                    </motion.span>
                  </span>
                )}
              </Button>
            </motion.div>
          </motion.form>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="text-center text-xs text-muted-foreground"
          >
            Al ingresar acepta los términos y condiciones del sistema.
          </motion.p>
        </motion.div>
      </div>

      {/* Right Panel - Animated Enterprise Branding */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-gradient-to-br from-primary/5 via-primary/10 to-primary/5">
        <div className="absolute inset-0 bg-grid-pattern opacity-30" />
        <motion.div
          className="absolute -top-40 -right-40 h-[600px] w-[600px] rounded-full bg-primary/10 blur-3xl"
          animate={{ scale: [1, 1.2, 0.9, 1], rotate: [0, 45, 0] }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 h-[500px] w-[500px] rounded-full bg-primary/8 blur-3xl"
          animate={{ scale: [1, 0.8, 1.1, 1], rotate: [0, -30, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
        />

        <div className="relative z-10 flex flex-col justify-center p-16 space-y-8">
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="space-y-6"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="inline-flex items-center gap-2 rounded-full border bg-card/50 backdrop-blur-sm px-4 py-1.5 text-xs"
            >
              <Shield className="h-3.5 w-3.5 text-primary" />
              <span>Sistema Corporativo Seguro</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="text-4xl font-bold leading-tight"
            >
              Gestión Inteligente
              <br />
              de tu Almacén
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="text-lg text-muted-foreground leading-relaxed max-w-md"
            >
              Plataforma WMS enterprise para control total de inventario, recepción, picking,
              packing y despacho en tiempo real.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="flex items-center gap-6 pt-4"
            >
              <motion.div whileHover={{ scale: 1.05 }} className="flex items-center gap-3">
                <Warehouse className="h-8 w-8 text-primary" />
                <div>
                  <p className="text-sm font-semibold">Control Total</p>
                  <p className="text-xs text-muted-foreground">Visibilidad completa</p>
                </div>
              </motion.div>
              <div className="h-12 w-px bg-border" />
              <motion.div whileHover={{ scale: 1.05 }} className="flex items-center gap-3">
                <Package className="h-8 w-8 text-primary" />
                <div>
                  <p className="text-sm font-semibold">14 Módulos</p>
                  <p className="text-xs text-muted-foreground">Operaciones integradas</p>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>

          <motion.div
            className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"
            animate={{ opacity: [0.3, 0.8, 0.3] }}
            transition={{ duration: 3, repeat: Infinity }}
          />
        </div>
      </div>
    </div>
  );
}