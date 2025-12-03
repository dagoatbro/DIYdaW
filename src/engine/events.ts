export type HostEvent =
  | { type: 'noteOn'; note: number; vel: number; time: number }
  | { type: 'noteOff'; note: number; time: number }
  | { type: 'transport'; bpm: number; playing: boolean; positionSec: number }
  | { type: 'automation'; param: string; value: number; time: number };
