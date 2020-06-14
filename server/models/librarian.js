const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const librarianSchema = new Schema({
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
    }
});

module.exports = mongoose.model('Librarian', librarianSchema);
