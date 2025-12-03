class MixerProcessor extends AudioWorkletProcessor {
  gain = 0.8;
  constructor() {
    super();
    this.port.onmessage = e => {
      const { type, value } = e.data;
      if (type === 'gain') this.gain = value;
    };
  }
  process(inputs: Float32Array[][], outputs: Float32Array[][]) {
    const input = inputs[0];
    const out = outputs[0];
    const l = out[0], r = out[1] ?? out[0];
    l.fill(0); r.fill(0);
    if (input && input[0]) {
      const inL = input[0], inR = input[1] ?? input[0];
      for (let i = 0; i < l.length; i++) {
        l[i] = inL[i] * this.gain;
        r[i] = inR[i] * this.gain;
      }
    }
    return true;
  }
}
registerProcessor('mixer', MixerProcessor);
