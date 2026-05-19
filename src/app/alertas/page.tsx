'use client';

import { AlertTriangle } from 'lucide-react';
import { WmsLayout } from '@/components/wms-layout';
import { ModuloPlaceholder } from '@/components/modulo-placeholder';

export default function AlertasPage() {
  return (
    <WmsLayout>
      <ModuloPlaceholder
        titulo="Alertas"
        descripcion="Alertas operativas, stock crítico, notificaciones y eventos del sistema."
        icono={AlertTriangle}
        estado="preparado"
        caracteristicas={[
          'Alertas de stock mínimo y máximo configurables',
          'Notificaciones de eventos críticos en tiempo real',
          'Reglas de alertas personalizables por módulo',
          'Historial de alertas con estados y resoluciones',
          'Integración con notificaciones push y email',
          'Panel de monitoreo de alertas activas',
        ]}
      />
    </WmsLayout>
  );
}