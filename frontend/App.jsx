import React, { useState } from 'react';
import './App.css';

function App() {
  const [symptomInput, setSymptomInput] = useState('');
  const [output, setOutput] = useState(null);

  const checkSymptoms = async () => {
    const res = await fetch('http://localhost:5000/api/symptoms', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ symptoms: symptomInput })
    });
    const data = await res.json();
    setOutput(data);
  };

  return (
    <div className="min-h-screen bg-pink-100 flex flex-col items-center justify-center">
      <h2 className="text-2xl font-bold text-pink-700">Swasthyaa AI Check</h2>
      <textarea
        className="border rounded p-2 mt-4 w-2/3"
        placeholder="Type your symptoms..."
        value={symptomInput}
        onChange={(e) => setSymptomInput(e.target.value)}
      />
      <button className="mt-3 px-4 py-2 bg-pink-600 text-white rounded" onClick={checkSymptoms}>
        Submit
      </button>
      {output && (
        <div className="mt-4 bg-white p-4 rounded shadow">
          <p><strong>Risk:</strong> {output.risk}</p>
          <p><strong>Note:</strong> {output.message}</p>
        </div>
      )}
    </div>
  );
}

export default App;