# HH Goa 2026 Templates

This directory is the integration point for final visual templates.

The application architecture separates:
- **Frontend State:** (upload, user inputs, generation flow)
- **Template Rendering:** (visual design, canvas layout, typography, colors)

## How to add a template

1. Create a directory for your template (e.g., `hhgoa-builder/`).
2. Implement the `FrameTemplate` interface defined in `types.ts`.
3. Your `render` function will receive `FrameData` and must return a Promise resolving to an `HTMLCanvasElement`.
   
   ### Builder ID Template

   The `FrameData` contract is:
   ```text
   image
   imagePosition
   name
   teamName
   role
   builderTitle
   builderId
   ```
   *TEAM NAME is dynamic user-provided content. The template developer is responsible for deciding its visual placement and styling.*

   **Optional future regions:**
   Builder ID templates can define optional `qrRegion` and `barcodeRegion` coordinates in their configuration. These regions will eventually be populated dynamically using the Builder ID.

   ### PFP Template Input

   ```text
   image
   imagePosition
   ```

   ### PFP Output

   Square Canvas / PNG (1080x1080).

   **Note:** PFP templates have no QR/barcode support. They do not contain these regions and the PFP flow does not generate them.

   ### Template responsibility

   The PFP template controls:
   * frame
   * overlay
   * logo
   * texture
   * graphics
   * dimensions
   * visual positioning

   The generator controls:
   * photo
   * state
   * upload
   * navigation
   * generation
   * download
   * sharing

4. Register your template in `registry.ts`.
5. Update `selectedTemplate` in `GeneratorContext` to point to your new template ID.

The frontend handles file loading, font loading, object URL cleanup, and the download/sharing flow. The template only needs to focus on the 2D rendering logic.
