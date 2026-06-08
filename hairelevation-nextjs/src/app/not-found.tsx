/**
 * 404 Not Found Page
 * Custom 404 page with proper SEO
 */

import Link from "next/link";
import { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import { ROUTES } from "@/constants/brand";

export const metadata: Metadata = {
  title: "Page Not Found - Hair Elevation Studio",
  description: "The page you are looking for does not exist. Return to Hair Elevation Studio homepage.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFound() {
  return (
    <main className="flex min-h-[60vh] flex-col items-center justify-center px-5 py-16">
      <div className="text-center max-w-md">
        <h1 className="text-[6rem] font-bold text-[#C8A97E] mb-4">404</h1>
        <h2 className="text-[2rem] font-bold text-[#3B2A23] mb-4">
          Page Not Found
        </h2>
        <p className="text-[#666666] mb-8">
          The page you are looking for does not exist or has been moved.
          Please check the URL or return to our homepage.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asLink href={ROUTES.home} size="lg">
            Go to Homepage
          </Button>
          <Button asLink href={ROUTES.products} variant="secondary" size="lg">
            View Products
          </Button>
        </div>
      </div>
    </main>
  );
}