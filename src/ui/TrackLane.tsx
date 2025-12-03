import React from 'react';
import { useStore } from '../state/store';

export default function TrackLane() {
  const tracks = useStore(s => s.tracks);
  const addSampler = useStore(s => s.addSampler);
  const addSynth = useStore(s => s.addSynth);
  const triggerSample = useStore(s => s.triggerSample);

  return (
    <div className="panel">
      <strong>Tracks</strong>
      <div className="row" style={{ gap: 8 }}>
        <button onClick={() => addSampler()}>Add Sampler</button>
        <button onClick={() => addSynth()}>Add Synth</button>
        <button onClick={() => triggerSample()}>Trigger Kick</button>
      </div>
      <ul>
        {tracks.map(t => <li key={t.id}>{t.name} • devices: {t.devices.length}</li>)}
      </ul>
    </div>
  );
}
// ...
import PluginRack from './PluginRack';

export default function TrackLane() {
  // existing code...
  return (
    <div className="panel">
      {/* existing content */}
      <PluginRack trackName="Test Track" />
    </div>
  );
}

