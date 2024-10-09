"use server"

interface TeamsMatchesResults {
    team1: string
    team2: string
    score1: string
    score2: string
    flag1: string
    flag2: string
    time_completed: string
    round_info: string
    tournament_name: string
    match_page: string
    tournamnet_icon: string
  }

  interface MatchesResponse {
    data: {
        status: number
        segments: TeamsMatchesResults[]
      }
  }

  interface TeamsMatchesUpcoming {
    team1: string
    team2: string
    flag1: string
    flag2: string
    time_until_match: string
    match_series: string
    match_event: string
    unix_timestamp: string
    match_page: string
  }

  interface MatchesUpcoming {
    data: {
        status: number
        segments: TeamsMatchesUpcoming[]
      }
  }

// Fetch Temas Matches Results
export async function fetchMatchesResults(results: string): Promise<TeamsMatchesResults[]> {
    try {
      const response = await fetch(`https://vlrggapi.vercel.app/match?q=${results}`, {
        method: 'GET',
        headers: {
          'accept': 'application/json'
        }
      })
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const data: MatchesResponse = await response.json()
      return data.data.status === 200 ? data.data.segments : []
    } catch (error) {
      console.error("Failed to fetch rankings:", error)
      return []
    }
  }

  // Fetch Temas Matches Upcoming
export async function fetchMatchesUpcoming(results: string): Promise<TeamsMatchesUpcoming[]> {
    try {
      const response = await fetch(`https://vlrggapi.vercel.app/match?q=${results}`, {
        method: 'GET',
        headers: {
          'accept': 'application/json'
        }
      })
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const data: MatchesUpcoming = await response.json()
      return data.data.status === 200 ? data.data.segments : []
    } catch (error) {
      console.error("Failed to fetch rankings:", error)
      return []
    }
  }