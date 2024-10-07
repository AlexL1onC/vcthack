// app/api/chat/route.ts

import { NextRequest, NextResponse } from "next/server";

// Handle fetching chat history
export async function GET() {
  const chatHistory = []; // Fetch from the database or backend service
  return NextResponse.json(chatHistory);
}

// Handle sending a new message
export async function POST(req: NextRequest) {
  const { text } = await req.json();
  
  // Logic for saving the message in a database or sending it to an external service
  
  return NextResponse.json({ status: "Message received", message: text });
}
