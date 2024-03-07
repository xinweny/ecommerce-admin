"use client";

import { SessionProvider } from "next-auth/react";

type PropTypes = {
  children: React.ReactNode;
};

export function Providers({
  children
}: PropTypes) {
  return (
    <SessionProvider>
      {children}
    </SessionProvider>
  );
}