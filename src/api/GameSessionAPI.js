import axios from "axios";

export const startGame = async (playerName, userId) => {
  const sessionId = `session-${Date.now()}`;
  localStorage.setItem("sessionId", sessionId);
  const startTime = new Date().toISOString();

  try {
    const response = await axios.post(
      "https://1j2me46yui.execute-api.us-east-1.amazonaws.com/game",
      {
        action: "create",
        userId,
        sessionId,
        playerName,
        startTime,
      }
    );
    console.log(response.data);
    return sessionId;
  } catch (error) {
    console.error("Error creating session:", error);
  }
};

export const endGame = async (sessionId, userId, score) => {
  const endTime = new Date().toISOString();

  try {
    const response = await axios.post(
      "https://1j2me46yui.execute-api.us-east-1.amazonaws.com/game",
      {
        action: "update",
        userId,
        sessionId,
        endTime,
        score,
      }
    );
    console.log(response.data);
  } catch (error) {
    console.error("Error updating session:", error);
  }
};
