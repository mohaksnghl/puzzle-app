import {
  Typography,
  Container,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import { styled } from "@mui/system";

export const MainContainer = styled(Container)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "100vh",
  textAlign: "center",
  position: "relative", // Add relative positioning
  backgroundColor: "#2b2f3a",
  color: "#eaeaea",
  padding: "20px",
  borderRadius: "10px",
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  overflow: "auto",
}));

export const FadeContainer = styled(Box)(({ theme }) => ({
  animation: "fade-in 1.5s ease",
  "@keyframes fade-in": {
    from: {
      opacity: 0,
    },
    to: {
      opacity: 1,
    },
  },
}));

export const ScoreDisplay = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: "20px",
  right: "20px",
  marginTop: "30px", // Add margin to move it down

  backgroundColor: "#4caf50",
  color: "#ffffff",
  padding: "10px 20px",
  borderRadius: "12px",
  border: "2px solid #ffffff",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
  fontSize: "1.2rem",
  fontWeight: "bold",
  transition: "transform 0.2s ease",
  "&:hover": {
    transform: "scale(1.2)",
  },
}));

export const TimerDisplay = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: "20px",
  left: "20px",
  marginTop: "30px", // Add margin to move it down

  backgroundColor: "#ff9800", // Orange for visibility
  color: "#ffffff",
  padding: "10px 15px",
  borderRadius: "12px",
  border: "2px solid #ffffff",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
  fontSize: "1.2rem",
  fontWeight: "bold",
  zIndex: 10,
}));

export const Title = styled(Typography)(({ theme }) => ({
  fontWeight: "bold",
  fontSize: "3rem",
  marginBottom: "1rem",
  color: "#61dafb",
  textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
}));

export const HintText = styled(Typography)(({ theme }) => ({
  fontSize: "1.2rem",
  fontWeight: "600",
  color: "#ffffff",
  padding: "8px 12px",
  border: "2px solid #61dafb",
  borderRadius: "8px",
  backgroundColor: "#1e293b",
  textAlign: "center",
  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
  marginBottom: "1rem",
}));

export const SubTitle = styled(Typography)(({ theme }) => ({
  fontSize: "1.5rem",
  marginBottom: "2rem",
  color: "#c9c9c9",
  textShadow: "1px 1px 3px rgba(0, 0, 0, 0.3)",
}));

export const LetterInput = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center", // Align items vertically
  marginBottom: "1.5rem",
  gap: "15px", // Add spacing between letters and the light
}));

export const LetterBox = styled("input")(({ theme }) => ({
  width: "40px",
  height: "50px",
  margin: "0 5px",
  fontSize: "1.5rem",
  textAlign: "center",
  border: "2px solid #5f6672",
  borderRadius: "5px",
  backgroundColor: "#eaeaea",
  color: "#2b2f3a",
  outline: "none",
  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
}));

export const LightIndicator = styled("div")(({ color }) => ({
  width: "40px",
  height: "40px",
  borderRadius: "50%",
  backgroundColor: color,
  margin: "10px",
  boxShadow: `0 0 15px 3px ${color}`, // Glowing effect
}));

export const StyledDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiPaper-root": {
    backgroundColor: "#2b2f3a", // Match the app background color
    color: "#eaeaea", // Light text color for readability
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.5)", // Add a shadow for depth
    width: "600px", // Set a fixed width
    maxWidth: "80%", // Ensure it is responsive
  },
}));

export const DialogTitleStyled = styled(DialogTitle)(({ theme }) => ({
  fontSize: "1.5rem",
  fontWeight: "bold",
  textAlign: "center",
  color: "#61dafb", // Vibrant accent color
  marginBottom: "10px",
}));

export const DialogContentStyled = styled(DialogContent)(({ theme }) => ({
  fontSize: "1.2rem",
  lineHeight: "1.6",
  color: "#eaeaea",
  textAlign: "center",
  padding: "20px",
  backgroundColor: "#1e293b", // Slightly darker background for separation
  borderRadius: "8px",
  boxShadow: "inset 0 0 10px rgba(0, 0, 0, 0.5)", // Subtle inset shadow for depth
}));

export const DialogActionsStyled = styled(DialogActions)(({ theme }) => ({
  justifyContent: "center",
}));

export const RestartButton = styled(Button)(({ theme }) => ({
  backgroundColor: "#61dafb", // Accent color for button
  color: "#2b2f3a",
  fontWeight: "bold",
  padding: "10px 20px",
  borderRadius: "8px",
  "&:hover": {
    backgroundColor: "#21a1f1", // Slightly darker shade on hover
  },
}));

