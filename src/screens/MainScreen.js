import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Typography, Box, Button } from "@mui/material";
import { GOOGLE_LOGO, GAME_BGM } from "../constants";
import { v4 as uuidv4 } from "uuid";

import { MainContainer, LogoContainer, LogoImage } from "../StyledComponents";

import logo from ".././assets/logo-image.png"; // Path to your PNG
import { startGame } from "../api/GameSessionAPI";
import { signInWithGoogle, logout } from "../api/firebase";
import Colors from "../colors";
import Navbar from "../components/NavBar";

// Create a global reference for BGM
let bgmAudio;

const MainScreen = () => {
  const navigate = useNavigate();

  // State for user auth
  const [user, setUser] = useState(null);
  const [name, setName] = useState("");

  // Overlay management
  const [showOverlay, setShowOverlay] = useState(true);

  const [gameStarted, setGameStarted] = useState(false);

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

  const handleStartGame = async () => {
    const userId = user ? user.uid : "Guest_" + uuidv4();
    await startGame(name, userId);
    setGameStarted(true);
    navigate("/game", { replace: true, state: { name, userId } });
  };

  const handleOverlayButtonClick = () => {
    if (!bgmAudio) {
      bgmAudio = new Audio(GAME_BGM);
      bgmAudio.loop = true;
      bgmAudio.volume = 0.5;
      bgmAudio
        .play()
        .catch((error) => console.error("Error playing BGM:", error));
    }

    setShowOverlay(false); // Hide overlay after user interaction
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

  return (
    <>
      {showOverlay && (
        <Box
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.9)",
            color: "#fff",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000, // Ensure it is above other elements
            padding: "20px", // Add padding for responsiveness
          }}
        >
          <Typography
            style={{
              fontSize: "2rem",
              fontWeight: "bold",
              textAlign: "center",
              marginBottom: "30px",
            }}
          >
            Welcome to the Two Words, One Letter Apart Game!
          </Typography>
          <Button
            onClick={handleOverlayButtonClick}
            style={{
              padding: "15px 30px",
              fontSize: "1.2rem",
              fontWeight: "bold",
              backgroundColor: Colors.backgroundMain,
              color: Colors.primary,
              borderRadius: "30px",
              cursor: "pointer",
              border: `2px solid ${Colors.primary}`, // Optional border for emphasis
            }}
          >
            Start
          </Button>
        </Box>
      )}
      {
        <MainContainer>
          <Navbar />
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
                color: user ? Colors.backgroundMain : Colors.primary,
                borderRadius: "30px",
                cursor: "pointer",
                backgroundColor: user ? Colors.primary : Colors.backgroundMain,
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
                      fontSize: "0.6rem", // Smaller font for subtext
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
                        backgroundColor: Colors.primary,
                        borderRadius: "50%",
                        padding: "2px",
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
                sx={{
                  marginBottom: ".3rem",
                  padding: "10px",
                  width: "80%",
                  maxWidth: "400px",
                  fontSize: "1.2rem",
                  backgroundColor: Colors.backgroundMain,
                  border: `2px solid ${Colors.primary}`,
                  outline: "none",
                  boxShadow: "none",
                  borderRadius: "10px",
                  color: Colors.primary,
                  "::placeholder": {
                    // fontSize: "0.9rem", // Smaller font for placeholder
                    color: "black", // Black color for placeholder
                  },
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
                border: `2px solid ${Colors.primary}`,
                fontWeight: "bold",
              }}
            >
              {user ? "Start Game" : "Play as Guest"}
            </Box>
          </Box>
        </MainContainer>
      }
      ;
    </>
  );
};

export default MainScreen;
