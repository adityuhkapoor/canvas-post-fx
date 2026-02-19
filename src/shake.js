/**
 * Computes a random screen-shake displacement.
 * Pure computation — does not draw anything.
 * Caller applies via ctx.translate(offset.x, offset.y).
 *
 * @param {Object} [opts]
 * @param {number} [opts.intensity=25] - Max displacement in pixels
 * @returns {{ x: number, y: number }}
 */
export function shake(opts = {}) {
  const { intensity = 25 } = opts;

  return {
    x: (Math.random() - 0.5) * 2 * intensity,
    y: (Math.random() - 0.5) * 2 * intensity,
  };
}
