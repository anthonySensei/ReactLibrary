import { Request, Response } from 'express';

import Author from '../models/author';

import { responseErrorHandle } from '../helper/responseHandle';

import errorMessages from '../constants/errorMessages';
import successMessages from '../constants/successMessages';

export const getAuthors = async (req: Request, res: Response) => {
    try {
        return res.send({
            authors: await Author.find(),
            message: successMessages.SUCCESSFULLY_FETCHED
        });
    } catch (error) {
        return responseErrorHandle(res, 500, errorMessages.CANNOT_FETCH);
    }
};
