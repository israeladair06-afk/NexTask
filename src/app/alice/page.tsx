'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Bot, Send, Sparkles, MessageSquare, BarChart3,
  AlertTriangle, Package, TrendingUp, Clock,
  Lightbulb, X, ChevronRight, PanelRightOpen,
  Brain, Database, Zap, User, Download,
} from 'lucide-react';
import { WmsLayout } from '@/components/wms-layout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/boton';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { cn } from '@/lib/cn';

/* ───────────────────────────────────────
   ALICE — Asistente Inteligente WMS
   TODO: Backend integration for AI queries
   TODO: Connect RAG pipeline here
   TODO: Future vector database integration
   TODO: Real-time warehouse analytics service
   ─────────────────────────────────────── */

interface MensajeAlice {
  id: string;
  tipo: 'usuario' | 'alice';
  contenido: string;
  timestamp: string;
  sugerencias?: string[];
  datos?: {
    tipo?: 'alerta' | 'analisis' | 'recomendacion' | 'insight';
    titulo?: string;
    descripcion?: string;
    metricas?: { label: string; valor: string; color?: string }[];
  };
}

interface SugerenciaAlice {
  id: string;
  texto: string;
  icono: React.ComponentType<{ className?: string }>;
  categoria: string;
}

const SUGERENCIAS: SugerenciaAlice[] = [
  { id: 'S1', texto: '¿Cuál es el estado del inventario hoy?', icono: Package, categoria: 'Inventario' },
  { id: 'S2', texto: 'Detecta productos con bajo stock crítico', icono: AlertTriangle, categoria: 'Alertas' },
  { id: 'S3', texto: 'Analiza la productividad de los operadores', icono: TrendingUp, categoria: 'Analytics' },
  { id: 'S4', texto: '¿Qué zonas de la bodega tienen mayor ocupación?', icono: BarChart3, categoria: 'Monitoreo' },
  { id: 'S5', texto: 'Recomendaciones para optimizar el flujo de picking', icono: Zap, categoria: 'Optimización' },
  { id: 'S6', texto: 'Resumen de operaciones del día', icono: Clock, categoria: 'Reportes' },
];

const RESPUESTAS_SIMULADAS: Record<string, MensajeAlice['datos']> = {
  inventario: {
    tipo: 'analisis',
    titulo: 'Estado del Inventario',
    descripcion: 'Basado en los datos actuales del almacén, aquí está el resumen del inventario:',
    metricas: [
      { label: 'SKUs Totales', valor: '12,450', color: 'text-blue-500' },
      { label: 'Stock Total', valor: '24,830 uds', color: 'text-emerald-500' },
      { label: 'Bajo Stock', valor: '3 SKUs', color: 'text-amber-500' },
      { label: 'Valor Estimado', valor: '$2.4M', color: 'text-violet-500' },
    ],
  },
  bajo_stock: {
    tipo: 'alerta',
    titulo: 'Productos con Stock Crítico Detectados',
    descripcion: 'Se han identificado 3 productos por debajo del nivel mínimo de seguridad que requieren atención inmediata:',
    metricas: [
      { label: 'SKU-1209', valor: '12 uds (mín: 20)', color: 'text-red-500' },
      { label: 'SKU-6654', valor: '6 uds (mín: 15)', color: 'text-red-500' },
      { label: 'SKU-4499', valor: '5 uds (mín: 10)', color: 'text-amber-500' },
    ],
  },
  productividad: {
    tipo: 'recomendacion',
    titulo: 'Análisis de Productividad',
    descripcion: 'La eficiencia general del almacén es del 94.2%. Los operadores están rindiendo por encima del objetivo del 85%.',
    metricas: [
      { label: 'Eficiencia Promedio', valor: '94.2%', color: 'text-emerald-500' },
      { label: 'Picking por Hora', valor: '18.6 órdenes', color: 'text-blue-500' },
      { label: 'Tiempo Promedio', valor: '4.2 min', color: 'text-amber-500' },
      { label: 'Precisión', valor: '98.5%', color: 'text-emerald-500' },
    ],
  },
  ocupacion: {
    tipo: 'insight',
    titulo: 'Ocupación de Zonas de Almacenaje',
    descripcion: 'La Zona A (Almacenaje) está al 80% de capacidad. Recomiendo revisar la planificación de espacio.',
    metricas: [
      { label: 'Zona A — Recepción', valor: '80%', color: 'text-amber-500' },
      { label: 'Zona B — Almacenaje', valor: '80%', color: 'text-amber-500' },
      { label: 'Zona C — Picking', valor: '68%', color: 'text-emerald-500' },
      { label: 'Zona D — Despacho', valor: '70%', color: 'text-emerald-500' },
    ],
  },
};

