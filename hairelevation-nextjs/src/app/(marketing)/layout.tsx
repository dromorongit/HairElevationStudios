/**
 * Marketing Layout
 * Shared layout for all public-facing pages with header and footer
 */

import { Header } from "@/components/shared/Header";
import { Footer } from "@/components/shared/Footer";
import { WhatsAppFloat } from "@/components/shared/WhatsAppFloat";
import { ErrorBoundary } from "@/components/shared/ErrorBoundary";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#F5EFE6] via-[#E8D5C4] to-[#F0E6D8] text-[#3B2A23]">
      <Header />
      <main className="flex-1">
        <ErrorBoundary>{children}</ErrorBoundary>
      </main>
      <Footer />
      <WhatsAppFloat />
    </div>
  );
}
