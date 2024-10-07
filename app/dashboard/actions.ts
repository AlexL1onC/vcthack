"use server"

// Team Rankings Interfaces
interface TeamRanking {
  rank: string
  team: string
  country: string
  last_played: string
  last_played_team: string
  last_played_team_logo: string
  record: string
  earnings: string
  logo: string
}

interface RankingsResponse {
  status: number
  data: TeamRanking[]
}

// News Interfaces
interface NewsItem {
  title: string
  description: string
  date: string
  author: string
  url_path: string
}

interface NewsResponse {
  data: {
    status: number
    segments: NewsItem[]
  }
}

// Fetch Team Rankings
export async function fetchRankings(region: string): Promise<TeamRanking[]> {
  try {
    const response = await fetch(`https://vlrggapi.vercel.app/rankings?region=${region}`, {
      method: 'GET',
      headers: {
        'accept': 'application/json'
      }
    })
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const data: RankingsResponse = await response.json()
    return data.status === 200 ? data.data : []
  } catch (error) {
    console.error("Failed to fetch rankings:", error)
    return []
  }
}

// Fetch News
export async function fetchNews(): Promise<NewsItem[]> {
  try {
    const response = await fetch('https://vlrggapi.vercel.app/news', {
      method: 'GET',
      headers: {
        'accept': 'application/json'
      }
    })
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const data: NewsResponse = await response.json()
    return data.data.status === 200 ? data.data.segments : []
  } catch (error) {
    console.error("Failed to fetch news:", error)
    return []
  }
}