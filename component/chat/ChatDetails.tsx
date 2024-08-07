import React, { useState, FC } from "react";

const ChatDetails: FC = () => {
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState<string>("");

  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, input]);
      setInput("");
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-green-500 text-white p-4">
        <h1 className="text-xl font-bold">Chat with John Doe</h1>
      </header>

      {/* Messages */}
      <main className="flex-1 overflow-y-auto p-4">
        <div className="space-y-4">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`p-3 rounded-lg ${
                idx % 2 === 0 ? "bg-gray-200" : "bg-green-200"
              } text-gray-900`}
            >
              {msg}
            </div>
          ))}
        </div>
      </main>

      {/* Input Area */}
      <footer className="p-4 bg-white border-t border-gray-300">
        <div className="flex items-center">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message"
            className="flex-1 border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <button
            onClick={handleSend}
            className="ml-2 bg-green-500 text-white rounded-lg px-4 py-2 hover:bg-green-600"
          >
            Send
          </button>
        </div>
      </footer>
    </div>
  );
};

export default ChatDetails;
