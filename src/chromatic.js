/**
 * Chromatic aberration — shifts red and blue channels in opposite directions.
 * Internal offscreen canvas cached on ctx.canvas._chromaticCanvas.
 *
 * @param {CanvasRenderingContext2D} ctx
 * @param {Object} [opts]
 * @param {number} [opts.offset=4] - Channel displacement in pixels
 * @param {number} [opts.opacity=0.3] - Blend opacity for shifted channels
 * @param {HTMLCanvasElement|HTMLImageElement|null} [opts.source=null] - Source image/canvas. If null, snapshots ctx.canvas.
 */
export function chromatic(ctx, opts = {}) {
  const {
    offset = 4,
    opacity = 0.3,
    source = null,
  } = opts;

  const canvas = ctx.canvas;
  const w = canvas.width;
  const h = canvas.height;

  if (w === 0 || h === 0) return;

  let offscreen = canvas._chromaticCanvas;
  if (!offscreen || offscreen.width !== w || offscreen.height !== h) {
    offscreen = document.createElement('canvas');
    offscreen.width = w;
    offscreen.height = h;
    canvas._chromaticCanvas = offscreen;
  }

  const offCtx = offscreen.getContext('2d');

  if (!source) {
    offCtx.clearRect(0, 0, w, h);
    offCtx.drawImage(canvas, 0, 0);
  }

  const drawSource = source || offscreen;

  ctx.save();
  ctx.globalAlpha = opacity;

  ctx.globalCompositeOperation = 'multiply';
  offCtx.clearRect(0, 0, w, h);
  offCtx.drawImage(drawSource, 0, 0);
  offCtx.save();
  offCtx.globalCompositeOperation = 'multiply';
  offCtx.fillStyle = '#ff0000';
  offCtx.fillRect(0, 0, w, h);
  offCtx.restore();
  ctx.drawImage(offscreen, -offset, 0);

  ctx.globalCompositeOperation = 'lighter';
  offCtx.clearRect(0, 0, w, h);
  offCtx.drawImage(drawSource, 0, 0);
  offCtx.save();
  offCtx.globalCompositeOperation = 'multiply';
  offCtx.fillStyle = '#0000ff';
  offCtx.fillRect(0, 0, w, h);
  offCtx.restore();
  ctx.drawImage(offscreen, offset, 0);

  ctx.restore();
}
