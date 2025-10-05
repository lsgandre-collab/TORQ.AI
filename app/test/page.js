'use client';  // Pra interatividade

export default function TestPage() {
  const handleLoadData = () => {
    // Simula dados do VIN (depois ligamos API real)
    alert('Óleo: 5.7L 5W-30\\nFreio: DOT 4 0.75L\\nTorque: 25 Nm alternador\\nRecalls: Simulado - bomba de combustível');
  };

  const handleChat = () => {
    // Simula chat com Grok (depois ligamos API real)
    alert('Abrindo chat com Torq... Pergunte sobre o problema! (Ex: "ABS light on in F-150")');
  };

  return (
    <div style={{ background: 'black', color: 'white', padding: '20px', fontFamily: 'Arial' }}>
      <h1 style={{ color: 'orange' }}>Torq.ai - Test Dashboard</h1>
      <input type="text" placeholder="Enter VIN (e.g., 1HGCM82633A003456)" style={{ marginBottom: '10px', display: 'block', padding: '10px', width: '100%' }} />
      <button onClick={handleLoadData} style={{ background: 'orange', color: 'black', padding: '10px', marginRight: '10px', border: 'none' }}>Load Data</button>
      <button onClick={handleChat} style={{ background: 'gray', color: 'white', padding: '10px', border: 'none' }}>Pergunte ao Torq</button>
    </div>
  );
}
