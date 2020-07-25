import { Request, Response } from 'express';
import Order from '../models/order';
import Student, { IStudent } from '../models/student';
import Book, { IBook } from '../models/book';

import { responseErrorHandle } from '../helper/responseHandle';

import errorMessages from '../constants/errorMessages';
import successMessages from '../constants/successMessages';

export const orderBook = async (req: Request, res: Response) => {
    const studentId: string = req.body.studentId;
    const bookId: string = req.body.bookId;
    const time: string = req.body.time;

    if (!studentId || !bookId || !time)
        return responseErrorHandle(
            res,
            400,
            errorMessages.SOMETHING_WENT_WRONG
        );

    try {
        const student: IStudent | null = await Student.findOne({
            user: studentId
        });
        const book: IBook | null = await Book.findOne({ _id: bookId });
        if (!student || !book) {
            return responseErrorHandle(
                res,
                400,
                errorMessages.SOMETHING_WENT_WRONG
            );
        } else {
            if (book.quantity <= 0) {
                return responseErrorHandle(
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
        }
    } catch (err) {
        responseErrorHandle(res, 500, errorMessages.SOMETHING_WENT_WRONG);
    }
};
