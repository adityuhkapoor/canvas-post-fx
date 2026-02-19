/**
 * Displaces random horizontal slices of the canvas for a glitch effect.
 * Pixel manipulation effect — uses getImageData/putImageData, expensive.
 *
 * @param {CanvasRenderingContext2D} ctx
 * @param {Object} [opts]
 * @param {number} [opts.slices=3] - Number of displaced horizontal slices
 * @param {number} [opts.maxOffset=10] - Max horizontal displacement in pixels
 * @param {number} [opts.minHeight=2] - Min slice height in pixels
 * @param {number} [opts.maxHeight=10] - Max slice height in pixels
 * @param {number} [opts.tintOpacity=0.05] - Random color wash opacity (0 to disable)
 */
export function glitch(ctx, opts = {}) {
  const {
    slices = 3,
    maxOffset = 10,
    minHeight = 2,
    maxHeight = 10,
    tintOpacity = 0.05,
  } = opts;

  const w = ctx.canvas.width;
  const h = ctx.canvas.height;

  if (w === 0 || h === 0) return;

  ctx.save();

  for (let i = 0; i < slices; i++) {
    const sliceH = minHeight + ((Math.random() * (maxHeight - minHeight)) | 0);
    const sliceY = (Math.random() * (h - sliceH)) | 0;
    const offset = ((Math.random() - 0.5) * 2 * maxOffset) | 0;

    if (offset === 0) continue;

    const imageData = ctx.getImageData(0, sliceY, w, sliceH);
    ctx.putImageData(imageData, offset, sliceY);

    ctx.fillStyle = '#000';
    if (offset > 0) {
      ctx.fillRect(0, sliceY, offset, sliceH);
    } else {
      ctx.fillRect(w + offset, sliceY, -offset, sliceH);
    }
  }

  // Optional color wash
  if (tintOpacity > 0) {
    const r = (Math.random() * 255) | 0;
    const g = (Math.random() * 255) | 0;
    const b = (Math.random() * 255) | 0;
    ctx.fillStyle = `rgba(${r},${g},${b},${tintOpacity})`;
    ctx.fillRect(0, 0, w, h);
  }

  ctx.restore();
}
