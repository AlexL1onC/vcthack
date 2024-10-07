
import { NextPage } from "next";
import { getSession, withPageAuthRequired } from "@auth0/nextjs-auth0";
import React from 'react'
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { CalendarIcon } from "lucide-react"
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
import {Table, TableBody, TableCell,TableHead,TableHeader,TableRow,} from "@/components/ui/table"
import Sidebar from "@/components/Sidebar";

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


const AuthProtected: NextPage = withPageAuthRequired(
    async () => {
        const session = await getSession();
        const user: any = session?.user;
        return (
            <div className="flex">
                
                <div className="flex flex-col w-full p-8">
                    <Card>
                        <CardHeader>
                            <CardTitle>Player Stats</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableHeader>Stat</TableHeader>
                                        <TableHeader>Value</TableHeader>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {playerStats.map((stat, index) => (
                                        <TableRow key={index}>
                                            <TableCell>{stat.name}</TableCell>
                                            <TableCell>{stat.value}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Recent Matches</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableHeader>Map</TableHeader>
                                        <TableHeader>Result</TableHeader>
                                        <TableHeader>Score</TableHeader>
                                        <TableHeader>KDA</TableHeader>
                                    </TableRow>
                                </TableHead>
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
                </div>
            </div>
        )
    },
    { returnTo: "/auth-protected" }
 
);

export default AuthProtected