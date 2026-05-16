'use client';
import Link from 'next/link';

export default function Nav() {
  return (
    <header className="bg-white shadow">
      <div className="max-w-7xl mx-auto p-4 flex items-center justify-between">
        <div className="text-lg font-semibold">NexTask</div>
        <nav className="space-x-4">
          <Link href="/" className="text-sm text-gray-700 hover:text-gray-900">Inicio</Link>
          <Link href="/dashboard" className="text-sm text-gray-700 hover:text-gray-900">Dashboard</Link>
          <Link href="/tickets" className="text-sm text-gray-700 hover:text-gray-900">Tickets</Link>
        </nav>
      </div>
    </header>
  );
}
