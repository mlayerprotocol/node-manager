import localFont from "next/font/local";

export const aeonikFont = localFont({
  src: [
    {
      path: "../assets/fonts/aeonik/Aeonik-Regular.ttf",
      style: "normal",
      weight: "400",
    },
    {
      path: "../assets/fonts/aeonik/Aeonik-Bold.ttf",
      style: "normal",
      weight: "700",
    },
  ],
  variable: "--font-aeonik",
});
