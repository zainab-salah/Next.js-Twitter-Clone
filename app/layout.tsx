import "./globals.css";
import LeftSidebar from "@/components/HomeSections/Left";
import RightSection from "@/components/HomeSections/Right";
import SupabaseProvider from "./Provider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <div className="w-full h-full flex justify-center items-center relative bg-black text-white">
          <div className="  w-full h-full flex relative">
            <SupabaseProvider>
              <LeftSidebar />
              {children}
              {/* <RightSection /> */}
            </SupabaseProvider>
          </div>
        </div>
      </body>
    </html>
  );
}
