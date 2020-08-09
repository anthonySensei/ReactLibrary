import { Request, Response } from 'express';

import Genre from '../models/genre';

import { responseErrorHandle } from '../helper/responseHandle';

import errorMessages from '../constants/errorMessages';
import successMessages from '../constants/successMessages';

import mainConfig from '../config';

const serverConfig = mainConfig(process.env.NODE_ENV || 'development');
const log = serverConfig!.log();

export const getGenres = async (req: Request, res: Response) => {
    try {
        return res.send({
            genres: await Genre.find(),
            message: successMessages.SUCCESSFULLY_FETCHED
        });
    } catch (err) {
        log.fatal(err);
        return responseErrorHandle(res, 500, errorMessages.CANNOT_FETCH);
    }
};
