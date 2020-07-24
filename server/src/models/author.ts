import mongoose, { Schema, Document } from 'mongoose';

export interface IAuthor extends Document {
    name: string;
    country: string;
}

const authorSchema: Schema = new Schema({
    name: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    }
});

export default mongoose.model<IAuthor>('Author', authorSchema);
