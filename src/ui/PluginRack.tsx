import React, { useEffect, useRef, useState } from 'react';
import PluginSlot from './PluginSlot';
import { getAudioContext } from '../engine/audioContext';

type Props = { trackName: string };

export default function PluginRack({ trackName }: Props) {
  const [ready, setReady] = useState(false);
  const inputRef = useRef<GainNode | null>(null);
  const outputRef = useRef<GainNode | null>(null);

  useEffect(() => {
    const ctx = getAudioContext();
    inputRef.current = ctx.createGain();
    outputRef.current = ctx.createGain();
    setReady(true);
  }, []);

  if (!ready || !inputRef.current || !outputRef.current) return <div className="panel">Initializing rack...</div>;

  return (
    <div className="panel col">
      <strong>Plugin rack • {trackName}</strong>
      <PluginSlot manifestUrl="/src/plugins/gain/manifest.json" connectFrom={inputRef.current} connectTo={outputRef.current} />
      <div className="row">
        <label>Rack input</label><span>→</span><label>Rack output</label>
      </div>
    </div>
  );
}
