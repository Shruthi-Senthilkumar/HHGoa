import qrcode from 'qrcode';

export async function generateQrCanvas(builderId: string): Promise<HTMLCanvasElement> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const payload = `${siteUrl}/goa?builder=${encodeURIComponent(builderId)}`;
  
  try {
    const canvas = await qrcode.toCanvas(payload, {
      errorCorrectionLevel: 'M',
      margin: 2, // Minimal quiet zone
      width: 400, // Generate at high resolution internally
      color: {
        dark: '#000000',
        light: '#ffffff'
      }
    });
    return canvas;
  } catch (error) {
    console.error("Failed to generate QR code", error);
    // Return empty fallback canvas
    const fallback = document.createElement("canvas");
    fallback.width = 400;
    fallback.height = 400;
    return fallback;
  }
}
