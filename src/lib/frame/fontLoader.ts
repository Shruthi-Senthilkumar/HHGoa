export async function loadFrameFonts(): Promise<void> {
  if (typeof document === "undefined") return;

  try {
    // Wait for the fonts defined in layout.tsx to be fully loaded in the browser
    await document.fonts.ready;
    
    // We can also explicitly force load them if needed, but Next.js usually
    // ensures they are in the CSSOM. We just need to make sure the Canvas API
    // has access to them, which document.fonts.ready usually guarantees.
  } catch (err) {
    console.warn("Failed to wait for fonts", err);
  }
}
