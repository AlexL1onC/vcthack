'use client'

import { useState } from "react"
import { useRouter } from 'next/navigation'
import { LayoutDashboard, Users, Swords, Map, Settings, LogOut, Search, Filter, Plus } from "lucide-react"

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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

const strategies = [
  { id: 1, name: "A Site Rush", map: "Ascent", type: "Attack", description: "Quick rush to A site with smokes and flashes" },
  { id: 2, name: "B Site Hold", map: "Bind", type: "Defense", description: "Strong defensive setup for B site with crossfires" },
  { id: 3, name: "Mid Control", map: "Split", type: "Attack", description: "Take control of mid area before pushing a site" },
  { id: 4, name: "Retake C", map: "Haven", type: "Defense", description: "Coordinated retake of C site after initial plant" },
  { id: 5, name: "Fake A, Hit B", map: "Icebox", type: "Attack", description: "Fake attack on A site, then quickly rotate to B" },
]

const StrategiesPage = () => {
  const [activeTab, setActiveTab] = useState("strategies")
  const router = useRouter()
  const [selectedMap, setSelectedMap] = useState("All")
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [newStrategy, setNewStrategy] = useState({ name: '', map: '', type: '', description: '' })

  const handleTabChange = (tab: string) => {
    if (tab === "strategies") {
      setActiveTab(tab)
    } else {
      router.push(tab === "dashboard" ? '/' : `/${tab}`)
    }
  }

  const filteredStrategies = selectedMap === "All" 
    ? strategies 
    : strategies.filter(strategy => strategy.map === selectedMap)

  const handleCreateStrategy = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the new strategy to your backend
    console.log("New strategy:", newStrategy)
    setIsCreateDialogOpen(false)
    setNewStrategy({ name: '', map: '', type: '', description: '' })
  }

  const handleStrategyClick = (strategyId: number) => {
    router.push(`/strategies/${strategyId}`)
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
            variant="ghost"
            className="w-full justify-start"
            onClick={() => handleTabChange("matches")}
          >
            <Swords className="mr-2 h-4 w-4" />
            Matches
          </Button>
          <Button
            variant="secondary"
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
          <h1 className="text-3xl font-bold">Strategies</h1>
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Create Strategy
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Strategy</DialogTitle>
                <DialogDescription>
                  Fill in the details for your new strategy.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleCreateStrategy} className="space-y-4">
                <div>
                  <Label htmlFor="name">Strategy Name</Label>
                  <Input 
                    id="name" 
                    value={newStrategy.name} 
                    onChange={(e) => setNewStrategy({...newStrategy, name: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="map">Map</Label>
                  <Select 
                    value={newStrategy.map} 
                    onValueChange={(value) => setNewStrategy({...newStrategy, map: value})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Map" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Ascent">Ascent</SelectItem>
                      <SelectItem value="Bind">Bind</SelectItem>
                      <SelectItem value="Haven">Haven</SelectItem>
                      <SelectItem value="Split">Split</SelectItem>
                      <SelectItem value="Icebox">Icebox</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="type">Type</Label>
                  <Select 
                    value={newStrategy.type} 
                    onValueChange={(value) => setNewStrategy({...newStrategy, type: value})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Attack">Attack</SelectItem>
                      <SelectItem value="Defense">Defense</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea 
                    id="description" 
                    value={newStrategy.description} 
                    onChange={(e) => setNewStrategy({...newStrategy, description: e.target.value})}
                    required
                  />
                </div>
                <Button type="submit">Create Strategy</Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Filter Strategies</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
              <div className="flex-1">
                <Input placeholder="Search strategies..." />
              </div>
              <div className="flex-1">
                <Select value={selectedMap} onValueChange={setSelectedMap}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Map" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All">All Maps</SelectItem>
                    <SelectItem value="Ascent">Ascent</SelectItem>
                    <SelectItem value="Bind">Bind</SelectItem>
                    <SelectItem value="Haven">Haven</SelectItem>
                    <SelectItem value="Split">Split</SelectItem>
                    <SelectItem value="Icebox">Icebox</SelectItem>
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
            <CardTitle>Strategy List</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Map</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Description</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStrategies.map((strategy) => (
                  <TableRow 
                    key={strategy.id} 
                    className="cursor-pointer hover:bg-gray-100"
                    onClick={() => handleStrategyClick(strategy.id)}
                  >
                    <TableCell>{strategy.name}</TableCell>
                    <TableCell>{strategy.map}</TableCell>
                    <TableCell>{strategy.type}</TableCell>
                    <TableCell>{strategy.description}</TableCell>
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

export default StrategiesPage