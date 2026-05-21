'use client';

import { motion } from 'framer-motion';
import {
  Tags, Search, Plus, Clock, Printer,
  QrCode, Barcode, Download, Globe, FileText,
} from 'lucide-react';
import { WmsLayout } from '@/components/wms-layout';
import { ModuleHeader } from '@/components/shared/ModuleHeader';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/boton';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/cn';

/* ───────────────────────────────────────
   Mock data — Etiquetado
   TODO: Backend endpoint for label generation
   TODO: Printing integration with Zebra/RFID
   ─────────────────────────────────────── */

const PLANTILLAS_ETIQUETAS = [
  { id: 'LBL-001', nombre: 'Etiqueta Estándar Almacén', formato: 'GS1-128', tamaño: '4x6 in', tipo: 'Código Barras', desc: 'Para identificación de ubicaciones y productos' },
  { id: 'LBL-002', nombre: 'Etiqueta de Envío Express', formato: 'EAN-13', tamaño: '4x6 in', tipo: 'Envío', desc: 'Datos de destino, tracking y código QR' },
  { id: 'LBL-003', nombre: 'Etiqueta RFID Pasiva', formato: 'RFID', tamaño: '2x2 in', tipo: 'RFID', desc: 'Para trazabilidad avanzada con tags RFID' },
  { id: 'LBL-004', nombre: 'Etiqueta de Pallet', formato: 'GS1-128', tamaño: '6x4 in', tipo: 'Pallet', desc: 'Identificación de pallets con contenido y peso' },
  { id: 'LBL-005', nombre: 'Etiqueta de Estantería', formato: 'QR + Código', tamaño: '3x1 in', tipo: 'Ubicación', desc: 'Para identificación visual de racks y estantes' },
];

export default function EtiquetadoPage() {
  return (
    <WmsLayout>
      <ModuleHeader
        titulo="Etiquetado"
        descripcion="Generación y gestión de etiquetas, códigos de barras, QR y RFID."
        icono={Tags}
        badge={{ texto: 'Preparado', variant: 'warning' }}
        stats={[
          { label: 'Plantillas', valor: String(PLANTILLAS_ETIQUETAS.length) },
          { label: 'Impresiones hoy', valor: '—' },
          { label: 'Formato', valor: 'GS1 / EAN / RFID' },
        ]}
      />

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 my-3">
        {[
          { label: 'Plantillas', valor: String(PLANTILLAS_ETIQUETAS.length), icon: FileText, color: 'text-blue-500', bg: 'bg-blue-500/10' },
          { label: 'Impresiones hoy', valor: '—', icon: Printer, color: 'text-amber-500', bg: 'bg-amber-500/10' },
          { label: 'Etiquetas activas', valor: '—', icon: Barcode, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
          { label: 'Dispositivos', valor: '3', icon: Globe, color: 'text-violet-500', bg: 'bg-violet-500/10' },
        ].map((stat) => {
          const Icon = stat.icon;
          return (<Card key={stat.label} className="transition-all hover:border-primary/20">
            <CardContent className="p-3">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-medium text-muted-foreground">{stat.label}</span>
                <div className={cn('rounded-md p-1', stat.bg)}><Icon className={cn('h-3 w-3', stat.color)} /></div>
              </div>
              <p className="text-lg font-bold">{stat.valor}</p>
            </CardContent>
          </Card>);
        })}
      </div>

      {/* Search & Actions */}
      <Card className="mb-3">
        <CardContent className="p-2.5">
          <div className="flex flex-col sm:flex-row gap-2 items-start sm:items-center justify-between">
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
              <Input placeholder="Buscar plantillas de etiquetas..." className="pl-8 h-8 text-[11px]" />
            </div>
            <div className="flex gap-1.5 w-full sm:w-auto">
              <Button variant="outline" size="sm" className="h-7 text-[10px] gap-1 px-2"><QrCode className="h-3 w-3" /> Generar QR</Button>
              <Button size="sm" className="h-7 text-[10px] gap-1 px-2"><Plus className="h-3 w-3" /> Nueva Plantilla</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Grid de plantillas */}
      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3 mb-3">
        {PLANTILLAS_ETIQUETAS.map((plantilla, i) => (
          <motion.div key={plantilla.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2, delay: i * 0.05 }}>
            <Card className="group cursor-pointer transition-all hover:border-primary/30 hover:shadow-sm h-full">
              <CardHeader className="p-3 pb-2">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 shrink-0">
                      <Barcode className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-[11px] font-semibold leading-tight">{plantilla.nombre}</CardTitle>
                      <CardDescription className="text-[9px]">{plantilla.formato} • {plantilla.tamaño}</CardDescription>
                    </div>
                  </div>
                  <Badge variant="outline" className="text-[8px] h-4 px-1">{plantilla.tipo}</Badge>
                </div>
              </CardHeader>
              <CardContent className="p-3 pt-0">
                <p className="text-[9px] text-muted-foreground">{plantilla.desc}</p>

                {/* Mock QR/Barcode preview */}
                <div className="mt-2 flex items-center gap-2 rounded-lg border border-dashed bg-muted/20 p-2">
                  <div className="flex h-10 w-10 items-center justify-center rounded bg-white dark:bg-slate-800">
                    <QrCode className="h-6 w-6 text-foreground/40" />
                  </div>
                  <div className="flex-1">
                    <div className="h-2 rounded-full bg-foreground/20 w-3/4 mb-1" />
                    <div className="h-1 rounded-full bg-foreground/10 w-1/2" />
                  </div>
                </div>

                <div className="flex gap-1 mt-2">
                  <Button variant="outline" size="sm" className="h-6 text-[8px] gap-1 px-1.5 flex-1">
                    <Printer className="h-2.5 w-2.5" /> Vista Previa
                  </Button>
                  <Button variant="outline" size="sm" className="h-6 text-[8px] gap-1 px-1.5 flex-1">
                    <Download className="h-2.5 w-2.5" /> Exportar
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Nota de integración */}
      <Card className="bg-muted/10 border-dashed border-border/50">
        <CardContent className="p-2.5">
          <div className="flex items-start gap-1.5 text-[9px] text-muted-foreground">
            <Printer className="h-2.5 w-2.5 mt-0.5 shrink-0" />
            <div>
              <p className="font-medium text-foreground mb-0.5">Preparado para impresión industrial</p>
              <p>
                {/* TODO: Backend endpoint for label generation */}
                {/* TODO: Printing integration with Zebra/RFID */}
                Integración pendiente con impresoras Zebra, códigos GS1-128 y etiquetas RFID.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </WmsLayout>
  );
}