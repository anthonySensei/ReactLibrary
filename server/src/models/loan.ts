import mongoose, { Document, Schema } from 'mongoose';

import { IDepartment } from './department';
import { IBook } from './book';
import { ILibrarian } from './librarian';
import { IStudent } from './student';

export interface ILoan extends Document {
    loan_time: Date;
    returned_time: Date;
    book: IBook['_id'];
    student: IStudent['_id'];
    librarian: ILibrarian['_id'];
    department: IDepartment['_id'];
}

const loanSchema: Schema = new Schema({
    loan_time: {
        type: Date,
        required: true
    },
    returned_time: {
        type: Date,
        required: false
    },
    book: {
        type: Schema.Types.ObjectId,
        ref: 'Book',
        required: true
    },
    student: {
        type: Schema.Types.ObjectId,
        ref: 'Student',
        required: true
    },
    librarian: {
        type: Schema.Types.ObjectId,
        ref: 'Librarian',
        required: true
    },
    department: {
        type: Schema.Types.ObjectId,
        ref: 'Department',
        required: true
    }
});

export default mongoose.model<ILoan>('Loan', loanSchema);
