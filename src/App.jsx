import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Chat from "./pages/Chat";
import SidebarNav from "./components/SidebarNav";
import { useEffect, useState } from "react";
import Sentiment from "./pages/Sentiment";
import MainLayout from "./layouts/MainLayout";

export default function App() {

  return (
    <Router>
      <div className="flex h-screen">
        <SidebarNav />
        <div className="flex-1">
          <Routes>
            <Route element={<MainLayout/>}>
              <Route path="/" element={<Chat />} />
              <Route path="/sentiment" element={<Sentiment />} />
            </Route>
          </Routes>
        </div>
      </div>
    </Router>
  );
}
