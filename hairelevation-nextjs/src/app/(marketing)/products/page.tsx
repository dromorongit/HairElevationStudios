/**
 * Products Page
 * Displays all products
 */

import { Metadata } from "next";
import { ProductGrid } from "@/components/shared/ProductGrid";
import { productService } from "@/services/productService";
import type { Product } from "@/types/api/product";

export const metadata: Metadata = {
  title: "Products - Hair Elevation Studio",
  description:
    "Browse our premium wig collection at Hair Elevation Studio. High-quality glueless wigs available in various styles, colors, and lengths.",
};

async function getProducts(): Promise<Product[]> {
  try {
    return await productService.getAllProducts();
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <main>
      <section className="products py-20 px-5">
        <div className="container max-w-[1200px] mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-[#3B2A23] text-center mb-12">
            All Products
          </h1>
          <ProductGrid products={products} />
        </div>
      </section>
    </main>
  );
}
