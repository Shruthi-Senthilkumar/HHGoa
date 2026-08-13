

// Use 1080x1350 for Instagram Portrait (4:5 ratio) for maximum social compatibility
export const FRAME_CONFIG = {
  width: 1080,
  height: 1350,
  
  colors: {
    background: "#075936", // HH Goa tropical green
    foreground: "#f6f3eb", // beach cream text
    accent: "#ffcd00",     // HH Goa sun yellow accent
    accentPink: "#e60067", // HH Goa magenta accent
    overlayLine: "rgba(246, 243, 235, 0.3)", // cream/30 for lines
    overlayBg: "rgba(3, 51, 30, 0.85)",      // dark forest backdrop
    overlayBorder: "rgba(255, 205, 0, 0.3)"  // yellow border
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
