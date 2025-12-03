# Plugin host (bridge)

Native plugin host for VST/AU/CLAP running on the user's machine or a managed server.
- Exposes WebRTC for low-latency audio/MIDI streaming
- REST API for plugin discovery, load/unload, parameters, presets
- Browser DAW controls plugins; DSP runs natively

Requirements:
- macOS for AU, Windows for VST (and CLAP cross-platform)
- A native host (JUCE/CLAP SDK). This folder is a scaffold; integrate your chosen host.
