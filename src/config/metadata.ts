import { Metadata } from 'next';

export const metadataSitio: Metadata = {
  title: 'NexTask - ITSM Dashboard',
  description: 'Plataforma profesional de gestión de IT Service Desk',
  keywords: ['ITSM', 'Help Desk', 'Tickets', 'Service Management'],
  authors: [{ name: 'NexTask Team' }],
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    url: process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000',
    title: 'NexTask - ITSM Dashboard',
    description: 'Plataforma profesional de gestión de IT Service Desk',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NexTask',
    description: 'Plataforma profesional de gestión de IT Service Desk',
  },
};
