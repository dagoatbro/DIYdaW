import React from 'react';
import { useStore } from '../state/store';

export default function PluginBrowser() {
  const loadExamplePlugin = useStore(s => s.loadExamplePlugin);
  return (
    <div className="panel row">
      <strong>Plugins</strong>
      <button onClick={() => loadExamplePlugin()}>Load Example WAM</button>
    </div>
  );
}
