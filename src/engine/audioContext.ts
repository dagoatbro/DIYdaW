let ctx: AudioContext | null = null;

export async function initAudio() {
  if (!ctx) {
    ctx = new AudioContext({ latencyHint: 'interactive' });
    // In some browsers user gesture is required; resume on first play.
  }
  return ctx;
}

export function getAudioContext(): AudioContext {
  if (!ctx) throw new Error('AudioContext not initialized');
  return ctx;
}
