export async function fetchMonoWav(url: string, ctx: AudioContext): Promise<Float32Array> {
  const res = await fetch(url);
  const arr = await res.arrayBuffer();
  const buf = await ctx.decodeAudioData(arr);
  const ch = buf.getChannelData(0);
  return new Float32Array(ch);
}
