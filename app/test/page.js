'use client';

import { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';

export default function TestPage() {
  const [vin, setVin] = useState('');
  const [data, setData] = useState(null);
  const [chatMessage, setChatMessage] = useState('');
  const [chatResponse, setChatResponse] = useState('');
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [show3D, setShow3D] = useState(false);
  const [recentVehicles, setRecentVehicles] = useState([
    { id: '1', year: '2022', make: 'BMW', model: '330e' },
    { id: '2', year: '2016', make: 'Honda', model: 'Odyssey' },
    { id: '3', year: '2017', make: 'Nissan', model: 'Rogue' },
  ]); // Simulado

  const fluidCapacities = [ // Simulado
    { type: 'Air Cond Refrigerant', metric: '1.59 LBS', spec: 'R-134a' },
    { type: 'Transmission Fluid', metric: '9.2 QTS', spec: 'ATF-3' },
    { type: 'Brake Fluid', metric: 'N/A', spec: 'DOT 4 Low Viscosity' },
  ];

  const topRepairs = [ // Simulado
    { component: 'Wheels', count: 11 },
    { component: 'Headlight', count: 5 },
    { component: 'Brake Rotor', count: 2 },
  ];

  const leaderboard = [ // Simulado
    { name: 'John', fixes: 87 },
    { name: 'Maria', fixes: 65 },
    { name: 'Peter', fixes: 52 },
  ];

  const handleLoadData = () => {
    setData({
      oil: '5.7L 5W-30',
      brake: 'DOT 4 0.75L',
      torque: '25 Nm (alternator)',
      recalls: 'Simulated - fuel pump',
    });
  };

  const handleChat = () => {
    setChatResponse('Check ABS sensor - 87% resolved. Part number: 12345-A. Time: 1h45.');
  };

  const handleConfirmFix = () => {
    setShowConfirmModal(false);
    alert('Confirmed Fix: Point gained!');
  };

  const handleSelectRecent = (selectedVin) => {
    setVin(selectedVin);
    handleLoadData();
  };

  const ThreeDModel = () => {
    const { scene } = useGLTF('/models/alternator.glb'); // Add GLB to public/models
    return <primitive object={scene} />;
  };

  return (
    <div className="min-h-screen bg-black text-white p-6 font-sans">
      <header className="text-center mb-6">
        <h1 className="text-orange-500 text-3xl font-bold">Torq.ai - Test Dashboard</h1>
      </header>
      <main className="space-y-6">
        {/* Vehicle Selection */}
        <div className="bg-gray-800 p-4 rounded">
          <h2 className="text-orange-500 mb-2">Select Vehicle</h2>
          <div className="flex space-x-2 mb-2">
            <input className="bg-gray-900 p-2 flex-1 rounded" placeholder="VIN" value={vin} onChange={(e) => setVin(e.target.value)} />
            <input className="bg-gray-900 p-2 flex-1 rounded" placeholder="Plate" />
            <select className="bg-gray-900 p-2 rounded">
              <option>State</option>
            </select>
          </div>
          <button onClick={handleLoadData} className="bg-orange-500 p-2 w-full rounded text-black">Lookup</button>
        </div>

        {/* Recent Vehicles */}
        <div className="bg-gray-800 p-4 rounded">
          <h2 className="text-orange-500 mb-2">Recent Vehicles</h2>
          <ul className="space-y-2">
            {recentVehicles.map((v, i) => (
              <li key={i} onClick={() => handleSelectRecent(v.id)} className="cursor-pointer text-gray-300">
                {v.year} {v.make} {v.model}
              </li>
            ))}
          </ul>
        </div>

        {/* Manutenção Rápida */}
        {data && (
          <div className="bg-gray-800 p-4 rounded">
            <h2 className="text-orange-500 mb-2">Quick Maintenance</h2>
            <p>Oil: {data.oil}</p>
            <p>Brake: {data.brake}</p>
            <p>Torque: {data.torque}</p>
          </div>
        )}

        {/* Fluid Capacities */}
        <div className="bg-gray-800 p-4 rounded">
          <h2 className="text-orange-500 mb-2">Fluid Capacities</h2>
          <table className="w-full text-sm">
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
        <div className="bg-gray-800 p-4 rounded">
          <h2 className="text-orange-500 mb-2">Top Repairs</h2>
          <ul className="list-disc pl-4">
            {topRepairs.map((r, i) => (
              <li key={i}>{r.component} ({r.count})</li>
            ))}
          </ul>
        </div>

        {/* Alertas */}
        {data && (
          <div className="bg-red-900 p-4 rounded">
            <h2 className="text-orange-500 mb-2">Alerts</h2>
            <p>Recalls: {data.recalls}</p>
          </div>
        )}

        {/* Chat */}
        <div className="bg-gray-800 p-4 rounded">
          <h2 className="text-orange-500 mb-2">Ask Torq</h2>
          <input className="bg-gray-900 p-2 w-full rounded mb-2" placeholder="Ex: ABS light on in F-150" value={chatMessage} onChange={(e) => setChatMessage(e.target.value)} />
          <button onClick={handleChat} className="bg-gray-500 p-2 w-full rounded text-white">Send</button>
          <p className="mt-2">{chatResponse}</p>
        </div>

        {/* Confirmed Fix */}
        <button onClick={ () => setShowConfirmModal(true) } className="bg-green-500 p-2 w-full rounded text-white">Confirm Fix</button>
        {showConfirmModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-gray-800 p-6 rounded max-w-md w-full">
              <h2 className="text-orange-500 mb-4">Confirmed Fix</h2>
              <input className="bg-gray-900 p-2 w-full rounded mb-2" placeholder="Symptom" />
              <input className="bg-gray-900 p-2 w-full rounded mb-2" placeholder="Part Replaced" />
              <input className="bg-gray-900 p-2 w-full rounded mb-2" placeholder="Time (hours)" />
              <input type="file" className="bg-gray-900 p-2 w-full rounded mb-4" />
              <button onClick={handleConfirmFix} className="bg-green-500 p-2 w-full rounded text-white">Confirm</button>
              <button onClick={ () => setShowConfirmModal(false) } className="bg-gray-500 p-2 w-full rounded text-white mt-2">Cancel</button>
            </div>
          </div>
        )}

        {/* 3D */}
        <button onClick={ () => setShow3D(true) } className="bg-blue-500 p-2 w-full rounded text-white">View 3D</button>
        {show3D && (
          <div className="h-64 bg-gray-800 rounded">
            <Canvas>
              <ambientLight />
              <pointLight position={[10, 10, 10]} />
              <OrbitControls />
              <ThreeDModel />
            </Canvas>
          </div>
        )}

        {/* Leaderboard */}
        <div className="bg-gray-800 p-4 rounded">
          <h2 className="text-orange-500 mb-2">Leaderboard</h2>
          <ul className="list-disc pl-4">
            {leaderboard.map((u, i) => (
              <li key={i}>{u.name} - {u.fixes} fixes</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

function ThreeDModel() {
  const { scene } = useGLTF('/models/alternator.glb');
  return <primitive object={scene} />;
}
