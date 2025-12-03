import { getAudioContext } from './audioContext';
import { useStore } from '../state/store';

let startTime = 0;
let playing = false;
let loop: [number, number] | null = null;

export function play() {
  const ctx = getAudioContext();
  if (!playing) {
    startTime = ctx.currentTime - positionToSeconds();
    playing = true;
    useStore.getState().setTransport({ playing });
  }
}

export function stop() {
  const ctx = getAudioContext();
  playing = false;
  startTime = ctx.currentTime;
  useStore.getState().setTransport({ playing, position: 0 });
}

export function togglePlay() { playing ? stop() : play(); }

export function setLoop(startBeat: number, endBeat: number) { loop = [startBeat, endBeat]; }

export function getPositionSeconds() {
  const ctx = getAudioContext();
  if (!playing) return positionToSeconds();
  const sec = ctx.currentTime - startTime;
  const [s, e] = loop ?? [0, Infinity];
  const bpm = useStore.getState().project.bpm;
  const beats = sec * (bpm / 60);
  if (beats >= e) {
    const loopDur = (e - s) * (60 / bpm);
    startTime = ctx.currentTime - s * (60 / bpm);
    return s * (60 / bpm);
  }
  return sec;
}

function positionToSeconds() {
  const posBeats = useStore.getState().transport.positionBeats ?? 0;
  const bpm = useStore.getState().project.bpm;
  return posBeats * (60 / bpm);
}
