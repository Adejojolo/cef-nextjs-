import "./globals.css";
import { ReactNode } from "react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { Outfit } from 'next/font/google';

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
});

/**
 * RootLayout is the main layout component that wraps all pages with Navbar and Footer.
 * 
 * @param {Object} props
 * @param {ReactNode} props.children - The content to be rendered within the layout.
 */
export default function RootLayout({ children }: { children: ReactNode; }) {
  return (
    <html lang="en" className={`${outfit.variable}`}>
      <body className={`${outfit.className} bg-white text-black antialiased`}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}