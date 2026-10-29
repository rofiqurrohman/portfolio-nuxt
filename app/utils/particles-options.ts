import type { ISourceOptions } from '@tsparticles/engine'

// Above page backgrounds (e.g. the home hero image) so the stars stay visible,
// below the navbar (z-50) and scroll-to-top button (z-40).
const PARTICLES_Z_INDEX = 1

/** Same look as the legacy react-tsparticles config: faint stars drifting right. */
export function buildParticlesOptions({ isAnimated }: { isAnimated: boolean }): ISourceOptions {
  return {
    fullScreen: { enable: true, zIndex: PARTICLES_Z_INDEX },
    // The canvas sits on top of the content, so it must never swallow clicks.
    style: { pointerEvents: 'none' },
    background: { color: { value: 'transparent' } },
    detectRetina: true,
    particles: {
      number: { value: 160, density: { enable: true, width: 1500, height: 1500 } },
      links: { enable: false },
      move: { enable: isAnimated, direction: 'right', speed: 0.05 },
      size: { value: 1 },
      opacity: { value: { min: 0.05, max: 1 }, animation: { enable: isAnimated, speed: 1 } },
    },
    interactivity: {
      // Listen on the window because the canvas itself ignores pointer events.
      detectsOn: 'window',
      events: { onClick: { enable: true, mode: 'push' } },
      modes: { push: { quantity: 1 } },
    },
  }
}
