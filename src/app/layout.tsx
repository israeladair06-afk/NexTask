import '@/styles/globals.css';
import React from 'react';
import Nav from '@/components/ui/Nav';

export const metadata = {
  title: 'NexTask - Dev',
  description: 'Entorno inicial para plataforma IT Service Desk'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="min-h-screen bg-gray-50 text-gray-900">
        <div className="min-h-screen">
          <Nav />
          <main className="max-w-7xl mx-auto p-6">{children}</main>
        </div>
      </body>
    </html>
  );
}
