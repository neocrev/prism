# prism

Full-screen terminal visualizer. Any text, animated with light.

```bash
prism "hello world" --wave
prism "fire" --fire --preview
echo "drift" | prism --drift
prism --big "COOL" --aurora
```

## Install

```bash
npm install prism
# or direct
npx prism "text"
```

## Visual Modes

```
prism "text"         → default wave
prism "text" --wave  → text undulates with flowing gradient colors
prism "text" --drift → characters drift like floating particles
prism "text" --aurora→ slow shifting aurora glow
prism "text" --fire  → warm flickering fire effect
prism "text" --rain  → characters fall like rain
prism --big "COOL"   → banner text with any effect
echo "text" | prism  → pipe from stdin

Options:
  --from "#ff0066"  Start color
  --to "#00ccff"    End color
  --speed 2         Speed multiplier
  --preview         Auto-exit after 5 seconds
```

## Effects

| Mode       | What it does |
|------------|-------------|
| `--wave`   | Text undulates, colors flow through like a gradient river |
| `--drift`  | Each character floats independently, drifts across the screen |
| `--aurora` | Slow, smooth color shifts. Like northern lights in your terminal |
| `--fire`   | Warm glow, randomized flicker. Each character burns differently |
| `--rain`   | Characters fall from the sky. Background text in dim silhouette |

Press any key to exit.

## Library

```js
import { gradient, animate, banner } from 'prism';

// Static gradient
console.log(gradient('Hello', { colors: ['#ff0066', '#00ccff'] }));

// Multiple color stops
console.log(gradient('Hello', {
  colors: ['#ff0066', '#ffcc00', '#00ccff']
}));

// Animated (for custom integration)
const anim = animate('Hello World', { mode: 'rainbow', fps: 30 });
setInterval(() => {
  process.stdout.write('\x1b[2J\x1b[H');
  process.stdout.write(anim.frame());
}, 33);

// Banner text
console.log(banner('PRISM'));
```

## License

MIT
