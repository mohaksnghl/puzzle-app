import {
  Typography,
  Container,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Table,
  TableCell,
  TableRow,
} from "@mui/material";
import { styled } from "@mui/system";
import Colors from "./colors";

export const MainContainer = styled(Container)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "flex-start", // Align content to the top
  height: "100vh",
  textAlign: "center",
  // position: "relative", // Add relative positioning
  backgroundColor: Colors.backgroundMain,
  //   padding: "20px",
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  overflow: "auto",
  width: "100%", // Ensure it spans full width
  borderRadius: "20px",
}));

export const GameContainer = styled(Container)(({ theme }) => ({
  display: "flex",
  borderRadius: "20px",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center", // Align content to the top
  height: "100vh",
  textAlign: "center",
  position: "relative", // Add relative positioning
  backgroundColor: Colors.backgroundMain,
  //   padding: "20px",
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  overflow: "auto",
  width: "100%", // Ensure it spans full width
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
  backgroundColor: Colors.backgroundMain,
  color: Colors.primary,
  padding: "10px 20px",
  borderRadius: "12px",
  border: `2px solid ${Colors.primary}`,
  fontSize: "1.2rem",
  fontWeight: "bold",
  transition: "transform 0.2s ease",
}));

export const TimerDisplay = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: "20px",
  left: "20px",
  marginTop: "30px", // Add margin to move it down
  backgroundColor: Colors.backgroundMain, // Orange for visibility
  color: Colors.primary,
  padding: "10px 15px",
  borderRadius: "12px",
  border: `2px solid ${Colors.primary}`,
  fontSize: "1.2rem",
  fontWeight: "bold",
  zIndex: 10,
}));

export const Title = styled(Typography)(({ theme }) => ({
  fontWeight: "bold",
  fontSize: "3rem",
  marginBottom: "1rem",
  color: Colors.primary,
}));

export const HintText = styled(Typography)(({ theme }) => ({
  fontSize: "1.8rem",
  fontWeight: "600",
  color: Colors.backgroundMain,
  padding: "8px 12px",
  borderRadius: "8px",
  backgroundColor: Colors.primary,
  textAlign: "center",
  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
  marginBottom: "1rem",
}));

export const SubTitle = styled(Typography)(({ theme }) => ({
  fontSize: "1.5rem",
  marginBottom: "2rem",
  color: Colors.primary,
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
  border: `2px solid ${Colors.primary}`,
  borderRadius: "5px",
  backgroundColor: Colors.backgroundMain,
  color: Colors.primary,
  outline: "none",
  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
}));

export const LightIndicator = styled("div")(({ color }) => ({
  width: "40px",
  height: "40px",
  borderRadius: "50%",
  backgroundColor: color,
  margin: "10px",
  boxShadow: `0 0 10px 2px ${color}`, // Glowing effect
}));

export const StyledDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiPaper-root": {
    backgroundColor: Colors.primary, // Match the app background color
    padding: "20px",
    borderRadius: "12px",
    width: "600px", // Set a fixed width
    maxWidth: "80%", // Ensure it is responsive
  },
}));

export const DialogTitleStyled = styled(DialogTitle)(({ theme }) => ({
  fontSize: "1.5rem",
  fontWeight: "bold",
  textAlign: "center",
  color: Colors.backgroundMain, // Vibrant accent color
  marginBottom: "10px",
}));

export const DialogContentStyled = styled(DialogContent)(({ theme }) => ({
  fontSize: "1.2rem",
  lineHeight: "1.6",
  color: Colors.primary,
  textAlign: "center",
  padding: "20px",
  backgroundColor: Colors.backgroundMain, // Slightly darker background for separation
  borderRadius: "8px",
}));

export const DialogActionsStyled = styled(DialogActions)(({ theme }) => ({
  justifyContent: "center",
}));

export const RestartButton = styled(Button)(({ theme }) => ({
  backgroundColor: Colors.backgroundMain, // Accent color for button
  color: Colors.primary,
  padding: "10px 20px",
  borderRadius: "8px",
}));

export const BonusTime = styled("div")(({ theme }) => ({
  position: "absolute",
  top: "-20px", // Adjust position above the timer
  right: "10px",
  fontSize: "2rem", // Larger font for visibility
  color: Colors.backgroundMain, // Vibrant gold color
  fontWeight: "bold",
  backgroundColor: "rgba(0, 0, 0, 0.8)", // Semi-transparent black background

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
  color: Colors.backgroundMain, // Vibrant gold color
  fontWeight: "bold",
  backgroundColor: "rgba(0, 0, 0, 0.8)", // Semi-transparent black background
  padding: "5px 10px", // Add padding for better readability
  borderRadius: "5px", // Rounded edges
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

export const LogoContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  textAlign: "center",
  borderRadius: "20px", // Rounded corners for the container
  height: "60%",
  width: "80%",
});

export const LogoImage = styled("img")({
  width: "100%", // Fill the container
  height: "auto", // Maintain aspect ratio
});

export const StyledTable = styled(Table)(({ theme }) => ({
  minWidth: 650,
}));

export const TableRowStyled = styled(TableRow)(({ theme }) => ({}));

export const TableCellStyled = styled(TableCell)(({ theme }) => ({
  fontWeight: "bold",
  backgroundColor: Colors.backgroundMain,
  color: Colors.primary,
  textAlign: "center",
  fontSize: "1rem",
  border: `2px solid ${Colors.primary}`, // Cell borders
}));

export const TableHeaderCellStyled = styled(TableCell)(({ theme }) => ({
  fontWeight: "bold",
  backgroundColor: Colors.primary,
  color: Colors.backgroundMain,
  fontSize: "1.2rem",
  textAlign: "center",

  border: `1px solid ${Colors.primary}`, // Cell borders
}));
