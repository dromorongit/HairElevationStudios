/**
 * Cart Page
 * Replicates cart.html
 */

import { Metadata } from "next";
import { CartPageClient } from "./CartPageClient";

export const metadata: Metadata = {
  title: "Cart - Hair Elevation Studio",
  description: "View and manage your shopping cart at Hair Elevation Studio.",
};

export default function CartPage() {
  return <CartPageClient />;
}
