'use client';  // Pra interatividade

import { useState } from 'react';

export default function TestPage() {
  const [vin, setVin] = useState('');
  const [data, setData] = useState(null);
  const [chatMessage, setChatMessage] = useState('');
  const [chatResponse, setChatResponse] = useState('');

  const redFlags = ['política', 'presidente', 'eleição', 'governo', 'congresso', 'guerra', 'Ucrânia', 'Gaza', 'COVID', 'vírus', 'vacina', 'bitcoin', 'cripto', 'dólar', 'economia', 'clima', 'aquecimento', 'filosofia', 'religião', 'Deus'];

  const handleLoadData = async () => {
    // Liga API real do NHTSA pra VIN (dados de óleo/freio/torque/recalls simulados por agora, liga real depois)
    const response = await fetch(`https://vpic.nhtsa.dot.gov/api/vehicles/decodevin/${vin}?format=json`);
    const result = await response.json();
    setData(result.Results);
    alert(`Óleo: 5.7L 5W-30 (simulado)\\nFreio: DOT 4 0.75L\\nTorque: 25 Nm alternador\\nRecalls: Simulado - bomba de combustível`);
  };

  const handleChat = () => {
    // Filtro de red flags
    if (redFlags.some(flag => chatMessage.toLowerCase().includes(flag))) {
      setChatResponse('Desculpa, só falo de carros, peças e consertos. Pergunte sobre alternador ou freio!');
    } else {
      // Simula Grok (depois liga API real)
      setChatResponse('Resposta do Torq: Verifique o sensor ABS - 87% resolvido. Part number: 12345-A. Tempo: 1h45.');
    }
  };

  const handleConfirmFix = () => {
    // Simula upload de foto e confirmed fix
    alert('Confirmed Fix: VIN salvado, foto uploadada (simulado). Ganhou 1 ponto!');
  };

  return (
    <div style={{ background: 'black', color: 'white', padding: '20px', fontFamily: 'Arial' }}>
      <h1 style={{ color: 'orange' }}>Torq.ai - Test Dashboard</h1>
      <input type="text" placeholder="Enter VIN (e.g., 1HGCM82633A003456)" value={vin} onChange={(e) => setVin(e.target.value)} style={{ marginBottom: '10px', display: 'block', padding: '10px', width: '100%' }} />
      <button onClick={handleLoadData} style={{ background: 'orange', color: 'black', padding: '10px', marginRight: '10px', border: 'none' }}>Load Data</button>
      <input type="text" placeholder="Pergunte sobre o problema (ex: ABS light on)" value={chatMessage} onChange={(e) => setChatMessage(e.target.value)} style={{ marginBottom: '10px', display: 'block', padding: '10px', width: '100%' }} />
      <button onClick={handleChat} style={{ background: 'gray', color: 'white', padding: '10px', border: 'none' }}>Pergunte ao Torq</button>
      <p>{chatResponse}</p>
      <button onClick={handleConfirmFix} style={{ background: 'green', color: 'white', padding: '10px', border: 'none' }}>Confirm Fix (with photo)</button>
    </div>
  );
}
