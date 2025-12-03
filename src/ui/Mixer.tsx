import React from 'react';
import { useStore } from '../state/store';

export default function Mixer() {
  const tracks = useStore(s => s.tracks);
  const setTrackGain = useStore(s => s.setTrackGain);
  const setTrackPan = useStore(s => s.setTrackPan);

  return (
    <div className="panel">
      <strong>Mixer</strong>
      <div className="row" style={{ overflowX: 'auto' }}>
        {tracks.map(t => (
          <div key={t.id} className="col" style={{ width: 140 }}>
            <div>{t.name}</div>
            <label>Gain</label>
            <input type="range" min="0" max="1" step="0.01"
              value={t.gain} onChange={e => setTrackGain(t.id, Number(e.target.value))} />
            <label>Pan</label>
            <input type="range" min="-1" max="1" step="0.01"
              value={t.pan} onChange={e => setTrackPan(t.id, Number(e.target.value))} />
          </div>
        ))}
      </div>
    </div>
  );
}
