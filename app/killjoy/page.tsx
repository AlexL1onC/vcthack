// app/killjoy/page.tsx

import { getSession, withPageAuthRequired } from "@auth0/nextjs-auth0";
import { Button } from "@/components/ui/button"; // Using ShadCN button
import { Input } from "@/components/ui/input";  // Using ShadCN input
import { redirect } from "next/navigation";  // For handling redirects
import { cookies } from "next/headers"; // To manage authentication cookies
import { fetchChatHistory, sendMessageToBackend } from "@/utils/chatUtils"; // Importing chat utility functions

export default async function KilljoyLLM() {
  // Server-side logic to fetch user session
  const session = await getSession(cookies());

  if (!session) {
    return redirect("/api/auth/login");
  }

  const user = session?.user;

  // Fetch the initial chat history from the backend API
  const chatHistory = await fetchChatHistory();

  return (
    <div className="min-h-screen bg-black text-white flex flex-col justify-between p-6">
      <div className="flex flex-col space-y-4 overflow-y-auto mb-4">
        {chatHistory.map((msg, idx) => (
          <div key={idx} className="flex items-start space-x-4">
            <img
              src={msg.user?.picture || "/default-avatar.png"}
              alt={msg.user?.name}
              className="w-10 h-10 rounded-full"
            />
            <div>
              <div className="bg-red-600 text-white p-3 rounded-lg">
                <p>{msg.text}</p>
              </div>
              <span className="text-xs text-gray-400">{msg.time}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center space-x-4">
        <Input
          className="flex-1 bg-white text-black p-3 rounded-lg"
          placeholder="Type your message..."
        />
        <Button className="bg-red-600 text-white px-4 py-2 rounded-lg">
          Send
        </Button>
      </div>
    </div>
  );
}
