import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// Example UI imports
import { Box, Typography, CircularProgress, TableHead } from "@mui/material";
import Colors from "../colors";
import {
  MainContainer,
  TableRowStyled,
  TableCellStyled,
  StyledTable,
  TableHeaderCellStyled,
} from "../StyledComponents";
import Navbar from "../components/NavBar";

// Suppose you have an API function that fetches leaderboard data
import { getLeaderboardData } from "../api/LeaderboardAPI";

function LeaderboardScreen() {
  const [leaders, setLeaders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // 1. Fetch leaderboard data on mount
  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const data = await getLeaderboardData();
        // Assuming data is an array of { name: string, score: number }
        // Sort data in descending order of score
        const sortedData = data.sort((a, b) => b.score - a.score);
        setLeaders(sortedData);
      } catch (err) {
        console.error("Error fetching leaderboard:", err);
        setError("Failed to load leaderboard. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  // 2. Render a simple table or list
  return (
    <MainContainer>
      <Navbar />
      {/* Loading Indicator */}
      {loading && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "200px",
          }}
        >
          <CircularProgress color="primary" />
        </Box>
      )}

      {/* Error Message */}
      {error && (
        <Typography variant="h6" sx={{ color: "red", marginBottom: "1rem" }}>
          {error}
        </Typography>
      )}

      {/* Leaderboard Table */}
      {!loading && !error && (
        <StyledTable sx={{ marginTop: "20px" }}>
          <TableHead
            sx={{ borderBottom: `5px solid ${Colors.backgroundMain}` }}
          >
            <TableHeaderCellStyled
              colSpan={3}
              align="center"
              sx={{ fontSize: "1.8rem" }}
            >
              🏆 LEADERBOARD 🏆
            </TableHeaderCellStyled>
          </TableHead>
          <TableHead
            sx={{ borderBottom: `5px solid ${Colors.backgroundMain}` }}
          >
            <TableHeaderCellStyled>Rank</TableHeaderCellStyled>
            <TableHeaderCellStyled>Player Name</TableHeaderCellStyled>
            <TableHeaderCellStyled>High Score</TableHeaderCellStyled>
          </TableHead>
          <Box component="tbody">
            {leaders.map((player, index) => (
              <TableRowStyled key={player.userId || index}>
                <TableCellStyled>{index + 1}</TableCellStyled>
                <TableCellStyled>{player.name}</TableCellStyled>
                <TableCellStyled>{player.score}</TableCellStyled>
              </TableRowStyled>
            ))}
          </Box>
        </StyledTable>
      )}
    </MainContainer>
  );
}

export default LeaderboardScreen;
