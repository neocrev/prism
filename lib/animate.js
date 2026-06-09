import { gradient } from './gradient.js';

export function animate(text, {
  mode = 'rainbow',
  colors = ['#ff0066', '#00ccff'],
  speed = 1,
  fps = 30,
} = {}) {
  let time = 0;
  let running = true;
  let chars = text.split('');
  let interval;

  const engines = {
    rainbow(t, i) {
      const hue = (t + i * 0.1 * speed) % 1;
      const deg = hue * 360;
      const h = deg / 60;
      const c = 1;
      const x = 1 - Math.abs((h % 2) - 1);
      let r, g, b;
      if (h < 1) { r = 1; g = x; b = 0; }
      else if (h < 2) { r = x; g = 1; b = 0; }
      else if (h < 3) { r = 0; g = 1; b = x; }
      else if (h < 4) { r = 0; g = x; b = 1; }
      else if (h < 5) { r = x; g = 0; b = 1; }
      else { r = 1; g = 0; b = x; }
      return `\x1b[38;2;${Math.round(r * 255)};${Math.round(g * 255)};${Math.round(b * 255)}m`;
    },

    wave(t, i) {
      const stops = colors.map(c => {
        const h = c.replace('#', '');
        return { r: parseInt(h.slice(0,2),16), g: parseInt(h.slice(2,4),16), b: parseInt(h.slice(4,6),16) };
      });
      const wave = Math.sin(t * 2 * speed + i * 0.3) * 0.5 + 0.5;
      const t2 = wave;
      const seg = t2 * (stops.length - 1);
      const idx = Math.min(Math.floor(seg), stops.length - 2);
      const frac = seg - idx;
      const c1 = stops[idx], c2 = stops[Math.min(idx+1, stops.length-1)];
      const r = c1.r + (c2.r - c1.r) * frac;
      const g = c1.g + (c2.g - c1.g) * frac;
      const b = c1.b + (c2.b - c1.b) * frac;
      return `\x1b[38;2;${Math.round(r)};${Math.round(g)};${Math.round(b)}m`;
    },

    shimmer(t, i) {
      const stops = colors.map(c => {
        const h = c.replace('#', '');
        return { r: parseInt(h.slice(0,2),16), g: parseInt(h.slice(2,4),16), b: parseInt(h.slice(4,6),16) };
      });
      const shimmer = Math.sin(t * 3 * speed + i * 0.5) * 0.5 + 0.5;
      const bright = Math.max(0.3, shimmer);
      const t2 = (i / Math.max(1, chars.length - 1));
      const seg = t2 * (stops.length - 1);
      const idx = Math.min(Math.floor(seg), stops.length - 2);
      const frac = seg - idx;
      const c1 = stops[idx], c2 = stops[Math.min(idx+1, stops.length-1)];
      const r = (c1.r + (c2.r - c1.r) * frac) * bright;
      const g = (c1.g + (c2.g - c1.g) * frac) * bright;
      const b = (c1.b + (c2.b - c1.b) * frac) * bright;
      return `\x1b[38;2;${Math.round(r)};${Math.round(g)};${Math.round(b)}m`;
    },

    pulse(t) {
      const stops = colors.map(c => {
        const h = c.replace('#', '');
        return { r: parseInt(h.slice(0,2),16), g: parseInt(h.slice(2,4),16), b: parseInt(h.slice(4,6),16) };
      });
      const p = Math.sin(t * 2 * speed) * 0.5 + 0.5;
      const t2 = p;
      const seg = t2 * (stops.length - 1);
      const idx = Math.min(Math.floor(seg), stops.length - 2);
      const frac = seg - idx;
      const c1 = stops[idx], c2 = stops[Math.min(idx+1, stops.length-1)];
      const r = c1.r + (c2.r - c1.r) * frac;
      const g = c1.g + (c2.g - c1.g) * frac;
      const b = c1.b + (c2.b - c1.b) * frac;
      const color = `\x1b[38;2;${Math.round(r)};${Math.round(g)};${Math.round(b)}m`;
      return color + text + '\x1b[0m';
    },

    typewriter(t) {
      const count = Math.min(chars.length, Math.floor(t * 5 * speed));
      const partial = chars.slice(0, count).join('');
      if (count === 0) return '';
      const stop = colors.map(c => {
        const h = c.replace('#', '');
        return { r: parseInt(h.slice(0,2),16), g: parseInt(h.slice(2,4),16), b: parseInt(h.slice(4,6),16) };
      });
      const grad = partial.split('').map((ch, i) => {
        const t2 = i / Math.max(1, partial.length - 1);
        const seg = t2 * (stop.length - 1);
        const idx = Math.min(Math.floor(seg), stop.length - 2);
        const frac = seg - idx;
        const c1 = stop[idx], c2 = stop[Math.min(idx+1, stop.length-1)];
        const r = c1.r + (c2.r - c1.r) * frac;
        const g = c1.g + (c2.g - c1.g) * frac;
        const b = c1.b + (c2.b - c1.b) * frac;
        return `\x1b[38;2;${Math.round(r)};${Math.round(g)};${Math.round(b)}m${ch}`;
      }).join('');
      return grad + '\x1b[0m';
    },

    glitch(t, i) {
      const stops = colors.map(c => {
        const h = c.replace('#', '');
        return { r: parseInt(h.slice(0,2),16), g: parseInt(h.slice(2,4),16), b: parseInt(h.slice(4,6),16) };
      });
      const glitch = Math.random() < 0.05;
      const ch = glitch ? String.fromCharCode(Math.floor(Math.random() * 95) + 33) : text[i];
      if (glitch && Math.random() < 0.5) {
        return `\x1b[48;2;255;255;255m\x1b[30m${ch}\x1b[0m`;
      }
      const t2 = (i + Math.sin(t * 10 * speed) * 2) / Math.max(1, chars.length - 1);
      const seg = t2 * (stops.length - 1);
      const idx = Math.min(Math.max(0, Math.floor(seg)), stops.length - 2);
      const frac = seg - idx;
      const c1 = stops[Math.min(idx, stops.length-1)], c2 = stops[Math.min(idx+1, stops.length-1)];
      const r = c1.r + (c2.r - c1.r) * frac;
      const g = c1.g + (c2.g - c1.g) * frac;
      const b = c1.b + (c2.b - c1.b) * frac;
      return `\x1b[38;2;${Math.round(r)};${Math.round(g)};${Math.round(b)}m${ch}`;
    },
  };

  const engine = engines[mode];
  if (!engine) throw new Error(`Unknown mode: ${mode}`);

  return {
    frame() {
      time += 1 / fps;
      if (mode === 'pulse') return engine(time);
      if (mode === 'typewriter') return engine(time);
      const output = chars.map((ch, i) => {
        if (ch === '\n') return '\n';
        if (mode === 'glitch') return engine(time, i);
        return engine(time, i) + ch;
      }).join('') + '\x1b[0m';
      return output;
    },
    stop() {
      running = false;
      if (interval) clearInterval(interval);
    },
  };
}
