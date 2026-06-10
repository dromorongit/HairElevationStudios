import type { Metadata } from 'next';
import { Playfair_Display, DM_Sans } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ScrollToTop } from '@/components/shared/ScrollToTop';
import { NavigationProgress } from '@/components/shared/NavigationProgress';
import { FloatingWhatsApp } from '@/components/shared/FloatingWhatsApp';
import { ToastProvider } from '@/components/shared/Toast';

const playfairDisplay = Playfair_Display({
  variable: '--font-playfair',
  subsets: ['latin'],
  weight: ['400', '600', '700', '900'],
  display: 'swap',
});

const dmSans = DM_Sans({
  variable: '--font-dm-sans',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
});

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  title: {
    default: 'Hair Elevation Studio — Premium Wigs Accra, Ghana',
    template: '%s | Hair Elevation Studio',
  },
  description: 'Handcrafted luxury wigs in Accra, Ghana. Shop Straight, Wavy/Layers/Bouncy, Curly and Pixie Cut collections. Custom wig making, installation and maintenance services.',
  keywords: ['premium wigs accra', 'luxury wigs ghana', 'bridal wigs accra', 'custom wig making ghana', 'hair elevation studio', 'wigs kanda accra', 'human hair wigs ghana', 'wig installation accra'],
  authors: [{ name: 'Hair Elevation Studio' }],
  creator: 'Dromor Narh',
  publisher: 'Hair Elevation Studio',
  robots: 'index, follow',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://hairelevationstudio.com'),
  openGraph: {
    type: 'website',
    locale: 'en_GH',
    url: 'https://hairelevationstudio.com',
    siteName: 'Hair Elevation Studio',
    title: 'Hair Elevation Studio — Premium Wigs Accra, Ghana',
    description: 'Handcrafted luxury wigs in Accra, Ghana. Custom wig making, installation and maintenance.',
    images: [
      {
        url: '/assets/images/three%20ladies.PNG',
        width: 1200,
        height: 630,
        alt: 'Hair Elevation Studio Premium Wigs',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hair Elevation Studio — Premium Wigs Accra',
    description: 'Handcrafted luxury wigs in Accra, Ghana.',
    images: ['/assets/images/three%20ladies.PNG'],
  },
  icons: {
    icon: '/assets/images/HESLOGO.PNG',
    apple: '/assets/images/HESLOGO.PNG',
  },
  alternates: {
    canonical: 'https://hairelevationstudio.com',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const localBusinessJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Hair Elevation Studio',
    description: 'Premium handcrafted luxury wigs in Accra, Ghana. Custom wig making, installation and maintenance services.',
    url: 'https://hairelevationstudio.com',
    telephone: '0534057109',
    email: 'hairelevationstudio@gmail.com',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Kanda',
      addressLocality: 'Accra',
      addressCountry: 'GH',
    },
    openingHours: 'Tu-Sa 09:00-18:00',
    priceRange: '₵₵₵',
    sameAs: [
      'https://instagram.com/hair_elevation_studio',
      'https://tiktok.com/@hair_elevation_studio',
    ],
  };

  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
        />
      </head>
      <body className={`${playfairDisplay.variable} ${dmSans.variable} antialiased flex flex-col min-h-screen overflow-x-hidden w-full`}>
        <NavigationProgress />
        <Navbar />
        <ToastProvider>
          <main className="flex-1 overflow-x-hidden w-full">
            {children}
          </main>
        </ToastProvider>
        <Footer />
        <ScrollToTop />
        <FloatingWhatsApp />
      </body>
    </html>
  );
}