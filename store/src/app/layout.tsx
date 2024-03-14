import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "react-hot-toast";

import { auth } from "@/auth";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Songbird Instruments",
  description: "Online store for musical instruments",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <SessionProvider session={session}>
      <html lang="en">
        <body className={inter.className}>
          <Toaster position="bottom-center" />
          {children}
        </body>
      </html>
    </SessionProvider>
  );
}
