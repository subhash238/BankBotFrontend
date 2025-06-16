import React from "react";

import { useState } from "react";
import MessageBubble from "./MessageBubble";
import axios from "axios";

export default function ChatBox({ messages, setMessages }) {
  const [input, setInput] = useState([]);
  console.log(input," checking input state");
  const sendMessage = async () => {
    if (!input.trim()) return;
    const newMsg = { sender: "user", text: input };
    setMessages((prev) => [...prev, newMsg]);
    setInput("");

    try {
      const res = await axios.post("https://3ef1-49-205-41-220.ngrok-free.app/api/genai", {
        prompt:input,
      });
      console.log(res, "checking response");
      setMessages((prev) => [
        ...prev,
        { sender: "assistant", text: res.data[0]?.text || "No response." },
      ]);
      setInput((prev) => [...prev, { role: "assistant", content: res.data[0]?.text || "No response." }]);
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
          onChange={(e) => setInput((prev)=> [...prev, { role: "user", content: e.target.value}])}
          placeholder="Type a message..."
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
      </div>
    </div>
  );
}
