'use client'

import { useState } from "react"
import { useRouter } from 'next/navigation'
import { LayoutDashboard, Users, Swords, Map, Settings, LogOut, Moon, Sun, Globe, Shield, HelpCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState("settings")
  const router = useRouter()

  const handleTabChange = (tab: string) => {
    if (tab === "settings") {
      setActiveTab(tab)
    } else {
      router.push(tab === "dashboard" ? '/' : `/${tab}`)
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
            variant="ghost"
            className="w-full justify-start"
            onClick={() => handleTabChange("strategies")}
          >
            <Map className="mr-2 h-4 w-4" />
            Strategies
          </Button>
          <Button
            variant="secondary"
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
          <h1 className="text-3xl font-bold">Settings</h1>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Theme Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="dark-mode">Dark Mode</Label>
                <Switch id="dark-mode" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Language Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="es">Español</SelectItem>
                  <SelectItem value="fr">Français</SelectItem>
                </SelectContent>
              </Select>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Privacy Policy</CardTitle>
            </CardHeader>
            <CardContent>
              <p>View our privacy policy <a href="#" className="text-blue-500 hover:underline">here</a>.</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Help & Support</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Need help? Contact our support team <a href="#" className="text-blue-500 hover:underline">here</a>.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default SettingsPage