import { createTheme } from "@mui/material";
const theme = createTheme({
  palette: {
    primary: {
      light: "#6084a9",
      main: "#4a6682",
      dark: "#2C3E50",
      contrastText: "#fff",
      
    
    },
    secondary: {
      light: "#ffe88a",
      main: "#F1C40F",
      dark: "#e1b711",
      contrastText: "#000",
    },
    colors: {
      red: "#FF6F61",      // Coral Red
      green: "#2ECC71",    // Emerald
      orange: "#FF8C42",   // Bright Orange
      blue: "#3498DB",     // Sky Blue
      purple: "#9B59B6",   // Amethyst
      yellow: "#F1C40F",   // Sunflower Yellow
      pink: "#FF3D67",     // Hot Pink
      teal: "#1ABC9C",     // Turquoise
      gold: "#FFD700",     // Gold
      lavender: "#E6E6FA", // Lavender
      cyan: "#00BCD4",     // Bright Cyan
      gray: "#eeeeee",     // Bright Cyan
    },
    text: {
      primary: "#2C3E50",     // Dark Blue (para textos principales)
      secondary: "#34495E",   // Grayish Blue (para textos secundarios)
      accent: "#FFFFFF",       // Blanco (para textos sobre fondos oscuros)
      muted: "#95A5A6",        // Gray (para textos menos importantes o deshabilitados)
      success: "#2ECC71",     // Emerald (para mensajes de éxito)
      warning: "#FF8C42",     // Bright Orange (para advertencias)
      error: "#E74C3C",       // Red (para mensajes de error)
      link: "#3498DB",        // Sky Blue (para enlaces)
    }
    
    
  },
});

export default theme;
