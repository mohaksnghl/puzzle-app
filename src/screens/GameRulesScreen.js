import React from "react";
import { Typography, Box } from "@mui/material";
import { MainContainer } from "../StyledComponents";
import Navbar from "../components/NavBar";
import Colors from "../colors";

const GameRulesScreen = ({ onBackToMain }) => {
  return (
    <MainContainer>
      <Navbar />
      <Typography
        variant="h4"
        style={{
          textAlign: "center",
          fontWeight: "bold",
          marginBottom: "20px",
          color: Colors.primary,
        }}
      >
        How to Play
      </Typography>

      <Box
        style={{
          backgroundColor: Colors.primary,
          padding: "20px",
          width: "90%",
          borderRadius: "10px",
          textAlign: "justify",
          color: Colors.backgroundMain,
        }}
      >
        <Typography
          variant="body1"
          style={{
            textAlign: "justify",
            fontSize: "1.2rem",
            marginBottom: "20px",
            lineHeight: "1.8",
          }}
        >
          In this game, you’ll solve a unique puzzle where two words are
          connected by one subtle difference: a single letter! Each round,
          you’ll get two hints—one for each word. Your task is to identify both
          words that fit the hints while differing by just one letter.
        </Typography>

        <Box
          style={{
            backgroundColor: Colors.backgroundMain,
            padding: "20px",
            width: "50%",
            borderRadius: "10px",
            textAlign: "justify",
            color: Colors.primary,
          }}
        >
          <Typography
            variant="h2"
            style={{
              textAlign: "justify",
              fontSize: "1rem",
              fontWeight: "bold",
              marginBottom: "10px",
              lineHeight: "1.2",
            }}
          >
            Example:
          </Typography>

          <Typography
            variant="body1"
            style={{
              textAlign: "justify",
              fontSize: "1rem",
              marginBottom: "5px",
              lineHeight: "1.2",
              backgroundColor: Colors.primary,
              padding: "10px",
              borderRadius: "5px",
              color: Colors.backgroundMain,
            }}
          >
            <strong>Garment for the foot</strong>
          </Typography>
          <Typography
            variant="body1"
            style={{
              textAlign: "justify",
              fontSize: "1rem",
              marginBottom: "5px",
              lineHeight: "1.2",
              padding: "10px",
              borderRadius: "5px",
              color: Colors.primary,
            }}
          >
            <strong>SOCK</strong>
          </Typography>
          <Typography
            variant="body1"
            style={{
              textAlign: "justify",
              fontSize: "1rem",
              marginBottom: "5px",
              lineHeight: "1.2",
              backgroundColor: Colors.primary,
              padding: "10px",
              borderRadius: "5px",
              color: Colors.backgroundMain,
            }}
          >
            <strong>Merchandise kept on the premises</strong>
          </Typography>
          <Typography
            variant="body1"
            style={{
              textAlign: "justify",
              fontSize: "1rem",
              lineHeight: "1.2",
              padding: "10px",
              borderRadius: "5px",
              color: Colors.primary,
            }}
          >
            <strong>STOCK</strong>
          </Typography>
        </Box>
        <Typography
          variant="body1"
          style={{
            textAlign: "justify",
            fontSize: "1.2rem",
            marginTop: "20px",

            lineHeight: "1.8",
          }}
        >
          The two words, <strong>SOCK</strong> and <strong>STOCK</strong>,
          differ by only one letter! This simple twist makes each puzzle fun and
          challenging.
        </Typography>

        <Typography
          variant="body1"
          style={{
            textAlign: "justify",
            fontSize: "1.2rem",
            marginTop: "20px",

            lineHeight: "1.8",
          }}
        >
          As you progress, the puzzles become trickier. Can you find the right
          words before time runs out? Get ready to think fast, stay sharp, and
          enjoy the thrill of solving word puzzles!
        </Typography>
      </Box>
    </MainContainer>
  );
};

export default GameRulesScreen;
