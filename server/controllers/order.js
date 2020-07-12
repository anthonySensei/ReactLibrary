const Order = require('../models/order');
const Student = require('../models/student');
const Book = require('../models/book');

const helper = require('../helper/responseHandle');

const errorMessages = require('../constants/errorMessages');
const successMessages = require('../constants/successMessages');

exports.orderBook = async (req, res) => {
    const studentId = req.body.studentId;
    const bookId = req.body.bookId;
    const time = req.body.time;
    if (!req.body) {
        return helper.responseErrorHandle(
            res,
            400,
            errorMessages.SOMETHING_WENT_WRONG
        );
    }
    try {
        const student = await Student.findOne({
            user: studentId
        });
        if (!student) {
            return helper.responseErrorHandle(
                res,
                400,
                errorMessages.SOMETHING_WENT_WRONG
            );
        }

        const book = await Book.findOne({ _id: bookId });
        if (book.quantity <= 0) {
            return helper.responseErrorHandle(
                res,
                400,
                errorMessages.THERE_ARE_NO_AVAILABLE_BOOKS
            );
        } else {
            const bookOrder = new Order({
                order_time: time,
                student: student._id,
                book: bookId,
                department: book.department
            });
            await bookOrder.save();
            await book.update({ quantity: book.quantity - 1 });
            res.send({
                message: successMessages.SUCCESSFULLY_ORDERED
            });
        }
    } catch (err) {
        helper.responseErrorHandle(
            res,
            500,
            errorMessages.SOMETHING_WENT_WRONG
        );
    }
};
