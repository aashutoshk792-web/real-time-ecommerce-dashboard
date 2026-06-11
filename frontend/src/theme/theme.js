import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "dark",

    primary: {
      main: "#00E5FF",
    },

    secondary: {
      main: "#7C4DFF",
    },

    background: {
      default: "#0B1120",
      paper: "#111827",
    },
  },

  shape: {
    borderRadius: 16,
  },
});

export default theme;