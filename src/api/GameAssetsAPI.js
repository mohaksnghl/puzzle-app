import { WORD_PAIR_S3_PATH } from "../constants";

export const fetchWordPairs = async () => {
  try {
    const response = await fetch(WORD_PAIR_S3_PATH);
    if (!response.ok) {
      throw new Error("Failed to fetch word pairs from S3");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching word pairs:", error);
    return []; // Return an empty array if there's an error
  }
};
