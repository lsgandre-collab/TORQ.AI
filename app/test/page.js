'use client';

import { useState } from 'react';

export default function TestPage() {
  const [vin, setVin] = useState('');
  const [data, setData] = useState(null);
  const [chatMessage, setChatMessage] = useState('');
  const [chatResponse, setChatResponse] = useState('');
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [show3D, setShow3D] = useState(false);

  const recentVehicles = [ // Simulado, like ALLDATA
    { year: '2022', make: 'BMW', model: '330e' },
    { year: '2016', make: 'Honda', model: 'Odyssey' },
    { year: '2017', make: 'Nissan', model: 'Rogue' },
  ];

  const fluidCapacities = [ // Simulado, like Mitchell table
    { type: 'Air Cond Refrigerant', metric: '1.59 LBS', spec: 'R-134a' },
    { type: 'Transmission Fluid', metric: '9.2 QTS', spec: 'ATF-3' },
    { type: 'Brake Fluid', metric: 'N/A', spec: 'DOT 4 Low Viscosity' },
  ];

  const topRepairs = [ // Simulado, like Mitchell lists
    { component: 'Wheels', count: 11 },
    { component: 'Headlight', count: 5 },
    { component: 'Brake Rotor', count: 2 },
  ];

  const handleLoadData = () => {
    setData({
      oil: '5.7L 5W-30',
      brake: 'DOT 4 0.75L',
      torque: '25 Nm (alternador)',
      recalls: 'Bomba de combustível',
      tsbs: 'Vazamento cabeçote (92% fixes)',
    });
  };

  const handleChat = () => {
    setChatResponse('Verifique sensor ABS - 87% resolvido. Part number: 12345-A. Tempo: 1h45.');
  };

  const handleConfirmFix = () => {
    setShowConfirmModal(false);
    alert('Confirmed Fix: Ganhou 1 ponto!');
  };

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <header className="text-center mb-8">
        <h1 className="text-orange-500 text-4xl font-bold">Torq.ai</h1>
        <p className="text-gray-400">Diagnóstico rápido e inteligente</p>
      </header>

      <div className="max-w-4xl mx-auto space-y-6">
        {/* Vehicle Selection */}
        <div className="bg-gray-800 p-5 rounded-lg">
          <h2 className="text-orange-500 text-xl mb-3">Select Vehicle</h2>
          <input
            type="text"
            placeholder="Enter VIN (ex: 1HGCM82633A003456)"
            value={vin}
            onChange={(e) => setVin(e.target.value)}
            className="bg-gray-900 text-white p-3 w-full rounded mb-3"
          />
          <button
            onClick={handleLoadData}
            className="bg-orange-500 text-black p-3 w-full rounded font-bold"
          >
            Load Data
          </button>
        </div>

        {/* Recent Vehicles */}
        <div className="bg-gray-800 p-5 rounded-lg">
          <h2 className="text-orange-500 text-xl mb-3">Recent Vehicles</h2>
          <ul className="space-y-2 text-sm">
            {recentVehicles.map((v, i) => (
              <li key={i} className="text-gray-300">{v.year} {v.make} {v.model}</li>
            ))}
          </ul>
        </div>

        {/* Manutenção Rápida */}
        {data && (
          <div className="bg-gray-800 p-5 rounded-lg">
            <h2 className="text-orange-500 text-xl mb-3">Manutenção Rápida</h2>
            <p className="text-sm">Óleo: {data.oil}</p>
            <p className="text-sm">Freio: {data.brake}</p>
            <p className="text-sm">Torque: {data.torque}</p>
          </div>
        )}

        {/* Fluid Capacities Table */}
        <div className="bg-gray-800 p-5 rounded-lg">
          <h2 className="text-orange-500 text-xl mb-3">Fluid Capacities</h2>
          <table className="w-full text-sm text-gray-300">
            <thead>
              <tr>
                <th className="text-left">Type</th>
                <th className="text-left">Metric</th>
                <th className="text-left">Spec</th>
              </tr>
            </thead>
            <tbody>
              {fluidCapacities.map((f, i) => (
                <tr key={i}>
                  <td>{f.type}</td>
                  <td>{f.metric}</td>
                  <td>{f.spec}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Top Repairs */}
        <div className="bg-gray-800 p-5 rounded-lg">
          <h2 className="text-orange-500 text-xl mb-3">Top Repairs</h2>
          <ul className="space-y-2 text-sm text-gray-300">
            {topRepairs.map((r, i) => (
              <li key={i}>{r.component} ({r.count})</li>
            ))}
          </ul>
        </div>

        {/* Alertas */}
        {data && (
          <div className="bg-red-900 p-5 rounded-lg border border-red-600">
            <h2 className="text-orange-500 text-xl mb-3">Alertas</h2>
            <p className="text-sm">Recalls: {data.recalls}</p>
          </div>
        )}

        {/* Chat */}
        <div className="bg-gray-800 p-5 rounded-lg">
          <h2 className="text-orange-500 text-xl mb-3">Pergunte ao Torq</h2>
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
            Enviar
          </button>
          {chatResponse && <p className="mt-3 text-sm text-gray-300">{chatResponse}</p>}
        </div>

        {/* Confirmed Fix Modal */}
        <button
          onClick={() => setShowConfirmModal(true)}
          className="bg-green-600 text-white p-3 w-full rounded font-bold"
        >
          Confirm Fix
        </button>
        {showConfirmModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-gray-800 p-6 rounded-lg max-w-md w-full">
              <h2 className="text-orange-500 text-xl mb-4">Confirmed Fix</h2>
              <input className="bg-gray-900 p-2 w-full rounded mb-2" placeholder="Sintoma" />
              <input className="bg-gray-900 p-2 w-full rounded mb-2" placeholder="Peça trocada" />
              <input className="bg-gray-900 p-2 w-full rounded mb-2" placeholder="Tempo real (horas)" />
              <input type="file" className="bg-gray-900 p-2 w-full rounded mb-4" placeholder="Upload 3 fotos" />
              <button
                onClick={handleConfirmFix}
                className="bg-green-500 text-white p-3 w-full rounded"
              >
                Confirmar
              </button>
              <button
                onClick={() => setShowConfirmModal(false)}
                className="bg-gray-500 text-white p-3 w-full rounded mt-2"
              >
                Cancelar
              </button>
            </div>
          </div>
        )}

        {/* 3D */}
        <button
          onClick={() => setShow3D(true)}
          className="bg-blue-600 text-white p-3 w-full rounded font-bold"
        >
          Ver 3D Básico
        </button>
        {setShow3D && (
          <div className="h-64 bg-gray-800 rounded flex items-center justify-center">
            <p className="text-gray-400">[Model 3D girável aqui - use Three.js]</p>
          </div>
        )}

        {/* Leaderboard */}
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
