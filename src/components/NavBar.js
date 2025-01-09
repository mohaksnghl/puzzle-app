// Navbar.js
import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { Link as RouterLink } from "react-router-dom";

import Colors from "../colors";

const Navbar = () => {
  const menuItems = [
    { text: "Home", path: "/" },
    { text: "Game Rules", path: "/how-to-play" },
    { text: "Leaderboard", path: "/leaderboard" },
  ];

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        marginLeft: "auto",
        padding: "0.5rem",
        width: "100%", // Span the full width of the viewport
        justifyContent: "flex-end", // Align buttons to the right
        backgroundColor: Colors.backgroundMain,
      }}
    >
      {menuItems.map((item) => (
        <Button
          key={item.text}
          component={RouterLink}
          to={item.path}
          sx={{
            color: Colors.primary,
            fontWeight: "bold",
            textTransform: "none",
            fontSize: "1rem",
            backgroundColor: Colors.backgroundMain,
            marginLeft: "1rem",
            border: `3px solid ${Colors.primary}`,
            borderRadius: "20px",
            padding: "0.5rem 1rem",
            "&:hover": {
              backgroundColor: Colors.primary,
              color: Colors.backgroundMain,
            },
          }}
        >
          {item.text}
        </Button>
      ))}
    </Box>
  );
};

export default Navbar;
