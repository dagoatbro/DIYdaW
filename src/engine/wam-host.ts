import { getAudioContext } from './audioContext';

export type WamManifest = {
  name: string;
  id: string;
  parameters: { name: string; min: number; max: number; default: number }[];
  inputs: number; outputs: number;
  ui: () => Promise<unknown>;
  dsp: () => Promise<unknown>;
};

export class WamHost {
  async load(manifestUrl: string) {
    const manifest: WamManifest = await (await fetch(manifestUrl)).json();
    // In a real host, you'd load WASM & register a worklet processor.
    // For demo, we instantiate a generic worklet and pass parameters via port.
    const ctx = getAudioContext();
    await ctx.audioWorklet.addModule(new URL('../worklets/mixer.worklet.ts', import.meta.url));
    const node = new AudioWorkletNode(ctx, 'mixer');
    node.port.postMessage({ type: 'wam-init', manifest });
    return { manifest, node };
  }
}
