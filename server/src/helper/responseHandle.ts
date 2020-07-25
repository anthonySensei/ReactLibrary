import { Response } from 'express';

export const responseErrorHandle = (
    res: Response,
    responseCode: number,
    message: string
) => {
    res.status(responseCode).send({ message: message });
};
