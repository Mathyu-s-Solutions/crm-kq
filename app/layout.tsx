import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/layout/Sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CRM KQ Asesores & Contadores",
  description: "Sistema de gestión integral para clientes contables y tributarios",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={`${geistSans.variable} font-sans antialiased`}>
        <TooltipProvider>
          <div className="flex min-h-screen bg-background">
            <Sidebar />
            <main className="flex-1 lg:ml-64 transition-all duration-300">
              {children}
            </main>
          </div>
        </TooltipProvider>
      </body>
    </html>
  );
}
