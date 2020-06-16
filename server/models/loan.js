const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const loanSchema = new Schema({
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

module.exports = mongoose.model('Loan', loanSchema);
