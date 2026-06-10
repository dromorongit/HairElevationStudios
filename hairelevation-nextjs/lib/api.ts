import axios from 'axios';
import { IProduct } from './types';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

interface CacheData {
  products?: IProduct[];
  featured?: IProduct[];
  timestamp?: number;
}

const cache: CacheData = {};
const CACHE_TTL = 300000; // 5 minutes

export async function getAllProducts(): Promise<IProduct[]> {
  const now = Date.now();
  if (cache.products && cache.timestamp && now - cache.timestamp < CACHE_TTL) {
    return cache.products;
  }
  const response = await api.get('/products');
  cache.products = response.data;
  cache.timestamp = now;
  return response.data;
}

export async function getFeaturedProducts(): Promise<IProduct[]> {
  const now = Date.now();
  if (cache.featured && cache.timestamp && now - cache.timestamp < CACHE_TTL) {
    return cache.featured;
  }
  const response = await api.get('/products/featured');
  cache.featured = response.data;
  cache.timestamp = now;
  return response.data;
}

export async function getProductById(id: string): Promise<IProduct> {
  const response = await api.get(`/products/${id}`);
  return response.data;
}

export async function uploadPaymentProof(file: File): Promise<{ url: string }> {
  const formData = new FormData();
  formData.append('paymentProof', file);
  const response = await api.post('/products/upload-payment-proof', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
}