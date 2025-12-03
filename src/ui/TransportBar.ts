import React from 'react';
import { useStore } from '../state/store';
import { getAudioContext } from '../engine/audioContext';

export default function TransportBar() {
  const bpm = useStore(s => s.project.bpm);
  const setBpm = useStore(s => s.setBpm);
  const playing = useStore(s => s.transport.playing);
  const togglePlay = useStore(s => s.togglePlay);

  return (
    <div className="panel row" style={{ justifyContent: 'space-between', width: '100%' }}>
      <div className="row" style={{ gap: 6 }}>
        <button onClick={() => togglePlay()}>{playing ? 'Stop' : 'Play'}</button>
        <button onClick={() => getAudioContext().resume()}>Audio Init</button>
      </div>
      <div className="row">
        <label>BPM</label>
        <input type="number" value={bpm} onChange={e => setBpm(Number(e.target.value))} style={{ width: 80 }} />
      </div>
    </div>
  );
}
