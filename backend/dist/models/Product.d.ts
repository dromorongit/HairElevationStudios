import mongoose, { Document } from 'mongoose';
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
declare const _default: mongoose.Model<IProduct, {}, {}, {}, mongoose.Document<unknown, {}, IProduct, {}, {}> & IProduct & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
}, any>;
export default _default;
