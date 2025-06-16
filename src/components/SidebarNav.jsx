import React, { useState } from "react";
import { Link } from "react-router-dom";
import ChatSidebar from "./ChatSidebar";
import logo from '../assets/img/logo.png'

export default function SidebarNav() {
  // const [messages, setMessages] = useState([]);
  // const [history, setHistory] = useState([]);
  return (
    <div className="w-64 p-4 bg-[rgb(2,4,6)] dark:bg-gray-800">
      <img className="mb-8 h-14" src={logo} alt="MLAI Logo" />
      {/* <hr className="text-white" /> */}
      <ul className="mt-4 space-y-2 text-white">
        <li>
          <Link to="/">Chat</Link>
        </li>
        <li>
          <Link to="/sentiment">Sentiment</Link>
        </li>
      </ul>
      {/* <ChatSidebar
        history={history}
        onNewChat={() => setHistory([...history, { title: "New Chat" }])}
        onSelectChat={(i) => setMessages([])}
      /> */}
    </div>
  );
}
