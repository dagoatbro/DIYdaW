import React, { useEffect, useState } from 'react';
import { PluginBridge } from '../bridge/bridge';

export default function PluginBridgePanel() {
  const [plugins, setPlugins] = useState<any[]>([]);
  const [handle, setHandle] = useState<string | null>(null);
  const bridge = new PluginBridge();

  useEffect(() => {
    bridge.list().then(setPlugins);
  }, []);

  async function load(id: string) {
    const { handle } = await bridge.load(id);
    setHandle(handle);
  }

  return (
    <div className="panel col">
      <strong>Remote Plugins (VST/AU/CLAP)</strong>
      <div className="col">
        {plugins.length === 0 && <div>No plugins found on host.</div>}
        {plugins.map(p => (
          <div key={p.id} className="row" style={{ justifyContent:'space-between' }}>
            <span>{p.name} • {p.type}</span>
            <button onClick={() => load(p.id)}>Load</button>
          </div>
        ))}
      </div>
      {handle && <div>Loaded handle: {handle}</div>}
    </div>
  );
}
