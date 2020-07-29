import mongoose, { Document, Schema } from 'mongoose';

export interface IGenre extends Document {
    name: string;
}

const genreSchema: Schema = new Schema({
    name: {
        type: String,
        required: true
    }
});

export default mongoose.model<IGenre>('Genre', genreSchema);
