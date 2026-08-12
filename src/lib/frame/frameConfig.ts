

// Use 1080x1350 for Instagram Portrait (4:5 ratio) for maximum social compatibility
export const FRAME_CONFIG = {
  width: 1080,
  height: 1350,
  
  colors: {
    background: "#0a0a0a", // bg-surface (mostly covered by image)
    foreground: "#f2f0eb", // off-white (text-inverse in the UI)
    accent: "#ff4a11",     // color-accent
    overlayLine: "rgba(242, 240, 235, 0.3)", // white/30 for lines
    overlayBg: "rgba(10, 10, 10, 0.8)",      // dark backdrop
    overlayBorder: "rgba(242, 240, 235, 0.2)"// border-white/20
  },

  typography: {
    display: "Space Grotesk, sans-serif",
    body: "Outfit, sans-serif",
    mono: "JetBrains Mono, monospace",
  },
  
  padding: {
    outer: 64 // ~p-6 equivalent on a 1080 canvas
  }
};
