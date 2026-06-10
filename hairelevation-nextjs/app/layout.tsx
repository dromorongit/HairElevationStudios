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
});

const dmSans = DM_Sans({
  variable: '--font-dm-sans',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: 'Hair Elevation Studio — Premium Wigs Accra',
  description: "Handcrafted luxury wigs in Accra, Ghana. Shop Straight, Wavy/Layers/Bouncy, Curly and Pixie Cut collections.",
  icons: {
    icon: '/assets/images/HESLOGO.PNG',
    apple: '/assets/images/HESLOGO.PNG',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${playfairDisplay.variable} ${dmSans.variable} antialiased flex flex-col min-h-screen`}>
        <NavigationProgress />
        <Navbar />
        <ToastProvider>
          <main className="flex-1">
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