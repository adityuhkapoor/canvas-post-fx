/**
 * Adds random noise to the canvas by sampling and replacing pixels.
 * Pixel manipulation effect — uses getImageData/putImageData, expensive.
 *
 * @param {CanvasRenderingContext2D} ctx
 * @param {Object} [opts]
 * @param {number} [opts.intensity=0.5] - Probability of replacing a sampled pixel (0-1)
 * @param {number} [opts.scale=16] - Sample every Nth pixel (higher=faster, coarser)
 * @param {number|null} [opts.alpha=200] - Alpha for noise pixels (0-255). null=leave unchanged.
 * @param {boolean} [opts.monochrome=true] - true=grayscale noise, false=colored noise
 */
export function noise(ctx, opts = {}) {
  const {
    intensity = 0.5,
    scale = 16,
    alpha = 200,
    monochrome = true,
  } = opts;

  const w = ctx.canvas.width;
  const h = ctx.canvas.height;

  if (w === 0 || h === 0) return;

  const imageData = ctx.getImageData(0, 0, w, h);
  const data = imageData.data;

  for (let y = 0; y < h; y += scale) {
    for (let x = 0; x < w; x += scale) {
      if (Math.random() > intensity) continue;

      const i = (y * w + x) * 4;

      if (monochrome) {
        const v = (Math.random() * 255) | 0;
        data[i] = v;
        data[i + 1] = v;
        data[i + 2] = v;
      } else {
        data[i] = (Math.random() * 255) | 0;
        data[i + 1] = (Math.random() * 255) | 0;
        data[i + 2] = (Math.random() * 255) | 0;
      }

      if (alpha !== null) {
        data[i + 3] = alpha;
      }
    }
  }

  ctx.putImageData(imageData, 0, 0);
}
