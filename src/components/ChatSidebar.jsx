import React from "react";

const ChatSidebar = ({ history, onNewChat, onSelectChat }) => {
  return (
    <div className="bg-gray-100 dark:bg-gray-800 p-4 space-y-4 mt-4 h-100">
      <button
        onClick={onNewChat}
        className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
      >
        + New Chat
      </button>
      <div>
        <h3 className="text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">History</h3>
        <ul className="space-y-2">
          {history.map((chat, idx) => (
            <li key={idx}>
              <button
                onClick={() => onSelectChat(idx)}
                className="text-left w-full text-sm text-gray-800 dark:text-gray-200 hover:underline"
              >
                {chat.title}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ChatSidebar;