/**
 * Fills the canvas with a solid color at a given opacity.
 *
 * @param {CanvasRenderingContext2D} ctx
 * @param {Object} [opts]
 * @param {number} [opts.opacity=1] - Flash opacity (0-1)
 * @param {number[]} [opts.color=[255,255,255]] - RGB array
 */
export function flash(ctx, opts = {}) {
  const {
    opacity = 1,
    color = [255, 255, 255],
  } = opts;

  const w = ctx.canvas.width;
  const h = ctx.canvas.height;

  ctx.save();
  ctx.fillStyle = `rgba(${color[0]},${color[1]},${color[2]},${opacity})`;
  ctx.fillRect(0, 0, w, h);
  ctx.restore();
}
