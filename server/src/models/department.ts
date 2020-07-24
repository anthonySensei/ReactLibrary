import mongoose, { Document, Schema } from 'mongoose';

export interface IDepartment extends Document {
    name: string;
    address: string;
}

const departmentSchema: Schema = new Schema({
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    }
});

export default mongoose.model<IDepartment>('Department', departmentSchema);
