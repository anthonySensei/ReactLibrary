const Loan = require('../models/loan');
const Librarian = require('../models/librarian');
const Book = require('../models/book');

const helper = require('../helper/responseHandle');

const errorMessages = require('../constants/errorMessages');
const successMessages = require('../constants/successMessages');

exports.loanBook = async (req, res) => {
    const studentId = req.body.studentId;
    const librarianId = req.body.librarianId;
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
        const book = await Book.findOne({ _id: bookId });
        const librarian = await Librarian.findOne({ user: librarianId });
        if (book.quantity <= 0) {
            return helper.responseErrorHandle(
                res,
                400,
                errorMessages.THERE_ARE_NO_AVAILABLE_BOOKS
            );
        } else {
            const bookLoan = new Loan({
                loan_time: time,
                student: studentId,
                book: bookId,
                librarian: librarian._id,
                department: book.department
            });
            await bookLoan.save();
            await book.update({ quantity: book.quantity - 1 });
            res.send({
                message: successMessages.SUCCESSFULLY_LOANED
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
