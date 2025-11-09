import "./globals.css";
import Navbar from "@/components/navbar";
import { Providers } from "./provider";
import { Toaster } from "@/components/ui/sonner";
import SpeedDialMenu from "@/components/speedDialMenu";
import AOSProvider from "@/components/AOSProvider";
import AppThemeProvider from "@/components/ThemeProvider";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { Metadata } from "next";
import Script from "next/script";

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
      <head>
        <Script
          id="organization-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "StayNest",
              url: "https://staynest.online",
              logo: "https://staynest.online/image/logo.png",
              description:
                "StayNest provides affordable, safe, and comfortable stays near exam centers with all essential facilities for students.",
            }),
          }}
        />
      </head>
      <body>
        <AppRouterCacheProvider>
          <div className="relative w-full min-h-screen">
            <AppThemeProvider>
              <Providers>
                <Navbar />
                <AOSProvider />
                {children}
                <SpeedDialMenu />
                <Toaster richColors theme="dark" />
              </Providers>
            </AppThemeProvider>
          </div>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
