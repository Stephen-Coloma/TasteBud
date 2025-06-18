import type { Metadata } from "next";
import { Inter } from "next/font/google";
import '../styles/globals.css'

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TasteBud",
  description: "Showcases recipes of the different dishes! Look and learn how to cook great food!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
