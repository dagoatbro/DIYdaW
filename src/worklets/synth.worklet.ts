// Basic subtractive synth: saw oscillator into one-pole low-pass with ADSR.
class SynthProcessor extends AudioWorkletProcessor {
  freq = 220; cutoff = 800; q = 0.2;
  gate = false; phase = 0; env = 0; a = 0.005; d = 0.2; s = 0.4; r = 0.3;
  y = 0; // filter state

  constructor() {
    super();
    this.port.onmessage = e => {
      const { type, value } = e.data;
      if (type === 'noteOn') { this.freq = value; this.gate = true; }
      if (type === 'noteOff') { this.gate = false; }
      if (type === 'cutoff') { this.cutoff = value; }
    };
  }

  process(_inputs: Float32Array[][], outputs: Float32Array[][]) {
    const sr = sampleRate;
    const out = outputs[0];
    const l = out[0], r = out[1] ?? out[0];
    const block = l.length;

    for (let i = 0; i < block; i++) {
      // oscillator
      this.phase += this.freq / sr;
      if (this.phase >= 1) this.phase -= 1;
      const osc = 2 * this.phase - 1; // saw

      // envelope
      if (this.gate) {
        this.env += this.a * (1 - this.env);
        if (this.env > 1) this.env = 1;
        this.env += (this.s - this.env) * this.d / sr;
      } else {
        this.env += (0 - this.env) * this.r;
      }

      // one-pole low-pass
      const rc = 1.0 / (2 * Math.PI * this.cutoff);
      const alpha = (1 / sr) / (rc + 1 / sr);
      this.y += alpha * (osc * this.env - this.y);

      l[i] = this.y;
      r[i] = this.y;
    }
    return true;
  }
}
registerProcessor('synth', SynthProcessor);
