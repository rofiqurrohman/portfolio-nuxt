import { describe, expect, it, vi } from 'vitest'
import { fetchContributionCalendar, type GraphQlFetcher } from './github-contributions'

const calendarResponse = {
  data: {
    user: {
      contributionsCollection: {
        contributionCalendar: {
          totalContributions: 9,
          weeks: [
            { contributionDays: [{ date: '2026-01-04', contributionCount: 0, contributionLevel: 'NONE' }] },
            { contributionDays: [{ date: '2026-01-11', contributionCount: 9, contributionLevel: 'FOURTH_QUARTILE' }] },
          ],
        },
      },
    },
  },
}

const fakeFetcher = (response: unknown) => vi.fn<GraphQlFetcher>().mockResolvedValue(response)

describe('fetchContributionCalendar', () => {
  it('maps GitHub contribution levels to 0-4', async () => {
    const calendar = await fetchContributionCalendar({ username: 'rofiqurrohman', token: 't0k3n', fetcher: fakeFetcher(calendarResponse) })

    expect(calendar.totalContributions).toBe(9)
    expect(calendar.weeks[0]?.days[0]).toEqual({ date: '2026-01-04', count: 0, level: 0 })
    expect(calendar.weeks[1]?.days[0]).toEqual({ date: '2026-01-11', count: 9, level: 4 })
  })

  it('sends the token as a bearer authorization header', async () => {
    const fetcher = fakeFetcher(calendarResponse)

    await fetchContributionCalendar({ username: 'rofiqurrohman', token: 't0k3n', fetcher })

    const [, options] = fetcher.mock.calls[0]!
    expect(options.headers.Authorization).toBe('bearer t0k3n')
    expect(options.body.variables).toEqual({ login: 'rofiqurrohman' })
  })

  it('rejects when GitHub returns GraphQL errors', async () => {
    const fetcher = fakeFetcher({ errors: [{ message: 'Bad credentials' }] })

    await expect(fetchContributionCalendar({ username: 'rofiqurrohman', token: 'bad', fetcher })).rejects.toThrow('Bad credentials')
  })

  it('rejects when the user does not exist', async () => {
    const fetcher = fakeFetcher({ data: { user: null } })

    await expect(fetchContributionCalendar({ username: 'ghost', token: 't0k3n', fetcher })).rejects.toThrow()
  })
})
