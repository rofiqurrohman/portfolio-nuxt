import { mountSuspended } from '@nuxt/test-utils/runtime'
import { describe, expect, it } from 'vitest'
import type { Skill } from '#shared/schemas/skill'
import StackTable from './StackTable.vue'

const skill = (name: string, category: Skill['category'], sortOrder: number): Skill => ({
  id: `${category}-${name}`,
  name,
  icon: 'simple-icons:github',
  category,
  sortOrder,
})

// Deliberately out of category order: the table must follow the fixed row order.
const skills: Skill[] = [
  skill('Claude', 'ai', 1),
  skill('Vue.js', 'frontend', 1),
  skill('TypeScript', 'language', 2),
  skill('JavaScript', 'language', 1),
]

describe('StackTable', () => {
  it('renders one numbered row per non-empty category, in the fixed order', async () => {
    const wrapper = await mountSuspended(StackTable, { props: { skills } })

    const rows = wrapper.findAll('[data-stack-label]')
      .map(label => label.findAll('span').map(part => part.text()).join(' '))

    expect(rows).toEqual(['01 Language', '02 Frontend', '03 AI'])
  })

  it('lists the skills of a row as chips in their sort order', async () => {
    const wrapper = await mountSuspended(StackTable, { props: { skills } })

    const chips = wrapper.find('[data-stack-row]').findAll('[data-stack-chip]').map(chip => chip.text())

    expect(chips).toEqual(['JavaScript', 'TypeScript'])
  })
})
