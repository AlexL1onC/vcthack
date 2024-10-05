'use client'

import { useState } from "react"
import { useRouter } from 'next/navigation'
import { LayoutDashboard, Users, Swords, Map, Settings, LogOut, Search, Filter, Star } from "lucide-react"

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
import { Badge } from "@/components/ui/badge"

const players = [
  { id: 1, name: "TenZ", role: "Duelist", team: "Sentinels", kd: 1.5, hs: 28, winRate: 65 },
  { id: 2, name: "ShahZaM", role: "Initiator", team: "Sentinels", kd: 1.2, hs: 25, winRate: 60 },
  { id: 3, name: "ScreaM", role: "Duelist", team: "Team Liquid", kd: 1.4, hs: 30, winRate: 62 },
  { id: 4, name: "nAts", role: "Controller", team: "Gambit Esports", kd: 1.3, hs: 22, winRate: 68 },
  { id: 5, name: "Boaster", role: "Initiator", team: "Fnatic", kd: 1.1, hs: 20, winRate: 70 },
  { id: 6, name: "Derke", role: "Duelist", team: "Fnatic", kd: 1.3, hs: 27, winRate: 67 },
  { id: 7, name: "Jamppi", role: "Sentinel", team: "Team Liquid", kd: 1.2, hs: 23, winRate: 63 },
  { id: 8, name: "cNed", role: "Duelist", team: "Acend", kd: 1.4, hs: 29, winRate: 66 },
]

const PlayersPage = () => {
  const [activeTab, setActiveTab] = useState("players")
  const router = useRouter()
  const [selectedRole, setSelectedRole] = useState("All")

  const handleTabChange = (tab: string) => {
    if (tab === "players") {
      setActiveTab(tab)
    } else {
      router.push(tab === "dashboard" ? '/' : `/${tab}`)
    }
  }

  const filteredPlayers = selectedRole === "All" 
    ? players 
    : players.filter(player => player.role === selectedRole)

  const topPlayers = [...players].sort((a, b) => b.kd - a.kd).slice(0, 3)

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
            variant="secondary"
            className="w-full justify-start"
            onClick={() => handleTabChange("players")}
          >
            <Users className="mr-2 h-4 w-4" />
            Players
          </Button>
          <Button
            variant="ghost"
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
          <h1 className="text-3xl font-bold">Players</h1>
        </div>

        {/* Filter */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Filter Players</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
              <div className="flex-1">
                <Input placeholder="Search players..." />
              </div>
              <div className="flex-1">
                <Select value={selectedRole} onValueChange={setSelectedRole}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All">All Roles</SelectItem>
                    <SelectItem value="Duelist">Duelist</SelectItem>
                    <SelectItem value="Initiator">Initiator</SelectItem>
                    <SelectItem value="Controller">Controller</SelectItem>
                    <SelectItem value="Sentinel">Sentinel</SelectItem>
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

        {/* Top Players */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Top Players</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {topPlayers.map((player) => (
                <Card key={player.id} className="cursor-pointer hover:shadow-lg transition-shadow duration-200" onClick={() => router.push(`/players/${player.id}`)}>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Star className="h-5 w-5 text-yellow-400 mr-2" />
                      {player.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p><strong>Team:</strong> {player.team}</p>
                    <p><strong>Role:</strong> {player.role}</p>
                    <p><strong>K/D Ratio:</strong> {player.kd}</p>
                    <p><strong>Headshot %:</strong> {player.hs}%</p>
                    <p><strong>Win Rate:</strong> {player.winRate}%</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* All Players */}
        <Card>
          <CardHeader>
            <CardTitle>All Players</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Team</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>K/D Ratio</TableHead>
                  <TableHead>Headshot %</TableHead>
                  <TableHead>Win Rate</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPlayers.map((player) => (
                  <TableRow key={player.id} className="cursor-pointer hover:bg-gray-100" onClick={() => router.push(`/players/${player.id}`)}>
                    <TableCell>{player.name}</TableCell>
                    <TableCell>{player.team}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{player.role}</Badge>
                    </TableCell>
                    <TableCell>{player.kd}</TableCell>
                    <TableCell>{player.hs}%</TableCell>
                    <TableCell>{player.winRate}%</TableCell>
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

export default PlayersPage