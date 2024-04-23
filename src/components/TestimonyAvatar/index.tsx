import { Box } from "@mui/material";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";

interface TestimonyAvatarProps {
  image: string;
  alt: string;
}

const TestimonyAvatar = ({ image, alt }: TestimonyAvatarProps) => {
  return (
    <Box
      position={{ xs: "relative", sm: "absolute" }}
      top={0}
      left={0}
      border={"2px solid"}
      borderRadius={"50%"}
      p={"7px"}
      borderColor={"#F39000"}
    >
      <Box
        component="img"
        borderRadius={"50%"}
        src={image}
        alt={alt}
        width={"98px"}
        height={"98px"}
      />
      <Box
        width={"32px"}
        height={"32px"}
        borderRadius={"50%"}
        bgcolor={"#F39000"}
        position={"absolute"}
        top={0}
        right={0}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <FormatQuoteIcon sx={{ color: "white" }} />
      </Box>
    </Box>
  );
};

export default TestimonyAvatar;
