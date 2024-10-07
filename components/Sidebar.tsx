import Link from 'next/link'
import { LayoutDashboard, Users, Swords, Map, Settings, LogOut, Brain } from "lucide-react"
import { Button } from "@/components/ui/button"

interface SidebarProps {
  activeTab: string;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab }) => {
  return (
    <div className="w-64 bg-white shadow-md flex flex-col h-screen">
      <div className="p-4">
        <h2 className="text-2xl font-bold text-primary">Valorant Coach</h2>
      </div>
      <nav className="mt-4 flex-grow">
        <Link href="/membersonly/">
          <Button
            variant={activeTab === "dashboard" ? "secondary" : "ghost"}
            className="w-full justify-start"
          >
            <LayoutDashboard className="mr-2 h-4 w-4" />
            Dashboard
          </Button>
        </Link>
        <Link href="/players">
          <Button
            variant={activeTab === "players" ? "secondary" : "ghost"}
            className="w-full justify-start"
          >
            <Users className="mr-2 h-4 w-4" />
            Players
          </Button>
        </Link>
        <Link href="/matches">
          <Button
            variant={activeTab === "matches" ? "secondary" : "ghost"}
            className="w-full justify-start"
          >
            <Swords className="mr-2 h-4 w-4" />
            Matches
          </Button>
        </Link>
        <Link href="/strategies">
          <Button
            variant={activeTab === "strategies" ? "secondary" : "ghost"}
            className="w-full justify-start"
          >
            <Map className="mr-2 h-4 w-4" />
            Strategies
          </Button>
        </Link>
        <Link href="/llm">
          <Button
            variant={activeTab === "llm" ? "secondary" : "ghost"}
            className="w-full justify-start"
          >
            <Brain className="mr-2 h-4 w-4" />
            LLM
          </Button>
        </Link>
        <Link href="/settings">
          <Button
            variant={activeTab === "settings" ? "secondary" : "ghost"}
            className="w-full justify-start"
          >
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </Button>
        </Link>
      </nav>

      <div className="p-4">
        <Link href="/api/auth/logout">
          <Button variant="ghost" className="w-full justify-start">
            <LogOut className="mr-2 h-4 w-4" />
            Log Out
          </Button>
        </Link>
      </div>
    </div>
  )
}

export default Sidebar
