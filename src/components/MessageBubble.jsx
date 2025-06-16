import React from "react";
import { ClipboardCopy, Pencil } from "lucide-react";
import { useState } from "react";

export default function MessageBubble({ sender, text, onEdit }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1000);
  };

  return (
    <div className={`flex ${sender === "user" ? "justify-end" : "justify-start"}`}>
      <div className={`relative p-3 max-w-lg rounded ${sender === "user" ? "bg-blue-600 text-white" : "bg-gray-200 dark:bg-gray-700 dark:text-white"}`}>
        {/* <p>{text}</p> */}
        <p dangerouslySetInnerHTML={{ __html: text.replace(/\n/g, '<br />') }}></p>
        <div className="absolute top-1 right-1 flex gap-2">
          <button onClick={handleCopy}><ClipboardCopy className="w-4 h-4" /></button>
          <button onClick={onEdit}><Pencil className="w-4 h-4" /></button>
        </div>
      </div>
    </div>
  );
}