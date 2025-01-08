import React, { useState } from "react";
import { Typography, Box } from "@mui/material";
import { MOCK_WORD_PAIR } from "./constants";
import { v4 as uuidv4 } from "uuid";

import {
  MainContainer,
  HowToPlayContainer,
  InstructionIcon,
  InstructionItem,
  LogoContainer,
  LogoImage,
} from "./StyledComponents";

import logo from "./assets/logo-image.png"; // Path to your PNG

import GameScreen from "./GameScreen";
import { startGame } from "./api/GameSessionAPI";

const MainScreen = () => {
  const [name, setName] = useState("");
  const [userId, setUserId] = useState("");
  const [gameStarted, setGameStarted] = useState(false);
  const [hint1, setHint1] = useState("");
  const [hint2, setHint2] = useState("");
  const [word1, setWord1] = useState("");
  const [word2, setWord2] = useState("");

  const refreshWords = () => {
    const randomPair =
      MOCK_WORD_PAIR[Math.floor(Math.random() * MOCK_WORD_PAIR.length)];
    setHint1(randomPair.hint1);
    setWord1(randomPair.word1);
    setHint2(randomPair.hint2);
    setWord2(randomPair.word2);
  };

  const handleStartGame = async () => {
    const userId = uuidv4();
    setUserId(userId);
    await startGame(name, userId);
    refreshWords();
    setGameStarted(true);
  };

  return gameStarted ? (
    <GameScreen
      userId={userId}
      name={name}
      hint1={hint1}
      hint2={hint2}
      word1={word1}
      word2={word2}
      refreshWords={refreshWords}
    />
  ) : (
    <MainContainer>
      <LogoContainer>
        <LogoImage src={logo} alt="Two Words Game Logo" />
      </LogoContainer>

      <Box
        component="input"
        placeholder="Enter your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{
          marginBottom: "1.5rem",
          padding: "10px",
          width: "80%",
          maxWidth: "400px",
          fontSize: "1.2rem",
          border: "2px solid #5f6672",
          borderRadius: "5px",
          backgroundColor: "#eaeaea",
          color: "#2b2f3a",
        }}
      />
      <Box
        component="button"
        onClick={handleStartGame}
        disabled={!name.trim()} // Disable if the name is empty
        style={{
          padding: "15px 30px",
          fontSize: "1.2rem",
          fontWeight: "bold",
          textTransform: "none",
          backgroundColor: name.trim() ? "#61dafb" : "#b0bec5", // Change color when disabled
          color: "#2b2f3a",
          borderRadius: "30px",
          border: "none",
          cursor: name.trim() ? "pointer" : "not-allowed", // Change cursor when disabled
          boxShadow: name.trim()
            ? "0 4px 10px rgba(97, 218, 251, 0.4)"
            : "none", // Remove shadow when disabled
        }}
      >
        Start Game
      </Box>
      <HowToPlayContainer>
        <Typography
          variant="h6"
          style={{ marginBottom: "20px", color: "#333", fontWeight: "bold" }}
        >
          How to Play
        </Typography>

        <InstructionItem>
          <InstructionIcon>1</InstructionIcon>
          <Typography>
            You will be given two <strong>hints</strong>, each corresponding to
            a word.
          </Typography>
        </InstructionItem>

        <InstructionItem>
          <InstructionIcon>2</InstructionIcon>
          <Typography>
            The two words are related and differ by just{" "}
            <strong>one letter</strong>.
          </Typography>
        </InstructionItem>

        <InstructionItem>
          <InstructionIcon>3</InstructionIcon>
          <Typography>
            Fill in the letters for each word in the{" "}
            <strong>letter boxes</strong>.
          </Typography>
        </InstructionItem>

        <InstructionItem>
          <InstructionIcon>4</InstructionIcon>
          <Typography>
            Completing both words correctly will{" "}
            <strong>increase your score</strong> and add bonus time.
          </Typography>
        </InstructionItem>
      </HowToPlayContainer>
    </MainContainer>
  );
};

export default MainScreen;
