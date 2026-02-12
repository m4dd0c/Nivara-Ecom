import React from "react";
import { Poppins } from "next/font/google";
import { ThemeProvider } from "$/components/ui/theme-provider";
import "../globals.css";
import { Toaster } from "$/components/ui/toaster";
import QueryProvider from "$/components/contexts/QueryProvider";
import Header from "$/components/shared/Header";
import Footer from "$/components/shared/Footer";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={poppins.className}>
        <>
          <QueryProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              {/* Promo Banner */}
              <div className="grid h-8 w-full place-items-center bg-foreground text-center text-sm font-extralight text-background">
                <p>Get 20% off on purchase now!!!</p>
              </div>
              {/* Sticky Header */}
              <div className="sticky top-0 z-40 bg-background shadow-md">
                <Header />
              </div>
              {/* Main Content */}
              <main className="min-h-screen">{children}</main>
              {/* Footer */}
              <Footer />
              <Toaster />
            </ThemeProvider>
          </QueryProvider>
        </>
      </body>
    </html>
  );
}
