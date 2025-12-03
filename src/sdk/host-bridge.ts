import { PluginManifest } from './types';

export type PluginPortMessage =
  | { type: 'init'; manifest: PluginManifest; sampleRate: number }
  | { type: 'param'; id: string; value: number }
  | { type: 'transport'; bpm: number; playing: boolean; positionSec: number };

export function bindParamPort(node: AudioWorkletNode, manifest: PluginManifest) {
  const sendParam = (id: string, value: number) => node.port.postMessage({ type: 'param', id, value } satisfies PluginPortMessage);
  // Initialize processor
  node.port.postMessage({ type: 'init', manifest, sampleRate: node.context.sampleRate } satisfies PluginPortMessage);
  return { sendParam };
}
