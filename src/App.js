import React, { useState, useEffect, useRef } from "react";
import { Typography, Box, Button } from "@mui/material";
import {
  INITIAL_TIME,
  TIME_BONUS,
  TIMES_UP_SOUND,
  CLOCK_TICK_SOUND,
  CORRECT_ANSWER_SOUND,
  CORRECT_WORD_SOUND,
  MOCK_WORD_PAIR,
} from "./constants";

import {
  ScoreDisplay,
  StyledDialog,
  DialogActionsStyled,
  DialogContentStyled,
  RestartButton,
  FadeContainer,
  DialogTitleStyled,
  MainContainer,
  TimerDisplay,
  BonusTime,
  ScoreIncrement,
  Title,
  SubTitle,
  HintText,
  LetterInput,
  LetterBox,
  LightIndicator,
  HowToPlayContainer,
  InstructionIcon,
  InstructionItem,
  LogoContainer,
  LogoImage,
} from "./StyledComponents";

import logo from "./assets/logo-image.png"; // Path to your PNG

const GameScreen = ({ name, hint1, hint2, word1, word2, refreshWords }) => {
  const [inputWord1, setInputWord1] = useState(Array(word1.length).fill(""));
  const [inputWord2, setInputWord2] = useState(Array(word2.length).fill(""));
  const [light1Color, setLight1Color] = useState("red");
  const [light2Color, setLight2Color] = useState("red");
  const [score, setScore] = useState(0);
  const tickingSoundRef = useRef(null);
  const timesUpSoundRef = useRef(null);
  const [timeLeft, setTimeLeft] = useState(INITIAL_TIME);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isSound1Played, setIsSound1Played] = useState(false);
  const [isSound2Played, setIsSound2Played] = useState(false);
  const [revealAnswers, setRevealAnswers] = useState(false);
  const [revealing, setRevealing] = useState(false);
  const [bonusTime, setBonusTime] = useState(0);
  const [scoreIncrement, setScoreIncrement] = useState(0);

  useEffect(() => {
    // Initialize the ticking sound
    if (!tickingSoundRef.current) {
      tickingSoundRef.current = new Audio(CLOCK_TICK_SOUND);
      tickingSoundRef.current.loop = true;
      tickingSoundRef.current.volume = 0.5; // Adjust volume as needed
    }

    if (!timesUpSoundRef.current) {
      timesUpSoundRef.current = new Audio(TIMES_UP_SOUND);
      timesUpSoundRef.current.volume = 1.0; // Full volume for time's up
    }

    if (timeLeft > 0) {
      if (tickingSoundRef.current.paused) {
        tickingSoundRef.current.play().catch((error) => {
          console.warn("Error playing ticking sound:", error);
        });
      }
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => {
        clearTimeout(timer);
      };
    } else if (!revealing) {
      setIsGameOver(true); // Set gameOver to true when timer runs out

      // Stop and reset the ticking sound when the timer ends
      if (tickingSoundRef.current) {
        tickingSoundRef.current.pause();
        tickingSoundRef.current.currentTime = 0; // Reset to the start
      }

      if (timesUpSoundRef.current) {
        timesUpSoundRef.current.play().catch((error) => {
          console.warn("Error playing time's up sound:", error);
        });
      }
    }
    return () => {
      if (tickingSoundRef.current) {
        tickingSoundRef.current.pause();
        tickingSoundRef.current.currentTime = 0;
      }
      if (timesUpSoundRef.current) {
        timesUpSoundRef.current.pause();
        timesUpSoundRef.current.currentTime = 0;
      }
    };
  }, [timeLeft, revealing]);

  useEffect(() => {
    const currentWord1 = inputWord1.join("").toUpperCase();
    const currentWord2 = inputWord2.join("").toUpperCase();

    if (currentWord1 === word1.toUpperCase()) {
      setLight1Color("green");
      if (!isSound1Played) {
        const audio = new Audio(CORRECT_WORD_SOUND); // Adjust the path to your sound file
        audio.play();
        setIsSound1Played(true);
      }
    } else {
      setLight1Color("red");
    }

    if (currentWord2 === word2.toUpperCase()) {
      setLight2Color("green");
      if (!isSound2Played) {
        const audio = new Audio(CORRECT_WORD_SOUND); // Adjust the path to your sound file
        audio.play();
        setIsSound2Played(true);
      }
    } else {
      setLight2Color("red");
    }

    if (
      currentWord1 === word1.toUpperCase() &&
      currentWord2 === word2.toUpperCase() &&
      !revealing
    ) {
      const audio = new Audio(CORRECT_ANSWER_SOUND); // Adjust the path to your sound file
      audio.play();
      setScore((prevScore) => prevScore + 1); // Increment score
      setTimeLeft((prevTime) => prevTime + TIME_BONUS);

      setBonusTime(TIME_BONUS); // Trigger animation
      setScoreIncrement(1); // Trigger score increment animation

      setTimeout(() => setScoreIncrement(0), 1500); // Clear animation after 1.5 seconds
      setTimeout(() => setBonusTime(0), 1500); // Clear animation after 1.5 seconds

      setTimeout(() => {
        refreshWords();
        setInputWord1(Array(word1.length).fill(""));
        setInputWord2(Array(word2.length).fill(""));
      }, 1000); // Refresh words after a short delay
    }
  }, [inputWord1, inputWord2, word1, word2, refreshWords]);

  // Dynamically update letter boxes when word lengths change
  useEffect(() => {
    setInputWord1(Array(word1.length).fill(""));
    setInputWord2(Array(word2.length).fill(""));
    setLight1Color("red");
    setLight2Color("red");
    setIsSound1Played(false);
    setIsSound2Played(false);
    setTimeout(() => {
      const firstBox = document.getElementById("letter-0-1");
      if (firstBox) firstBox.focus();
    }, 0); // Ensure the pointer moves to the first box
  }, [word1, word2]); // Trigger when words are refreshed

  const handleInputChange = (
    value,
    index,
    setInput,
    input,
    word,
    nextInputIdPrefix,
    e
  ) => {
    const newInput = [...input];

    // Handle Backspace
    if (e && e.key === "Backspace") {
      if (newInput[index]) {
        // Clear the current box if it has a letter
        newInput[index] = "";
      } else if (index > 0) {
        // Move to the previous box if the current one is empty
        const prevBox = document.getElementById(
          `letter-${index - 1}-${setInput === setInputWord1 ? "1" : "2"}`
        );
        if (prevBox) prevBox.focus();
        newInput[index - 1] = "";
      }
    } else if (value) {
      // Allow only single character input
      newInput[index] = value.toUpperCase().slice(0, 1);

      // Move to the next box if the current one is filled
      if (index < input.length - 1 && value) {
        const nextBox = document.getElementById(
          `letter-${index + 1}-${setInput === setInputWord1 ? "1" : "2"}`
        );
        if (nextBox) nextBox.focus();
      } else if (
        newInput.join("") === word.toUpperCase() &&
        nextInputIdPrefix
      ) {
        // If the word is complete and correct, move to the first box of the next word
        const firstBoxNextWord = document.getElementById(
          `letter-0-${nextInputIdPrefix}`
        );
        if (firstBoxNextWord) firstBoxNextWord.focus();
      }
    }

    // Update the state
    setInput(newInput);
  };

  const handleRestart = () => {
    setTimeLeft(INITIAL_TIME);
    setScore(0);
    setIsGameOver(false);
    setRevealAnswers(false); // Reset reveal answers state
    setRevealing(false); // Reset revealing state
    refreshWords();
  };

  const handleReveal = () => {
    setRevealing(true); // Set revealing state
    setInputWord1(word1.split("")); // Fill in correct answer for word1
    setInputWord2(word2.split("")); // Fill in correct answer for word2

    // Refresh words and reset states after revealing
    setTimeout(() => {
      setRevealing(false); // Reset reveal state
      refreshWords();
      setInputWord1(Array(word1.length).fill("")); // Clear input boxes
      setInputWord2(Array(word2.length).fill("")); // Clear input boxes
    }, 1000);
  };

  const gameOverDialog = (
    <StyledDialog open={isGameOver} onClose={handleRestart}>
      <DialogTitleStyled
        style={{ fontSize: "2rem", textAlign: "center", color: "#ff5252" }}
      >
        🎮 Game Over 🎮
      </DialogTitleStyled>
      <DialogContentStyled style={{ padding: "20px", textAlign: "center" }}>
        <Typography
          style={{
            marginBottom: "15px",
            fontSize: "1.6rem",
            color: "#61dafb",
          }}
        >
          <strong> 🎉 Your Score:</strong>{" "}
          <strong style={{ color: "#ffd700", fontSize: "2rem" }}>
            {score}
          </strong>
          <strong> 🎉 </strong>{" "}
        </Typography>
        <Typography
          style={{
            marginBottom: "20px",
            fontSize: "1.4rem",
            color: "#eaeaea",
          }}
        >
          <strong>Correct Answers</strong>
        </Typography>
        <Box
          style={{
            textAlign: "left",
            margin: "0 auto",
            padding: "20px",
            borderRadius: "10px",
            backgroundColor: "#1e293b",
            boxShadow: "0 0 15px rgba(0, 0, 0, 0.5)",
            maxWidth: "450px",
          }}
        >
          <Box
            style={{
              marginBottom: "15px",
              padding: "10px",
              backgroundColor: "#2b2f3a",
              borderRadius: "8px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Typography
              style={{
                fontSize: "1.4rem",
                color: "#ffffff",
                fontStyle: "italic",
                marginBottom: "10px",
              }}
            >
              {hint1}
            </Typography>
            <Typography
              style={{
                fontSize: "1.2rem",
                color: "#4caf50",
                fontWeight: "bold",
              }}
            >
              Answer:{" "}
              <span style={{ fontSize: "1.6rem", color: "#61dafb" }}>
                {word1}
              </span>
            </Typography>
          </Box>

          <Box
            style={{
              marginBottom: "15px",
              padding: "10px",
              backgroundColor: "#2b2f3a",
              borderRadius: "8px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Typography
              style={{
                fontSize: "1.4rem",
                color: "#ffffff",
                fontStyle: "italic",
                marginBottom: "10px",
              }}
            >
              {hint2}
            </Typography>
            <Typography
              style={{
                fontSize: "1.2rem",
                color: "#4caf50",
                fontWeight: "bold",
              }}
            >
              Answer:{" "}
              <span style={{ fontSize: "1.6rem", color: "#61dafb" }}>
                {word2}
              </span>
            </Typography>
          </Box>
        </Box>
      </DialogContentStyled>
      <DialogActionsStyled
        style={{ justifyContent: "center", padding: "20px" }}
      >
        <RestartButton
          onClick={handleRestart}
          variant="contained"
          style={{
            backgroundColor: "#61dafb",
            color: "#2b2f3a",
            fontSize: "1.2rem",
            fontWeight: "bold",
            padding: "10px 30px",
            borderRadius: "50px",
            textTransform: "uppercase",
            boxShadow: "0 4px 10px rgba(97, 218, 251, 0.4)",
          }}
        >
          Restart Game
        </RestartButton>
      </DialogActionsStyled>
    </StyledDialog>
  );

  return (
    <FadeContainer>
      <MainContainer>
        <TimerDisplay>
          Time Left: {timeLeft}s
          {bonusTime > 0 && <BonusTime>+{bonusTime}s</BonusTime>}
        </TimerDisplay>
        <ScoreDisplay>
          <div style={{ position: "relative" }}>
            Score: {score}
            {scoreIncrement > 0 && (
              <ScoreIncrement>+{scoreIncrement}</ScoreIncrement>
            )}
          </div>
        </ScoreDisplay>{" "}
        <Title>Welcome, {name}!</Title>
        <SubTitle>Can you guess both words?</SubTitle>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          marginBottom="1rem"
        >
          <HintText>{hint1}</HintText>
        </Box>
        <LetterInput>
          {inputWord1.map((letter, index) => (
            <LetterBox
              key={index}
              id={`letter-${index}-1`}
              value={letter}
              onKeyDown={
                (e) => {
                  if (
                    ["ArrowLeft", "ArrowRight", "Tab"].includes(e.key) ||
                    (e.key === "Tab" && e.shiftKey)
                  ) {
                    e.preventDefault();
                  }
                  handleInputChange(
                    "",
                    index,
                    setInputWord1,
                    inputWord1,
                    word1,
                    "2",
                    e
                  );
                } // For Backspace
              }
              onChange={(e) =>
                handleInputChange(
                  e.target.value,
                  index,
                  setInputWord1,
                  inputWord1,
                  word1,
                  "2",
                  e
                )
              }
            />
          ))}
          <LightIndicator color={light1Color} />
        </LetterInput>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          marginBottom="1rem"
        >
          <HintText>{hint2}</HintText>
        </Box>
        <LetterInput>
          {inputWord2.map((letter, index) => (
            <LetterBox
              key={index}
              id={`letter-${index}-2`}
              value={letter}
              onKeyDown={
                (e) => {
                  if (
                    ["ArrowLeft", "ArrowRight", "Tab"].includes(e.key) ||
                    (e.key === "Tab" && e.shiftKey)
                  ) {
                    e.preventDefault();
                  }
                  handleInputChange(
                    "",
                    index,
                    setInputWord2,
                    inputWord2,
                    word2,
                    null,
                    e
                  );
                } // For Backspace
              }
              onChange={(e) =>
                handleInputChange(
                  e.target.value,
                  index,
                  setInputWord2,
                  inputWord2,
                  word2,
                  null,
                  e
                )
              }
            />
          ))}
          <LightIndicator color={light2Color} />
        </LetterInput>
        <Button
          onClick={handleReveal}
          variant="contained"
          color="secondary"
          style={{
            marginTop: "20px",
            backgroundColor: "#ff5722",
            color: "#ffffff",
            fontWeight: "bold",
          }}
        >
          Reveal Answers
        </Button>
        {gameOverDialog}
      </MainContainer>
    </FadeContainer>
  );
};

const MainScreen = () => {
  const [name, setName] = useState("");
  const [gameStarted, setGameStarted] = useState(false);
  const [hint1, setHint1] = useState("");
  const [hint2, setHint2] = useState("");
  const [word1, setWord1] = useState("");
  const [word2, setWord2] = useState("");
  const [showHowToPlay, setShowHowToPlay] = useState(false);

  const refreshWords = () => {
    const randomPair =
      MOCK_WORD_PAIR[Math.floor(Math.random() * MOCK_WORD_PAIR.length)];
    setHint1(randomPair.hint1);
    setWord1(randomPair.word1);
    setHint2(randomPair.hint2);
    setWord2(randomPair.word2);
  };

  const handleStartGame = () => {
    refreshWords();
    setGameStarted(true);
  };

  return gameStarted ? (
    <GameScreen
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
        style={{
          padding: "15px 30px",
          fontSize: "1.2rem",
          fontWeight: "bold",
          textTransform: "none",
          backgroundColor: "#61dafb",
          color: "#2b2f3a",
          borderRadius: "30px",
          border: "none",
          cursor: "pointer",
          boxShadow: "0 4px 10px rgba(97, 218, 251, 0.4)",
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
