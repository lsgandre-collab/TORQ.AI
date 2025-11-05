'use client';

import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6">
      <h1 className="text-orange-500 text-5xl font-bold mb-4">Torq.ai</h1>
      <p className="text-gray-400 text-center mb-8 max-w-md">
        O torque que pensa. Diagnósticos inteligentes com AI e visualização 3D.
      </p>
      <Link
        href="/test"
        className="bg-orange-500 text-black px-8 py-3 rounded-lg font-bold text-lg hover:bg-orange-400 transition"
      >
        Ir para o Dashboard
      </Link>
    </div>
  );
}
