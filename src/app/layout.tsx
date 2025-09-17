import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/navbar";
import { Providers } from "./provider";
// import { Toaster } from "react-hot-toast";
import { Toaster } from "@/components/ui/sonner"

import SocialMediaSpeedDial from "@/components/speedDialMenu";
import AOSProvider from "@/components/AOSProvider";
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
        <AOSProvider />
        {children}
        <SocialMediaSpeedDial />
        <Toaster />
        </Providers>
      </body>
    </html>
  );
}
