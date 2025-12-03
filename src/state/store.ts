import create from 'zustand';
import { Graph } from '../engine/graph';
import { getAudioContext } from '../engine/audioContext';
import { fetchMonoWav } from '../dsp/utils';

type MidiNote = { note: number; start: number; length: number; velocity: number };

type TrackState = { id: string; name: string; gain: number; pan: number; devices: string[] };

type ProjectState = {
  name: string;
  bpm: number;
  timeSignature: [number, number];
  midiNotes: MidiNote[];
};

type TransportState = { playing: boolean; positionBeats?: number };

type StoreState = {
  project: ProjectState;
  transport: TransportState;
  tracks: TrackState[];
  masterGain: number;
  graph: Graph | null;
  init: () => void;
  setBpm: (bpm: number) => void;
  setTransport: (t: Partial<TransportState>) => void;
  addNote: (note: MidiNote) => void;
  addSampler: () => Promise<void>;
  addSynth: () => Promise<void>;
  triggerSample: () => Promise<void>;
  triggerNote: (note: number) => void;
  setTrackGain: (id: string, v: number) => void;
  setTrackPan: (id: string, v: number) => void;
  setMasterGain: (v: number) => void;
  loadExamplePlugin: () => Promise<void>;
};

export const useStore = create<StoreState>((set, get) => ({
  project: { name: 'Untitled', bpm: 120, timeSignature: [4,4], midiNotes: [] },
  transport: { playing: false },
  tracks: [],
  masterGain: 1,
  graph: null,

  init: () => {
    const graph = new Graph();
    set({ graph });
  },

  setBpm: (bpm) => set(state => ({ project: { ...state.project, bpm } })),

  setTransport: (t) => set(state => ({ transport: { ...state.transport, ...t } })),

  addNote: (note) => set(state => ({ project: { ...state.project, midiNotes: [...state.project.midiNotes, note] } })),

  addSampler: async () => {
    const ctx = getAudioContext();
    const graph = get().graph!;
    const t = graph.createTrack('Sampler Track');
    const sampler = new AudioWorkletNode(ctx, 'sampler');
    t.addDevice(sampler, 'sampler');
    set(state => ({ tracks: [...state.tracks, { id: t.id, name: t.name, gain: 1, pan: 0, devices: [sampler.port.toString()] }] }));
    const buf = await fetchMonoWav('/assets/samples/kick.wav', ctx);
    sampler.port.postMessage({ type: 'load', buffer: buf });
  },

  triggerSample: async () => {
    const graph = get().graph!;
    const track = graph.tracks.find(tr => tr.devices.some(d => d.type === 'sampler'));
    const dev = track?.devices.find(d => d.type === 'sampler');
    dev?.node.port.postMessage({ type: 'trigger' });
  },

  addSynth: async () => {
    const ctx = getAudioContext();
    const graph = get().graph!;
    const t = graph.createTrack('Synth Track');
    const synth = new AudioWorkletNode(ctx, 'synth', { numberOfOutputs: 1, outputChannelCount: [2] });
    t.addDevice(synth, 'synth');
    set(state => ({ tracks: [...state.tracks, { id: t.id, name: t.name, gain: 1, pan: 0, devices: [synth.port.toString()] }] }));
  },

  triggerNote: (note) => {
    const graph = get().graph!;
    const synthTrack = graph.tracks.find(tr => tr.devices.some(d => d.type === 'synth'));
    const dev = synthTrack?.devices.find(d => d.type === 'synth');
    if (!dev) return;
    const freq = 440 * Math.pow(2, (note - 69) / 12);
    dev.node.port.postMessage({ type: 'noteOn', value: freq });
    setTimeout(() => dev.node.port.postMessage({ type: 'noteOff' }), 200);
  },

  setTrackGain: (id, v) => {
    const graph = get().graph!;
    const track = graph.tracks.find(t => t.id === id);
    track?.setGain(v);
    set(state => ({ tracks: state.tracks.map(t => t.id === id ? { ...t, gain: v } : t) }));
  },

  setTrackPan: (id, v) => {
    const graph = get().graph!;
    const track = graph.tracks.find(t => t.id === id);
    track?.setPan(v);
    set(state => ({ tracks: state.tracks.map(t => t.id === id ? { ...t, pan: v } : t) }));
  },

  setMasterGain: (v) => set({ masterGain: v }),

  loadExamplePlugin: async () => {
    // Demo placeholder for WAM-like plugin
    alert('Plugin system scaffolded. Implement WAM loader and WASM DSP here.');
  }
}));
