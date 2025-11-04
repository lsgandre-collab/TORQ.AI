'use client';

import { useState } from 'react';

export default function TestPage() {
  const [vin, setVin] = useState('');
  const [data, setData] = useState(null);
  const [chatMessage, setChatMessage] = useState('');
  const [chatResponse, setChatResponse] = useState('');
  const [leaderboard, setLeaderboard] = useState([{ name: 'João (Audi Master)', fixes: 87 }, { name: 'Maria', fixes: 65 }]);

  const fluidCapacities = [
    { type: 'Air Cond Refrigerant', metric: '1.59 LBS', spec: 'R-134a Part No. 83 19 4 408 386' },
    { type: 'Automatic Transmission Fluid', metric: '9.2 QTS', spec: 'BMW Automatic Transmission Fluid ATF-3' },
    { type: 'Brake Fluid', metric: 'N/A', spec: 'BMW Brake Fluid DOT 4 with Low viscosity' },
  ];

  const topRepairs = [
    { component: 'Wheels', count: 11 },
    { component: 'Remote Keyless Entry Transmitter', count: 7 },
    { component: 'Headlight', count: 5 },
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
    setChatResponse('Resposta do Torq: Verifique o sensor ABS - 87% resolvido. Part number: 12345-A. Tempo: 1h45.');
  };

  const handleConfirmFix = () => {
    alert('Confirmed Fix: VIN salvado, foto uploadada. Ganhou 1 ponto!');
  };

  return (
    <div style={{ background: 'black', color: 'white', padding: '20px', fontFamily: 'Arial' }}>
      <h1 style={{ color: 'orange' }}>Torq.ai - Dashboard Melhorado</h1>
      <p style={{ color: 'gray' }}>O torque que pensa</p>
      <input type="text" placeholder="Enter VIN (e.g., 1HGCM82633A003456)" value={vin} onChange={(e) => setVin(e.target.value)} style={{ marginBottom: '10px', display: 'block', padding: '2px', width: '100%' }} />
      <button onClick={handleLoadData} style={{ background: 'orange', color: 'black', padding: '2px', marginRight: '10px' }}>Load Data</button>
      <input type="text" placeholder="Enter Codes/Components/Symptoms" value={chatMessage} onChange={(e) => setChatMessage(e.target.value)} style={{ marginBottom: '10px', display: 'block', padding: '2px', width: '100%' }} />
      <button onClick={handleChat} style={{ background: 'gray', color: 'white', padding: '2px', marginRight: '10px' }}>Pergunte ao Torq</button>
      <button onClick={handleConfirmFix} style={{ background: 'green', color: 'white', padding: '2px' }}>Confirm Fix</button>
      <p style={{ color: 'gray' }}>{chatResponse}</p>
      {data && (
        <div>
          <h2 style={{ color: 'orange' }}>Manutenção Rápida</h2>
          <p>Óleo: {data.oil}</p>
          <p>Freio: {data.brake}</p>
          <p>Torque: {data.torque}</p>
          <h2 style={{ color: 'orange' }}>Alertas</h2>
          <p>Recalls: {data.recalls}</p>
          <p>TSBs: {data.tsbs}</p>
          <h2 style={{ color: 'orange' }}>Fluid Capacities</h2>
          <table style={{ borderCollapse: 'collapse', width: '100%', marginBottom: '10px' }}>
            <thead>
              <tr style={{ background: 'gray' }}>
                <th style={{ border: '1px solid white', padding: '2px' }}>Fluid Type</th>
                <th style={{ border: '1px solid white', padding: '2px' }}>Metric</th>
                <th style={{ border: '1px solid white', padding: '2px' }}>Spec</th>
              </tr>
            </thead>
            <tbody>
              {fluidCapacities.map((fluid, i) => (
                <tr key={i}>
                  <td style={{ border: '1px solid white', padding: '2px' }}>{fluid.type}</td>
                  <td style={{ border: '1px solid white', padding: '2px' }}>{fluid.metric}</td>
                  <td style={{ border: '1px solid white', padding: '2px' }}>{fluid.spec}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <h2 style={{ color: 'orange' }}>Top Repairs</h2>
          <ul>
            {topRepairs.map((repair, i) => (
              <li key={i}>{repair.component} ({repair.count})</li>
            ))}
          </ul>
        </div>
      )}
      <h2 style={{ color: 'orange' }}>Leaderboard</h2>
      <ul>
        {leaderboard.map((user, i) => (
          <li key={i}>{user.name} - {user.fixes} fixes</li>
        ))}
      </ul>
    </div>
  );
}
