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

// Simulación de datos del servidor
const teams = ["Team A", "Team B", "Team C", "Team D"]
const tournaments = ["Tournament 1", "Tournament 2", "Tournament 3"]
const matches = [
  { id: 1, team1: "Team A", team2: "Team B", tournament: "Tournament 1", status: "Upcoming" },
  { id: 2, team1: "Team C", team2: "Team D", tournament: "Tournament 2", status: "Finished" },
  { id: 3, team1: "Team A", team2: "Team C", tournament: "Tournament 3", status: "Upcoming" },
  { id: 4, team1: "Team B", team2: "Team D", tournament: "Tournament 1", status: "Finished" },
]

export default function MatchFinder() {
  return (
    <div className="space-y-4">
      <div className="flex space-x-2">
        <Input
          type="search"
          placeholder="Buscar partidas..."
          className="w-full"
          name="searchQuery"
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
            <form className="grid gap-4 py-4">
              <Select name="team1">
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Seleccionar equipo 1" />
                </SelectTrigger>
                <SelectContent>
                  {teams.map((team) => (
                    <SelectItem key={team} value={team}>
                      {team}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select name="team2">
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Seleccionar equipo 2" />
                </SelectTrigger>
                <SelectContent>
                  {teams.map((team) => (
                    <SelectItem key={team} value={team}>
                      {team}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select name="tournament">
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Seleccionar torneo" />
                </SelectTrigger>
                <SelectContent>
                  {tournaments.map((tournament) => (
                    <SelectItem key={tournament} value={tournament}>
                      {tournament}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select name="matchStatus">
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Estado de la partida" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="finished">Terminados</SelectItem>
                  <SelectItem value="upcoming">Próximos</SelectItem>
                </SelectContent>
              </Select>
              <Button type="submit">Aplicar filtros</Button>
            </form>
          </SheetContent>
        </Sheet>
      </div>
      <div className="space-y-2">
        {matches.map((match) => (
          <Card key={match.id}>
            <CardContent className="p-4">
              <h3 className="text-lg font-semibold">
                {match.team1} vs {match.team2}
              </h3>
              <p className="text-sm text-muted-foreground">{match.tournament}</p>
              <p className="text-sm text-muted-foreground">{match.status}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}