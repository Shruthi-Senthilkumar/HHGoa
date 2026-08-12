
export function drawAdjustedImage(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  regionX: number,
  regionY: number,
  regionW: number,
  regionH: number,
  positionX: number = 0,
  positionY: number = 0,
  scale: number = 1
) {
  // 1. Minimum scale to cover region
  const scaleX = regionW / img.width;
  const scaleY = regionH / img.height;
  const coverScale = Math.max(scaleX, scaleY);
  
  // 2. Final scaled dimensions
  const finalScale = coverScale * scale;
  const drawW = img.width * finalScale;
  const drawH = img.height * finalScale;
  
  // 3. Center of the region
  const cx = regionX + regionW / 2;
  const cy = regionY + regionH / 2;
  
  // 4. Calculate clamping bounds
  // The max translation is the amount of image "overhang" divided by 2
  const maxTx = Math.max(0, (drawW - regionW) / 2);
  const maxTy = Math.max(0, (drawH - regionH) / 2);
  
  // Clamp the requested position
  const clampedX = Math.max(-maxTx, Math.min(maxTx, positionX));
  const clampedY = Math.max(-maxTy, Math.min(maxTy, positionY));
  
  // 5. Final draw coordinates
  const dx = cx - drawW / 2 + clampedX;
  const dy = cy - drawH / 2 + clampedY;
  
  ctx.drawImage(img, dx, dy, drawW, drawH);
}

export function measureFittedText(
  ctx: CanvasRenderingContext2D,
  text: string,
  fontFamily: string,
  fontWeight: string,
  maxWidth: number,
  minFontSize: number,
  maxFontSize: number
): number {
  let low = minFontSize;
  let high = maxFontSize;
  let bestFit = minFontSize;

  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    ctx.font = `${fontWeight} ${mid}px ${fontFamily}`;
    
    if (ctx.measureText(text).width <= maxWidth) {
      bestFit = mid;
      low = mid + 1;
    } else {
      high = mid - 1;
    }
  }

  return bestFit;
}

export function drawText(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  fontSize: number,
  fontFamily: string,
  color: string,
  fontWeight: string = "normal",
  align: CanvasTextAlign = "left",
  baseline: CanvasTextBaseline = "top"
) {
  ctx.font = `${fontWeight} ${fontSize}px ${fontFamily}`;
  ctx.fillStyle = color;
  ctx.textAlign = align;
  ctx.textBaseline = baseline;
  ctx.fillText(text, x, y);
}
