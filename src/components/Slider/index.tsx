import { styled } from "@mui/material";
import { Splide } from "react-splide-ts";

const StyledSlider = styled(Splide)(({ theme }) => ({
  ".splide__track": {
    marginLeft: "100px",
    marginRight: "100px",
    paddingBottom: "50px",
  },
  [theme.breakpoints.down("sm")]: {
    ".splide__track": {
      marginLeft: "0px",
      marginRight: "0px",
    },
  },
  ".splide__arrow": {
    width: "60px",
    height: "60px",
    border: "none",
    cursor: "pointer",
    fontSize: "1.875rem",
    backgroundColor: "#fff",
    boxShadow: "0px 5px 25px rgba(0, 0, 0, 0.1)",
    svg: {
      fill: theme.palette.primary.main,
    },
    "&.hover": {
      boxShadow: "0px 5px 25px rgba(0, 0, 0, 0.2)",
    },
  },
  ".splide__arrow--prev": {
    left: "0.5em",
  },
  ".splide__arrow--next": {
    right: "0.5em",
  },

  ".splide__slide": {
    display: "flex",
    justifyContent: "center",
  },
  ".splide__pagination__page": {
    marginLeft: "10px",
    width: "23px",
    height: "23px",
    boxShadow: "0px 0px 0 2px #C9DFF6",
    backgroundColor: "transparent",
    border: "3px solid transparent",
    transition: "all 0.3s ease-in-out",
    "&.is-active": {
      transform: "none",
      backgroundColor: theme.palette.primary.main,
      borderColor: theme.palette.primary.main,
      border: "3px solid #fff",
      transition: "all 0.3s ease-in-out",
    },
  },
}));

export default StyledSlider;