function generarRespuestaAlice(mensaje: string): MensajeAlice {
  const msg = mensaje.toLowerCase();
  let datos: MensajeAlice['datos'] | undefined;
  let contenido = '';

  if (msg.includes('inventario') || msg.includes('stock') || msg.includes('producto')) {
    datos = RESPUESTAS_SIMULADAS.inventario;
    contenido = 'He revisado el estado actual del inventario. Aquí tienes un resumen completo de los niveles de stock y productos registrados en el sistema.';
  } else if (msg.includes('bajo') || msg.includes('crítico') || msg.includes('alerta')) {
    datos = RESPUESTAS_SIMULADAS.bajo_stock;
    contenido = 'He detectado productos con niveles de stock por debajo del mínimo. Te recomiendo generar órdenes de reabastecimiento lo antes posible.';
  } else if (msg.includes('productividad') || msg.includes('operador') || msg.includes('rendimiento')) {
    datos = RESPUESTAS_SIMULADAS.productividad;
    contenido = 'Basado en los datos de rendimiento, los operadores están manteniendo una buena productividad general. Aquí están las métricas clave.';
  } else if (msg.includes('ocupación') || msg.includes('zona') || msg.includes('bodega') || msg.includes('capacidad')) {
    datos = RESPUESTAS_SIMULADAS.ocupacion;
    contenido = 'El análisis de ocupación por zonas muestra que algunas áreas están cerca de su capacidad máxima.';
  } else if (msg.includes('hola') || msg.includes('buen') || msg.includes('saludo')) {
    contenido = '¡Hola! Soy ALICE, tu asistente inteligente para la gestión del almacén. Estoy aquí para ayudarte con análisis, reportes y recomendaciones operativas. ¿En qué puedo apoyarte hoy?';
  } else if (msg.includes('gracias') || msg.includes('thank')) {
    contenido = '¡De nada! Estoy aquí para ayudarte. Si necesitas algo más, no dudes en consultarme. Recuerda que puedes pedirme análisis de inventario, alertas de stock, o recomendaciones de optimización.';
  } else {
    contenido = 'He procesado tu consulta. Basado en los datos disponibles del sistema WMS, aquí tienes la información solicitada. ¿Necesitas algo más específico? Puedo ayudarte con análisis de inventario, alertas, productividad y más.';
    datos = {
      tipo: 'insight',
      titulo: 'Consulta procesada',
      descripcion: 'Información disponible en el sistema para tu consulta.',
      metricas: [
        { label: 'Órdenes activas', valor: '247', color: 'text-blue-500' },
        { label: 'Recepciones hoy', valor: '16', color: 'text-emerald-500' },
        { label: 'Alertas activas', valor: '7', color: 'text-amber-500' },
      ],
    };
  }

  return {
    id: `alice-${Date.now()}`,
    tipo: 'alice',
    contenido,
    timestamp: new Date().toLocaleTimeString('es', { hour: '2-digit', minute: '2-digit' }),
    datos,
    sugerencias: ['Analizar tendencias de picking', 'Verificar estado de despachos', 'Generar reporte de eficiencia'],
  };
}

const HISTORIAL_CONVERSACIONES = [
  { id: 'H1', titulo: 'Análisis de inventario semanal', fecha: 'Hoy 10:30', preview: 'Revisión de niveles de stock y productos...' },
  { id: 'H2', titulo: 'Alertas de stock crítico', fecha: 'Hoy 09:15', preview: '3 productos detectados por debajo del mínimo...' },
  { id: 'H3', titulo: 'Productividad operadores', fecha: 'Ayer 16:45', preview: 'Análisis de rendimiento del equipo de picking...' },
  { id: 'H4', titulo: 'Ocupación de bodega', fecha: 'Ayer 14:20', preview: 'Distribución de capacidad por zonas...' },
];

