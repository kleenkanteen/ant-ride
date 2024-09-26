import "@/styles/globals.css";
import { Analytics } from "@vercel/analytics/react";

import { Inter } from "next/font/google";
import Link from "next/link";
import { Suspense } from "react";
import { Toaster } from "sonner";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "ant ride",
  description: "Carpool",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
  alternates: {
    canonical: './',
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.className}>
      <body>
        <main className="flex min-h-screen w-full flex-col items-center justify-center bg-gray-800 py-10">
          <div className="flex flex-col items-center justify-center gap-12">
            <h1 className="mb-4 text-center text-5xl font-extrabold tracking-tight text-white underline decoration-blue-700 decoration-wavy underline-offset-8 sm:text-[5rem]">
              ant ride
            </h1>
            <span className="text-lg font-bold text-white">
              Currently in beta
            </span>
            <Suspense>{children}</Suspense>
            <div className="flex flex-col items-center justify-center space-y-6 ">

              <Link
                href="/about"
                className="btn btn-outline btn-sm -mt-5"
              >
                Demo
              </Link>

              <a
                  target="_blank"
                  href="https://github.com/kleenkanteen/ant-ride"
                >
                  Made with ❤️ by Sabih & co.
              </a>
              
                <Link
                  target="_blank"
                  href="https://ant-ride.ducalis.io/demo-board">
                  Send feedback
                </Link>
                <Link
                  href="/privacy-policy">
                  Privacy Policy
                </Link>
                <Link
                  href="/terms-of-service">
                  Terms of Service
                </Link>
            </div>
            <Toaster
              toastOptions={{
                unstyled: true,
                classNames: {
                  toast: "alert",
                  error: "alert-error",
                  success: "alert-success",
                  warning: "alert-warning",
                  info: "alert-info",
                },
              }}
            />
            <Analytics />
          </div>
        </main>
      </body>
    </html>
  );
}
