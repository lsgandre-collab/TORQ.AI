'use client';

import { useState } from 'react';

export default function TestPage() {
  const [vin, setVin] = useState('');
  const [data, setData] = useState(null);
  const [chatMessage, setChatMessage] = useState('');
  const [chatResponse, setChatResponse] = useState('');
  const [fixConfirmed, setFixConfirmed] = useState(false);
  const [leaderboard, setLeaderboard] = useState([{ name: 'João', fixes: 87 }, { name: 'Maria', fixes: 65 }]); // Simulado

  const redFlags = ['política', 'presidente', 'eleição', 'governo', 'congresso', 'guerra', 'Ucrânia', 'Gaza', 'COVID', 'vírus', 'vacina', 'bitcoin', 'cripto', 'dólar', 'economia', 'clima', 'aquecimento', 'filosofia', 'religião', 'Deus'];

  const handleLoadData = async () => {
    // Simula NHTSA (depois liga real)
    setData({
      oil: '5.7L 5W-30',
      brake: 'DOT 4 0.75L',
      torque: '25 Nm alternador',
      recalls: 'Simulado - bomba de combustível',
    });
  };

  const handleChat = () => {
    if (redFlags.some(flag => chatMessage.toLowerCase().includes(flag))) {
      setChatResponse('Desculpa, só falo de carros, peças e consertos. Pergunte sobre alternador ou freio!');
      return;
    }
    // Simula Grok (depois liga API)
    setChatResponse('Resposta do Torq: Verifique o sensor ABS - 87% resolvido. Part number: 12345-A. Tempo: 1h45.');
  };

  const handleConfirmFix = () => {
    setFixConfirmed(true);
    alert('Confirmed Fix: VIN salvado, foto uploadada (simulado). Ganhou 1 ponto!');
  };

  return (
    <div className="min-h-screen bg-black text-white p-6 font-sans">
      <header className="flex items-center justify-center mb-6">
        <h1 className="text-orange-500 text-3xl font-bold">Torq.ai - Dashboard</h1>
      </header>
      <main className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-800 p-4 rounded-lg">
          <input 
            type="text" 
            placeholder="Enter VIN (e.g., 1HGCM82633A003456)" 
            value={vin} 
            onChange={(e) => setVin(e.target.value)} 
            className="bg-gray-900 text-white p-2 w-full rounded mb-4" 
          />
          <button onClick={handleLoadData} className="bg-orange-500 text-black p-2 rounded w-full mb-2">Load Data</button>
          {data && (
            <div className="text-sm">
              <p>Óleo: {data.oil}</p>
              <p>Freio: {data.brake}</p>
              <p>Torque: {data.torque}</p>
              <p>Recalls: {data.recalls}</p>
            </div>
          )}
          <button onClick={handleConfirmFix} className="bg-green-500 text-white p-2 rounded w-full mt-4">Confirm Fix (with photo)</button>
        </div>
        <div className="bg-gray-800 p-4 rounded-lg">
          <input 
            type="text" 
            placeholder="Pergunte sobre o problema (ex: ABS light on)" 
            value={chatMessage} 
            onChange={(e) => setChatMessage(e.target.value)} 
            className="bg-gray-900 text-white p-2 w-full rounded mb-4" 
          />
          <button onClick={handleChat} className="bg-gray-500 text-white p-2 rounded w-full mb-2">Pergunte ao Torq</button>
          <p className="text-sm">{chatResponse}</p>
        </div>
      </main>
      <footer className="mt-6">
        <h2 className="text-center text-orange-500 text-xl mb-2">Leaderboard</h2>
        <ul className="list-disc pl-6">
          {leaderboard.map((user, i) => <li key={i} className="text-sm">{user.name} - {user.fixes} fixes</li>)}
        </ul>
      </footer>
    </div>
  );
}
'use client';

import { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';

export default function TestPage() {
  const [vin, setVin] = useState('');
  const [data, setData] = useState(null);
  const [chatMessage, setChatMessage] = useState('');
  const [chatResponse, setChatResponse] = useState('');
  const [show3D, setShow3D] = useState(false);

  const handleLoadData = () => {
    // Simula (depois NHTSA)
    setData({
      oil: '5.7L 5W-30',
      brake: 'DOT 4 0.75L',
      torque: '25 Nm',
      recalls: 'Bomba de combustível',
    });
  };

  const handleChat = () => {
    setChatResponse('Verifique sensor ABS - 87% resolvido.');
  };

  const handleConfirmFix = () => {
    alert('Confirmed Fix: Ganhou 1 ponto!');
  };

  const ThreeDModel = () => {
    const { scene } = useGLTF('/models/alternator.glb');  // Baixe um GLB grátis de TurboSquid e adicione no public/models
    return <primitive object={scene} />;
  };

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <header className="text-center mb-6">
        <h1 className="text-orange-500 text-3xl font-bold">Torq.ai - Dashboard</h1>
        <p className="text-gray-400">O torque que pensa</p>
      </header>
      <div className="max-w-4xl mx-auto grid gap-6">
        <input className="bg-gray-800 p-2 rounded w-full" placeholder="Enter VIN/Plate/State" value={vin} onChange={(e) => setVin(e.target.value)} />
        <button onClick={handleLoadData} className="bg-orange-500 p-2 rounded text-black">Load Data</button>
        {data && (
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-gray-800 p-4 rounded">
              <h2 className="text-orange-500 mb-2">Manutenção Rápida</h2>
              <p>Óleo: {data.oil}</p>
              <p>Freio: {data.brake}</p>
              <p>Torque: {data.torque}</p>
            </div>
            <div className="bg-gray-800 p-4 rounded">
              <h2 className="text-orange-500 mb-2">Alertas</h2>
              <p>Recalls: {data.recalls}</p>
            </div>
          </div>
        )}
        <input className="bg-gray-800 p-2 rounded w-full" placeholder="Enter Codes/Components/Symptoms" value={chatMessage} onChange={(e) => setChatMessage(e.target.value)} />
        <button onClick={handleChat} className="bg-gray-500 p-2 rounded text-white">Pergunte ao Torq</button>
        <p>{chatResponse}</p>
        <button onClick={handleConfirmFix} className="bg-green-500 p-2 rounded text-white">Confirm Fix</button>
        <button onClick={() => setShow3D(!show3D)} className="bg-blue-500 p-2 rounded text-white">Ver 3D</button>
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
      </div>
    </div>
  );
}

function ThreeDModel() {
  const { scene } = useGLTF('/models/alternator.glb'); // Adicione um GLB na pasta public/models (baixe grátis de TurboSquid)
  return <primitive object={scene} />;
}
