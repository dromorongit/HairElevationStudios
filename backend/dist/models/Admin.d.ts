import mongoose, { Document } from 'mongoose';
export interface IAdmin extends Document {
    username: string;
    email: string;
    password: string;
    createdAt: Date;
}
declare const _default: mongoose.Model<IAdmin, {}, {}, {}, mongoose.Document<unknown, {}, IAdmin, {}, {}> & IAdmin & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
}, any>;
export default _default;
