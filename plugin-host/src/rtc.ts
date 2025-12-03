import { Server } from 'http';
import { WebSocketServer } from 'ws';

export function rtcSetup(server: Server) {
  const wss = new WebSocketServer({ server, path: '/ws' });
  wss.on('connection', (ws) => {
    ws.on('message', (msg) => {
      const data = JSON.parse(msg.toString());
      // Forward MIDI/events to native DSP graph
      // Return audio buffers or coordinate a WebRTC peer connection
      ws.send(JSON.stringify({ type: 'ack', id: data.id }));
    });
  });
}
