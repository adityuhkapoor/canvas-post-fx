/**
 * Adjusts brightness of a canvas region.
 * value=50 is neutral, below darkens, above brightens.
 *
 * @param {CanvasRenderingContext2D} ctx
 * @param {Object} [opts]
 * @param {number} [opts.value=50] - Brightness on a 0-100 scale (50=neutral)
 * @param {number} [opts.x=0] - Region x
 * @param {number} [opts.y=0] - Region y
 * @param {number} [opts.width] - Region width (defaults to canvas width)
 * @param {number} [opts.height] - Region height (defaults to canvas height)
 */
export function brightness(ctx, opts = {}) {
  const {
    value = 50,
    x = 0,
    y = 0,
    width = ctx.canvas.width,
    height = ctx.canvas.height,
  } = opts;

  if (value === 50) return;

  ctx.save();

  if (value < 50) {
    const opacity = 1 - value / 50;
    ctx.fillStyle = `rgba(0,0,0,${opacity})`;
  } else {
    const opacity = (value - 50) / 50;
    ctx.fillStyle = `rgba(255,255,255,${opacity})`;
  }

  ctx.fillRect(x, y, width, height);
  ctx.restore();
}
