import React, { useState } from "react";
import { Typography, Box } from "@mui/material";
import { MOCK_WORD_PAIR, GOOGLE_LOGO } from "./constants";
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
import { signInWithGoogle, logout } from "./api/firebase";

const MainScreen = () => {
  const [user, setUser] = useState(null);
  const [userId, setUserId] = useState("");
  const [name, setName] = useState("");
  const [gameStarted, setGameStarted] = useState(false);
  const [hint1, setHint1] = useState("");
  const [hint2, setHint2] = useState("");
  const [word1, setWord1] = useState("");
  const [word2, setWord2] = useState("");

  const handleGoogleLogin = async () => {
    try {
      const loggedInUser = await signInWithGoogle();
      setUser(loggedInUser);
      setName(loggedInUser.displayName);
      console.log("Logged in user:", loggedInUser);
    } catch (error) {
      console.error("Google login failed:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      setUser(null);
      setName("");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const refreshWords = () => {
    const randomPair =
      MOCK_WORD_PAIR[Math.floor(Math.random() * MOCK_WORD_PAIR.length)];
    setHint1(randomPair.hint1);
    setWord1(randomPair.word1);
    setHint2(randomPair.hint2);
    setWord2(randomPair.word2);
  };

  const handleStartGame = async () => {
    const userId = user ? user.uid : "Guest_" + uuidv4();
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

      <Box>
        <Box
          component="button"
          onClick={user ? handleLogout : handleGoogleLogin}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "12px 20px",
            fontSize: "1rem",
            fontWeight: "bold",
            color: "#2b2f3a",
            backgroundColor: user ? "#e0f7fa" : "#fff",
            borderRadius: "30px",
            border: "2px solid #61dafb",
            cursor: "pointer",
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
            textTransform: "none",
            margin: "20px auto",
            width: "fit-content",
          }}
        >
          {user ? (
            <>
              <Box
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <img
                  src={GOOGLE_LOGO}
                  alt="Profile"
                  style={{
                    width: "24px",
                    height: "24px",
                    marginRight: "10px",
                    borderRadius: "50%",
                    objectFit: "cover",
                  }}
                />
                <span
                  style={{
                    whiteSpace: "nowrap",
                  }}
                >
                  Logged in as {user.displayName}
                </span>
              </Box>
              <Box
                style={{
                  marginTop: "4px", // Minimal gap between main text and subtext
                  fontSize: "0.8rem", // Smaller font for subtext
                  color: "#757575", // Subtle text color for subtext
                }}
              >
                Click to Logout
              </Box>
            </>
          ) : (
            <>
              <Box
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <img
                  src={GOOGLE_LOGO}
                  alt="Google Logo"
                  style={{
                    width: "20px",
                    height: "20px",
                    marginRight: "10px",
                  }}
                />
                <span>Login with Google</span>
              </Box>
            </>
          )}
        </Box>

        {!user && (
          <Box
            component="input"
            placeholder="Enter your name to play as Guest"
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
        )}

        <Box
          component="button"
          onClick={handleStartGame}
          disabled={!name.trim()}
          style={{
            padding: "15px 30px",
            fontSize: "1.2rem",
            fontWeight: "bold",
            textTransform: "none",
            backgroundColor: name.trim() ? "#61dafb" : "#b0bec5",
            color: "#2b2f3a",
            borderRadius: "30px",
            border: "none",
            cursor: name.trim() ? "pointer" : "not-allowed",
            boxShadow: name.trim()
              ? "0 4px 10px rgba(97, 218, 251, 0.4)"
              : "none",
          }}
        >
          {user ? "Start Game" : "Play as Guest"}
        </Box>
      </Box>
    </MainContainer>
  );
};

export default MainScreen;
