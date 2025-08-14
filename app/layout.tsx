
import "./globals.css";
import "@coinbase/onchainkit/styles.css";
import type { Metadata, Viewport } from "next";
import { Providers } from "./providers";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "StreamSellr - Live Shopping Revolution",
  description: "Turn your livestreams into revenue machines with seamless social shopping",
  other: {
    "fc:frame": JSON.stringify({
      version: "next",
      imageUrl: "/hero.png",
      button: {
        title: "Launch StreamSellr",
        action: {
          type: "launch_frame",
          name: "StreamSellr",
          url: process.env.NEXT_PUBLIC_URL || "http://localhost:3000",
          splashImageUrl: "/splash.png",
          splashBackgroundColor: "#1e293b",
        },
      },
    }),
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-bg">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
