'use client';

import { Boxes } from 'lucide-react';
import { WmsLayout } from '@/components/wms-layout';
import { ModuloPlaceholder } from '@/components/modulo-placeholder';

export default function PackingPage() {
  return (
    <WmsLayout>
      <ModuloPlaceholder
        titulo="Packing"
        descripcion="Empaque, embalaje y preparación de productos para su envío."
        icono={Boxes}
        estado="preparado"
        caracteristicas={[
          'Estaciones de empaque con asignación de pedidos',
          'Selección de tipo de embalaje según producto y destino',
          'Verificación de peso y dimensiones para envío',
          'Generación de etiquetas de envío y documentos',
          'Control de calidad de empaque',
          'Integración con transportistas y couriers',
        ]}
      />
    </WmsLayout>
  );
}