'use client';

import { Truck } from 'lucide-react';
import { WmsLayout } from '@/components/wms-layout';
import { ModuloPlaceholder } from '@/components/modulo-placeholder';

export default function RecepcionPage() {
  return (
    <WmsLayout>
      <ModuloPlaceholder
        titulo="Recepción"
        descripcion="Recepción de mercancía y validación de ingreso al almacén."
        icono={Truck}
        estado="preparado"
        caracteristicas={[
          'Registro de recepción de mercancía con validación de documentos',
          'Escaneo de códigos de barras y verificación de cantidades',
          'Asignación automática de ubicaciones de almacenaje',
          'Gestión de proveedores y programación de citas',
          'Inspección de calidad y registro de incidencias',
          'Integración con etiquetado y trazabilidad',
        ]}
      />
    </WmsLayout>
  );
}