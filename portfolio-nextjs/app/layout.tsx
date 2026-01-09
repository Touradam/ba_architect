import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Aminata Bah | M.Arch Student Portfolio",
  description: "Masters in Architecture student seeking Summer 2026 internship. Passionate about sustainable and innovative design.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}

