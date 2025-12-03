import React, { useState } from 'react';

export default function ExampleWamUI() {
  const [gain, setGain] = useState(1);
  return (
    <div className="panel col">
      <strong>Example WAM UI</strong>
      <label>Gain</label>
      <input type="range" min="0" max="2" step="0.01" value={gain} onChange={e => setGain(Number(e.target.value))} />
    </div>
  );
}
