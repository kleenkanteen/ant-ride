import "@/styles/globals.css";
import { Analytics } from "@vercel/analytics/react";

import { Inter } from "next/font/google";
import { Toaster } from "sonner";
import { Suspense } from "react";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
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
    <html lang="en" className={inter.className}>
      <body>
        <main className="flex min-h-screen flex-col items-center justify-center bg-gray-800 py-5">
          <div className="flex flex-col items-center gap-12">
            <h1 className="mb-4 text-center text-5xl font-extrabold tracking-tight text-white underline decoration-blue-700 decoration-wavy underline-offset-8 sm:text-[5rem]">
              ant ride
            </h1>
            <Suspense>{children}</Suspense>
            <span className="text-lg font-bold text-white">
              Currently in beta
            </span>
            <span>
              <a
                target="_blank"
                href="https://github.com/kleenkanteen/ant-ride"
              >
                Made with ❤️ by Sabih & co.
              </a>
            </span>
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
