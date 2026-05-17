/**
 * Página principal del Dashboard.
 * Muestra una vista general del sistema ITSM con cards placeholder.
 * Aquí irán: KPIs, gráficas, actividad reciente, tickets pendientes, etc.
 */
import { Activity, Boxes, BrainCircuit, LifeBuoy } from 'lucide-react';
import { LayoutDashboard } from '@/components/navegacion/layout-dashboard';
import { Tarjeta, TarjetaDescripcion, TarjetaTitulo } from '@/components/ui/tarjeta';

const tarjetas = [
  {
    titulo: 'Tickets abiertos',
    valor: '0',
    descripcion: 'Aquí irá el conteo real de tickets abiertos.',
    icono: LifeBuoy,
  },
  {
    titulo: 'Usuarios activos',
    valor: '0',
    descripcion: 'Aquí irá la actividad de técnicos y solicitantes.',
    icono: Activity,
  },
  {
    titulo: 'Base RAG',
    valor: 'Pendiente',
    descripcion: 'Aquí irá el sistema RAG y la búsqueda semántica.',
    icono: BrainCircuit,
  },
  {
    titulo: 'Integraciones',
    valor: '0',
    descripcion: 'Aquí irán APIs, webhooks y servicios externos.',
    icono: Boxes,
  },
];

export default function PaginaDashboard() {
  return (
    <LayoutDashboard>
      <div className="space-y-8">
        {/* Hero section */}
        <section className="rounded-3xl border bg-gradient-to-br from-card via-card to-primary/10 p-6 shadow-sm sm:p-8">
          <p className="text-sm font-medium text-primary">Dashboard administrativo</p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            NexTask ITSM/helpdesk
          </h1>
          <p className="mt-3 max-w-3xl text-muted-foreground">
            Base visual profesional preparada para tickets, usuarios, RAG, reportes,
            PostgreSQL, APIs y futuras integraciones. No contiene lógica de negocio
            compleja todavía.
          </p>
        </section>

        {/* KPIs placeholder */}
        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {tarjetas.map((tarjeta) => {
            const Icono = tarjeta.icono;

            return (
              <Tarjeta
                key={tarjeta.titulo}
                className="transition-all hover:border-primary/40 hover:shadow-md"
              >
                <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <Icono className="h-5 w-5" />
                </div>
                <TarjetaTitulo>{tarjeta.titulo}</TarjetaTitulo>
                <p className="mt-2 text-2xl font-bold">{tarjeta.valor}</p>
                <TarjetaDescripcion className="mt-2">
                  {tarjeta.descripcion}
                </TarjetaDescripcion>
              </Tarjeta>
            );
          })}
        </section>

        {/* Área principal y preparación */}
        <section className="grid gap-4 lg:grid-cols-[1.5fr_1fr]">
          <Tarjeta>
            <TarjetaTitulo>Área principal vacía</TarjetaTitulo>
            <TarjetaDescripcion className="mt-2">
              Este espacio queda reservado para widgets reales, tablas, gráficas y
              actividad reciente cuando el equipo agregue módulos.
            </TarjetaDescripcion>
            <div className="mt-6 rounded-2xl border border-dashed bg-background/60 p-10 text-center text-sm text-muted-foreground">
              Placeholder del dashboard enterprise. Aquí se conectarán datos reales
              más adelante.
            </div>
          </Tarjeta>

          <Tarjeta>
            <TarjetaTitulo>Preparado para escalar</TarjetaTitulo>
            <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                Autenticación y autorización
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                Tickets y SLA
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                PostgreSQL + Prisma
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                Redis y WebSockets
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                RAG, embeddings y búsqueda inteligente
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                APIs internas y microservicios futuros
              </li>
            </ul>
          </Tarjeta>
        </section>
      </div>
    </LayoutDashboard>
  );
}