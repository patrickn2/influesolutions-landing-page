import theme from "@/theme";
import { ThemeProvider } from "@mui/material";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import "./global.css";
import ReCaptchaProvider from "@/Providers/ReCaptchaProvider";
import { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://influesolutions.com"),
  title: "Influesolutions - Soluções para monetizar seu negócio.",
  alternates: {
    canonical: "/",
  },
  description:
    "Com a Influesolutions você aumenta o faturamento do seu canal do Youtube ou Site sem perder o foco do seu negócio.",
  icons: ["/favicon.ico"],
  openGraph: {
    title: "Influesolutions - Soluções para monetizar seu negócio.",
    description:
      "Com a Influesolutions você aumenta o faturamento do seu canal do Youtube ou Site sem perder o foco do seu negócio.",
    images: [
      {
        url: "/images/social.png",
        alt: "Influesolutions",
      },
    ],
    url: "https://influesolutions.com",
  },
  twitter: {
    images: [
      {
        url: "/images/social.png",
        alt: "Influesolutions",
      },
    ],
    description:
      "Com a Influesolutions você aumenta o faturamento do seu canal do Youtube ou Site sem perder o foco do seu negócio.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body>
        <AppRouterCacheProvider>
          <ReCaptchaProvider>
            <ThemeProvider theme={theme}>{children}</ThemeProvider>
          </ReCaptchaProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
