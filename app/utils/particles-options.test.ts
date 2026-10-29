import { describe, expect, it } from 'vitest'
import { buildParticlesOptions } from './particles-options'

describe('buildParticlesOptions', () => {
  it('draws above page backgrounds such as the home hero image', () => {
    const options = buildParticlesOptions({ isAnimated: true })

    expect(options.fullScreen).toMatchObject({ enable: true })
    expect((options.fullScreen as { zIndex: number }).zIndex).toBeGreaterThan(0)
  })

  it('never blocks clicks on the content underneath', () => {
    const options = buildParticlesOptions({ isAnimated: true })

    expect(options.style).toMatchObject({ pointerEvents: 'none' })
    expect(options.interactivity).toMatchObject({ detectsOn: 'window' })
  })

  it('stops movement and twinkling for visitors who prefer reduced motion', () => {
    const options = buildParticlesOptions({ isAnimated: false })

    expect(options.particles).toMatchObject({
      move: { enable: false },
      opacity: { animation: { enable: false } },
    })
  })
})
