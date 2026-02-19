import { tint } from './tint.js';
import { desaturate } from './desaturate.js';

/**
 * Convenience wrapper that composes tint + desaturate for a night-vision look.
 *
 * Equivalent to:
 *   tint(ctx, { color: darkColor, opacity: intensity * 0.65 });
 *   tint(ctx, { color: tintColor, opacity: intensity * 0.25 });
 *   desaturate(ctx, { intensity });
 *
 * @param {CanvasRenderingContext2D} ctx
 * @param {Object} [opts]
 * @param {number} [opts.intensity=0.6] - Effect strength (0-1)
 * @param {number[]} [opts.darkColor=[0,0,10]] - RGB for darkening layer
 * @param {number[]} [opts.tintColor=[10,15,45]] - RGB for blue tint layer
 * @param {boolean} [opts.desaturate=true] - Enable desaturation
 */
export function nightvision(ctx, opts = {}) {
  const {
    intensity = 0.6,
    darkColor = [0, 0, 10],
    tintColor = [10, 15, 45],
    desaturate: doDesaturate = true,
  } = opts;

  tint(ctx, { color: darkColor, opacity: intensity * 0.65 });
  tint(ctx, { color: tintColor, opacity: intensity * 0.25 });

  if (doDesaturate) {
    desaturate(ctx, { intensity });
  }
}
