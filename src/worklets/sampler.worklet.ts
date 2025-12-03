// Minimal sampler: loads a single WAV and triggers playback on messages.
class SamplerProcessor extends AudioWorkletProcessor {
  private buffer: Float32Array | null = null;
  private pos = 0;
  private playing = false;

  constructor() {
    super();
    this.port.onmessage = (e) => {
      const msg = e.data;
      if (msg.type === 'load') {
        this.buffer = msg.buffer;
      } else if (msg.type === 'trigger') {
        this.pos = 0; this.playing = true;
      }
    };
  }

  process(_inputs: Float32Array[][], outputs: Float32Array[][]) {
    const outL = outputs[0][0];
    const outR = outputs[0][1] ?? outL;
    outL.fill(0); outR.fill(0);
    if (!this.buffer || !this.playing) return true;
    for (let i = 0; i < outL.length; i++) {
      if (this.pos >= this.buffer.length) { this.playing = false; break; }
      const s = this.buffer[this.pos++];
      outL[i] = s; outR[i] = s;
    }
    return true;
  }
}
registerProcessor('sampler', SamplerProcessor);
