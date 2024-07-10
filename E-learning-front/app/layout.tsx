import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import { CookiesProvider } from "next-client-cookies/server";

import "./globals.css";

const font = Nunito({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "تعلم اونلاين",
  description: "تعلم اونلاين",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={font.className}>
        <CookiesProvider>{children}</CookiesProvider>
      </body>
    </html>
  );
}
