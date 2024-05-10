import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "react-hot-toast";

import { auth } from "@/auth";

import { cn } from "@/lib/utils";

import { Navbar } from "./_components/navbar";
import { Footer } from "./_components/footer";

import "../../globals.css";

const font = Montserrat({ subsets: ["latin"] });

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
        <body className={cn(font.className, "flex flex-col")}>
          <Toaster position="top-center" />
          <Navbar />
          <main className="grow space-y-10 p-8">
            {children}
          </main>
          <Footer />
        </body>
      </html>
    </SessionProvider>
  );
}
