import "./globals.css";
import type { Metadata } from "next";
import { Kosugi_Maru as KosugiMaru } from "next/font/google";
import React from "react";

const kosugiMaru = KosugiMaru({
  weight: ["400"],
  preload: false,
});

export const metadata: Metadata = {
  title: "natsuume.dev（仮）",
  description: "natsuumeのSandbox兼ポートフォリオページ予定地",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="jp" className="base">
      <body className={[kosugiMaru.className, "base"].join(" ")}>
        {children}
      </body>
    </html>
  );
}
