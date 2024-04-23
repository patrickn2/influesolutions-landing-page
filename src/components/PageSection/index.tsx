import { Box, Container, Grid, Typography } from "@mui/material";

interface PageSectionProps {
  id?: string;
  children?: React.ReactNode;
  title?: string;
  subtitle?: string;
  bgcolor?: string;
}
const PageSection = ({
  id,
  children,
  title,
  subtitle,
  bgcolor = "transparent",
}: PageSectionProps) => {
  return (
    <Box bgcolor={bgcolor} id={id}>
      <Container maxWidth="xl">
        <Box py={{ xs: 5, md: 10 }} textAlign={{ xs: "center", md: "start" }}>
          {!!title && (
            <Typography variant="h2" fontSize={{ xs: "2.8rem", sm: undefined }}>
              {title}
            </Typography>
          )}
          {!!subtitle && (
            <Typography
              variant="body2"
              mt={3}
              width={{ xs: "100%", md: "50%" }}
            >
              {subtitle}
            </Typography>
          )}
          <Box mt={!!subtitle || !!title ? { xs: 5, md: 10 } : 0}>
            {children}
          </Box>
        </Box>
      </Container>
    </Box>
  );
};
export default PageSection;
