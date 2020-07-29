import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
    email: string;
    image: string;
    password: string;
    role: string;
    active: boolean;
    activationToken: string;
}

const userSchema: Schema = new Schema({
    email: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: false
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    active: {
        type: Boolean,
        required: true
    },
    activationToken: {
        type: String,
        required: false
    }
});

export default mongoose.model<IUser>('User', userSchema);
