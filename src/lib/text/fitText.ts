interface FitTextOptions {
  text: string;
  fontFamily: string;
  fontWeight?: string;
  maxWidth: number;
  minFontSize: number;
  maxFontSize: number;
}

export function calculateFitFontSize({
  text,
  fontFamily,
  fontWeight = "bold",
  maxWidth,
  minFontSize,
  maxFontSize,
}: FitTextOptions): number {
  if (typeof window === "undefined" || !text) return maxFontSize;

  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  
  if (!context) return maxFontSize;

  let low = minFontSize;
  let high = maxFontSize;
  let bestFit = minFontSize;

  // Binary search for the best font size
  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    context.font = `${fontWeight} ${mid}px ${fontFamily}`;
    
    const metrics = context.measureText(text);
    
    if (metrics.width <= maxWidth) {
      bestFit = mid;
      low = mid + 1; // Try bigger
    } else {
      high = mid - 1; // Try smaller
    }
  }

  return bestFit;
}
