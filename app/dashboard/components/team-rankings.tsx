"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { fetchRankings } from "../actions"

interface TeamRanking {
  rank: string
  team: string
  country: string
  last_played: string
  last_played_team: string
  last_played_team_logo: string
  record: string
  earnings: string
  logo: string
}

export function TeamRankings({ initialRankings, regions }: { initialRankings: TeamRanking[], regions: Record<string, string> }) {
  const [rankings, setRankings] = useState<TeamRanking[]>(initialRankings)
  const [isLoading, setIsLoading] = useState(false)

  const handleRegionChange = async (region: string) => {
    setIsLoading(true)
    try {
      const newRankings = await fetchRankings(region)
      setRankings(newRankings)
    } catch (error) {
      console.error("Failed to fetch rankings:", error)
    }
    setIsLoading(false)
  }

  return (
    <>
      <div className="mb-4">
        <h3 className="text-sm font-medium mb-2">Select Region:</h3>
        <div className="flex flex-wrap gap-2">
          {Object.entries(regions).map(([key, value]) => (
            <Button
              key={key}
              variant="outline"
              size="sm"
              onClick={() => handleRegionChange(key)}
              disabled={isLoading}
            >
              {value}
            </Button>
          ))}
        </div>
      </div>
      <ScrollArea className="h-[calc(100vh-16rem)]">
        {isLoading ? (
          <div className="text-center py-4">
            <p>Loading...</p>
          </div>
        ) : rankings.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Rank</TableHead>
                <TableHead>Team</TableHead>
                <TableHead>Record</TableHead>
                <TableHead>Earnings</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rankings.map((team) => (
                <TableRow key={team.rank}>
                  <TableCell>{team.rank}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Image
                        src={team.logo.startsWith("//") ? `https:${team.logo}` : team.logo}
                        alt={`${team.team} logo`}
                        width={24}
                        height={24}
                        className="rounded-full"
                      />
                      <span>{team.team}</span>
                    </div>
                  </TableCell>
                  <TableCell>{team.record}</TableCell>
                  <TableCell>{team.earnings}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className="text-center py-4">
            <p>No rankings available for this region.</p>
          </div>
        )}
      </ScrollArea>
    </>
  )
}