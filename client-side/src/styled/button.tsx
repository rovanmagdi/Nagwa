import { styled } from "@mui/material/styles";
import { Button } from "@mui/material";

export const StyledButtonNext = styled(Button)(({ theme }) => ({
  backgroundColor: "transparent",
  border: "2px solid #185f55",
  color: "#185f55",
  margin: "10px",
  fontWeight: "bold",
  textTransform: "capitalize",
}));

export const StyledButtonCheck = styled(Button)(({ theme }) => ({
  backgroundColor: "#185f55",
  textTransform: "capitalize",
  margin: "10px",
  color: "white",
  fontWeight: "bold",
  "&:hover": {
    backgroundColor: "#207C6F",
  },
}));

export const StyledButtonRetake= styled(Button)(({ theme }) => ({
  backgroundColor: "#185f55",
  textTransform: "capitalize",
  // margin: "10px",
  padding: "20px",
  fontSize: "1.2rem",
  color: "white",
  fontWeight: "bold",
  "&:hover": {
    backgroundColor: "#207C6F",
  },
}));