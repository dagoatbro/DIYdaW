import React, { useRef, useEffect } from 'react';
import { useStore } from '../state/store';

const keys = Array.from({ length: 48 }, (_, i) => 36 + i); // C2..B5

export default function PianoRoll() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const notes = useStore(s => s.project.midiNotes);
  const addNote = useStore(s => s.addNote);
  const triggerNote = useStore(s => s.triggerNote);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;
    const W = canvas.width, H = canvas.height;
    ctx.clearRect(0, 0, W, H);
    // grid
    ctx.strokeStyle = '#2a2d36';
    for (let i = 0; i < 16; i++) {
      ctx.beginPath(); ctx.moveTo(i * (W/16), 0); ctx.lineTo(i * (W/16), H); ctx.stroke();
    }
    // notes
    ctx.fillStyle = '#4da3ff';
    notes.forEach(n => {
      const y = H - ((n.note - 36) * (H / keys.length)) - 10;
      const x = n.start * (W / 16);
      const w = n.length * (W / 16);
      ctx.fillRect(x, y, w, 10);
    });
  }, [notes]);

  function onClick(e: React.MouseEvent) {
    const rect = (e.target as HTMLCanvasElement).getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const beat = Math.floor((x / rect.width) * 16);
    const idx = Math.floor((1 - y / rect.height) * keys.length);
    const note = keys[Math.max(0, Math.min(keys.length - 1, idx))];
    addNote({ note, start: beat, length: 1, velocity: 100 });
    triggerNote(note);
  }

  return (
    <div className="panel col">
      <div className="row" style={{ justifyContent:'space-between' }}>
        <strong>Piano Roll</strong>
        <span>Click to add/trigger notes</span>
      </div>
      <canvas ref={canvasRef} width={800} height={220} onClick={onClick} />
    </div>
  );
}
