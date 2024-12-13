import type { Metadata } from "next";
import { Poppins } from "next/font/google"
import "./globals.css";
import { Toaster } from "react-hot-toast";


const poppins = Poppins({
  weight: ['100','500'],
  style:'normal',
  subsets: ['latin']
})

export const metadata: Metadata = {
  title: "Cheat Checker",
  description: "Helps you be productive and accountable.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.className}  antialiased`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
