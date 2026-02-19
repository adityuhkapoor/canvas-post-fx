/**
 * Applies a color tint overlay to the entire canvas.
 * Compositing effect — no pixel reads, very fast.
 *
 * @param {CanvasRenderingContext2D} ctx
 * @param {Object} [opts]
 * @param {number[]} [opts.color=[0,30,0]] - RGB array
 * @param {number} [opts.opacity=0.08] - Tint opacity (0-1)
 */
export function tint(ctx, opts = {}) {
  const {
    color = [0, 30, 0],
    opacity = 0.08,
  } = opts;

  const w = ctx.canvas.width;
  const h = ctx.canvas.height;

  ctx.save();
  ctx.fillStyle = `rgba(${color[0]},${color[1]},${color[2]},${opacity})`;
  ctx.fillRect(0, 0, w, h);
  ctx.restore();
}
