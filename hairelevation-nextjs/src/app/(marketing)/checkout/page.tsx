/**
 * Checkout Page
 * Replicates checkout.html
 */

import { Metadata } from "next";
import { CheckoutPageClient } from "./CheckoutPageClient";

export const metadata: Metadata = {
  title: "Checkout - Hair Elevation Studio",
  description:
    "Complete your purchase at Hair Elevation Studio. Secure checkout for wig products.",
};

export default function CheckoutPage() {
  return <CheckoutPageClient />;
}
