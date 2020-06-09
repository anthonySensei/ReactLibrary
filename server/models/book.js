const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const bookSchema = new Schema({
    isbn: {
        type: String,
        required: true
    },
    quantity: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    language: {
        type: String,
        required: true
    },
    department: {
        type: Schema.Types.ObjectId,
        ref: 'Department',
        required: true
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'Author',
        required: true
    },
    genres: [
        {
            genre: { type: Schema.Types.ObjectId, ref: 'Genre', required: true }
        }
    ]
});

module.exports = mongoose.model('Book', bookSchema);
