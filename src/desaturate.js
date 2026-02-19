/**
 * Desaturates the canvas toward grayscale using the 'saturation' composite op.
 * Not supported in Safari < 15 — silently no-ops there.
 *
 * @param {CanvasRenderingContext2D} ctx
 * @param {Object} [opts]
 * @param {number} [opts.intensity=0.6] - Desaturation strength (0=none, 1=full grayscale)
 */
export function desaturate(ctx, opts = {}) {
  const { intensity = 0.6 } = opts;

  if (intensity <= 0) return;

  const w = ctx.canvas.width;
  const h = ctx.canvas.height;

  ctx.save();

  ctx.globalCompositeOperation = 'saturation';
  ctx.globalAlpha = Math.min(intensity, 1);
  ctx.fillStyle = '#808080';
  ctx.fillRect(0, 0, w, h);

  ctx.restore();
}
