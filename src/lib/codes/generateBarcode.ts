import JsBarcode from 'jsbarcode';

export async function generateBarcodeCanvas(builderId: string): Promise<HTMLCanvasElement> {
  // JsBarcode modifies an existing canvas synchronously
  const canvas = document.createElement("canvas");
  
  try {
    JsBarcode(canvas, builderId, {
      format: "CODE128",
      displayValue: false, // Don't show text below the barcode, just the bars
      margin: 2,
      background: "#ffffff",
      lineColor: "#000000",
      width: 4, // Make lines thicker for higher resolution scaling
      height: 100
    });
    return canvas;
  } catch (error) {
    console.error("Failed to generate Barcode", error);
    // Return empty fallback
    canvas.width = 400;
    canvas.height = 100;
    return canvas;
  }
}
