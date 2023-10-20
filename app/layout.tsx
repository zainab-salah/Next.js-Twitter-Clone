import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import LeftSidebar from "@/components/HomeSections/Left";
import RightSection from "@/components/HomeSections/Right";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="w-full h-full flex justify-center items-center relative bg-black text-white">
          <div className="  w-full h-full flex relative">
            <LeftSidebar />
            {children}
            <RightSection />
          </div>
        </div>
      </body>
    </html>
  );
}
