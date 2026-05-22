'use client';

import { useState } from 'react';
import {
  Settings, Globe, Shield, Bell, Monitor,
  Save, Lock, Laptop, Database,
  Palette, CheckCircle2,
  Clock, Library,
} from 'lucide-react';
import { WmsLayout } from '@/components/wms-layout';
import { ModuleHeader } from '@/components/shared/ModuleHeader';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/boton';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/cn';
import { toast } from 'sonner';
import { ColorEditor } from '@/components/shared/ColorEditor';
import { SecurityBadge } from '@/components/shared/SecurityBadge';
import { useAuth } from '@/features/usuarios/AuthContext';

const secciones = [
  { id: 'general', icono: Globe, nombre: 'General', desc: 'Configuración general del sistema' },
  { id: 'seguridad', icono: Shield, nombre: 'Seguridad', desc: 'Políticas de acceso y autenticación' },
  { id: 'apariencia', icono: Palette, nombre: 'Personalizar', desc: 'Paletas de color y modo visual' },
  { id: 'notificaciones', icono: Bell, nombre: 'Notificaciones', desc: 'Alertas y preferencias de avisos' },
];

export default function ConfiguracionPage() {
  const { usuario } = useAuth();

  // General state
  const [empresa, setEmpresa] = useState('LogisCorp WMS');
  const [zonaHoraria, setZonaHoraria] = useState('America/Panama (UTC-5)');
  const [idioma, setIdioma] = useState('Español');
  const [version] = useState('v1.0.0 Enterprise');

  // Seguridad state
  const [sesionDuracion, setSesionDuracion] = useState('8 horas');
  const [mfaActivado, setMfaActivado] = useState(true);
  const [bloqueoIntentos, setBloqueoIntentos] = useState(5);

  // Notificaciones state
  const [notifEmail, setNotifEmail] = useState(true);
  const [notifPush, setNotifPush] = useState(true);
  const [notifSonido, setNotifSonido] = useState(false);

  const guardarConfig = (seccion: string) => {
    toast.success(`Configuración de ${seccion} guardada`, {
      description: 'Los cambios se aplicarán al backend cuando esté disponible.',
      duration: 3000,
    });
  };

  return (
    <WmsLayout>
      <ModuleHeader
        titulo="Configuración"
        descripcion="Centro de control del sistema WMS. Ajustes generales, seguridad, personalización visual y notificaciones."
        icono={Settings}
        badge={{ texto: 'Sistema', variant: 'success' }}
      />

      <Tabs defaultValue="general" className="mt-3">
        <TabsList className="h-8 mb-3">
          {secciones.map((sec) => (
            <TabsTrigger key={sec.id} value={sec.id} className="text-[10px] gap-1.5 px-3 h-6">
              <sec.icono className="h-3 w-3" />
              <span className="hidden sm:inline">{sec.nombre}</span>
            </TabsTrigger>
          ))}
        </TabsList>

        {/* ── GENERAL ── */}
        <TabsContent value="general">
          <div className="grid gap-3 lg:grid-cols-2">
            <Card>
              <CardHeader className="p-4 pb-2">
                <div className="flex items-center gap-2">
                  <Globe className="h-4 w-4 text-primary" />
                  <CardTitle className="text-sm">Identidad del Sistema</CardTitle>
                </div>
                <CardDescription className="text-[10px]">Parámetros generales del WMS</CardDescription>
              </CardHeader>
              <CardContent className="p-4 pt-0 space-y-3">
                <div className="space-y-1.5">
                  <Label className="text-[10px]">Nombre de la empresa</Label>
                  <Input value={empresa} onChange={e => setEmpresa(e.target.value)} className="h-8 text-[11px]" />
                  <p className="text-[8px] text-muted-foreground">Aparece en reportes y encabezados del sistema.</p>
                </div>
                <div className="space-y-1.5">
                  <Label className="text-[10px]">Versión del sistema</Label>
                  <div className="flex h-8 items-center gap-2 rounded-md border bg-card px-3 text-[11px]">
                    <Database className="h-3 w-3 text-primary/60" />
                    <span className="font-mono text-[10px]">{version}</span>
                    <Badge variant="success" className="ml-auto h-4.5 text-[8px] px-1.5">Activo</Badge>
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Label className="text-[10px]">Zona horaria</Label>
                  <select
                    value={zonaHoraria}
                    onChange={e => setZonaHoraria(e.target.value)}
                    className="flex h-8 w-full rounded-md border border-input bg-card px-3 text-[11px] focus:outline-none focus:ring-2 focus:ring-ring"
                  >
                    <option>America/Panama (UTC-5)</option>
                    <option>America/Bogota (UTC-5)</option>
                    <option>America/Mexico_City (UTC-6)</option>
                    <option>America/New_York (UTC-5)</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <Label className="text-[10px]">Idioma</Label>
                  <select
                    value={idioma}
                    onChange={e => setIdioma(e.target.value)}
                    className="flex h-8 w-full rounded-md border border-input bg-card px-3 text-[11px] focus:outline-none focus:ring-2 focus:ring-ring"
                  >
                    <option>Español</option>
                    <option>English</option>
                    <option>Português</option>
                  </select>
                </div>
                <Button
                  size="sm"
                  onClick={() => guardarConfig('General')}
                  className="h-8 text-[10px] gap-1.5 w-full"
                >
                  <Save className="h-3 w-3" /> Guardar Configuración
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="p-4 pb-2">
                <div className="flex items-center gap-2">
                  <Laptop className="h-4 w-4 text-primary" />
                  <CardTitle className="text-sm">Información del Sistema</CardTitle>
                </div>
                <CardDescription className="text-[10px]">Estado y métricas del WMS</CardDescription>
              </CardHeader>
              <CardContent className="p-4 pt-0 space-y-3 text-[11px]">
                <div className="flex items-center justify-between py-1.5 border-b border-border/30">
                  <span className="text-muted-foreground">Frontend</span>
                  <Badge variant="success" className="h-4.5 text-[8px] px-1.5">v1.0 Completo</Badge>
                </div>
                <div className="flex items-center justify-between py-1.5 border-b border-border/30">
                  <span className="text-muted-foreground">Backend</span>
                  <Badge variant="warning" className="h-4.5 text-[8px] px-1.5 gap-1">
                    <Clock className="h-2 w-2" /> Pendiente
                  </Badge>
                </div>
                <div className="flex items-center justify-between py-1.5 border-b border-border/30">
                  <span className="text-muted-foreground">Base de datos</span>
                  <Badge variant="warning" className="h-4.5 text-[8px] px-1.5 gap-1">
                    <Clock className="h-2 w-2" /> Pendiente
                  </Badge>
                </div>
                <div className="flex items-center justify-between py-1.5 border-b border-border/30">
                  <span className="text-muted-foreground">API</span>
                  <Badge variant="outline" className="h-4.5 text-[8px] px-1.5">No conectada</Badge>
                </div>
                <div className="flex items-center justify-between py-1.5 border-b border-border/30">
                  <span className="text-muted-foreground">Prisma ORM</span>
                  <Badge variant="outline" className="h-4.5 text-[8px] px-1.5">Preparado</Badge>
                </div>
                <div className="flex items-center justify-between py-1.5">
                  <span className="text-muted-foreground">ALICE (IA)</span>
                  <Badge variant="success" className="h-4.5 text-[8px] px-1.5">Frontend listo</Badge>
                </div>
                <Separator className="opacity-50" />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => toast.info('Reinicio del sistema programado', { description: 'Funcionalidad disponible con backend.' })}
                  className="h-7 text-[10px] gap-1.5 w-full"
                >
                  <Settings className="h-3 w-3" /> Reiniciar Servicios
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* ── SEGURIDAD ── */}
        <TabsContent value="seguridad">
          <div className="grid gap-3 lg:grid-cols-2">
            <Card>
              <CardHeader className="p-4 pb-2">
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-primary" />
                  <CardTitle className="text-sm">Autenticación</CardTitle>
                </div>
                <CardDescription className="text-[10px]">Control de acceso y sesiones</CardDescription>
              </CardHeader>
              <CardContent className="p-4 pt-0 space-y-3">
                <div className="space-y-1.5">
                  <Label className="text-[10px]">Duración de sesión</Label>
                  <select
                    value={sesionDuracion}
                    onChange={e => setSesionDuracion(e.target.value)}
                    className="flex h-8 w-full rounded-md border border-input bg-card px-3 text-[11px] focus:outline-none focus:ring-2 focus:ring-ring"
                  >
                    <option>1 hora</option>
                    <option>4 horas</option>
                    <option>8 horas</option>
                    <option>24 horas</option>
                  </select>
                </div>
                <div className="flex items-center justify-between rounded-lg border p-2.5">
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-primary/70" />
                    <div>
                      <p className="text-[10px] font-medium">Autenticación en dos pasos (MFA)</p>
                      <p className="text-[8px] text-muted-foreground">Agrega una capa extra de seguridad</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setMfaActivado(!mfaActivado)}
                    className={cn(
                      'relative h-5 w-9 rounded-full transition-colors',
                      mfaActivado ? 'bg-emerald-500' : 'bg-slate-300 dark:bg-slate-600'
                    )}
                  >
                    <span className={cn(
                      'absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition-transform',
                      mfaActivado ? 'left-4.5' : 'left-0.5'
                    )} />
                  </button>
                </div>
                <div className="space-y-1.5">
                  <Label className="text-[10px]">Intentos máximos fallidos: {bloqueoIntentos}</Label>
                  <input
                    type="range"
                    min={3}
                    max={10}
                    value={bloqueoIntentos}
                    onChange={e => setBloqueoIntentos(Number(e.target.value))}
                    className="w-full h-1.5 rounded-full bg-muted appearance-none cursor-pointer accent-primary"
                  />
                  <p className="text-[8px] text-muted-foreground">Bloqueo temporal de cuenta después de {bloqueoIntentos} intentos.</p>
                </div>
                <Button size="sm" onClick={() => guardarConfig('Seguridad')} className="h-8 text-[10px] gap-1.5 w-full">
                  <Save className="h-3 w-3" /> Guardar Configuración
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="p-4 pb-2">
                <div className="flex items-center gap-2">
                  <Lock className="h-4 w-4 text-primary" />
                  <CardTitle className="text-sm">Seguridad de Sesión</CardTitle>
                </div>
                <CardDescription className="text-[10px]">Estado de seguridad de la sesión actual</CardDescription>
              </CardHeader>
              <CardContent className="p-4 pt-0 space-y-3">
                <SecurityBadge tipo="sesion" />
                <SecurityBadge tipo="entorno" />
                <SecurityBadge tipo="huella" />
                <SecurityBadge tipo="log" />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* ── APARIENCIA / PERSONALIZAR ── */}
        <TabsContent value="apariencia">
          <ColorEditor />
        </TabsContent>

        {/* ── NOTIFICACIONES ── */}
        <TabsContent value="notificaciones">
          <div className="grid gap-3 lg:grid-cols-2">
            <Card>
              <CardHeader className="p-4 pb-2">
                <div className="flex items-center gap-2">
                  <Bell className="h-4 w-4 text-primary" />
                  <CardTitle className="text-sm">Canales de Notificación</CardTitle>
                </div>
                <CardDescription className="text-[10px]">Configura cómo recibirás los avisos</CardDescription>
              </CardHeader>
              <CardContent className="p-4 pt-0 space-y-3">
                {[
                  { icon: Bell, label: 'Notificaciones push', desc: 'En el navegador', state: notifPush, set: setNotifPush },
                  { icon: Library, label: 'Correo electrónico', desc: 'Resumen diario de operaciones', state: notifEmail, set: setNotifEmail },
                  { icon: Bell, label: 'Alertas sonoras', desc: 'Sonido para alertas críticas', state: notifSonido, set: setNotifSonido },
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.label} className="flex items-center justify-between rounded-lg border p-2.5">
                      <div className="flex items-center gap-2">
                        <Icon className="h-4 w-4 text-primary/60" />
                        <div>
                          <p className="text-[10px] font-medium">{item.label}</p>
                          <p className="text-[8px] text-muted-foreground">{item.desc}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => item.set(!item.state)}
                        className={cn(
                          'relative h-5 w-9 rounded-full transition-colors',
                          item.state ? 'bg-emerald-500' : 'bg-slate-300 dark:bg-slate-600'
                        )}
                      >
                        <span className={cn(
                          'absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition-transform',
                          item.state ? 'left-4.5' : 'left-0.5'
                        )} />
                      </button>
                    </div>
                  );
                })}
                <Button size="sm" onClick={() => guardarConfig('Notificaciones')} className="h-8 text-[10px] gap-1.5 w-full">
                  <Save className="h-3 w-3" /> Guardar Preferencias
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="p-4 pb-2">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-primary" />
                  <CardTitle className="text-sm">Registro de Actividad</CardTitle>
                </div>
                <CardDescription className="text-[10px]">Últimas acciones del sistema</CardDescription>
              </CardHeader>
              <CardContent className="p-4 pt-0 space-y-2 text-[10px]">
                <ScrollArea className="h-[200px]">
                  <div className="space-y-2">
                    {[
                      { texto: 'Inicio de sesión exitoso', hora: 'Hace 5 min', user: usuario?.nombre ?? 'Admin', icon: CheckCircle2, color: 'text-emerald-500' },
                      { texto: 'Configuración de apariencia actualizada', hora: 'Hace 20 min', user: usuario?.nombre ?? 'Admin', icon: Palette, color: 'text-blue-500' },
                      { texto: 'Reporte diario generado', hora: 'Hace 1 h', user: 'Sistema', icon: Monitor, color: 'text-violet-500' },
                      { texto: 'Verificación de seguridad completada', hora: 'Hace 3 h', user: 'Sistema', icon: Shield, color: 'text-amber-500' },
                    ].map((log, i) => {
                      const Icon = log.icon;
                      return (
                        <div key={i} className="flex items-start gap-2 rounded-lg border border-border/30 p-2">
                          <Icon className={cn('h-3.5 w-3.5 mt-0.5 shrink-0', log.color)} />
                          <div className="min-w-0 flex-1">
                            <p className="font-medium text-[10px] truncate">{log.texto}</p>
                            <div className="flex items-center gap-2 text-[8px] text-muted-foreground mt-0.5">
                              <span>{log.user}</span>
                              <span>•</span>
                              <span>{log.hora}</span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Nota de integración */}
      <Card className="bg-muted/10 border-dashed border-border/50 mt-3">
        <CardContent className="p-2.5 text-center text-[9px] text-muted-foreground">
          Las configuraciones se aplican localmente. Los ajustes de backend se sincronizarán cuando el servicio esté disponible.
        </CardContent>
      </Card>
    </WmsLayout>
  );
}