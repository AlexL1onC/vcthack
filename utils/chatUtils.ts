// utils/chatUtils.ts

// To ensure correct absolute URL is used
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

export async function fetchChatHistory() {
  // Dynamically constructing the full URL
  const res = await fetch(`${API_URL}/api/chat`, {
    method: "GET",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch chat history");
  }

  return res.json();
}

export async function sendMessageToBackend(text: string) {
  // Dynamically constructing the full URL
  const res = await fetch(`${API_URL}/api/chat`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text }),
  });

  if (!res.ok) {
    throw new Error("Failed to send message");
  }

  return res.json();
}
