# prism

Paint your terminal. Gradient text, smooth animations.

<p align="center">
  <img src="demo.svg" alt="prism demo" width="540">
</p>

```bash
npx prism "Hello" --rainbow
echo "World" | prism --wave
prism --big "YES" --shimmer
```

## Install

```bash
npm install prism
# or use directly
npx prism "text"
```

## Library

```js
import { gradient, animate, banner } from 'prism';

// Static gradient text
console.log(gradient('Hello', { colors: ['#ff0066', '#00ccff'] }));

// Multiple color stops
console.log(gradient('Hello', {
  colors: ['#ff0066', '#ffcc00', '#00ccff']
}));

// Animated rainbow
const anim = animate('Hello World', { mode: 'rainbow', fps: 30 });
setInterval(() => {
  process.stdout.write('\x1b[2J\x1b[H');
  process.stdout.write(anim.frame());
}, 33);

// Big banner text
console.log(banner('PRISM'));
console.log(gradient(banner('PRISM'), { colors: ['#ff0066', '#00ccff'] }));
```

## CLI

```
prism "text"              → gradient text
prism "text" --rainbow    → animated rainbow
prism "text" --wave       → waving gradient
prism "text" --shimmer    → shimmering effect
prism "text" --pulse      → pulsing brightness
prism "text" --typewriter → type out letter by letter
prism "text" --glitch     → digital glitch effect
prism --big "text" --wave → big banner text
echo "text" | prism       → pipe mode

Options:
  --from "#ff0066"  Start color
  --to "#00ccff"    End color
  --speed 2        Animation speed multiplier
  --preview        Show for 5 seconds then exit
```

## Examples

```bash
# Rainbow wave across your terminal
prism "look at this" --rainbow

# Big banner + shimmer
prism --big "COOL" --shimmer

# Custom gradient with pipe
curl -s https://api.github.com | head -3 | prism --wave --from "#00ff00" --to "#0000ff"

# Glitch effect
prism "error 404" --glitch

# Preview mode (auto-exit after 5s)
prism "hello" --rainbow --preview
```

## Effects

| Mode        | What it does |
|-------------|-------------|
| `--rainbow` | Each character cycles through the spectrum independently |
| `--wave`    | A smooth wave of your gradient travels across the text |
| `--shimmer` | Characters twinkle with varying brightness |
| `--pulse`   | The whole text breathes — bright to dim and back |
| `--typewriter` | Types out your text one character at a time |
| `--glitch`  | Occasional random characters and flashes |

Gradient supports any number of color stops. Two defaults to pink → cyan.

## License

MIT
