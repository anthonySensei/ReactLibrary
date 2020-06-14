const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const studentSchema = new Schema({
    studentId: {
        type: String,
        required: true
    },
    name: {
        type: String,
        allowNull: true
    }
});

module.exports = mongoose.model('Student', studentSchema);
