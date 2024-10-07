"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface NewsItem {
  title: string
  description: string
  date: string
  author: string
  url_path: string
}

export function LatestNews({ initialNews }: { initialNews: NewsItem[] }) {
  const [news, setNews] = useState<NewsItem[]>(initialNews)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Latest News</CardTitle>
        <div className="flex items-center space-x-2">
          <h2>Powered by vlr.gg</h2>
          <img src="https://www.vlr.gg/img/vlr/logo_header.png" alt="vlr.gg logo" className="h-6 w-6" />
        </div>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px]">
          <ul className="space-y-4">
            {news.map((item, index) => (
              <li key={index} className="border-b pb-4 last:border-b-0">
                <div className="flex justify-between items-baseline mb-1">
                  <Link href={item.url_path} target="_blank" rel="noopener noreferrer" className="font-semibold hover:underline">
                    {item.title}
                  </Link>
                  <span className="text-sm text-muted-foreground">{item.date}</span>
                </div>
                <p className="text-sm text-muted-foreground">{item.description || "No description available."}</p>
                <div className="mt-2 text-xs text-muted-foreground">
                  Author: {item.author}
                </div>
              </li>
            ))}
          </ul>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}