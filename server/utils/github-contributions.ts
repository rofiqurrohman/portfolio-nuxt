import { contributionCalendarSchema, type ContributionCalendar, type ContributionLevel } from '../../shared/schemas/github'

export interface GraphQlRequest {
  method: 'POST'
  headers: Record<string, string>
  body: { query: string, variables: Record<string, string> }
}

export type GraphQlFetcher = (url: string, request: GraphQlRequest) => Promise<unknown>

interface GitHubContributionDay {
  date: string
  contributionCount: number
  contributionLevel: keyof typeof CONTRIBUTION_LEVELS
}

interface GitHubCalendarResponse {
  errors?: Array<{ message: string }>
  data?: {
    user: {
      contributionsCollection: {
        contributionCalendar: {
          totalContributions: number
          weeks: Array<{ contributionDays: GitHubContributionDay[] }>
        }
      }
    } | null
  }
}

const GITHUB_GRAPHQL_URL = 'https://api.github.com/graphql'

const CONTRIBUTION_CALENDAR_QUERY = `
  query ($login: String!) {
    user(login: $login) {
      contributionsCollection {
        contributionCalendar {
          totalContributions
          weeks { contributionDays { date contributionCount contributionLevel } }
        }
      }
    }
  }
`

const CONTRIBUTION_LEVELS = {
  NONE: 0,
  FIRST_QUARTILE: 1,
  SECOND_QUARTILE: 2,
  THIRD_QUARTILE: 3,
  FOURTH_QUARTILE: 4,
} as const satisfies Record<string, ContributionLevel>

const defaultFetcher: GraphQlFetcher = (url, request) => $fetch(url, request)

export async function fetchContributionCalendar(options: {
  username: string
  token: string
  fetcher?: GraphQlFetcher
}): Promise<ContributionCalendar> {
  const { username, token, fetcher = defaultFetcher } = options

  const response = await fetcher(GITHUB_GRAPHQL_URL, {
    method: 'POST',
    headers: { 'Authorization': `bearer ${token}`, 'User-Agent': 'portfolio-vue' },
    body: { query: CONTRIBUTION_CALENDAR_QUERY, variables: { login: username } },
  }) as GitHubCalendarResponse

  if (response.errors?.length) {
    throw new Error(response.errors.map(error => error.message).join('; '))
  }

  const calendar = response.data?.user?.contributionsCollection.contributionCalendar
  if (!calendar) {
    throw new Error(`GitHub user "${username}" not found`)
  }

  return contributionCalendarSchema.parse({
    totalContributions: calendar.totalContributions,
    weeks: calendar.weeks.map(week => ({
      days: week.contributionDays.map(day => ({
        date: day.date,
        count: day.contributionCount,
        level: CONTRIBUTION_LEVELS[day.contributionLevel],
      })),
    })),
  })
}
