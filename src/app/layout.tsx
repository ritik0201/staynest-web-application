import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import { Providers } from "./provider";
import { Toaster } from "@/components/ui/sonner";
import AOSProvider from "@/components/AOSProvider";
import SocialMediaSpeedDial from "@/components/speedDialMenu";
import AppThemeProvider from "@/components/ThemeProvider";

const inter = Inter({ subsets: ["latin"] });

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
      <body className={inter.className}>
        <AppThemeProvider>
        <Providers>
          <Navbar />
          <AOSProvider />
          {children}
          <SocialMediaSpeedDial />
          <Toaster />
        </Providers>
        </AppThemeProvider>
      </body>
    </html>
  );
}
