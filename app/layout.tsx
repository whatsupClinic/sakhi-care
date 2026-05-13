import type { Metadata } from "next";
import { Roboto, Noto_Sans_Devanagari } from "next/font/google";
import "./globals.css";

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

const notoDev = Noto_Sans_Devanagari({
  variable: "--font-noto-devanagari",
  subsets: ["devanagari"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://sakhi-care-one.vercel.app"),
  title: "SakhiCare — A free doctor in every village, one WhatsApp message away",
  description:
    "Har Sakhi ki Awaaz · Har Sakhi ki Sehat. Voice-first WhatsApp telemedicine for rural Indian women — ABHA, ASHA, Anganwadi, and 13 govt schemes in one chat.",
  openGraph: {
    title: "SakhiCare — WhatsApp Telemedicine for Rural Women",
    description:
      "Voice-first triage in 4 languages. ABHA records, ASHA + Anganwadi follow-up, 13 govt schemes — all inside WhatsApp.",
    images: ["/logo.png"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SakhiCare",
    description: "WhatsApp telemedicine for rural Indian women's health.",
    images: ["/logo.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${roboto.variable} ${notoDev.variable}`}>
      <body>{children}</body>
    </html>
  );
}
