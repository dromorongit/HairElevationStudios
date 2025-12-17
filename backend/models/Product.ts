import mongoose, { Document, Schema } from 'mongoose';

export interface IProduct extends Document {
  name: string;
  description?: string;
  length?: string;
  lace?: string;
  density?: string;
  texture?: string;
  quality?: string;
  price: number;
  color?: string;
  size?: string[];
  onSale: boolean;
  promoPrice?: number;
  featured: boolean;
  collections: string[];
  coverImage: string;
  additionalImages: string[];
  videos: string[];
  stock: number;
  inStock: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema: Schema = new Schema({
  name: { type: String, required: true },
  description: { type: String },
  length: { type: String },
  lace: { type: String },
  density: { type: String },
  texture: { type: String },
  quality: { type: String },
  price: { type: Number, required: true },
  color: { type: String },
  size: { type: [String], enum: ['Small', 'Medium', 'Large'] },
  onSale: { type: Boolean, default: false },
  promoPrice: { type: Number },
  featured: { type: Boolean, default: false },
  collections: { type: [String], enum: ['The Bridal Crowns', 'The Everyday Crown', 'The Queen\'s Curls', 'The Signature Pixies'] },
  coverImage: { type: String, required: true },
  additionalImages: { type: [String], default: [] },
  videos: { type: [String], default: [] },
  stock: { type: Number, default: 0 },
  inStock: { type: Boolean, default: true }
}, {
  timestamps: true
});

export default mongoose.model<IProduct>('Product', ProductSchema);