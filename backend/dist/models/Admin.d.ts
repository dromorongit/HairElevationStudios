import { Document } from 'mongoose';
export interface IAdmin extends Document {
    username: string;
    email: string;
    password: string;
    createdAt: Date;
}
declare const _default: any;
export default _default;
