import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ReactNode } from "react";
import { ThemeProvider} from "@/components/theme-provider";
import QueryProvider from "@/providers/QueryProvider";
import { Toaster } from "@/components/ui/toaster"
import GoogleProvider from "@/providers/GoogleProvider";
import AppProvider from "@/providers/AppProvider";
const inter = Inter({ subsets: ["latin"] });
export const metadata: Metadata = {
  title: "B-An",
  description: "website blog app",
};

export default function RootLayout({
  children,
}: {
  children: Readonly<ReactNode>;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <GoogleProvider>
          <QueryProvider>
            <AppProvider>
              <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
                disableTransitionOnChange
              >
                <main>
                  {children}
                </main>
                <Toaster />
              </ThemeProvider>
            </AppProvider>
          </QueryProvider>
        </GoogleProvider>
      </body>
    </html>
  );
}
