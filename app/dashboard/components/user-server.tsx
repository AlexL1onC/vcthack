import { getSession } from "@auth0/nextjs-auth0"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { fetchRankings } from "../actions"
import { TeamRankings } from "./team-rankings"
import { LatestNews } from "./latest-news"
import { fetchNews } from "../actions"

const regions = {
  "na": "North America",
  "eu": "Europe",
  "ap": "Asia-Pacific",
  "la-s": "LA-S",
  "la-n": "LA-N",
  "oce": "Oceania",
  "kr": "Korea",
  "mn": "MENA",
  "gc": "Game Changers",
  "br": "Brazil",
  "cn": "China",
  "jp": "Japan",
  "col": "Collegiate"
}

export default async function DashboardServer() {
  const session = await getSession()
  const user = session?.user

  if (!user) return null

  const initialRankings = await fetchRankings("na")
  const initialNews = await fetchNews()


  const latestGames = [
    { id: 1, map: "Ascent", result: "Win", score: "13-7", date: "2023-06-02" },
    { id: 2, map: "Haven", result: "Loss", score: "11-13", date: "2023-06-01" },
    { id: 3, map: "Split", result: "Win", score: "13-10", date: "2023-05-31" },
  ]

  const latestScrims = [
    { id: 1, opponent: "Team Alpha", result: "Win", score: "2-1", date: "2023-06-03", notes: "Strong performance on Bind and Haven. Need to work on Split strategies." },
    { id: 2, opponent: "Team Beta", result: "Loss", score: "0-2", date: "2023-06-02", notes: "Struggled with coordinating ultimates. Focus on communication in next practice." },
    { id: 3, opponent: "Team Gamma", result: "Win", score: "2-0", date: "2023-06-01", notes: "Excellent use of utility on both maps. Continue to refine agent compositions." },
    { id: 4, opponent: "Team Delta", result: "Win", score: "2-1", date: "2023-05-31", notes: "Close series. Improved mid-round adaptations were key to victory." },
  ]

  const playerRankings = [
    { id: 1, name: "Player1", rank: "Radiant", rating: 315 },
    { id: 2, name: "Player2", rank: "Immortal 3", rating: 298 },
    { id: 3, name: "Player3", rank: "Immortal 2", rating: 285 },
    { id: 4, name: "Player4", rank: "Immortal 1", rating: 272 },
    { id: 5, name: "Player5", rank: "Ascendant 3", rating: 260 },
  ]

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center space-x-4">
        <Avatar className="w-16 h-16">
          <AvatarImage src={user.picture} alt={user.name} />
          <AvatarFallback>{user.name?.charAt(0)}</AvatarFallback>
        </Avatar>
        <h1 className="text-3xl font-bold">Welcome, {user.name}!</h1>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-grow">
          {/* Latest News Card */}
          <LatestNews initialNews={initialNews} />
          {/* Latest Scrims Card */}
          <Card>
            <CardHeader>
              <CardTitle>Latest Scrims</CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[400px]">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Opponent</TableHead>
                      <TableHead>Result</TableHead>
                      <TableHead>Score</TableHead>
                      <TableHead>Notes</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {latestScrims.map((scrim) => (
                      <TableRow key={scrim.id}>
                        <TableCell>{scrim.opponent}</TableCell>
                        <TableCell>{scrim.result}</TableCell>
                        <TableCell>{scrim.score}</TableCell>
                        <TableCell className="max-w-[200px]">
                          <p className="truncate" title={scrim.notes}>
                            {scrim.notes}
                          </p>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </ScrollArea>
            </CardContent>
          </Card>

          {/* Latest Games Card */}
          <Card>
            <CardHeader>
              <CardTitle>Latest Games</CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[200px]">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Map</TableHead>
                      <TableHead>Result</TableHead>
                      <TableHead>Score</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {latestGames.map((game) => (
                      <TableRow key={game.id}>
                        <TableCell>{game.map}</TableCell>
                        <TableCell>{game.result}</TableCell>
                        <TableCell>{game.score}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </ScrollArea>
            </CardContent>
          </Card>

          {/* Player Rankings Card */}
          <Card>
            <CardHeader>
              <CardTitle>Player Rankings</CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[200px]">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Rank</TableHead>
                      <TableHead>Rating</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {playerRankings.map((player) => (
                      <TableRow key={player.id}>
                        <TableCell>{player.name}</TableCell>
                        <TableCell>{player.rank}</TableCell>
                        <TableCell>{player.rating}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>

        {/* Team Rankings Card */}
        <Card className="lg:w-1/3">
        <CardHeader>
          <CardTitle>Team Rankings</CardTitle>
          <div className="flex items-center space-x-2">
            <h2>Powered by vlr.gg</h2>
            <img src="https://www.vlr.gg/img/vlr/logo_header.png" alt="vlr.gg logo" className="h-6 w-6" />
          </div>
        </CardHeader>
        <CardContent>
          <TeamRankings initialRankings={initialRankings} regions={regions} />
        </CardContent>
      </Card>
    </div>
    </div>
  )
}
