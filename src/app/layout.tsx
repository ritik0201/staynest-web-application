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
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "StayNest – Affordable Rooms & Rentals in Prayagraj",
  description:
    "StayNest offers affordable, safe, and comfortable rooms for students and travelers in Prayagraj. Find your perfect stay today!",
  icons: {
    icon: "/image/logo.png",
  },
  metadataBase: new URL("https://staynest.online"),
  openGraph: {
    title: "StayNest – Affordable Rooms & Rentals in Prayagraj",
    description:
      "Book verified, affordable rooms with StayNest. Ideal for students and travelers near exam centers in Prayagraj.",
    url: "https://staynest.online",
    siteName: "StayNest",
    images: [
      {
        url: "/image/logo.png",
        width: 800,
        height: 600,
        alt: "StayNest Logo",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "StayNest – Affordable Rooms & Rentals in Prayagraj",
    description:
      "Find comfortable and affordable rooms for students and travelers in Prayagraj with StayNest.",
    images: ["/image/logo.png"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.className} dark`}>
      <head>
        <Script
          id="organization-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "StayNest",
              "url": "https://staynest.online",
              "logo": "https://staynest.online/image/logo.png",
              "description":
                "StayNest provides affordable, safe, and comfortable stays near exam centers for students and travelers in Prayagraj.",
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+91-9555503658",
                "contactType": "Customer Service",
              },
              "sameAs": [
                "https://www.instagram.com/r2iitiik_.xii._/",
                "https://www.linkedin.com/in/ritik-kumar-058694318/",
                "https://github.com/ritik2177",
                "https://x.com/RitikKumar40926",
              ],
            }),
          }}
        />

        <Script
          id="website-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "StayNest",
              "url": "https://staynest.online",
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
                <SpeedInsights />
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
