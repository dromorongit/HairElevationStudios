import { Metadata } from 'next';
import { getProductById, getAllProducts } from '@/lib/api';
import { IProduct } from '@/lib/types';
import ProductClient from './product-client';

export const metadata: Metadata = {
  title: 'Product | Hair Elevation Studio',
  description: 'Shop premium handcrafted wigs from Hair Elevation Studio.',
  robots: 'index, follow',
  alternates: {
    canonical: 'https://hairelevationstudio.com/collections',
  },
};

export async function generateStaticParams() {
  try {
    const products = await getAllProducts();
    const params = products.map((product) => ({ id: product._id }));
    if (params.length > 0) return params;
  } catch {
    // API unreachable at build time — fall through to a safe fallback below
  }
  // Ensure the static export build always has at least one param.
  // This route renders a "Product Not Found" state for unknown ids.
  return [{ id: 'not-found' }];
}

interface Props {
  params: Promise<{ id: string }>;
}

export default async function ProductPage({ params }: Props) {
  const { id } = await params;

  let product: IProduct | null = null;
  let allProducts: IProduct[] = [];

  try {
    [product, allProducts] = await Promise.all([
      getProductById(id),
      getAllProducts(),
    ]);
  } catch {
    product = null;
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-[var(--bg-primary)] flex items-center justify-center">
        <div className="text-center px-4">
          <h1 className="text-3xl font-heading font-bold text-[var(--text-primary)] mb-4">
            Product Not Found
          </h1>
          <p className="text-[var(--text-muted)] font-body mb-6">
            This product may have been removed or is no longer available.
          </p>
          <a href="/collections" className="text-[var(--brand-gold)] hover:underline">
            Back to Collections
          </a>
        </div>
      </div>
    );
  }

  const productJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description || `Premium wig from Hair Elevation Studio`,
    image: product.coverImage,
    offers: {
      '@type': 'Offer',
      price: product.onSale && product.promoPrice ? product.promoPrice : product.price,
      priceCurrency: 'GHS',
      availability: product.inStock ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
    },
    brand: {
      '@type': 'Brand',
      name: 'Hair Elevation Studio',
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <ProductClient product={product} allProducts={allProducts} />
    </>
  );
}
