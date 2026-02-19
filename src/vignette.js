/**
 * Draws a radial vignette (darkened edges) over the canvas.
 *
 * @param {CanvasRenderingContext2D} ctx
 * @param {Object} [opts]
 * @param {number} [opts.innerRadius=0.3] - Inner radius as fraction of max(w,h)
 * @param {number} [opts.outerRadius=0.75] - Outer radius as fraction of max(w,h)
 * @param {number} [opts.opacity=0.5] - Edge opacity (0-1)
 * @param {number[]} [opts.color=[0,0,0]] - RGB array
 */
export function vignette(ctx, opts = {}) {
  const {
    innerRadius = 0.3,
    outerRadius = 0.75,
    opacity = 0.5,
    color = [0, 0, 0],
  } = opts;

  const w = ctx.canvas.width;
  const h = ctx.canvas.height;
  const cx = w / 2;
  const cy = h / 2;
  const maxDim = Math.max(w, h);

  const grad = ctx.createRadialGradient(
    cx, cy, maxDim * innerRadius,
    cx, cy, maxDim * outerRadius,
  );
  grad.addColorStop(0, `rgba(${color[0]},${color[1]},${color[2]},0)`);
  grad.addColorStop(1, `rgba(${color[0]},${color[1]},${color[2]},${opacity})`);

  ctx.save();
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, w, h);
  ctx.restore();
}
