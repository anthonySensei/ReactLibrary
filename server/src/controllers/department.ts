import { Request, Response } from 'express';

import Department from '../models/department';

import { responseErrorHandle } from '../helper/responseHandle';

import errorMessages from '../constants/errorMessages';
import successMessages from '../constants/successMessages';

export const getDepartments = async (req: Request, res: Response) => {
    try {
        res.send({
            departments: await Department.find(),
            message: successMessages.SUCCESSFULLY_FETCHED
        });
    } catch (err) {
        responseErrorHandle(res, 500, errorMessages.CANNOT_FETCH);
    }
};
