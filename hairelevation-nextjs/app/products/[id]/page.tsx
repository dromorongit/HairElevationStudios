import { Metadata } from 'next';
import { getProductById, getAllProducts } from '@/lib/api';
import { IProduct } from '@/lib/types';
import ProductClient from './product-client';

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const product = await getProductById(id);

  if (!product) {
    return {
      title: 'Product Not Found | Hair Elevation Studio',
      description: 'The product you are looking for does not exist.',
    };
  }

  const collections = product.collections ? product.collections.join(', ') : '';
  const features = [
    product.texture,
    product.length,
    product.collections ? product.collections.join(', ') : '',
  ].filter(Boolean).join(' • ');

  return {
    title: product.name,
    description: features || `Shop ${product.name} from Hair Elevation Studio`,
    openGraph: {
      images: [
        {
          url: product.coverImage,
          alt: product.name,
        },
      ],
    },
    alternates: {
      canonical: `https://hairelevationstudio.com/products/${product._id}`,
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const { id } = await params;
  const [product, allProducts] = await Promise.all([
    getProductById(id),
    getAllProducts(),
  ]);

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