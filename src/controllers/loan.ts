import { Request, Response } from 'express';

import Loan from '../models/loan';
import Librarian, { ILibrarian } from '../models/librarian';
import Book, { IBook } from '../models/book';

import { responseErrorHandle } from '../helper/responseHandle';

import errorMessages from '../constants/errorMessages';
import successMessages from '../constants/successMessages';

export const loanBook = async (req: Request, res: Response) => {
    const studentId: string = req.body.studentId;
    const librarianId: string = req.body.librarianId;
    const bookId: string = req.body.bookId;
    const time: string = req.body.time;

    if (!studentId || !librarianId || !bookId || !time)
        return responseErrorHandle(
            res,
            400,
            errorMessages.SOMETHING_WENT_WRONG
        );

    try {
        const book: IBook | null = await Book.findOne({ _id: bookId });
        const librarian: ILibrarian | null = await Librarian.findOne({
            user: librarianId
        });
        if (!book || !librarian) {
            responseErrorHandle(res, 500, errorMessages.SOMETHING_WENT_WRONG);
        } else {
            if (book.quantity <= 0) {
                return responseErrorHandle(
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
                await book.updateOne({ quantity: book.quantity - 1 });
                res.send({
                    message: successMessages.SUCCESSFULLY_LOANED
                });
            }
        }
    } catch (err) {
        responseErrorHandle(res, 500, errorMessages.SOMETHING_WENT_WRONG);
    }
};
