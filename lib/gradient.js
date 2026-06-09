const RESET = '\x1b[0m';

export function hexToRgb(hex) {
  const h = hex.replace('#', '');
  return {
    r: parseInt(h.slice(0, 2), 16),
    g: parseInt(h.slice(2, 4), 16),
    b: parseInt(h.slice(4, 6), 16),
  };
}

export function rgbToHex(r, g, b) {
  const to = (n) => Math.round(Math.max(0, Math.min(255, n))).toString(16).padStart(2, '0');
  return `#${to(r)}${to(g)}${to(b)}`;
}

export function lerp(a, b, t) {
  return a + (b - a) * t;
}

export function lerpColor(c1, c2, t) {
  return {
    r: lerp(c1.r, c2.r, t),
    g: lerp(c1.g, c2.g, t),
    b: lerp(c1.b, c2.b, t),
  };
}

export function rgbToAnsi(r, g, b) {
  return `\x1b[38;2;${Math.round(r)};${Math.round(g)};${Math.round(b)}m`;
}

export function gradient(text, { colors = ['#ff0066', '#00ccff'], offset = 0 } = {}) {
  const stops = colors.map(hexToRgb);
  const len = text.length;
  let out = '';

  for (let i = 0; i < len; i++) {
    const t = len > 1 ? (i + offset) / (len - 1) : 0.5;
    const segment = t * (stops.length - 1);
    const idx = Math.min(Math.floor(segment), stops.length - 2);
    const frac = segment - idx;
    const c1 = stops[idx];
    const c2 = stops[Math.min(idx + 1, stops.length - 1)];
    const c = lerpColor(c1, c2, frac);
    out += rgbToAnsi(c.r, c.g, c.b) + text[i];
  }

  out += RESET;
  return out;
}
