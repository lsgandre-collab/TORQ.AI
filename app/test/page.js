'use client';

import { useState } from 'react';

export default function TestPage() {
  const [vin, setVin] = useState('');
  const [data, setData] = useState(null);
  const [chatMessage, setChatMessage] = useState('');
  const [chatResponse, setChatResponse] = useState('');

  const handleLoadData = () => {
    setData({
      oil: '5.7L 5W-30',
      brake: 'DOT 4 0.75L',
      torque: '25 Nm (alternador)',
      recalls: 'Simulado - bomba de combustível',
    });
  };

  const handleChat = () => {
    setChatResponse('Verifique o sensor ABS - 87% resolvido. Part number: 12345-A. Tempo: 1h45.');
  };

  const handleConfirmFix = () => {
    alert('Confirmed Fix: Ganhou 1 ponto!');
  };

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <header className="text-center mb-8">
        <h1 className="text-orange-500 text-4xl font-bold">Torq.ai - Dashboard</h1>
        <p className="text-gray-400">Diagnóstico rápido e inteligente</p>
      </header>

      <div className="max-w-4xl mx-auto space-y-6">
        <div className="bg-gray-800 p-5 rounded-lg">
          <input
            type="text"
            placeholder="Digite o VIN (ex: 1HGCM82633A003456)"
            value={vin}
            onChange={(e) => setVin(e.target.value)}
            className="bg-gray-900 text-white p-3 w-full rounded mb-3"
          />
          <button
            onClick={handleLoadData}
            className="bg-orange-500 text-black p-3 w-full rounded font-bold"
          >
            Carregar Dados
          </button>
        </div>

        {data && (
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gray-800 p-5 rounded-lg">
              <h2 className="text-orange-500 text-xl mb-3">Manutenção Rápida</h2>
              <p className="text-sm">Óleo: <span className="text-white">{data.oil}</span></p>
              <p className="text-sm">Freio: <span className="text-white">{data.brake}</span></p>
              <p className="text-sm">Torque: <span className="text-white">{data.torque}</span></p>
            </div>
            <div className="bg-red-900 p-5 rounded-lg border border-red-600">
              <h2 className="text-orange-500 text-xl mb-3">Alertas</h2>
              <p className="text-sm">Recalls: <span className="text-white">{data.recalls}</span></p>
            </div>
          </div>
        )}

        <div className="bg-gray-800 p-5 rounded-lg">
          <input
            type="text"
            placeholder="Ex: ABS light on in F-150"
            value={chatMessage}
            onChange={(e) => setChatMessage(e.target.value)}
            className="bg-gray-900 text-white p-3 w-full rounded mb-3"
          />
          <button
            onClick={handleChat}
            className="bg-gray-600 text-white p-3 w-full rounded font-bold"
          >
            Pergunte ao Torq
          </button>
          {chatResponse && <p className="mt-3 text-sm text-gray-300">{chatResponse}</p>}
        </div>

        <div className="flex gap-4">
          <button
            onClick={handleConfirmFix}
            className="bg-green-600 text-white p-3 flex-1 rounded font-bold"
          >
            Confirm Fix
          </button>
          <button className="bg-blue-600 text-white p-3 flex-1 rounded font-bold">
            Ver 3D
          </button>
        </div>

        <div className="bg-gray-800 p-5 rounded-lg">
          <h2 className="text-orange-500 text-xl mb-3 text-center">Leaderboard</h2>
          <ul className="space-y-2 text-sm">
            <li>🥇 João – 87 fixes</li>
            <li>🥈 Maria – 65 fixes</li>
            <li>🥉 Pedro – 52 fixes</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
