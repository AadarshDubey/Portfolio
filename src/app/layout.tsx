import type { Metadata } from "next";
import { Inter, Outfit, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { Toaster } from "sonner";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit", display: "swap" });
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
  display: "swap"
});

export const metadata: Metadata = {
  title: "Aadarsh Dubey | GenAI Developer",
  description: "Building production-grade AI applications, RAG systems, and intelligent agents.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${outfit.variable} ${spaceGrotesk.variable} font-sans antialiased selection:bg-accent/30 selection:text-accent-light transition-colors duration-300`}
      >
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <div className="fixed inset-0 z-[100] pointer-events-none">
            <CustomCursor />
          </div>
          <div className="relative z-10 flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow pt-20">{children}</main>
            <Footer />
          </div>
          <Toaster position="bottom-right" theme="system" />
        </ThemeProvider>
      </body>
    </html>
  );
}
