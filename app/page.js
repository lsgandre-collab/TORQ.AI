'use client';

import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white p-6">
      <h1 className="text-orange-500 text-3xl font-bold text-center mb-6">Torq.ai - Home</h1>
      <p className="text-gray-400 text-center mb-4">O torque que pensa. Vá pro dashboard de teste:</p>
      <Link href="/test" className="bg-orange-500 p-2 rounded text-black block text-center">Ir para Dashboard</Link>
    </div>
  );
}
