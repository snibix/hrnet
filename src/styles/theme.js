import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#5f6f1f",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        contained: {
          backgroundColor: "#5f6f1f",
          "&:hover": {
            backgroundColor: "#4a5618",
          },
        },
        outlined: {
          borderColor: "#5f6f1f",
          color: "#5f6f1f",
          "&:hover": {
            borderColor: "#4a5618",
            backgroundColor: "rgba(95, 111, 31, 0.04)",
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            "&.Mui-focused fieldset": {
              borderColor: "#5f6f1f",
            },
          },
          "& .MuiInputLabel-root.Mui-focused": {
            color: "#5f6f1f",
          },
        },
      },
    },
  },
});

export default theme;