export default function AlicePage() {
  const [mensajes, setMensajes] = useState<MensajeAlice[]>([
    {
      id: 'alice-bienvenida',
      tipo: 'alice',
      contenido: '¡Bienvenido! Soy ALICE, tu asistente operativo inteligente para la gestión del almacén. Puedo ayudarte con análisis de inventario, alertas de stock, reportes de productividad y más. ¿Qué deseas consultar hoy?',
      timestamp: new Date().toLocaleTimeString('es', { hour: '2-digit', minute: '2-digit' }),
      sugerencias: SUGERENCIAS.slice(0, 3).map(s => s.texto),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [pensando, setPensando] = useState(false);
  const [sidebarAbierto, setSidebarAbierto] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [mensajes, pensando]);

  const enviarMensaje = (texto?: string) => {
    const mensaje = (texto ?? inputValue).trim();
    if (!mensaje || pensando) return;

    const msgUsuario: MensajeAlice = {
      id: `usr-${Date.now()}`,
      tipo: 'usuario',
      contenido: mensaje,
      timestamp: new Date().toLocaleTimeString('es', { hour: '2-digit', minute: '2-digit' }),
    };

    setMensajes(prev => [...prev, msgUsuario]);
    setInputValue('');
    setPensando(true);

    // Simular delay de procesamiento AI
    setTimeout(() => {
      const respuesta = generarRespuestaAlice(mensaje);
      setMensajes(prev => [...prev, respuesta]);
      setPensando(false);
    }, 1200 + Math.random() * 800);
  };

  return (
    <WmsLayout>
      {/* ── Header ALICE ── */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="mb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-blue-500">
              <Bot className="h-3.5 w-3.5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-tight leading-tight flex items-center gap-2">
                ALICE
                <Badge variant="success" className="h-4.5 text-[8px] px-1.5 tracking-wider">INTELIGENTE</Badge>
              </h1>
              <p className="text-[11px] text-muted-foreground">Asistente operativo con IA para WMS — Consulta, análisis y recomendaciones</p>
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => setSidebarAbierto(!sidebarAbierto)}>
              <PanelRightOpen className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>
      </motion.div>

      {/* ── Grid principal ── */}
      <div className={cn('grid gap-3', sidebarAbierto ? 'lg:grid-cols-[1fr_280px]' : 'lg:grid-cols-1')}>
        {/* ── Chat ── */}
        <div className="flex flex-col h-[calc(100vh-12rem)]">
          {/* Mensajes */}
          <Card className="flex-1 overflow-hidden mb-3">
            <ScrollArea ref={scrollRef} className="h-full">
              <div className="p-4 space-y-4">
                {mensajes.map((msg) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className={cn('flex gap-3', msg.tipo === 'usuario' ? 'flex-row-reverse' : '')}
                  >
                    {/* Avatar */}
                    {msg.tipo === 'alice' ? (
                      <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-blue-500 shadow-lg shrink-0">
                        <Bot className="h-4 w-4 text-white" />
                      </div>
                    ) : (
                      <Avatar className="h-8 w-8 shrink-0">
                        <AvatarFallback className="text-[9px] bg-primary text-primary-foreground">OP</AvatarFallback>
                      </Avatar>
                    )}

                    {/* Contenido */}
                    <div className={cn('max-w-[85%]', msg.tipo === 'usuario' ? 'items-end' : 'items-start')}>
                      <div className={cn(
                        'rounded-2xl px-4 py-2.5 text-[11px] leading-relaxed',
                        msg.tipo === 'alice'
                          ? 'bg-card border border-border/50 shadow-sm'
                          : 'bg-primary text-primary-foreground'
                      )}>
                        <p>{msg.contenido}</p>
                      </div>

                      {/* Datos estructurados (gráficos, métricas, etc) */}
                      {msg.datos && (
                        <motion.div
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="mt-2 rounded-xl border bg-card/50 p-3"
                        >
                          <div className="flex items-center gap-2 mb-2">
                            <div className={cn(
                              'rounded-md p-1',
                              msg.datos.tipo === 'alerta' && 'bg-red-500/10',
                              msg.datos.tipo === 'analisis' && 'bg-blue-500/10',
                              msg.datos.tipo === 'recomendacion' && 'bg-amber-500/10',
                              msg.datos.tipo === 'insight' && 'bg-violet-500/10',
                            )}>
                              {msg.datos.tipo === 'alerta' && <AlertTriangle className="h-3 w-3 text-red-500" />}
                              {msg.datos.tipo === 'analisis' && <BarChart3 className="h-3 w-3 text-blue-500" />}
                              {msg.datos.tipo === 'recomendacion' && <Lightbulb className="h-3 w-3 text-amber-500" />}
                              {msg.datos.tipo === 'insight' && <Sparkles className="h-3 w-3 text-violet-500" />}
                            </div>
                            <span className="text-[10px] font-semibold">{msg.datos.titulo}</span>
                          </div>
                          <p className="text-[10px] text-muted-foreground mb-2">{msg.datos.descripcion}</p>
                          {msg.datos.metricas && (
                            <div className="grid grid-cols-2 gap-1.5">
                              {msg.datos.metricas.map((m, i) => (
                                <div key={i} className="rounded-lg bg-muted/30 p-1.5">
                                  <p className="text-[8px] text-muted-foreground">{m.label}</p>
                                  <p className={cn('text-[11px] font-bold', m.color || 'text-foreground')}>{m.valor}</p>
                                </div>
                              ))}
                            </div>
                          )}
                        </motion.div>
                      )}

                      {/* Sugerencias después de respuesta */}
                      {msg.sugerencias && msg.tipo === 'alice' && (
                        <div className="flex flex-wrap gap-1 mt-1.5">
                          {msg.sugerencias.map((sug, i) => (
                            <button
                              key={i}
                              onClick={() => enviarMensaje(sug)}
                              className="rounded-full border border-border/50 bg-card px-2 py-0.5 text-[9px] text-muted-foreground hover:text-foreground hover:border-primary/30 transition-all"
                            >
                              {sug}
                            </button>
                          ))}
                        </div>
                      )}

                      <p className={cn('text-[8px] text-muted-foreground mt-1', msg.tipo === 'usuario' ? 'text-right' : '')}>
                        {msg.timestamp}
                      </p>
                    </div>
                  </motion.div>
                ))}

                {/* Indicador de pensamiento */}
                <AnimatePresence>
                  {pensando && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="flex items-center gap-2"
                    >
                      <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-blue-500 shadow-lg">
                        <Bot className="h-4 w-4 text-white" />
                      </div>
                      <div className="flex items-center gap-1 rounded-2xl bg-card border px-3 py-2">
                        <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1.2, repeat: Infinity }} className="h-1.5 w-1.5 rounded-full bg-violet-500" />
                        <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1.2, delay: 0.2, repeat: Infinity }} className="h-1.5 w-1.5 rounded-full bg-violet-500" />
                        <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1.2, delay: 0.4, repeat: Infinity }} className="h-1.5 w-1.5 rounded-full bg-violet-500" />
                        <span className="text-[9px] text-muted-foreground ml-1">Analizando...</span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </ScrollArea>
          </Card>

          {/* Input */}
          <Card>
            <CardContent className="p-2.5">
              <div className="flex gap-2">
                <Input
                  placeholder="Escribe tu consulta para ALICE..."
                  className="h-9 text-[11px]"
                  value={inputValue}
                  onChange={e => setInputValue(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && enviarMensaje()}
                />
                <Button
                  size="sm"
                  className="h-9 px-3 gap-1.5 bg-gradient-to-r from-violet-500 to-blue-500 hover:from-violet-600 hover:to-blue-600"
                  onClick={() => enviarMensaje()}
                  disabled={pensando || !inputValue.trim()}
                >
                  <Send className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline text-[10px]">Enviar</span>
                </Button>
              </div>
              <div className="flex items-center gap-1 mt-1.5 text-[8px] text-muted-foreground">
                <Sparkles className="h-2.5 w-2.5" />
                <span>ALICE usa IA para analizar datos del WMS. Las respuestas son simuladas hasta conectar el backend.</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* ── Sidebar Contextual ── */}
        <AnimatePresence>
          {sidebarAbierto && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.2 }}
              className="space-y-3"
            >
              {/* Sugerencias rápidas */}
              <Card>
                <CardHeader className="p-3 pb-2">
                  <CardTitle className="text-xs flex items-center gap-1.5">
                    <Lightbulb className="h-3 w-3 text-amber-500" />
                    Sugerencias Inteligentes
                  </CardTitle>
                  <CardDescription className="text-[9px]">Preguntas frecuentes a ALICE</CardDescription>
                </CardHeader>
                <CardContent className="p-3 pt-0 space-y-1">
                  {SUGERENCIAS.map(sug => {
                    const Icon = sug.icono;
                    return (
                      <button
                        key={sug.id}
                        onClick={() => enviarMensaje(sug.texto)}
                        className="flex items-start gap-2 w-full text-left rounded-lg border border-border/40 p-1.5 text-[9px] hover:bg-accent/20 hover:border-primary/20 transition-all group"
                      >
                        <div className="rounded-md p-0.5 bg-muted/50 mt-0.5">
                          <Icon className="h-2.5 w-2.5 text-muted-foreground group-hover:text-primary transition-colors" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="leading-tight truncate">{sug.texto}</p>
                          <p className="text-[8px] text-muted-foreground mt-0.5">{sug.categoria}</p>
                        </div>
                        <ChevronRight className="h-2.5 w-2.5 text-muted-foreground mt-0.5 shrink-0" />
                      </button>
                    );
                  })}
                </CardContent>
              </Card>

              {/* Contexto del sistema */}
              <Card>
                <CardHeader className="p-3 pb-2">
                  <CardTitle className="text-xs flex items-center gap-1.5">
                    <Brain className="h-3 w-3 text-violet-500" />
                    Contexto Actual
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-3 pt-0 space-y-1.5 text-[10px]">
                  <div className="flex items-center justify-between"><span className="text-muted-foreground">Órdenes activas</span><span className="font-semibold">247</span></div>
                  <div className="flex items-center justify-between"><span className="text-muted-foreground">Alertas críticas</span><span className="font-semibold text-red-500">3</span></div>
                  <div className="flex items-center justify-between"><span className="text-muted-foreground">SKUs totales</span><span className="font-semibold">12,450</span></div>
                  <div className="flex items-center justify-between"><span className="text-muted-foreground">Operadores</span><span className="font-semibold">4 activos</span></div>
                  <Separator className="opacity-50" />
                  <p className="text-[9px] text-muted-foreground">
                    {/* TODO: Connect RAG pipeline here */}
                    ALICE puede analizar estos datos y proporcionar insights en tiempo real.
                  </p>
                </CardContent>
              </Card>

              {/* Historial */}
              <Card>
                <CardHeader className="p-3 pb-2">
                  <CardTitle className="text-xs flex items-center gap-1.5">
                    <MessageSquare className="h-3 w-3 text-primary" />
                    Conversaciones Recientes
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-3 pt-0 space-y-1">
                  {HISTORIAL_CONVERSACIONES.map(h => (
                    <button
                      key={h.id}
                      onClick={() => enviarMensaje(h.titulo)}
                      className="w-full text-left rounded-lg border border-border/30 p-1.5 text-[9px] hover:bg-accent/20 transition-all"
                    >
                      <p className="font-medium truncate">{h.titulo}</p>
                      <div className="flex items-center gap-1 text-[8px] text-muted-foreground mt-0.5">
                        <Clock className="h-2 w-2" />
                        <span>{h.fecha}</span>
                      </div>
                    </button>
                  ))}
                </CardContent>
              </Card>

              {/* Nota de integración */}
              <Card className="bg-muted/10 border-dashed border-border/50">
                <CardContent className="p-2.5">
                  <div className="flex items-start gap-1.5 text-[9px] text-muted-foreground">
                    <Database className="h-2.5 w-2.5 mt-0.5 shrink-0" />
                    <div>
                      <p className="font-medium text-foreground mb-0.5">ALICE — Modo Demostración</p>
                      <p>
                        {/* TODO: Future vector database integration */}
                        Las respuestas son simuladas. Se requiere conectar el pipeline RAG y la base de datos vectorial.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </WmsLayout>
  );
}