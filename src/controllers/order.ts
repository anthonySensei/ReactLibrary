import { Request, Response } from 'express';

import Order from '../models/order';
import Student, { IStudent } from '../models/student';
import Book, { IBook } from '../models/book';

import { responseErrorHandle } from '../helper/responseHandle';

import errorMessages from '../constants/errorMessages';
import successMessages from '../constants/successMessages';

import mainConfig from '../config';

const serverConfig = mainConfig(process.env.NODE_ENV || 'development');
const log = serverConfig!.log();

export const orderBook = async (req: Request, res: Response) => {
    const { studentId, bookId, time } = req.body;

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
                await book.updateOne({ quantity: book.quantity - 1 });
                res.send({
                    message: successMessages.SUCCESSFULLY_ORDERED
                });
            }
        }
    } catch (err) {
        log.fatal(err);
        responseErrorHandle(res, 500, errorMessages.SOMETHING_WENT_WRONG);
    }
};
