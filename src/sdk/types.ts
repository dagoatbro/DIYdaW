export type ParamDescriptor = {
  id: string;
  name: string;
  min: number;
  max: number;
  defaultValue: number;
  automationRate?: 'a-rate' | 'k-rate';
};

export type PluginManifest = {
  id: string;
  name: string;
  category: 'instrument' | 'effect' | 'utility' | 'midi';
  version: string;
  vendor?: string;
  parameters: ParamDescriptor[];
  inputs: number;
  outputs: number;
  uiEntrypoint: string;   // module URL for UI
  dspEntrypoint: string;  // module URL for AudioWorklet processor
  presets?: { name: string; values: Record<string, number> }[];
};

export type PluginInstanceHandle = {
  id: string;
  node: AudioWorkletNode;
  params: Record<string, AudioParam>;
  manifest: PluginManifest;
};
