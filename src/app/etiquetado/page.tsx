'use client';

import { Tags } from 'lucide-react';
import { WmsLayout } from '@/components/wms-layout';
import { ModuloPlaceholder } from '@/components/modulo-placeholder';

export default function EtiquetadoPage() {
  return (
    <WmsLayout>
      <ModuloPlaceholder
        titulo="Etiquetado"
        descripcion="Generación y gestión de etiquetas, códigos de barras y RFID."
        icono={Tags}
        estado="preparado"
        caracteristicas={[
          'Generación de etiquetas con códigos de barras y QR',
          'Impresión de etiquetas por lote o producto individual',
          'Soporte para estándares GS1-128, EAN, UPC',
          'Etiquetado RFID para trazabilidad avanzada',
          'Personalización de formatos y plantillas',
          'Integración con recepción, picking y despacho',
        ]}
      />
    </WmsLayout>
  );
}