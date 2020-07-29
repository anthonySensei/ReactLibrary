import { Request, Response } from 'express';

import Genre from '../models/genre';

import { responseErrorHandle } from '../helper/responseHandle';

import errorMessages from '../constants/errorMessages';
import successMessages from '../constants/successMessages';

export const getGenres = async (req: Request, res: Response) => {
    try {
        return res.send({
            genres: await Genre.find(),
            message: successMessages.SUCCESSFULLY_FETCHED
        });
    } catch (error) {
        return responseErrorHandle(res, 500, errorMessages.CANNOT_FETCH);
    }
};
