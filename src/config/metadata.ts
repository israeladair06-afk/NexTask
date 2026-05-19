import { Metadata } from 'next';

export const metadataSitio: Metadata = {
  title: 'NexTask - WMS Enterprise',
  description: 'Plataforma profesional de gestión de almacenes (WMS) — Warehouse Management System',
  keywords: ['WMS', 'Warehouse', 'Inventario', 'Logística', 'Almacén', 'Gestión de bodega'],
  authors: [{ name: 'NexTask Team' }],
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    url: process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000',
    title: 'NexTask - WMS Enterprise',
    description: 'Plataforma profesional de gestión de almacenes (WMS)',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NexTask',
    description: 'Plataforma profesional de gestión de almacenes (WMS)',
  },
};