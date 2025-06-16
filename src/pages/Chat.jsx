import React from "react";
import { useEffect, useRef,useState } from "react";
// import { useState } from "react";
import MessageBubble from "../components/MessageBubble";
import axios from "axios";


export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const chatContainerRef = useRef(null);

  useEffect(() => {
    const container = chatContainerRef.current;
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  }, [messages]);
  const sendMessage = async () => {
    if (!input.trim()) return;
    const updatedMessages = [...messages, { role: "user", content: input }];
    setMessages(updatedMessages);
    setInput("");

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/genai`,
        { messages: updatedMessages }
      );
      console.log(res, "checking response");
      // setMessages((prev) => [
      //   ...prev,
      //   { sender: "assistant", text: res.data[0]?.text || "No response." },
      // ]);
       setMessages([...updatedMessages, { role: "assistant", content: res.data[0]?.text || "No response." }]);
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
      <div ref={chatContainerRef} className="overflow-y-auto h-[500px] px-4 py-2">
        {messages.map((msg, i) => (
          <MessageBubble
            key={i}
            sender={msg.role}
            text={msg.content}
            onEdit={() => editMessage(i)}
          />
        ))}
      </div>
      <div className="p-4 border-t">
        <textarea
          rows={1}
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
