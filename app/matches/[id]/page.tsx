'use client'

import { useState, useEffect } from "react"
import { useRouter } from 'next/navigation'
import { LayoutDashboard, Users, Swords, Map, Settings, LogOut, ArrowLeft } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

// Simulated match data (in a real app, this would come from an API or database)
const matchData = {
  id: 1,
  date: "2023-05-15",
  map: "Ascent",
  tournament: "VCT 2023",
  team1: {
    name: "Team Liquid",
    score: 13,
    players: [
      { name: "ScreaM", agent: "Jett", kills: 25, deaths: 15, assists: 3 },
      { name: "Jamppi", agent: "Sova", kills: 18, deaths: 14, assists: 8 },
      { name: "L1NK", agent: "Omen", kills: 16, deaths: 13, assists: 6 },
      { name: "soulcas", agent: "Raze", kills: 20, deaths: 16, assists: 4 },
      { name: "Kryptix", agent: "Cypher", kills: 14, deaths: 12, assists: 7 },
    ]
  },
  team2: {
    name: "Fnatic",
    score: 11,
    players: [
      { name: "Boaster", agent: "Sova", kills: 17, deaths: 18, assists: 9 },
      { name: "Derke", agent: "Jett", kills: 22, deaths: 19, assists: 2 },
      { name: "Mistic", agent: "Viper", kills: 15, deaths: 17, assists: 6 },
      { name: "doma", agent: "Raze", kills: 18, deaths: 20, assists: 5 },
      { name: "Magnum", agent: "Cypher", kills: 13, deaths: 19, assists: 8 },
    ]
  }
}

const MatchDetailPage = ({ params }: { params: { id: string } }) => {
  const [activeTab, setActiveTab] = useState("matches")
  const router = useRouter()
  const [match, setMatch] = useState(matchData)

  useEffect(() => {
    // In a real app, you would fetch the match data here
    // For now, we're using the simulated data
    setMatch(matchData)
  }, [params.id])

  const handleTabChange = (tab: string) => {
    if (tab === "matches") {
      router.push('/matches')
    } else {
      router.push(tab === "dashboard" ? '/' : `/${tab}`)
    }
  }

  if (!match) {
    return <div>Loading...</div>
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md flex flex-col">
        <div className="p-4">
          <h2 className="text-2xl font-bold text-primary">Valorant Coach</h2>
        </div>
        <nav className="mt-4 flex-grow">
          <Button
            variant="ghost"
            className="w-full justify-start"
            onClick={() => handleTabChange("dashboard")}
          >
            <LayoutDashboard className="mr-2 h-4 w-4" />
            Dashboard
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start"
            onClick={() => handleTabChange("players")}
          >
            <Users className="mr-2 h-4 w-4" />
            Players
          </Button>
          <Button
            variant="secondary"
            className="w-full justify-start"
            onClick={() => handleTabChange("matches")}
          >
            <Swords className="mr-2 h-4 w-4" />
            Matches
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start"
            onClick={() => handleTabChange("strategies")}
          >
            <Map className="mr-2 h-4 w-4" />
            Strategies
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start"
            onClick={() => handleTabChange("settings")}
          >
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </Button>
        </nav>

        {/* Log Out Button */}
        <div className="p-4">
          <Button variant="ghost" className="w-full justify-start" onClick={() => window.location.href = '/api/auth/logout'}>
            <LogOut className="mr-2 h-4 w-4" />
            Log Out
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 overflow-auto">
        <div className="flex items-center mb-6">
          <Button variant="ghost" onClick={() => router.push('/matches')} className="mr-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Matches
          </Button>
          <h1 className="text-3xl font-bold">Match Details</h1>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Match Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p><strong>Date:</strong> {match.date}</p>
                <p><strong>Map:</strong> {match.map}</p>
                <p><strong>Tournament:</strong> {match.tournament}</p>
              </div>
              <div>
                <p><strong>Teams:</strong> {match.team1.name} vs {match.team2.name}</p>
                <p><strong>Score:</strong> {match.team1.score} - {match.team2.score}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>{match.team1.name} - Player Stats</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Player</TableHead>
                  <TableHead>Agent</TableHead>
                  <TableHead>Kills</TableHead>
                  <TableHead>Deaths</TableHead>
                  <TableHead>Assists</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {match.team1.players.map((player, index) => (
                  <TableRow key={index}>
                    <TableCell>{player.name}</TableCell>
                    <TableCell>{player.agent}</TableCell>
                    <TableCell>{player.kills}</TableCell>
                    <TableCell>{player.deaths}</TableCell>
                    <TableCell>{player.assists}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{match.team2.name} - Player Stats</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Player</TableHead>
                  <TableHead>Agent</TableHead>
                  <TableHead>Kills</TableHead>
                  <TableHead>Deaths</TableHead>
                  <TableHead>Assists</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {match.team2.players.map((player, index) => (
                  <TableRow key={index}>
                    <TableCell>{player.name}</TableCell>
                    <TableCell>{player.agent}</TableCell>
                    <TableCell>{player.kills}</TableCell>
                    <TableCell>{player.deaths}</TableCell>
                    <TableCell>{player.assists}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default MatchDetailPage