import MarketplacePage from "@/feat/marketplace";
import { Metadata } from "next";
import { getLocale, getMessages } from "next-intl/server";
import Head from "next/head";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Marketplace',
    description: 'Marketplace',
    keywords: 'Marketplace',
    openGraph: {
      title: 'Marketplace',
      description: 'Marketplace',
      url: '/',
      type: 'website',
    },
  }
}

export default function Home() {
  return (
    <div className="min-h-screen">
      <MarketplacePage/>
    </div>
  );
}
