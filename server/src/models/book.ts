import mongoose, { Document, Schema } from 'mongoose';

import { IDepartment } from './department';
import { IAuthor } from './author';
import { IGenre } from './genre';

export interface IBook extends Document {
    isbn: string;
    quantity: number;
    title: string;
    year: number;
    description: string;
    image: string;
    language: string;
    department: IDepartment['_id'];
    author: IAuthor['_id'];
    genres: [IGenre['_id']];
}

const bookSchema: Schema = new Schema({
    isbn: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    language: {
        type: String,
        required: true
    },
    department: {
        type: Schema.Types.ObjectId,
        ref: 'Department',
        required: true
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'Author',
        required: true
    },
    genres: [
        {
            genre: { type: Schema.Types.ObjectId, ref: 'Genre', required: true }
        }
    ]
});

export default mongoose.model<IBook>('Book', bookSchema);
