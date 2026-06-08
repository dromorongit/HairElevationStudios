import type { Metadata } from "next";
import { Playfair_Display, Roboto } from "next/font/google";
import "./globals.css";
import { generateLocalBusinessSchema, generateWebsiteSchema, JsonLdScript } from "@/lib/structured-data";

const playfairDisplay = Playfair_Display({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  display: "swap",
  preload: true,
  fallback: ["Georgia", "serif"],
});

const roboto = Roboto({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  preload: true,
  fallback: ["Segoe UI", "sans-serif"],
});

export const metadata: Metadata = {
  title: {
    default: "Hair Elevation Studio — Premium Wigs",
    template: "%s | Hair Elevation Studio",
  },
  description:
    "Hair Elevation is a premium wig brand specializing in high quality glueless wigs, custom coloring, styling, and luxury wig experiences for modern women in Accra, Ghana.",
  keywords: [
    "wigs",
    "premium wigs",
    "glueless wigs",
    "hair extensions",
    "wig installation",
    "custom wigs",
    "Ghana",
    "Accra",
    "luxury wigs",
    "human hair wigs",
  ],
  authors: [{ name: "Hair Elevation Studio" }],
  creator: "Hair Elevation Studio",
  publisher: "Hair Elevation Studio",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://hairelevationstudios.com"),
  alternates: {
    canonical: "https://hairelevationstudios.com",
  },
  openGraph: {
    title: "Hair Elevation Studio — Premium Wigs",
    description:
      "Premium glueless wigs, custom coloring, styling, and luxury wig experiences for modern women in Accra, Ghana.",
    type: "website",
    locale: "en_GH",
    url: "https://hairelevationstudios.com",
    siteName: "Hair Elevation Studio",
    images: [
      {
        url: "/HESLOGO.PNG",
        width: 1200,
        height: 630,
        alt: "Hair Elevation Studio - Premium Wigs",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hair Elevation Studio — Premium Wigs",
    description:
      "Premium glueless wigs, custom coloring, styling, and luxury wig experiences for modern women in Accra, Ghana.",
    images: ["/HESLOGO.PNG"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfairDisplay.variable} ${roboto.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {/* Structured Data */}
        <JsonLdScript data={generateLocalBusinessSchema()} />
        <JsonLdScript data={generateWebsiteSchema()} />
        {children}
      </body>
    </html>
  );
}
