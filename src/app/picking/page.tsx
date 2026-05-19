'use client';

import { ClipboardList } from 'lucide-react';
import { WmsLayout } from '@/components/wms-layout';
import { ModuloPlaceholder } from '@/components/modulo-placeholder';

export default function PickingPage() {
  return (
    <WmsLayout>
      <ModuloPlaceholder
        titulo="Picking"
        descripcion="Preparación de pedidos, consolidación y gestión de rutas de picking."
        icono={ClipboardList}
        estado="preparado"
        caracteristicas={[
          'Generación de olas de picking y asignación de tareas',
          'Optimización de rutas de picking dentro del almacén',
          'Soporte para picking por voz, RF o dispositivos móviles',
          'Validación de productos mediante escaneo de códigos',
          'Consolidación de pedidos y preparación para packing',
          'Integración con sistema de gestión de pedidos',
        ]}
      />
    </WmsLayout>
  );
}