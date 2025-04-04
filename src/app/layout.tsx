import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import QueryProvider from "@/lib/providers/query-client";
import { Layout as AntLayout, ConfigProvider, theme } from 'antd';
import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getLocale } from "next-intl/server";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import React from "react";
import LoadingScreen from "@/components/common/LoadingScreen";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,

}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <QueryProvider>
          <NextIntlClientProvider>
            <React.Suspense fallback={<LoadingScreen />}>

              <ConfigProvider
                theme={{
                  algorithm: theme.darkAlgorithm,
                  token: {
                    colorPrimary: '#e91e63',
                    colorBgBase: '#0a0a1a',
                    borderRadius: 8,
                  },
                  components: {
                    Button: {
                      colorPrimary: '#e91e63',
                    },
                    Input: {
                      colorBgBase: '#1a1a2e',
                      colorBorder: '#333',
                    },
                    Select: {
                      colorBgBase: '#1a1a2e',
                      colorBorder: '#333',
                    },
                    Card: {
                      colorBgBase: '#1a1a2e',
                    },
                  },
                }}
              >
                <AntLayout className="min-h-screen">

                  <Navbar lang={locale} />
                  {/* <AntLayout.Content> */}
                  {/* <AnimatePresence mode="wait">
                  <motion.div
                    key={`content`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  > */}

                  {children}
                  {/* </motion.div>
                </AnimatePresence> */}
                  {/* </AntLayout.Content> */}
                  <Footer />
                </AntLayout>
              </ConfigProvider>
            </React.Suspense>
          </NextIntlClientProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
