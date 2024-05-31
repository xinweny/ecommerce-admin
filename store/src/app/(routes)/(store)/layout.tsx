import type { Metadata } from "next";

import { auth } from "@/auth";

import { Navbar } from "./_components/navbar";
import { Footer } from "./_components/footer";

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
    <>
      <Navbar />
      <main className="grow space-y-10 p-8">
        {children}
      </main>
      <Footer />
    </>
  );
}
