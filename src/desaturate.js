/**
 * Desaturates the canvas toward grayscale using the 'saturation' composite op.
 * Compositing effect — no pixel reads, fast.
 *
 * Browser note: the 'saturation' globalCompositeOperation is not supported in
 * all environments (Safari < 15). Fails silently (no-op) where unsupported.
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

  // 'saturation' composite op applies the saturation of the source to the dest.
  // Drawing a gray rectangle with 'saturation' drains color from the canvas.
  ctx.globalCompositeOperation = 'saturation';
  ctx.globalAlpha = Math.min(intensity, 1);
  ctx.fillStyle = '#808080';
  ctx.fillRect(0, 0, w, h);

  ctx.restore();
}
