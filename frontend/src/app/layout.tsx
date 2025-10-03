import type { Metadata } from "next";
import { Michroma, Exo_2 } from "next/font/google";
import { SocketProvider } from "@/context/SocketContext";
import { NavBar } from "@/components/Navbar";
import "@/app/globals.css";

const michroma = Michroma({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-logo",
});

const exo2 = Exo_2({
  subsets: ["latin"],
  weight: ["300", "400", "600"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: "Coldframe Dashboard",
  description: "Real-time garden monitoring",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${michroma.variable} ${exo2.variable}`}>
        <NavBar />
        <SocketProvider>{children}</SocketProvider>
      </body>
    </html>
  );
}
