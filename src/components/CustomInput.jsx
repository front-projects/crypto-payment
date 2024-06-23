import { styled } from "@mui/system";
import { purple } from "@mui/material/colors";

const grey = {
  50: "#F3F6F9",
  100: "#E5EAF2",
  200: "#DAE2ED",
  300: "#C7D0DD",
  400: "#B0B8C4",
  500: "#9DA8B7",
  600: "#6B7A90",
  700: "#434D5B",
  800: "#303740",
  900: "#1C2025",
};

export const InputElement = styled("input")(
  ({ theme }) => `
    width: 100%;
    font-family: 'IBM Plex Sans', sans-serif;
    font-size: 18px;
    font-weight: 400;
    line-height: 1.5;
    padding: 12px;
    border-radius: 8px;
    color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
    background: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
    border: 1px solid ${theme.palette.mode === "dark" ? grey[700] : grey[200]};
    box-shadow: 0px 2px 2px ${theme.palette.mode === "dark" ? grey[900] : grey[50]};
  
    &:hover {
    border-color: ${purple[400]};
  }

  &:focus {
    border-color: ${purple[400]};
    box-shadow: 0 0 0 3px ${theme.palette.mode === "dark" ? purple[600] : purple[200]};
  }
  
    // firefox
    &:focus-visible {
      outline: 0;
    }
  `,
);
