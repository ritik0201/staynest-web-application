import "./globals.css";
import Navbar from "@/components/navbar";
import { Providers } from "./provider";
import { Toaster } from "@/components/ui/sonner";
import SpeedDialMenu from "@/components/speedDialMenu";
import AOSProvider from "@/components/AOSProvider";
import AppThemeProvider from "@/components/ThemeProvider";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "StayNest",
  description: "Find the comfort of your home at affordable prices.",
  icons: {
    icon: "/image/logo.png",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body>
        <AppRouterCacheProvider>
          <div className="relative w-full min-h-screen">
            <AppThemeProvider>
            <Providers>
              <Navbar />
              <AOSProvider /> 
              {children}
              <SpeedDialMenu />
              <Toaster richColors theme="dark"/>
            </Providers>
            </AppThemeProvider>
          </div>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
