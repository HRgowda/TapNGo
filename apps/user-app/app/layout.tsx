import "./globals.css";
import type { Metadata } from "next";
import { Providers } from "../provider";

export const metadata: Metadata = {
  title: "tapNgo",
  description: "Financial application",
  icons:{
    icon: '/favicon.ico'
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <html lang="en">
      <Providers>
        <body>
          <div className="min-w-screen min-h-screen bg-gray-700">
            {/* <AppbarClient /> */}
            {children}
          </div>
        </body>
      </Providers>
    </html>
  );
}