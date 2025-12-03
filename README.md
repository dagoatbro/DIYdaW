# Browser DAW (MVP)

A minimal browser-based DAW with:
- Transport (play/stop/loop/tempo)
- Piano roll editor for MIDI clips
- Tracks: Sampler and Synth devices
- Mixer with per-track gain/pan
- Automation lanes (tempo, gain)
- Web plugin host (WAM-like) and example plugin

## Quick start
- npm install
- npm run dev
- Open http://localhost:5173

## Notes
- AudioWorklets load from /src/worklets. Vite handles bundling.
- For high-performance SharedArrayBuffer, deploy with COOP/COEP headers.
- Samples in public/assets/samples.

## Roadmap
- Audio clip editing & warping
- Sends/returns & sidechain
- Plugin marketplace for web-native WASM plugins
- Collaboration with CRDT (Y.js)
