import express from 'express';
import { createServer } from 'http';
import { rtcSetup } from './rtc';
import { apiSetup } from './api';

const app = express();
app.use(express.json());

apiSetup(app); // REST endpoints for plugin management

const httpServer = createServer(app);
rtcSetup(httpServer); // WebRTC/WS for audio/MIDI streams

const port = process.env.PORT || 8080;
httpServer.listen(port, () => console.log(`Plugin host running on :${port}`));
