export class PluginBridge {
  private base = 'http://localhost:8080';
  private ws: WebSocket | null = null;

  async list() {
    const res = await fetch(`${this.base}/plugins`);
    return res.json();
  }

  async load(id: string) {
    const res = await fetch(`${this.base}/plugins/load`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id })
    });
    return res.json(); // { handle }
  }

  async unload(handle: string) {
    await fetch(`${this.base}/plugins/unload`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ handle })
    });
  }

  async setParam(handle: string, paramId: number, value: number) {
    await fetch(`${this.base}/plugins/param`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ handle, paramId, value })
    });
  }

  connectStream(onAudio: (left: Float32Array, right: Float32Array) => void) {
    this.ws = new WebSocket(`${this.base.replace('http', 'ws')}/ws`);
    this.ws.onmessage = (ev) => {
      const msg = JSON.parse(ev.data);
      // Handle audio frames or RTC negotiation
    };
  }
}
