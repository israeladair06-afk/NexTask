'use client';

import { ScanLine } from 'lucide-react';
import { WmsLayout } from '@/components/wms-layout';
import { ModuloPlaceholder } from '@/components/modulo-placeholder';

export default function AcondicionamientoPage() {
  return (
    <WmsLayout>
      <ModuloPlaceholder
        titulo="Acondicionamiento"
        descripcion="Reempaque, reetiquetado y preparación de productos para almacenaje."
        icono={ScanLine}
        estado="preparado"
        caracteristicas={[
          'Recepción de productos para acondicionamiento',
          'Reempaque y consolidación de unidades',
          'Cambio de presentación y reetiquetado',
          'Control de calidad y verificación de productos',
          'Asignación de ubicaciones post-acondicionamiento',
          'Integración con inventario y etiquetado',
        ]}
      />
    </WmsLayout>
  );
}