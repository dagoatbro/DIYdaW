import React, { useEffect } from 'react';
import { useStore } from './state/store';
import TransportBar from './ui/TransportBar';
import PianoRoll from './ui/PianoRoll';
import Mixer from './ui/Mixer';
import TrackLane from './ui/TrackLane';
import AutomationLane from './ui/AutomationLane';
import PluginBrowser from './ui/PluginBrowser';
import { initAudio } from './engine/audioContext';
import { loadWorklets } from './engine/worklet-loader';

export default function App() {
  const project = useStore(s => s.project);
  const init = useStore(s => s.init);

  useEffect(() => {
    (async () => {
      await initAudio();
      await loadWorklets();
      init();
    })();
  }, [init]);

  return (
    <div className="col" style={{ height: '100%', padding: 8 }}>
      <div className="row">
        <TransportBar />
        <PluginBrowser />
      </div>
      <div className="grid" style={{ gridTemplateColumns: '2fr 1fr', height: 'calc(100% - 120px)' }}>
        <div className="col">
          <TrackLane />
          <PianoRoll />
          <AutomationLane />
        </div>
        <Mixer />
      </div>
      <div className="panel">Project: {project.name} • {project.bpm} BPM • {project.timeSignature[0]}/{project.timeSignature[1]}</div>
    </div>
  );
}
