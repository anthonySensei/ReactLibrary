import { Request, Response } from 'express';

import Librarian from '../models/librarian';

import { responseErrorHandle } from '../helper/responseHandle';

import errorMessages from '../constants/errorMessages';
import successMessages from '../constants/successMessages';

export const getAllLibrarians = async (req: Request, res: Response) => {
    try {
        return res.send({
            librarians: await Librarian.find(),
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
