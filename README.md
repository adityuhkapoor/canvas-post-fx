# canvas-post-fx

Post-processing effects for Canvas 2D. Plain functions, zero dependencies, no WebGL required.

Every existing solution (PixiJS, glfx.js, CRTFilter.js) requires WebGL or is abandoned. This package gives you composable effects that work directly on a `CanvasRenderingContext2D`.

```
npm install canvas-post-fx
```

## How it works

Each effect is a function that takes a `ctx` and an optional config object. Call them after drawing your scene, in whatever order you want, as many per frame as you need:

```js
import { scanlines, vignette, noise } from 'canvas-post-fx';

function render() {
  drawMyScene(ctx);

  scanlines(ctx);
  vignette(ctx, { opacity: 0.6 });
  noise(ctx, { intensity: 0.3, scale: 8 });

  requestAnimationFrame(render);
}
```

No internal state, no initialization, no cleanup. The caller owns the animation loop and decides when to apply what.

## Effects

11 effects, three performance tiers:

| Effect | Tier | What it does |
|--------|------|--------------|
| `scanlines` | fast | Horizontal scanline bars |
| `vignette` | fast | Darkened edges (radial gradient) |
| `tint` | fast | Color overlay |
| `desaturate` | fast | Drains color toward grayscale |
| `nightvision` | fast | Preset combining tint + desaturate |
| `flash` | fast | Full-canvas color fill (you animate the opacity) |
| `brightness` | fast | Darken/brighten a region |
| `noise` | pixel | Scattered random pixels |
| `glitch` | pixel | Horizontal slice displacement |
| `chromatic` | offscreen | Red/blue channel split |
| `shake` | fast | Returns `{x, y}` offset — you apply `ctx.translate()` |

**fast** = compositing ops only, negligible cost. **offscreen** = draws to a cached internal canvas. **pixel** = reads/writes pixel data with `getImageData`/`putImageData`, heaviest.

## Imports

Tree-shakeable. Barrel or deep imports both work:

```js
import { scanlines } from 'canvas-post-fx';
import { scanlines } from 'canvas-post-fx/scanlines';
```

## API

Colors are `[r, g, b]` arrays throughout. Dimensions come from `ctx.canvas.width/height` — you never pass `w` and `h`.

---

### scanlines(ctx, opts?)

| Param | Default | |
|-------|---------|---|
| `gap` | `4` | Spacing between scanlines (px) |
| `width` | `2` | Scanline thickness (px) |
| `opacity` | `0.12` | |
| `color` | `[0,0,0]` | |

### vignette(ctx, opts?)

| Param | Default | |
|-------|---------|---|
| `innerRadius` | `0.3` | Fraction of `max(w, h)` |
| `outerRadius` | `0.75` | Fraction of `max(w, h)` |
| `opacity` | `0.5` | Opacity at the edges |
| `color` | `[0,0,0]` | Try `[100,0,0]` for a horror vignette |

### tint(ctx, opts?)

| Param | Default | |
|-------|---------|---|
| `color` | `[0,30,0]` | |
| `opacity` | `0.08` | |

### desaturate(ctx, opts?)

| Param | Default | |
|-------|---------|---|
| `intensity` | `0.6` | 0 = no change, 1 = full grayscale |

Relies on the `'saturation'` composite op. Safari < 15 doesn't support it — the call becomes a no-op there, no errors thrown.

### nightvision(ctx, opts?)

A convenience wrapper. Under the hood it's just:

```js
tint(ctx, { color: darkColor, opacity: intensity * 0.65 });
tint(ctx, { color: tintColor, opacity: intensity * 0.25 });
desaturate(ctx, { intensity });
```

| Param | Default | |
|-------|---------|---|
| `intensity` | `0.6` | Overall strength |
| `darkColor` | `[0,0,10]` | Darkening layer color |
| `tintColor` | `[10,15,45]` | Blue wash color |
| `desaturate` | `true` | Set `false` to skip the desaturation step |

If you want different tuning, skip this and call the primitives yourself.

### flash(ctx, opts?)

| Param | Default | |
|-------|---------|---|
| `opacity` | `1` | Animate this down from 1 to 0 for a hit flash |
| `color` | `[255,255,255]` | |

### brightness(ctx, opts?)

| Param | Default | |
|-------|---------|---|
| `value` | `50` | 0–100. 50 = no change, below = darker, above = brighter |
| `x` | `0` | |
| `y` | `0` | |
| `width` | canvas width | |
| `height` | canvas height | |

### noise(ctx, opts?)

| Param | Default | |
|-------|---------|---|
| `intensity` | `0.5` | Probability each sampled pixel gets replaced |
| `scale` | `16` | Sample every Nth pixel. Higher = faster but coarser |
| `alpha` | `200` | Alpha for noise pixels. `null` = leave existing alpha alone |
| `monochrome` | `true` | `false` gives you random RGB per pixel |

### glitch(ctx, opts?)

| Param | Default | |
|-------|---------|---|
| `slices` | `3` | How many horizontal slices to displace |
| `maxOffset` | `10` | Max horizontal shift (px) |
| `minHeight` | `2` | Min slice height (px) |
| `maxHeight` | `10` | Max slice height (px) |
| `tintOpacity` | `0.05` | Color wash over the whole canvas. 0 to disable |

### chromatic(ctx, opts?)

| Param | Default | |
|-------|---------|---|
| `offset` | `4` | How far to shift the red/blue channels (px) |
| `opacity` | `0.3` | Blend strength |
| `source` | `null` | External source image/canvas. Omit to snapshot `ctx.canvas` |

Internally creates an offscreen canvas cached as `ctx.canvas._chromaticCanvas`. It's resized when the canvas dimensions change and garbage-collected with the host canvas. No module-level singletons, so multiple canvases work fine.

### shake(opts?)

| Param | Default | |
|-------|---------|---|
| `intensity` | `25` | Max displacement (px) |

Returns `{ x, y }`. Does not take a `ctx` — it's pure math. You apply it:

```js
const offset = shake({ intensity: 15 });
ctx.save();
ctx.translate(offset.x, offset.y);
drawScene(ctx);
ctx.restore();
```

## Browser support

Works in all modern browsers. Two caveats:

- **`desaturate()`** needs the `'saturation'` composite op, which Safari added in v15. Older Safari silently ignores it.
- **`chromatic()`** calls `document.createElement('canvas')`, so it won't work in Node/SSR.

## License

MIT
