# HH Goa 2026: Template Integration Guide

This document explains how to replace the current placeholder templates with the final visual artwork, without modifying any React UI components or generator logic.

## Architecture Overview

The generator UI and Canvas rendering engine are completely decoupled.
- **Generator UI** (`FramePreview.tsx`, `TemplateSelector.tsx`, etc.) collects user inputs and requests the Canvas output.
- **Template Renderers** (`src/templates/**/index.ts`) receive `FrameData` and a configuration object, and return an `HTMLCanvasElement`.

Because the live preview simply displays the output of the template renderer, **designers and developers only need to edit the files in `src/templates/`** to completely change the visual look of both the live preview and the downloaded PNG.

## Templates

### PFP (Profile Picture)
Format: 1080 × 1080 Circular

The three PFP templates are located at:
- `src/templates/pfp/professional/index.ts`
- `src/templates/pfp/creative-01/index.ts`
- `src/templates/pfp/creative-02/index.ts`

**PFP Requirements:**
- They must output a circular image. The canvas context must be clipped using `ctx.clip()` over a circular path before drawing the background or photo.
- The canvas size must be `1080x1080`.
- The corners outside the circle must remain transparent.
- PFP templates **do not** receive builder text data (Name, Role, etc.) or QR/Barcode rendering.

### Builder ID
Format: 1080 × 1350 Vertical

The three Builder ID templates are located at:
- `src/templates/builder/professional/index.ts`
- `src/templates/builder/creative-01/index.ts`
- `src/templates/builder/creative-02/index.ts`

**Builder ID Requirements:**
- They must output an ID card image.
- The canvas size must be `1080x1350`.
- They receive all text data (`name`, `teamName`, `role`, `builderTitle`, `builderId`).
- They must specify `qrRegion` and `barcodeRegion` in their configuration object.

## Dynamic QR & Barcode Integration

The application generates the QR code and barcode dynamically based on the `builderId` and passes them to the template via helper functions.

**You do NOT need to generate the codes yourself.**

Instead, simply define where you want them to appear by setting the `qrRegion` and `barcodeRegion` in the template's `config` object:

```typescript
export const config: BuilderTemplateConfig = {
  // ...
  qrRegion: { x: 80, y: 80, width: 200, height: 200 },
  barcodeRegion: { x: 80, y: 1200, width: 400, height: 100 },
};
```

Then, in your `render` function, draw them:

```typescript
import { generateQrCanvas } from "@/lib/codes/generateQr";
import { generateBarcodeCanvas } from "@/lib/codes/generateBarcode";

// ... inside render():
const builderId = data.builderId || "B-ID // 001";

if (config.qrRegion) {
  const qrCanvas = await generateQrCanvas(builderId);
  ctx.drawImage(qrCanvas, config.qrRegion.x, config.qrRegion.y, config.qrRegion.width, config.qrRegion.height);
}

if (config.barcodeRegion) {
  const barcodeCanvas = await generateBarcodeCanvas(builderId);
  ctx.drawImage(barcodeCanvas, config.barcodeRegion.x, config.barcodeRegion.y, config.barcodeRegion.width, config.barcodeRegion.height);
}
```

## Preview Assets

Each template configuration includes a `preview` string (e.g., `preview: "/templates/builder/professional/preview.png"`).
Currently, the template selector uses a simple CSS representation instead of loading these images. However, when final designs are ready, you should place a small static preview image at that public URL path, and update `TemplateSelector.tsx` to display that `<img />` instead of the CSS shapes.

## Replacing the Placeholders

To implement the final designs:
1. Replace the rendering logic inside `src/templates/pfp/*/index.ts` and `src/templates/builder/*/index.ts`.
2. Update the `config.preview` paths and upload static thumbnails to `/public`.
3. Use the `drawText` and `drawCoverImage` utilities in `src/lib/frame/frameUtils.ts` to easily position custom fonts and images.

You do **not** need to touch `GeneratorContext.tsx`, `FramePreview.tsx`, or any other React components.