export const BonusTime = styled("div")(({ theme }) => ({
  position: "absolute",
  top: "-20px", // Adjust position above the timer
  right: "10px",
  fontSize: "2rem", // Larger font for visibility
  color: "#ffd700", // Vibrant gold color
  fontWeight: "bold",
  textShadow: "0 0 10px rgba(255, 215, 0, 0.8)", // Glow effect
  backgroundColor: "rgba(0, 0, 0, 0.6)", // Semi-transparent black background

  animation: "float 1.5s ease-out", // Slower animation
  "@keyframes float": {
    "0%": {
      opacity: 1,
      transform: "translateY(0) scale(1)", // Start with normal size
    },
    "50%": {
      transform: "translateY(-10px) scale(1.2)", // Slight zoom for emphasis
    },
    "100%": {
      opacity: 0,
      transform: "translateY(-30px) scale(1)", // Float upward
    },
  },
}));

export const ScoreIncrement = styled("div")(({ theme }) => ({
  position: "absolute",
  top: "-20px", // Position above the score display
  right: "10px",
  fontSize: "2rem",
  color: "#ffd700", // Vibrant gold color for visibility
  fontWeight: "bold",
  backgroundColor: "rgba(0, 0, 0, 0.6)", // Semi-transparent black background
  padding: "5px 10px", // Add padding for better readability
  borderRadius: "5px", // Rounded edges
  textShadow: "0 0 10px rgba(255, 215, 0, 0.8)", // Glow effect
  animation: "float 1.5s ease-out",
  "@keyframes float": {
    "0%": {
      opacity: 1,
      transform: "translateY(0) scale(1)", // Start at normal size
    },
    "50%": {
      transform: "translateY(-10px) scale(1.2)", // Slight zoom for emphasis
    },
    "100%": {
      opacity: 0,
      transform: "translateY(-30px) scale(1)", // Float upward
    },
  },
}));

export const HowToPlaySection = styled(Box)(({ theme }) => ({
  marginTop: "20px",
  padding: "20px",
  borderRadius: "12px",
  background: "linear-gradient(135deg, #f5f5f5, #eaeaea)",
  color: "#333",
  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
  animation: "fadeInSlide 0.5s ease",
  textAlign: "left",
  maxWidth: "500px",
  width: "90%", // Responsive width
  "@keyframes fadeInSlide": {
    "0%": {
      opacity: 0,
      transform: "translateY(-20px)",
    },
    "100%": {
      opacity: 1,
      transform: "translateY(0)",
    },
  },
}));

export const HowToPlayButton = styled(Button)(({ theme }) => ({
  backgroundColor: "#61dafb",
  color: "#2b2f3a",
  textTransform: "none",
  fontSize: "1rem",
  fontWeight: "bold",
  marginTop: "20px",
  padding: "10px 20px",
  borderRadius: "20px",
  "&:hover": {
    backgroundColor: "#52c7e6",
  },
}));

export const HowToPlayContainer = styled(Box)(({ theme }) => ({
  marginTop: "30px",
  padding: "20px",
  borderRadius: "12px",
  background: "linear-gradient(135deg, #f9f9f9, #e0e0e0)",
  color: "#333",
  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
  textAlign: "left",
  maxWidth: "600px",
  width: "90%", // Responsive
  lineHeight: "1.6",
}));

export const InstructionItem = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "flex-start",
  marginBottom: "15px",
  fontSize: "1rem",
  color: "#444",
}));

export const InstructionIcon = styled("div")(({ theme }) => ({
  width: "24px",
  height: "24px",
  backgroundColor: "#61dafb",
  borderRadius: "50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "#fff",
  fontWeight: "bold",
  fontSize: "0.9rem",
  marginRight: "10px",
}));

export const LogoContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  textAlign: "center",
  background: "linear-gradient(135deg, #f9f9f9, #e0e0e0)", // Optional gradient
  borderRadius: "20px", // Rounded corners for the container
  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)", // Optional shadow for depth
  margin: "50px",
  width: "100%",
  maxWidth: "1000px", // Maximum size for the container
});

export const LogoImage = styled("img")({
  width: "100%", // Fill the container
  //   maxWidth: "800px", // Set a maximum size for the logo
  height: "auto", // Maintain aspect ratio
  borderRadius: "15px", // Rounded edges for the logo itself
});
