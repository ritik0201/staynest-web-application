import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/navbar";
import { Providers } from "./provider";
import { Toaster } from "react-hot-toast";
import SocialMediaSpeedDial from "@/components/speedDialMenu";

export const metadata: Metadata = {
  title: "Student Stay",
  description: "Find your perfect student accommodation",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>
        <Navbar />
        {children}
        <SocialMediaSpeedDial />
        <Toaster />
        </Providers>
      </body>
    </html>
  );
}
