import { mountSuspended } from '@nuxt/test-utils/runtime'
import { describe, expect, it } from 'vitest'
import type { Education } from '#shared/schemas/education'
import EducationItem from './EducationItem.vue'

const education: Education = {
  id: 'ed1',
  institution: 'Universitas Amikom Yogyakarta',
  fieldOfStudy: 'Informatika',
  graduationYear: 2023,
  highlights: [],
  sortOrder: 1,
}

describe('EducationItem', () => {
  it('shows the institution, field of study and graduation year', async () => {
    const wrapper = await mountSuspended(EducationItem, { props: { education } })

    expect(wrapper.find('h3').text()).toBe('Universitas Amikom Yogyakarta')
    expect(wrapper.text()).toContain('Informatika')
    expect(wrapper.text()).toContain('2023')
  })

  it('omits the list when there are no highlights', async () => {
    const wrapper = await mountSuspended(EducationItem, { props: { education } })

    expect(wrapper.find('ul').exists()).toBe(false)
  })

  it('lists every highlight', async () => {
    const wrapper = await mountSuspended(EducationItem, {
      props: { education: { ...education, highlights: ['GPA 3.6', 'Thesis on web performance'] } },
    })

    expect(wrapper.findAll('li').map(item => item.text())).toEqual(['GPA 3.6', 'Thesis on web performance'])
  })
})
