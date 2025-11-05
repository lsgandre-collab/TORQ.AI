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

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <header className="text-center mb-6">
        <h1 className="text-orange-500 text-4xl font-bold">Torq.ai - Dashboard</h1>
      </header>
      <main className="max-w-4xl mx-auto space-y-6">
        <div className="bg-gray-800 p-4 rounded">
          <input className="bg-gray-900 p-2 w-full rounded mb-2 text-white" placeholder="Enter VIN" value={vin} onChange={(e) => setVin(e.target.value)} />
          <button onClick={handleLoadData} className="bg-orange-500 p-2 w-full rounded text-black">Load Data</button>
        </div>
        {data && (
          <div className="grid gap-4 md:grid-cols-2">
            <div className="bg-gray-800 p-4 rounded">
              <h2 className="text-orange-500 mb-2">Quick Maintenance</h2>
              <p>Oil: {data.oil}</p>
              <p>Brake: {data.brake}</p>
              <p>Torque: {data.torque}</p>
            </div>
            <div className="bg-red-900 p-4 rounded">
              <h2 className="text-orange-500 mb-2">Alerts</h2>
              <p>Recalls: {data.recalls}</p>
            </div>
          </div>
        )}
        <div className="bg-gray-800 p-4 rounded">
          <input className="bg-gray-900 p-2 w-full rounded mb-2 text-white" placeholder="Ask about problem (ex: ABS light on)" value={chatMessage} onChange={(e) => setChatMessage(e.target.value)} />
          <button onClick={handleChat} className="bg-gray-500 p-2 w-full rounded text-white">Ask Torq</button>
          <p className="mt-2">{chatResponse}</p>
        </div>
        <button onClick={() => setShowConfirmModal(true)} className="bg-green-500 p-2 w-full rounded text-white">Confirm Fix</button>
        {showConfirmModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-gray-800 p-6 rounded max-w-md w-full">
              <h2 className="text-orange-500 mb-4">Confirmed Fix</h2>
              <input className="bg-gray-900 p-2 w-full rounded mb-2 text-white" placeholder="Symptom" />
              <input className="bg-gray-900 p-2 w-full rounded mb-2 text-white" placeholder="Part Replaced" />
              <input className="bg-gray-900 p-2 w-full rounded mb-2 text-white" placeholder="Time (hours)" />
              <input type="file" className="bg-gray-900 p-2 w-full rounded mb-4 text-white" />
              <button onClick={handleConfirmFix} className="bg-green-500 p-2 w-full rounded text-white">Confirm</button>
              <button onClick={() => setShowConfirmModal(false)} className="bg-gray-500 p-2 w-full rounded text-white mt-2">Cancel</button>
            </div>
          </div>
        )}
        <button onClick={() => setShow3D(true)} className="bg-blue-500 p-2 w-full rounded text-white">View 3D</button>
        {show3D && (
          <div className="h-64 bg-gray-800 rounded">
            <Canvas>
              <ambientLight />
              <pointLight position={[10, 10, 10]} />
              <OrbitControls />
              <mesh>
                <boxGeometry args=[1, 1, 1] />
                <meshStandardMaterial color="hotpink" />
              </mesh>
            </Canvas>
          </div>
        )}
        <div className="bg-gray-800 p-4 rounded">
          <h2 className="text-orange-500 mb-2">Leaderboard</h2>
          <ul className="list-disc pl-4">
            <li>John - 87 fixes</li>
            <li>Maria - 65 fixes</li>
            <li>Pedro - 52 fixes</li>
          </ul>
        </div>
      </main>
    </div>
  );
}
