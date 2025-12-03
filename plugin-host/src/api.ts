import type { Express } from 'express';

type PluginInfo = { id: string; name: string; vendor: string; type: 'VST'|'AU'|'CLAP'; path: string };
const plugins: PluginInfo[] = []; // Populate via native scan

export function apiSetup(app: Express) {
  app.get('/plugins', (_req, res) => res.json(plugins));
  app.post('/plugins/load', (req, res) => {
    const { id } = req.body;
    // Load plugin in native host and create a processing node
    // Return a handle/token to control via RTC channel
    res.json({ ok: true, handle: `handle-${id}` });
  });
  app.post('/plugins/unload', (req, res) => {
    const { handle } = req.body;
    // Unload from native host
    res.json({ ok: true });
  });
  app.post('/plugins/param', (req, res) => {
    const { handle, paramId, value } = req.body;
    // Set parameter on native plugin instance
    res.json({ ok: true });
  });
}
