const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const orderSchema = new Schema({
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

module.exports = mongoose.model('Order', orderSchema);
