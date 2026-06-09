"use client";

import { motion } from 'framer-motion';
import { IProduct } from '@/lib/types';
import { toArray } from '@/lib/utils';
import { ProductCard } from './ProductCard';
import { SectionHeading } from './SectionHeading';

interface RelatedProductsProps {
  currentProduct: IProduct;
  allProducts: IProduct[];
}

export function RelatedProducts({ currentProduct, allProducts }: RelatedProductsProps) {
  const relatedProducts = allProducts
    .filter((product) => 
      product._id !== currentProduct._id &&
      toArray(product.collections).some((collection) =>
        toArray(currentProduct.collections).includes(collection)
      )
    )
    .slice(0, 4);

  if (relatedProducts.length === 0) {
    return null;
  }

  return (
    <section className="py-16 px-6 max-w-7xl mx-auto">
      <SectionHeading
        title="You May Also Love"
        subtitle="More pieces from our collection"
        align="center"
      />
      
      <motion.div
        className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={{
          initial: {},
          animate: {
            transition: {
              staggerChildren: 0.1,
            },
          },
        }}
      >
        {relatedProducts.map((product) => (
          <motion.div
            key={product._id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <ProductCard product={product} />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}