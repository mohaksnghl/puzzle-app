import React from "react";
import { Routes, Route } from "react-router-dom";

import MainScreen from "./MainScreen";
import GameScreen from "./GameScreen";

function App() {
  return (
    <div>
      {/* Define all your routes here */}
      <Routes>
        {/* Exact path to home screen */}
        <Route path="/" element={<MainScreen />} />

        {/* A route for Game Screen */}
        <Route path="/game" element={<GameScreen />} />
      </Routes>
    </div>
  );
}

export default App;
