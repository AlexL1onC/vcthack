import { getSession } from "@auth0/nextjs-auth0";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { MoreVertical, Plus } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

async function fetchChatHistory(userId: string) {
  return [
    { id: 1, text: "Hello!", isUser: true, time: new Date().toISOString() },
    { id: 2, text: "Hi there! How can I assist you today?", isUser: false, time: new Date().toISOString() },
  ];
}

async function fetchConversationHistory(userId: string) {
  return [
    { id: 1, title: "Retake B TH - FNC", lastMessage: "Thanks for your help!", time: new Date().toISOString() },
    { id: 2, title: "Line-ups Sova", lastMessage: "I understand now, thank you!", time: new Date().toISOString() },
    { id: 3, title: "Late rotation and spot...", lastMessage: "That fixed it, thanks!", time: new Date().toISOString() },
  ];
}

export default async function KilljoyLLM() {
  const session = await getSession(cookies());

  if (!session) {
    redirect("/api/auth/login");
  }

  const user = session.user;
  const chatHistory = await fetchChatHistory(user.sub);
  const conversationHistory = await fetchConversationHistory(user.sub);

  async function sendMessage(formData: FormData) {
    'use server'
    const message = formData.get('message') as string;
    if (message) {
      console.log(`New message: ${message}`);
      redirect('/killjoy');
    }
  }

  return (
    <div className="flex h-[calc(85vh)] max-w-8xl mx-auto bg-background text-foreground">
      <div className="w-60 p-4 border-r border-border bg-muted overflow-y-auto rounded-md ">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Conversations</h2>
          <Button size="sm" variant="outline" className="h-8 w-8 p-0">
            <Plus className="h-4 w-4" />
            <span className="sr-only">New Chat</span>
          </Button>
        </div>
        <div className="space-y-2">
          {conversationHistory.map((conversation) => (
            <div key={conversation.id} className="group relative flex items-center justify-between p-2 rounded-lg hover:bg-secondary hover:shadow-sm transition-all duration-200 cursor-pointer">
              <div className="flex-1 mr-2">
                <span className="font-medium truncate block text-sm">{conversation.title}</span>
                <span className="text-xs text-muted-foreground truncate block">{conversation.lastMessage}</span>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="p-0 h-6 w-6 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 absolute right-1 top-1/2 transform -translate-y-1/2">
                    <MoreVertical className="h-3 w-3" />
                    <span className="sr-only">Open menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <form action="/api/rename-conversation" method="POST">
                      <input type="hidden" name="conversationId" value={conversation.id} />
                      <button className="w-full text-left">Rename</button>
                    </form>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <form action="/api/delete-conversation" method="POST">
                      <input type="hidden" name="conversationId" value={conversation.id} />
                      <button className="w-full text-left">Delete</button>
                    </form>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ))}
        </div>
      </div>

      <div className="flex-1 flex flex-col justify-between p-4">
        <div className="flex flex-col space-y-4 overflow-y-auto mb-4">
          {chatHistory.map((msg) => (
            <div key={msg.id} className={`flex items-start space-x-2 ${msg.isUser ? 'justify-end' : ''}`}>
              <Avatar className="w-8 h-8">
                <AvatarImage 
                  src={msg.isUser ? user.picture : "https://i.pinimg.com/736x/db/58/b8/db58b8a6b42a39c1f38c2520d21562b9.jpg"} 
                  alt={msg.isUser ? user.name : "AI"}
                />
                <AvatarFallback>{msg.isUser ? user.name?.charAt(0) : "AI"}</AvatarFallback>
              </Avatar>
              <div>
                <div className={`p-2 rounded-lg text-sm ${msg.isUser ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground'}`}>
                  <p>{msg.text}</p>
                </div>
                <span className="text-xs text-muted-foreground">
                  {new Date(msg.time).toLocaleString()}
                </span>
              </div>
            </div>
          ))}
        </div>

        <form action={sendMessage} className="flex items-center space-x-2">
          <Input
            className="flex-1 bg-background text-foreground"
            placeholder="Type your message..."
            name="message"
            required
          />
          <Button type="submit" size="sm">Send</Button>
        </form>
      </div>
    </div>
  );
}