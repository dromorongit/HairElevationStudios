import axios from 'axios';
import { IProduct } from './types';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

export const PAYSTACK_PUBLIC_KEY = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY || '';

export async function getAllProducts(): Promise<IProduct[]> {
  const response = await api.get('/products');
  return response.data;
}

export async function getFeaturedProducts(): Promise<IProduct[]> {
  const response = await api.get('/products/featured');
  return response.data;
}

export async function getProductById(id: string): Promise<IProduct> {
  const response = await api.get(`/products/${id}`);
  return response.data;
}

export async function uploadPaymentProof(file: File): Promise<{ url: string }> {
  const formData = new FormData();
  formData.append('paymentProof', file);
  const response = await api.post('/payments/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
}