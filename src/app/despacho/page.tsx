'use client';

import { ArrowRightLeft } from 'lucide-react';
import { WmsLayout } from '@/components/wms-layout';
import { ModuloPlaceholder } from '@/components/modulo-placeholder';

export default function DespachoPage() {
  return (
    <WmsLayout>
      <ModuloPlaceholder
        titulo="Despacho"
        descripcion="Gestión de salidas, envíos y documentación de despacho."
        icono={ArrowRightLeft}
        estado="preparado"
        caracteristicas={[
          'Planificación y programación de despachos',
          'Validación de pedidos completados y documentación',
          'Generación de guías de remisión y facturas',
          'Asignación de muelles y horarios de carga',
          'Seguimiento de envíos en tiempo real',
          'Integración con sistemas de transporte y logística',
        ]}
      />
    </WmsLayout>
  );
}