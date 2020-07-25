import mongoose, { Document, Schema } from 'mongoose';

import { IBook } from './book';
import { IStudent } from './student';
import { IDepartment } from './department';

export interface IOrder extends Document {
    order_time: Date;
    loan_time: Date;
    book: IBook['_id'];
    student: IStudent['_id'];
    department: IDepartment['_id'];
}

const orderSchema: Schema = new Schema({
    order_time: {
        type: Date,
        required: false
    },
    loan_time: {
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
    department: {
        type: Schema.Types.ObjectId,
        ref: 'Department',
        required: true
    }
});

export default mongoose.model<IOrder>('Order', orderSchema);
