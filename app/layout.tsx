import type { Metadata } from "next";
import "./globals.css";
import Providers from '@/components/providers/Providers';
import Navbar from '@/components/Navbar';
//import AuthStatus from '@/components/auth/AuthStatus';

export const metadata: Metadata = {
  title: "ShopHub - Your Ultimate E-commerce Destination",
  description: "Discover amazing products with secure shopping and fast delivery",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50">
        <Providers>
          <Navbar />
          <main className="min-h-screen">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
