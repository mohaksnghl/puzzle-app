import React, { useState, useRef, useEffect } from "react";
import { Typography, Box } from "@mui/material";
import { MOCK_WORD_PAIR, GOOGLE_LOGO, GAME_BGM } from "./constants";
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
import Colors from "./colors";

// Create a global reference for BGM
let bgmAudio;

const MainScreen = () => {
  const [user, setUser] = useState(null);
  const [userId, setUserId] = useState("");
  const [name, setName] = useState("");
  const [gameStarted, setGameStarted] = useState(false);
  const [hint1, setHint1] = useState("");
  const [hint2, setHint2] = useState("");
  const [word1, setWord1] = useState("");
  const [word2, setWord2] = useState("");
  const bgmRef = useRef(null);

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

  useEffect(() => {
    if (!bgmAudio) {
      // Initialize the BGM only once
      bgmAudio = new Audio(GAME_BGM);
      bgmAudio.loop = true;
      bgmAudio.volume = 0.5; // Default volume for Main Screen
      bgmAudio.play().catch((error) => {
        console.error("Error playing BGM:", error);
      });
    }

    if (gameStarted) {
      // Lower volume when transitioning to the Game Screen
      bgmAudio.volume = 0.1; // Lower volume
    } else {
      // Restore volume when returning to the Main Screen
      bgmAudio.volume = 0.5; // Restore default volume
    }

    return () => {
      // Optional cleanup logic
      if (bgmAudio && !gameStarted) {
        bgmAudio.volume = 0.5; // Reset volume to default if needed
      }
    };
  }, [gameStarted]); // Triggered only when gameStarted changes

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
            color: Colors.primary,
            borderRadius: "30px",
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
                  color: Colors.darkGray, // Subtle text color for subtext
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
              outline: "none", // Remove default browser focus outline
              boxShadow: "none", // Remove any box-shadow on focus
              color: Colors.primary,
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

            textTransform: "none",
            backgroundColor: name.trim()
              ? Colors.primary
              : Colors.backgroundMain,
            color: name.trim() ? Colors.backgroundMain : Colors.primary, // Change text color for outlined button
            borderRadius: "30px",
            cursor: name.trim() ? "pointer" : "not-allowed",
            border: `4px solid ${Colors.primary}`,
          }}
        >
          {user ? "Start Game" : "Play as Guest"}
        </Box>
      </Box>
    </MainContainer>
  );
};

export default MainScreen;
