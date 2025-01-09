import axios from "axios";

export const getLeaderboardData = async () => {
  // In real life, you'd do a fetch/axios call:
  // const response = await fetch("https://example.com/leaderboard");
  // const data = await response.json();
  // return data;

  // Mock data:
  return [
    { name: "Alice", score: 10 },
    { name: "Bob", score: 8 },
    { name: "Charlie", score: 6 },
  ];
};

export const fetchHighScore = async (userId) => {
  if (!userId || userId.startsWith("Guest")) {
    return 0;
  }

  try {
    const response = await axios.get(
      `https://3prhrhpquc.execute-api.us-east-1.amazonaws.com/highscore?userId=${userId}`
    );
    console.log("API Response:", response.data);
    return response.data.highScore || 0;
  } catch (error) {
    console.error("Error fetching high score:", error);
    return 0;
  }
};
