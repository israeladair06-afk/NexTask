import { ArrowRight, BookOpen, Boxes, Database, LayoutDashboard, ShieldCheck } from 'lucide-react';
import Link from 'next/link';
import { Tarjeta, TarjetaDescripcion, TarjetaTitulo } from '@/components/ui/tarjeta';

const fortalezas = [
  ['Arquitectura limpia', 'Separación entre app, componentes, features, services, server, hooks, lib, utils y types.', LayoutDashboard],
  ['Base preparada', 'Lista para PostgreSQL, Prisma, autenticación, APIs, Redis, WebSockets y microservicios futuros.', Boxes],
  ['Stack profesional', 'Next.js, React, TypeScript estricto, Tailwind CSS, shadcn/ui style, Docker y Docker Compose.', Database],
  ['Trabajo en equipo', 'Documentación, convenciones y flujo Git para colaborar sin romper arquitectura.', ShieldCheck],
] as const;

export default function PaginaPrincipal() {
  return (
    <main className="min-h-screen bg-background">
      <header className="border-b bg-card/80 backdrop-blur-xl">
        <div className="container-base flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-sm font-bold text-primary-foreground">NT</div>
            <span className="font-semibold">NexTask</span>
          </Link>
          <Link className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-medium text-primary-foreground" href="/dashboard">
            Ir al dashboard <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </header>

      <section className="container-base py-20 sm:py-28">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">ITSM / Helpdesk Enterprise Base</p>
          <h1 className="mt-5 text-4xl font-bold tracking-tight sm:text-6xl">Plantilla profesional para construir NexTask en equipo</h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Dashboard administrativo moderno, inicialmente vacío, preparado para que el equipo agregue módulos reales sin improvisar.
          </p>
          <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
            <Link className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 font-medium text-primary-foreground" href="/dashboard">
              Abrir dashboard <ArrowRight className="h-4 w-4" />
            </Link>
              <Link className="inline-flex items-center justify-center gap-2 rounded-xl border px-6 py-3 font-medium hover:bg-accent" href="/documentacion">
                <BookOpen className="h-4 w-4" />
                Ver documentación
              </Link>
          </div>
        </div>

        <div className="mt-16 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {fortalezas.map(([titulo, descripcion, Icono]) => (
            <Tarjeta key={titulo}>
              <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <Icono className="h-5 w-5" />
              </div>
              <TarjetaTitulo>{titulo}</TarjetaTitulo>
              <TarjetaDescripcion className="mt-2">{descripcion}</TarjetaDescripcion>
            </Tarjeta>
          ))}
        </div>
      </section>
    </main>
  );
}
