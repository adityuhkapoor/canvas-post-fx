/**
 * Draws horizontal scanlines over the canvas.
 * Compositing effect — no pixel reads, very fast.
 *
 * @param {CanvasRenderingContext2D} ctx
 * @param {Object} [opts]
 * @param {number} [opts.gap=4] - Pixels between scanlines
 * @param {number} [opts.width=2] - Scanline bar height in pixels
 * @param {number} [opts.opacity=0.12] - Scanline opacity (0-1)
 * @param {number[]} [opts.color=[0,0,0]] - RGB array
 */
export function scanlines(ctx, opts = {}) {
  const {
    gap = 4,
    width = 2,
    opacity = 0.12,
    color = [0, 0, 0],
  } = opts;

  const w = ctx.canvas.width;
  const h = ctx.canvas.height;

  ctx.save();
  ctx.fillStyle = `rgba(${color[0]},${color[1]},${color[2]},${opacity})`;

  for (let y = 0; y < h; y += gap + width) {
    ctx.fillRect(0, y, w, width);
  }

  ctx.restore();
}
