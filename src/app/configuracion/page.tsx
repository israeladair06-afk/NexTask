import { LayoutDashboard } from '@/components/navegacion/layout-dashboard';
import { Tarjeta, TarjetaDescripcion, TarjetaTitulo } from '@/components/ui/tarjeta';

export default function PaginaConfiguracion() {
  return (
    <LayoutDashboard>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Configuración</h1>
          <p className="mt-2 text-muted-foreground">Aquí irá la configuración del sistema, integraciones y auditoría.</p>
        </div>

        <Tarjeta>
          <TarjetaTitulo>Módulo reservado: Configuración</TarjetaTitulo>
          <TarjetaDescripcion className="mt-3">Centro futuro para ajustes globales e integraciones.</TarjetaDescripcion>
          <ul className="mt-5 space-y-2 text-sm text-muted-foreground">
            <li>• Configuración global de la aplicación</li>
            <li>• Webhooks, APIs, llaves e integraciones externas</li>
            <li>• Logs, auditoría, respaldos y mantenimiento</li>
            <li>• Parámetros para autenticación, notificaciones y RAG</li>
          </ul>
        </Tarjeta>
      </div>
    </LayoutDashboard>
  );
}
