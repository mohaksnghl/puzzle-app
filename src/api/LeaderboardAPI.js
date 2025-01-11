import axios from "axios";

export const getLeaderboardData = async () => {
  try {
    const response = await axios.get(
      `https://3prhrhpquc.execute-api.us-east-1.amazonaws.com/leaderboard?action=leaderboard`
    );
    console.log("API Response:", response.data);
    return response.data.leaderboard || [];
  } catch (error) {
    console.error("Error fetching leaderboard:", error);
    return [];
  }
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
