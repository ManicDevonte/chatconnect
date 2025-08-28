import React, { useState } from "react";

type Message = {
  text: string;
  isUser: boolean;
};

interface ChatWindowProps {
  messages?: Message[];
}

export default function ChatWindow({ messages = [] }: ChatWindowProps) {
  const [input, setInput] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add your send message logic here
    setInput("");
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`max-w-[80vw] sm:max-w-md md:max-w-lg px-4 py-2 rounded-lg shadow ${
              msg.isUser
                ? "bg-blue-500 text-white self-end"
                : "bg-white text-gray-800 self-start"
            }`}
          >
            {msg.text}
          </div>
        ))}
      </div>
      <form
        className="flex p-4 bg-white border-t"
        onSubmit={handleSubmit}
      >
        <input
          className="flex-1 border rounded-l px-4 py-2 focus:outline-none w-full"
          placeholder="Type your message..."
          aria-label="Type your message"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-r"
        >
          Send
        </button>
      </form>
    </div>
  );
}