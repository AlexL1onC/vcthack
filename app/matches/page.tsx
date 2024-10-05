'use client'

import { useState } from "react"
import { useRouter } from 'next/navigation'
import { LayoutDashboard, Users, Swords, Map, Settings, LogOut, Search, Filter } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const recentMatches = [
  { id: 1, date: "2023-05-15", map: "Ascent", tournament: "VCT 2023", team1: "Team Liquid", team2: "Fnatic", score: "13-11" },
  { id: 2, date: "2023-05-14", map: "Bind", tournament: "VCT 2023", team1: "Sentinels", team2: "Cloud9", score: "13-7" },
  { id: 3, date: "2023-05-13", map: "Haven", tournament: "VCT 2023", team1: "100 Thieves", team2: "TSM", score: "13-10" },
  { id: 4, date: "2023-05-12", map: "Split", tournament: "VCT 2023", team1: "G2 Esports", team2: "Team Vitality", score: "13-8" },
  { id: 5, date: "2023-05-11", map: "Icebox", tournament: "VCT 2023", team1: "Acend", team2: "Heretics", score: "13-9" },
]

const MatchesPage = () => {
  const [activeTab, setActiveTab] = useState("matches")
  const router = useRouter()

  const handleTabChange = (tab: string) => {
    if (tab === "matches") {
      setActiveTab(tab)
    } else {
      router.push(tab === "dashboard" ? '/' : `/${tab}`)
    }
  }

  const handleMatchClick = (matchId: number) => {
    router.push(`/matches/${matchId}`)
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
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Matches</h1>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Filter Matches</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
              <div className="flex-1">
                <Input placeholder="Search matches..." />
              </div>
              <div className="flex-1">
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Map" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ascent">Ascent</SelectItem>
                    <SelectItem value="bind">Bind</SelectItem>
                    <SelectItem value="haven">Haven</SelectItem>
                    <SelectItem value="split">Split</SelectItem>
                    <SelectItem value="icebox">Icebox</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex-1">
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Tournament" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="vct2023">VCT 2023</SelectItem>
                    <SelectItem value="masters">Masters</SelectItem>
                    <SelectItem value="champions">Champions</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex-1">
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Team" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="teamliquid">Team Liquid</SelectItem>
                    <SelectItem value="fnatic">Fnatic</SelectItem>
                    <SelectItem value="sentinels">Sentinels</SelectItem>
                    <SelectItem value="cloud9">Cloud9</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button className="flex-none">
                <Filter className="mr-2 h-4 w-4" />
                Apply Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Matches</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Map</TableHead>
                  <TableHead>Tournament</TableHead>
                  <TableHead>Teams</TableHead>
                  <TableHead>Score</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentMatches.map((match) => (
                  <TableRow 
                    key={match.id} 
                    className="cursor-pointer hover:bg-gray-100"
                    onClick={() => handleMatchClick(match.id)}
                  >
                    <TableCell>{match.date}</TableCell>
                    <TableCell>{match.map}</TableCell>
                    <TableCell>{match.tournament}</TableCell>
                    <TableCell>{match.team1} vs {match.team2}</TableCell>
                    <TableCell>{match.score}</TableCell>
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

export default MatchesPage