import mongoose, { Document, Schema } from 'mongoose';

import { IDepartment } from './department';
import { IUser } from './user';

export interface ILibrarian extends Document {
    passportId: string;
    name: string;
    department: IDepartment['_id'];
    user: IUser['_id'];
}

const librarianSchema: Schema = new Schema({
    passportId: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    department: {
        type: Schema.Types.ObjectId,
        ref: 'Department',
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

export default mongoose.model<ILibrarian>('Librarian', librarianSchema);
