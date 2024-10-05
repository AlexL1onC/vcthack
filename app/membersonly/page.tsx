'use client'

import { useState } from "react"
import { useRouter } from 'next/navigation'
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { CalendarIcon, LayoutDashboard, Users, Swords, Map, Settings, LogOut } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const playerStats = [
  { name: "K/D Ratio", value: 1.5 },
  { name: "Headshot %", value: 38 },
  { name: "Win Rate", value: 55 },
  { name: "Avg. Score", value: 230 },
]

const recentMatches = [
  { map: "Ascent", result: "Win", score: "13-7", kda: "18/12/6" },
  { map: "Bind", result: "Loss", score: "10-13", kda: "14/15/3" },
  { map: "Haven", result: "Win", score: "13-11", kda: "22/16/8" },
  { map: "Split", result: "Win", score: "13-9", kda: "17/11/5" },
]

const ValorantCoachDashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard")
  const router = useRouter()

  const handleTabChange = (tab: string) => {
    if (tab === "dashboard") {
      setActiveTab(tab)
    } else {
      router.push(`/${tab}`)
    }
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
            variant="secondary"
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
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">Team</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Select Team</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Team Alpha</DropdownMenuItem>
              <DropdownMenuItem>Team Beta</DropdownMenuItem>
              <DropdownMenuItem>Team Gamma</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {playerStats.map((stat, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.name}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7 mt-4">
          <Card className="col-span-4">
            <CardHeader>
              <CardTitle>Recent Matches</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Map</TableHead>
                    <TableHead>Result</TableHead>
                    <TableHead>Score</TableHead>
                    <TableHead>KDA</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentMatches.map((match, index) => (
                    <TableRow key={index}>
                      <TableCell>{match.map}</TableCell>
                      <TableCell>{match.result}</TableCell>
                      <TableCell>{match.score}</TableCell>
                      <TableCell>{match.kda}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          <Card className="col-span-3">
            <CardHeader>
              <CardTitle>Agent Pick Rate</CardTitle>
              <CardDescription>Top 5 agents in recent matches</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={240}>
                <BarChart data={[
                  { agent: "Jett", pickRate: 68 },
                  { agent: "Reyna", pickRate: 62 },
                  { agent: "Sage", pickRate: 55 },
                  { agent: "Omen", pickRate: 48 },
                  { agent: "Sova", pickRate: 45 },
                ]}>
                  <XAxis dataKey="agent" />
                  <YAxis />
                  <Bar dataKey="pickRate" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <Card className="mt-4">
          <CardHeader>
            <CardTitle>Strategy Board</CardTitle>
            <CardDescription>Plan your next move</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex space-x-4">
              <Input placeholder="Strategy Name" className="w-1/3" />
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    Select Map
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>Ascent</DropdownMenuItem>
                  <DropdownMenuItem>Bind</DropdownMenuItem>
                  <DropdownMenuItem>Haven</DropdownMenuItem>
                  <DropdownMenuItem>Split</DropdownMenuItem>
                  <DropdownMenuItem>Icebox</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Button>Save Strategy</Button>
            </div>
            <div className="mt-4 h-64 bg-gray-200 rounded-md flex items-center justify-center">
              <span className="text-gray-500">Map Placeholder</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default ValorantCoachDashboard