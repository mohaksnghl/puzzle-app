import { useState, useRef, useEffect } from "react";
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
} from "./StyledComponents";

import {
  CORRECT_ANSWER_SOUND,
  CORRECT_WORD_SOUND,
  INITIAL_TIME,
  TIME_BONUS,
  TIMES_UP_SOUND,
  CLOCK_TICK_SOUND,
} from "./constants";
import { Button, Typography, Box } from "@mui/material";
import { startGame, endGame } from "./api/GameSessionAPI";
import Colors from "./colors";

const GameScreen = ({
  name,
  userId,
  hint1,
  hint2,
  word1,
  word2,
  refreshWords,
}) => {
  const [inputWord1, setInputWord1] = useState(Array(word1.length).fill(""));
  const [inputWord2, setInputWord2] = useState(Array(word2.length).fill(""));
  const [light1Color, setLight1Color] = useState(Colors.red);
  const [light2Color, setLight2Color] = useState(Colors.red);
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
      endGame(localStorage.getItem("sessionId"), userId, score); // Call endGame when timer reaches 0

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
      setLight1Color(Colors.green);
      if (!isSound1Played) {
        const audio = new Audio(CORRECT_WORD_SOUND); // Adjust the path to your sound file
        audio.play();
        setIsSound1Played(true);
      }
    } else {
      setLight1Color(Colors.red);
    }

    if (currentWord2 === word2.toUpperCase()) {
      setLight2Color(Colors.green);
      if (!isSound2Played) {
        const audio = new Audio(CORRECT_WORD_SOUND); // Adjust the path to your sound file
        audio.play();
        setIsSound2Played(true);
      }
    } else {
      setLight2Color(Colors.red);
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
    setLight1Color(Colors.red);
    setLight2Color(Colors.red);
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
    startGame(name, userId);
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
      <DialogTitleStyled style={{ fontSize: "2rem", textAlign: "center" }}>
        🎮 Game Over 🎮
      </DialogTitleStyled>
      <DialogContentStyled style={{ padding: "20px", textAlign: "center" }}>
        <Typography
          style={{
            marginBottom: "15px",
            fontSize: "1.6rem",
          }}
        >
          <strong> 🎉 Your Score:</strong> <strong>{score}</strong>
          <strong> 🎉 </strong>{" "}
        </Typography>
        <Typography
          style={{
            marginBottom: "20px",
            fontSize: "1.4rem",
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
            backgroundColor: Colors.primary,
            boxShadow: "0 0 15px rgba(0, 0, 0, 0.5)",
            maxWidth: "450px",
          }}
        >
          <Box
            style={{
              marginBottom: "15px",
              padding: "10px",
              backgroundColor: Colors.backgroundMain,
              color: Colors.primary,
              borderRadius: "8px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Typography
              style={{
                fontSize: "1.2rem",
                marginBottom: "10px",
              }}
            >
              {hint1}
            </Typography>
            <Typography
              style={{
                fontSize: "1.2rem",

                fontWeight: "bold",
              }}
            >
              <span>{word1}</span>
            </Typography>
          </Box>

          <Box
            style={{
              marginBottom: "15px",
              padding: "10px",
              backgroundColor: Colors.backgroundMain,
              color: Colors.primary,
              borderRadius: "8px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Typography
              style={{
                fontSize: "1.2rem",

                marginBottom: "10px",
              }}
            >
              {hint2}
            </Typography>
            <Typography
              style={{
                fontSize: "1.2rem",
                fontWeight: "bold",
              }}
            >
              <span>{word2}</span>
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
            fontSize: "1.2rem",
            padding: "10px 30px",
            borderRadius: "50px",
            textTransform: "uppercase",
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
          style={{
            marginTop: "20px",
            backgroundColor: Colors.backgroundMain,
            color: Colors.primary,
            fontWeight: "bold",
            border: `2px solid ${Colors.primary}`,
          }}
        >
          Reveal Answers
        </Button>
        {gameOverDialog}
      </MainContainer>
    </FadeContainer>
  );
};

export default GameScreen;
