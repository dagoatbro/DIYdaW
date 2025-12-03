import React, { useEffect, useState } from 'react';
import { PluginManifest, PluginInstanceHandle } from '../sdk/types';
import { PluginHost } from '../sdk/plugin-host';
import { PluginUIRegistry } from '../plugins/registry';

type Props = {
  manifestUrl: string;
  connectFrom: AudioNode;  // previous node in track chain
  connectTo: AudioNode;    // next node in track chain
};

export default function PluginSlot({ manifestUrl, connectFrom, connectTo }: Props) {
  const [instance, setInstance] = useState<PluginInstanceHandle | null>(null);
  const [manifest, setManifest] = useState<PluginManifest | null>(null);

  useEffect(() => {
    (async () => {
      const host = new PluginHost();
      const m = await host.loadManifest(manifestUrl);
      setManifest(m);
      const inst = await host.createInstance(m);
      // Connect I/O
      connectFrom.connect(inst.node);
      inst.node.connect(connectTo);
      setInstance(inst);
    })();
  }, [manifestUrl, connectFrom, connectTo]);

  if (!manifest || !instance) return <div className="panel">Loading plugin...</div>;

  const UIComp = PluginUIRegistry[manifest.id];
  const setParam = (id: string, value: number) => {
    instance.node.port.postMessage({ type: 'param', id, value });
  };

  return (
    <div className="panel col">
      <strong>{manifest.name}</strong>
      {UIComp ? <UIComp setParam={setParam} initial={Object.fromEntries(manifest.parameters.map(p => [p.id, p.defaultValue]))} presets={manifest.presets ?? []} /> : <div>No UI registered</div>}
    </div>
  );
}
