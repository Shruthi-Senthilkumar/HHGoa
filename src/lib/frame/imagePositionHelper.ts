export function clampPosition(
  newX: number,
  newY: number,
  newScale: number,
  imageSize: { w: number; h: number } | null,
  region: { width: number; height: number } | undefined
) {
  if (!imageSize || !region) return { x: newX, y: newY, scale: newScale };

  // 1. Calculate minimum cover scale
  const scaleX = region.width / imageSize.w;
  const scaleY = region.height / imageSize.h;
  const coverScale = Math.max(scaleX, scaleY);

  // 2. Clamp user scale to [1, 3] (where 1 = coverScale)
  const clampedScale = Math.max(1, Math.min(3, newScale));
  const finalScale = coverScale * clampedScale;

  const drawW = imageSize.w * finalScale;
  const drawH = imageSize.h * finalScale;

  // 3. Calculate max translation (overhang / 2)
  const maxTx = Math.max(0, (drawW - region.width) / 2);
  const maxTy = Math.max(0, (drawH - region.height) / 2);

  // 4. Clamp requested translation
  const clampedX = Math.max(-maxTx, Math.min(maxTx, newX));
  const clampedY = Math.max(-maxTy, Math.min(maxTy, newY));

  return { x: clampedX, y: clampedY, scale: clampedScale };
}
