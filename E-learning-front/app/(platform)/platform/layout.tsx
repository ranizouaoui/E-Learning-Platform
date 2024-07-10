import React from "react";

import { Navbar } from "@/components/marketing/navbar";

export default function PlatformRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar />
      <main className="py-6">{children}</main>
    </>
  );
}
