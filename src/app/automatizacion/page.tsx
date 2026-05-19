'use client';

import { Cpu } from 'lucide-react';
import { WmsLayout } from '@/components/wms-layout';
import { ModuloPlaceholder } from '@/components/modulo-placeholder';

export default function AutomatizacionPage() {
  return (
    <WmsLayout>
      <ModuloPlaceholder
        titulo="Automatización"
        descripcion="Reglas de negocio, workflows inteligentes y automatización de procesos."
        icono={Cpu}
        estado="preparado"
        caracteristicas={[
          'Creación de reglas de negocio sin código',
          'Workflows automatizados para procesos repetitivos',
          'Disparadores por eventos: recepción, picking, despacho',
          'Integración con APIs externas y webhooks',
          'Programación de tareas recurrentes',
          'Motor de reglas para asignación inteligente de ubicaciones',
        ]}
      />
    </WmsLayout>
  );
}