import { getAudioContext } from './audioContext';

export async function loadWorklets() {
  const ctx = getAudioContext();
  // Vite bundles TS worklets; they must be added via addModule.
  await ctx.audioWorklet.addModule(new URL('../worklets/sampler.worklet.ts', import.meta.url));
  await ctx.audioWorklet.addModule(new URL('../worklets/synth.worklet.ts', import.meta.url));
  await ctx.audioWorklet.addModule(new URL('../worklets/mixer.worklet.ts', import.meta.url));
}
