import { Request, Response } from 'express';

import Student, { IStudent } from '../models/student';
import User, { IUser } from '../models/user';

import jwt from 'jsonwebtoken';
import passport from 'passport';
import uuid from 'uuid';

import errorMessages from '../constants/errorMessages';
import successMessages from '../constants/successMessages';
import roles from '../constants/roles';

import { responseErrorHandle } from '../helper/responseHandle';
import { cryptPassword } from '../helper/generatePassword';
import { sendMail } from '../helper/mailSender';
import { generateActivationMessage, subjects } from '../constants/mailMessages';

const sessionDuration: number = 3600 * 12;

export const postLoginUser = (req: Request, res: Response) => {
    passport.authenticate('local', async (err: string, user: IUser) => {
        if (err || !user) {
            return responseErrorHandle(res, 403, err);
        } else {
            const userJWT = {
                id: user._id,
                email: user.email,
                role: user.role
            };
            const token = jwt.sign(userJWT, process.env.SECRET_KEY as string, {
                expiresIn: sessionDuration
            });
            jwt.verify(token, process.env.SECRET_KEY as string);
            res.send({
                isSuccessful: true,
                message: successMessages.SUCCESSFULLY_LOGGED_IN,
                user: user,
                token: 'Bearer ' + token,
                tokenExpiresIn: sessionDuration
            });
        }
    })(req, res);
};

export const getLogout = (req: Request, res: Response) => {
    req.logout();
    return res.send({
        message: successMessages.SUCCESSFULLY_LOGGED_OUT
    });
};

export const postCreateUser = async (req: Request, res: Response) => {
    const studentId: string = req.body.studentId;
    const email: string = req.body.email;
    const name: string = req.body.name;
    const password: string = req.body.password
        ? cryptPassword(req.body.password)
        : '';
    if (!email || !password || !studentId || !name)
        return responseErrorHandle(res, 500, errorMessages.EMPTY_FIELDS);
    try {
        const isNotUniqueStudentId: boolean = !!(await Student.findOne({
            studentId
        }));
        if (isNotUniqueStudentId) {
            return responseErrorHandle(
                res,
                500,
                errorMessages.STUDENT_ID_ALREADY_IN_USE
            );
        } else {
            const isNotUniqueEmail: boolean = !!(await User.findOne({ email }));

            if (isNotUniqueEmail) {
                return responseErrorHandle(
                    res,
                    500,
                    errorMessages.EMAIL_ADDRESS_ALREADY_IN_USE
                );
            } else {
                const active: boolean = false;
                const activationToken: string = uuid.v4();
                const role: string = roles.STUDENT;
                const user: IUser = new User({
                    email,
                    password,
                    activationToken,
                    active,
                    role
                });
                await user.save();
                const student: IStudent = new Student({
                    studentId,
                    name,
                    user: user._id
                });
                await student.save();
                if (process.env.NODE_ENV !== 'test') {
                    await sendMail(
                        email,
                        subjects.ACCOUNT_ACTIVATION,
                        generateActivationMessage(activationToken)
                    );
                }
                res.send({
                    message: successMessages.ACCOUNT_SUCCESSFULLY_CREATED
                });
            }
        }
    } catch (err) {
        responseErrorHandle(res, 500, errorMessages.SOMETHING_WENT_WRONG);
    }
};

export const postCheckActivationToken = async (req: Request, res: Response) => {
    const activationToken: string = req.body.activationToken;

    if (!activationToken)
        return responseErrorHandle(res, 400, errorMessages.CANNOT_FIND_TOKEN);

    try {
        const isUpdated = !!(await User.findOneAndUpdate(
            { activationToken },
            {
                active: true,
                activationToken: ''
            }
        ));
        if (!isUpdated)
            return responseErrorHandle(res, 500, errorMessages.INVALID_TOKEN);
        res.send({ message: successMessages.SUCCESSFULLY_ACTIVATED });
    } catch (err) {
        return responseErrorHandle(
            res,
            400,
            errorMessages.SOMETHING_WENT_WRONG
        );
    }
};

export const checkStudentRegistration = async (req: Request, res: Response) => {
    const studentId: string = req.body.studentId;
    const email: string = req.body.email;
    try {
        const isNotUniqueId: boolean = !!(await Student.findOne({ studentId }));
        const isNotUniqueEmail: boolean = !!(await User.findOne({ email }));
        res.send({ isNotUniqueId, isNotUniqueEmail });
    } catch (err) {
        return responseErrorHandle(
            res,
            500,
            errorMessages.SOMETHING_WENT_WRONG
        );
    }
};
