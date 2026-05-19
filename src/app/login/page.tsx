'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Package, Eye, EyeOff, ArrowRight, Warehouse, Shield } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/boton';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

function FloatingOrbs() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Orb 1 */}
      <motion.div
        className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-primary/10 blur-3xl"
        animate={{
          x: [0, 50, -30, 0],
          y: [0, -40, 20, 0],
          scale: [1, 1.1, 0.95, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'linear',
        }}
      />
      {/* Orb 2 */}
      <motion.div
        className="absolute -bottom-40 -left-40 h-[500px] w-[500px] rounded-full bg-primary/5 blur-3xl"
        animate={{
          x: [0, -60, 40, 0],
          y: [0, 50, -30, 0],
          scale: [1, 0.9, 1.1, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: 'linear',
        }}
      />
      {/* Orb 3 */}
      <motion.div
        className="absolute top-1/3 right-1/4 h-64 w-64 rounded-full bg-primary/8 blur-3xl"
        animate={{
          x: [0, 40, -50, 0],
          y: [0, -30, 40, 0],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: 'linear',
        }}
      />
      {/* Floating particles */}
      {Array.from({ length: 6 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute h-1 w-1 rounded-full bg-primary/30"
          style={{
            left: `${15 + i * 15}%`,
            top: `${20 + i * 12}%`,
          }}
          animate={{
            y: [0, -100, 0],
            opacity: [0, 0.5, 0],
          }}
          transition={{
            duration: 4 + i * 1.5,
            repeat: Infinity,
            delay: i * 0.7,
            ease: 'easeInOut' as const,
          }}
        />
      ))}
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40" />
    </div>
  );
}

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      window.location.href = '/lobby';
    }, 1500);
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-background flex relative overflow-hidden">
      {/* Animated Background */}
      <FloatingOrbs />

      {/* Left Panel - Login */}
      <div className="relative z-10 flex-1 flex items-center justify-center p-8 lg:p-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="w-full max-w-md space-y-8"
        >
          {/* Logo with entrance animation */}
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
        {/* Animated gradient orbs on right panel */}
        <motion.div
          className="absolute -top-40 -right-40 h-[600px] w-[600px] rounded-full bg-primary/10 blur-3xl"
          animate={{
            scale: [1, 1.2, 0.9, 1],
            rotate: [0, 45, 0],
          }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 h-[500px] w-[500px] rounded-full bg-primary/8 blur-3xl"
          animate={{
            scale: [1, 0.8, 1.1, 1],
            rotate: [0, -30, 0],
          }}
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
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-3"
              >
                <Warehouse className="h-8 w-8 text-primary" />
                <div>
                  <p className="text-sm font-semibold">Control Total</p>
                  <p className="text-xs text-muted-foreground">Visibilidad completa</p>
                </div>
              </motion.div>
              <div className="h-12 w-px bg-border" />
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-3"
              >
                <Package className="h-8 w-8 text-primary" />
                <div>
                  <p className="text-sm font-semibold">14 Módulos</p>
                  <p className="text-xs text-muted-foreground">Operaciones integradas</p>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Animated bottom bar */}
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