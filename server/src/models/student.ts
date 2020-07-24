import mongoose, { Document, Schema } from 'mongoose';

import { IUser } from './user';

export interface IStudent extends Document {
    studentId: string;
    name: string;
    user: IUser['_id'];
}

const studentSchema: Schema = new Schema({
    studentId: {
        type: String,
        required: true
    },
    name: {
        type: String,
        allowNull: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

export default mongoose.model<IStudent>('Student', studentSchema);
