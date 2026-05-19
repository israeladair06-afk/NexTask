'use client';

import { motion } from 'framer-motion';
import { Settings, Globe, Shield, Bell, Monitor, Sun, Moon } from 'lucide-react';
import { WmsLayout } from '@/components/wms-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useThemeConfig } from '@/config/theme-config';
import { cn } from '@/lib/cn';

const secciones = [
  { id: 'apariencia', icono: Monitor, nombre: 'Apariencia', desc: 'Modo oscuro y claro del sistema' },
  { id: 'general', icono: Globe, nombre: 'General', desc: 'Nombre, zona horaria e idioma' },
  { id: 'seguridad', icono: Shield, nombre: 'Seguridad', desc: 'Políticas de acceso y autenticación' },
  { id: 'notificaciones', icono: Bell, nombre: 'Notificaciones', desc: 'Alertas y notificaciones del sistema' },
];

export default function ConfiguracionPage() {
  const { modo, cambiarModo } = useThemeConfig();

  return (
    <WmsLayout>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <div className="flex items-center gap-3 mb-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Settings className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Configuración</h1>
            <p className="text-muted-foreground">Configuración del sistema y parámetros WMS.</p>
          </div>
        </div>
      </motion.div>

      <Tabs defaultValue="apariencia" className="mt-6">
        <TabsList className="mb-6 flex-wrap h-auto">
          {secciones.map((sec) => (
            <TabsTrigger key={sec.id} value={sec.id} className="gap-2">
              <sec.icono className="h-4 w-4" />
              <span className="hidden sm:inline">{sec.nombre}</span>
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="apariencia">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Monitor className="h-5 w-5" />
                </div>
                <div>
                  <CardTitle>Apariencia</CardTitle>
                  <CardDescription>Controla el modo visual del sistema.</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex gap-3">
                <button
                  onClick={() => cambiarModo('dark')}
                  className={cn(
                    'flex-1 flex flex-col items-center gap-3 rounded-xl border-2 p-6 transition-all hover:border-primary/50',
                    modo === 'dark' ? 'border-primary bg-primary/5 ring-2 ring-primary/20' : 'border-border'
                  )}
                >
                  <Moon className="h-8 w-8" />
                  <div className="text-center">
                    <p className="font-semibold">Oscuro</p>
                    <p className="text-xs text-muted-foreground mt-1">Azul oscuro profesional</p>
                  </div>
                </button>
                <button
                  onClick={() => cambiarModo('light')}
                  className={cn(
                    'flex-1 flex flex-col items-center gap-3 rounded-xl border-2 p-6 transition-all hover:border-primary/50',
                    modo === 'light' ? 'border-primary bg-primary/5 ring-2 ring-primary/20' : 'border-border'
                  )}
                >
                  <Sun className="h-8 w-8" />
                  <div className="text-center">
                    <p className="font-semibold">Claro</p>
                    <p className="text-xs text-muted-foreground mt-1">Grises elegantes</p>
                  </div>
                </button>
              </div>

              <div className="rounded-xl border bg-card p-4">
                <p className="text-sm font-medium">Tema activo</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Actualmente en modo {modo === 'dark' ? 'oscuro' : 'claro'}. El cambio es instantáneo.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {['general', 'seguridad', 'notificaciones'].map((id) => {
          const sec = secciones.find(s => s.id === id)!;
          return (
            <TabsContent key={id} value={id}>
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <sec.icono className="h-5 w-5" />
                    </div>
                    <div>
                      <CardTitle>{sec.nombre}</CardTitle>
                      <CardDescription>{sec.desc}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="rounded-xl border border-dashed bg-muted/30 p-8 text-center">
                    <Settings className="mx-auto h-8 w-8 text-muted-foreground" />
                    <p className="mt-3 text-sm font-medium text-foreground">
                      Configuración pendiente de implementación
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground max-w-md mx-auto">
                      Los parámetros de {sec.nombre.toLowerCase()} estarán disponibles cuando el backend esté integrado.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          );
        })}
      </Tabs>
    </WmsLayout>
  );
}