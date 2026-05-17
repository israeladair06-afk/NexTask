/**
 * Página del módulo Configuración (placeholder).
 * Aquí irán los ajustes globales del sistema, integraciones,
 * webhooks, APIs, auditoría, logs y parámetros de configuración.
 */
import { LayoutDashboard } from '@/components/navegacion/layout-dashboard';
import { Tarjeta, TarjetaDescripcion, TarjetaTitulo } from '@/components/ui/tarjeta';

export default function PaginaConfiguracion() {
  return (
    <LayoutDashboard>
      <div className="space-y-6">
        {/* Encabezado */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Configuración</h1>
          <p className="mt-2 text-muted-foreground">
            Aquí irá la configuración del sistema, integraciones y auditoría.
          </p>
        </div>

        {/* Contenido placeholder */}
        <div className="grid gap-4 md:grid-cols-2">
          <Tarjeta>
            <TarjetaTitulo>Módulo reservado: Configuración</TarjetaTitulo>
            <TarjetaDescripcion className="mt-3">
              Centro futuro para ajustes globales e integraciones.
            </TarjetaDescripcion>
            <ul className="mt-5 space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                Configuración global de la aplicación
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                Webhooks, APIs, llaves e integraciones externas
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                Logs, auditoría, respaldos y mantenimiento
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                Parámetros para autenticación, notificaciones y RAG
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                Personalización de tema y preferencias de usuario
              </li>
            </ul>
          </Tarjeta>

          <Tarjeta>
            <TarjetaTitulo>Secciones planeadas</TarjetaTitulo>
            <TarjetaDescripcion className="mt-3">
              La configuración se organizará en estas secciones:
            </TarjetaDescripcion>
            <ul className="mt-5 space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                ⚙️ General — Nombre, logo, zona horaria, idioma
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                🔐 Seguridad — Políticas de contraseña, 2FA, sesiones
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                🔌 Integraciones — APIs, webhooks, servicios externos
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                📊 Notificaciones — Email, Slack, WebSockets
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                📋 Auditoría — Logs de actividad, exportación
              </li>
            </ul>
          </Tarjeta>
        </div>
      </div>
    </LayoutDashboard>
  );
}