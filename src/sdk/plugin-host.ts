import { getAudioContext } from '../engine/audioContext';
import { PluginManifest, PluginInstanceHandle } from './types';
import { bindParamPort } from './host-bridge';

export class PluginHost {
  private ctx = getAudioContext();

  async loadManifest(url: string): Promise<PluginManifest> {
    const res = await fetch(url);
    const m: PluginManifest = await res.json();
    return m;
  }

  async loadProcessor(manifest: PluginManifest): Promise<void> {
    // Add the plugin's AudioWorklet module
    await this.ctx.audioWorklet.addModule(manifest.dspEntrypoint);
  }

  async createInstance(manifest: PluginManifest): Promise<PluginInstanceHandle> {
    await this.loadProcessor(manifest);
    const node = new AudioWorkletNode(this.ctx, manifest.id, {
      numberOfInputs: manifest.inputs,
      numberOfOutputs: manifest.outputs,
      outputChannelCount: Array(manifest.outputs).fill(2)
    });

    const params: Record<string, AudioParam> = {};
    manifest.parameters.forEach(p => {
      // AudioWorklet parameterDescriptors map to node.parameters
      const ap = (node.parameters as Map<string, AudioParam>).get(p.id);
      if (ap) params[p.id] = ap;
    });

    const bridge = bindParamPort(node, manifest);
    // Initialize default parameter values
    manifest.parameters.forEach(p => bridge.sendParam(p.id, p.defaultValue));

    return { id: crypto.randomUUID(), node, params, manifest };
  }
}
