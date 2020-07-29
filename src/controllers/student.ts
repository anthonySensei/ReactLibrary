import { Request, Response } from 'express';

import Student from '../models/student';

import { responseErrorHandle } from '../helper/responseHandle';

import errorMessages from '../constants/errorMessages';
import successMessages from '../constants/successMessages';

export const getAllStudents = async (req: Request, res: Response) => {
    try {
        return res.send({
            students: await Student.find(),
            message: successMessages.SUCCESSFULLY_FETCHED
        });
    } catch (err) {
        return responseErrorHandle(
            res,
            400,
            errorMessages.SOMETHING_WENT_WRONG
        );
    }
};
