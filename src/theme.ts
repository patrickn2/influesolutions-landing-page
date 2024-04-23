"use client";
import { Open_Sans } from "next/font/google";
import { createTheme } from "@mui/material/styles";

const openSans = Open_Sans({
  weight: ["300", "400", "500", "700", "800"],
  subsets: ["latin"],
  display: "swap",
});

declare module "@mui/material/styles" {
  interface TypographyVariants {
    menu: React.CSSProperties;
    numbers: React.CSSProperties;
    numbers2: React.CSSProperties;
    influeName: React.CSSProperties;
    testmony: React.CSSProperties;
    sub: React.CSSProperties;
    footer: React.CSSProperties;
  }

  // allow configuration using `createTheme`
  interface TypographyVariantsOptions {
    menu?: React.CSSProperties;
    numbers?: React.CSSProperties;
    numbers2?: React.CSSProperties;
    influeName?: React.CSSProperties;
    testmony?: React.CSSProperties;
    sub?: React.CSSProperties;
    footer?: React.CSSProperties;
  }
}

// Update the Typography's variant prop options
declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    menu: true;
    numbers: true;
    numbers2: true;
    influeName: true;
    testmony: true;
    sub: true;
    footer: true;
  }
}

const theme = createTheme({
  shape: {
    borderRadius: 8,
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1396,
    },
  },
  palette: {
    primary: {
      main: "#008BCA",
    },
    secondary: {
      main: "#fff",
      dark: "#fff",
      contrastText: "#008BCA",
    },
    warning: {
      main: "#F39000",
    },
    text: {
      primary: "#3D5A6C",
    },
  },
  typography: {
    fontFamily: openSans.style.fontFamily,
    footer: {
      fontFamily: openSans.style.fontFamily,
      fontSize: "1.25rem",
      fontWeight: 400,
      color: "#fff",
    },
    sub: {
      fontFamily: openSans.style.fontFamily,
      fontSize: "1.75rem",
      fontWeight: 400,
      lineHeight: "2.375rem",
      color: "#000",
    },
    body2: {
      fontFamily: openSans.style.fontFamily,
      fontSize: "1.3rem",
      fontWeight: 400,
      lineHeight: "2rem",
      color: "#3D5A6C",
    },
    h1: {
      fontFamily: openSans.style.fontFamily,
      fontSize: "3.875rem",
      fontWeight: 800,
      color: "#3D5A6C",
      lineHeight: "3.5rem",
    },
    h2: {
      fontFamily: openSans.style.fontFamily,
      fontSize: "3.875rem",
      fontWeight: 500,
      color: "#F39000",
      lineHeight: "3.5rem",
    },
    h3: {
      fontFamily: openSans.style.fontFamily,
      fontSize: "2.5rem",
      fontWeight: 500,
      color: "#3D5A6C",
      lineHeight: "2.875rem",
    },
    numbers: {
      fontFamily: openSans.style.fontFamily,
      fontSize: "1.875rem",
      fontWeight: 700,
      color: "#F39000",
      lineHeight: "3.75rem",
    },
    numbers2: {
      fontFamily: openSans.style.fontFamily,
      fontSize: "1.125rem",
      fontWeight: 400,
      lineHeight: "1.375rem",
      color: "#3D5A6C",
    },
    menu: {
      fontFamily: openSans.style.fontFamily,
      fontSize: "1.25rem",
      fontWeight: 600,
      lineHeight: 1.5,
      color: "#507294",
      textDecoration: "none",
    },
    influeName: {
      fontFamily: openSans.style.fontFamily,
      fontSize: "1.875rem",
      fontWeight: 700,
      color: "#3D5A6C",
      lineHeight: "3.75rem",
    },
    testmony: {
      fontFamily: openSans.style.fontFamily,
      fontStyle: "italic",
      fontSize: "1rem",
      fontWeight: 400,
      lineHeight: "1.5rem",
      color: "#3D5A6C",
    },
  },
  components: {
    MuiListItemButton: {
      styleOverrides: {
        root: {
          fontFamily: openSans.style.fontFamily,
          fontWeight: 600,
          borderTop: "1px solid #E5E5E5",
          paddingTop: "1rem",
          paddingBottom: "1rem",
        },
      },
    },
    MuiAccordionSummary: {
      styleOverrides: {
        root: {
          fontSize: "1rem",
        },
      },
    },
    MuiAccordionDetails: {
      styleOverrides: {
        root: {
          fontSize: "1rem!important",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: "8px",
            backgroundColor: "#fff",
            boxShadow: "0px 5px 25px rgba(0, 0, 0, 0.1)",
            "&.Mui-focused": {
              boxShadow: "0px 5px 25px rgba(0, 0, 0, 0.1)",
            },
          },
        },
      },
    },
    MuiAccordion: {
      styleOverrides: {
        root: {
          backgroundColor: "#fff",
          color: "#3D5A6C",
          boxShadow: "0px 5px 25px rgba(0, 0, 0, 0.1)",
          borderRadius: "8px",
          fontSize: "1.375rem",
          fontWeight: 700,
          fontFamily: openSans.style.fontFamily,
          marginBottom: "1rem",
          "&.MuiPaper-root::before": {
            backgroundColor: "transparent",
          },
          "& .MuiAccordionSummary-root": {
            padding: "1rem",
            border: "none",
            "&.Mui-expanded": {
              borderBottom: "1px solid #E5E5E5",
            },
            "& .MuiAccordionSummary-content": {
              margin: 0,
            },
          },
          "& .MuiAccordionDetails-root": {
            padding: "1rem",
            fontSize: "1.25rem",
            fontWeight: 400,
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        text: {
          textTransform: "none",
          ":hover": {
            backgroundColor: "transparent",
          },
          padding: "0",
          minWidth: "0",
        },
        contained: {
          textTransform: "none",
          fontWeight: 700,
          fontSize: "1.25rem",
          boxShadow: "0px 5px 25px rgba(0, 0, 0, 0.1)",
        },
      },
    },
  },
});

export default theme;
