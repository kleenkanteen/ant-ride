import "@/styles/globals.css";

import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "ant ride",
  description: "Carpool",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`font-sans ${inter.variable}`}>
      <main className="flex min-h-screen flex-col items-center justify-center">
        <div className="flex flex-col gap-4">
          <h1 className="text-center text-5xl font-extrabold tracking-tight text-white sm:text-[5rem] mb-4">
            ant ride
          </h1>
          {children}
        </div>      
      </main>
      </body>
    </html>
  );
}
