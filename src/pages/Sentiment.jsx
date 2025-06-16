import React from "react";

import { useState } from "react";
import MessageBubble from "../components/MessageBubble";
import axios from "axios";

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input.trim()) return;
    const newMsg = { sender: "user", text: input };
    setMessages((prev) => [...prev, newMsg]);
    setInput("");

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/sentiment`,
        {
          text: input,
        }
      );
      console.log(res, "checking response");
      setMessages((prev) => [
        ...prev,
        { sender: "assistant", text: res.data.Sentiment || "No response." },
      ]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        {
          sender: "assistant",
          text: "Something went wrong. Please try again.",
        },
      ]);
    }
  };

  const editMessage = (index) => {
    const newText = prompt("Edit message", messages[index].text);
    if (newText !== null) {
      const updated = [...messages];
      updated[index].text = newText;
      setMessages(updated);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-grow overflow-auto space-y-3 p-4">
        {messages.map((msg, i) => (
          <MessageBubble
            key={i}
            sender={msg.sender}
            text={msg.text}
            onEdit={() => editMessage(i)}
          />
        ))}
      </div>
      <div className="p-4 border-t">
        <textarea
          rows={3}
          className="w-full p-4 rounded dark:bg-gray-800 dark:text-white"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
      </div>
    </div>
  );
}
