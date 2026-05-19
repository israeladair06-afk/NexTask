'use client';

import { Route } from 'lucide-react';
import { WmsLayout } from '@/components/wms-layout';
import { ModuloPlaceholder } from '@/components/modulo-placeholder';

export default function TrazabilidadPage() {
  return (
    <WmsLayout>
      <ModuloPlaceholder
        titulo="Trazabilidad"
        descripcion="Historial de movimientos, trazabilidad completa de productos y lotes."
        icono={Route}
        estado="preparado"
        caracteristicas={[
          'Trazabilidad por lote, serie y SKU',
          'Historial completo de movimientos del producto',
          'Auditoría de operaciones con fecha y usuario',
          'Búsqueda y filtrado de eventos por criterios',
          'Reportes de trazabilidad para cumplimiento',
          'Integración con módulos de recepción y despacho',
        ]}
      />
    </WmsLayout>
  );
}