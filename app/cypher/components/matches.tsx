"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Filter } from "lucide-react"
import { fetchMatchesResults, fetchMatchesUpcoming } from "../route"

type MatchType = "upcoming" | "results" | "all"

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

export default function MatchFinder() {
  const [matches, setMatches] = useState<Array<TeamsMatchesResults | TeamsMatchesUpcoming>>([])
  const [matchType, setMatchType] = useState<MatchType>("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedTeam, setSelectedTeam] = useState("")
  const [selectedTournament, setSelectedTournament] = useState("")
  const [teams, setTeams] = useState<string[]>([])
  const [tournaments, setTournaments] = useState<string[]>([])

  useEffect(() => {
    fetchMatches()
  }, [matchType])

  useEffect(() => {
    // Extract unique teams and tournaments from matches
    const uniqueTeams = new Set<string>()
    const uniqueTournaments = new Set<string>()

    matches.forEach(match => {
      uniqueTeams.add(match.team1)
      uniqueTeams.add(match.team2)
      if ('tournament_name' in match) {
        uniqueTournaments.add(match.tournament_name)
      } else if ('match_event' in match) {
        uniqueTournaments.add(match.match_event)
      }
    })

    setTeams(Array.from(uniqueTeams))
    setTournaments(Array.from(uniqueTournaments))
  }, [matches])

  const fetchMatches = async () => {
    let fetchedMatches: Array<TeamsMatchesResults | TeamsMatchesUpcoming> = []
    if (matchType === "upcoming" || matchType === "all") {
      const upcomingMatches = await fetchMatchesUpcoming()
      fetchedMatches = [...fetchedMatches, ...upcomingMatches]
    }
    if (matchType === "results" || matchType === "all") {
      const resultMatches = await fetchMatchesResults()
      fetchedMatches = [...fetchedMatches, ...resultMatches]
    }
    setMatches(fetchedMatches)
  }

  const filteredMatches = matches.filter((match) => {
    const matchTeams = `${match.team1} ${match.team2}`
    const matchTournament = 'tournament_name' in match ? match.tournament_name : match.match_event
    return (
      matchTeams.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (!selectedTeam || match.team1 === selectedTeam || match.team2 === selectedTeam) &&
      (!selectedTournament || matchTournament === selectedTournament)
    )
  })

  return (
    <div className="space-y-4">
      <div className="flex space-x-2">
        <Input
          type="search"
          placeholder="Buscar partidas..."
          className="w-full"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Filtros</SheetTitle>
              <SheetDescription>Ajusta los filtros para encontrar las partidas que buscas.</SheetDescription>
            </SheetHeader>
            <div className="grid gap-4 py-4">
              <Select onValueChange={setSelectedTeam} value={selectedTeam}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Seleccionar equipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Todos los equipos</SelectItem>
                  {teams.map((team) => (
                    <SelectItem key={team} value={team}>
                      {team}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select onValueChange={setSelectedTournament} value={selectedTournament}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Seleccionar torneo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Todos los torneos</SelectItem>
                  {tournaments.map((tournament) => (
                    <SelectItem key={tournament} value={tournament}>
                      {tournament}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </SheetContent>
        </Sheet>
      </div>
      <div className="flex space-x-2">
        <Button
          variant={matchType === "upcoming" ? "default" : "outline"}
          onClick={() => setMatchType("upcoming")}
        >
          Partidos por venir
        </Button>
        <Button
          variant={matchType === "results" ? "default" : "outline"}
          onClick={() => setMatchType("results")}
        >
          Partidos terminados
        </Button>
        <Button
          variant={matchType === "all" ? "default" : "outline"}
          onClick={() => setMatchType("all")}
        >
          Todos los partidos
        </Button>
      </div>
      <div className="space-y-2">
        {filteredMatches.map((match, index) => (
          <Card key={index}>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <img src={match.flag1} alt={`${match.team1} flag`} className="w-6 h-4" />
                <h3 className="text-lg font-semibold">{match.team1}</h3>
                <span>vs</span>
                <h3 className="text-lg font-semibold">{match.team2}</h3>
                <img src={match.flag2} alt={`${match.team2} flag`} className="w-6 h-4" />
              </div>
              {'tournament_name' in match ? (
                <>
                  <p className="text-sm text-muted-foreground">{match.tournament_name}</p>
                  <p className="text-sm text-muted-foreground">Finalizado: {match.time_completed}</p>
                  <p className="text-sm font-semibold">Resultado: {match.score1} - {match.score2}</p>
                  <p className="text-sm text-muted-foreground">{match.round_info}</p>
                </>
              ) : (
                <>
                  <p className="text-sm text-muted-foreground">{match.match_event}</p>
                  <p className="text-sm text-muted-foreground">Comienza en: {match.time_until_match}</p>
                  <p className="text-sm text-muted-foreground">{match.match_series}</p>
                </>
              )}
              <a href={match.match_page} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-500 hover:underline">
                Ver detalles
              </a>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}