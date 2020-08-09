import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

const PASSWORD_SALT: number = 8;

export interface IUser extends Document {
    email: string;
    image: string;
    password: string;
    role: string;
    active: boolean;
    activationToken: string;
    comparePassword: (password: string) => boolean
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

userSchema.pre('save', async function preSave(next) {
    const user: IUser = this as IUser;
    if (!user.isModified('password')) return next();
    try {
        user.password = await bcrypt.hash(user.password, PASSWORD_SALT);
        return next();
    } catch (err) {
        return next(err);
    }
});

userSchema.methods.comparePassword = async function comparePassword(
    password: string
) {
    return bcrypt.compare(password, this.password);
};

export default mongoose.model<IUser>('User', userSchema);
