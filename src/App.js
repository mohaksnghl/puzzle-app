import React from "react";
import { Routes, Route } from "react-router-dom";

import MainScreen from "./screens/MainScreen";
import GameScreen from "./screens/GameScreen";
import LeaderBoardScreen from "./screens/LeaderBoardScreen";
import GameRulesScreen from "./screens/GameRulesScreen";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<MainScreen />} />
        <Route path="/game" element={<GameScreen />} />
        <Route path="/leaderboard" element={<LeaderBoardScreen />} />
        <Route path="/how-to-play" element={<GameRulesScreen />} />
      </Routes>
    </div>
  );
}

export default App;
