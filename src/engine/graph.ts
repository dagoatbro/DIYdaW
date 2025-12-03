import { getAudioContext } from './audioContext';

export type DeviceInstance = {
  id: string;
  type: 'sampler' | 'synth' | 'mixer' | 'plugin';
  node: AudioWorkletNode;
  params: Record<string, number>;
};

export class Track {
  id: string;
  name: string;
  devices: DeviceInstance[] = [];
  input?: MediaStreamAudioSourceNode;
  outputGain: GainNode;
  pan: StereoPannerNode;

  constructor(id: string, name: string) {
    const ctx = getAudioContext();
    this.id = id; this.name = name;
    this.outputGain = ctx.createGain();
    this.pan = ctx.createStereoPanner();
    this.outputGain.connect(this.pan).connect(ctx.destination);
  }

  addDevice(node: AudioWorkletNode, type: DeviceInstance['type']) {
    const dev: DeviceInstance = { id: crypto.randomUUID(), type, node, params: {} };
    const last = this.devices[this.devices.length - 1];
    const ctx = getAudioContext();
    if (!last) {
      // connect device to track chain
      // worklet nodes have ports; connect AudioParams/IO
      (node as any).connect?.(this.outputGain);
    } else {
      (last.node as any).connect?.(node);
      (node as any).connect?.(this.outputGain);
    }
    this.devices.push(dev);
    return dev;
  }

  setGain(v: number) { this.outputGain.gain.value = v; }
  setPan(v: number) { this.pan.pan.value = v; }
}

export class Graph {
  tracks: Track[] = [];
  createTrack(name: string) {
    const t = new Track(crypto.randomUUID(), name);
    this.tracks.push(t);
    return t;
  }
}
