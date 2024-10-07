import { NextResponse } from 'next/server'
import { getSession } from "@auth0/nextjs-auth0";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  const session = await getSession(cookies());
  
  if (!session) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }

  const formData = await request.formData();
  const message = formData.get('message') as string;

  if (!message) {
    return NextResponse.json({ error: 'Message is required' }, { status: 400 });
  }

  const newMessage = {
    text: message,
    user: session.user,
    time: new Date().toISOString()
  };

  await sendMessageToBackend(newMessage);

  return NextResponse.redirect('/killjoy');
}