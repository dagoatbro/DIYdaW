import React from 'react';
import { useStore } from '../state/store';

export default function AutomationLane() {
  const bpm = useStore(s => s.project.bpm);
  const setBpm = useStore(s => s.setBpm);
  const masterGain = useStore(s => s.masterGain);
  const setMasterGain = useStore(s => s.setMasterGain);

  return (
    <div className="panel row" style={{ justifyContent: 'space-between' }}>
      <div className="col" style={{ width: 300 }}>
        <strong>Automation</strong>
        <label>Master Gain</label>
        <input type="range" min="0" max="1" step="0.01" value={masterGain}
               onChange={e => setMasterGain(Number(e.target.value))} />
      </div>
      <div className="col" style={{ width: 300 }}>
        <strong>Tempo</strong>
        <label>BPM</label>
        <input type="range" min="60" max="200" step="1" value={bpm}
               onChange={e => setBpm(Number(e.target.value))} />
      </div>
    </div>
  );
}
