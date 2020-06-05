const Student = require('../models/student');
const Role = require('../models/role');

const jwt = require('jsonwebtoken');
const secret_key = require('../config/secret_key');

const uuidv4 = require('uuid/v4');

const passport = require('passport');

const userStatus = require('../constants/userStatuses');
const errorMessages = require('../constants/errorMessages');
const successMessages = require('../constants/successMessages');
const roles = require('../constants/roles');

const helper = require('../helper/responseHandle');
const checkUniqueness = require('../helper/checkUniqueness');
const generatePassword = require('../helper/generatePassword');
const imageHandle = require('../helper/imageHandle');

const studentController = require('./student');

const sessionDuration = 3600 * 12;

exports.postLoginUser = (req, res) => {
    passport.authenticate('local', async (err, user) => {
        if (err || !user) {
            return helper.responseErrorHandle(res, 403, err);
        } else {
            user.image = imageHandle.convertToBase64(user.image);
            const userJWT = {
                id: user.id,
                email: user.email,
                role: user.role
            };
            const token = jwt.sign(userJWT, secret_key, {
                expiresIn: sessionDuration
            });
            jwt.verify(token, secret_key);
            const data = {
                isSuccessful: true,
                message: successMessages.SUCCESSFULLY_LOGGED_IN,
                user: user,
                token: 'Bearer ' + token,
                tokenExpiresIn: sessionDuration
            };
            res.send(data);
        }
    })(req, res);
};

exports.getLogout = (req, res) => {
    req.logout();
    const data = {
        isSuccessful: true,
        message: successMessages.SUCCESSFULLY_LOGGED_OUT
    };
    return res.send(data);
};

exports.postCreateUser = async (req, res) => {
    const email = req.body.email;
    const readerTicket = req.body.readerTicket.toString();
    const name = req.body.name;
    const userRole = roles.STUDENT;
    const password = req.body.password;

    if (!email || !password || !readerTicket || !name || !password)
        return helper.responseErrorHandle(res, 400, errorMessages.EMPTY_FIELDS);

    try {
        const isNotUniqueReaderTicket = await checkUniqueness.checkReaderTicket(
            readerTicket
        );
        if (isNotUniqueReaderTicket) {
            return helper.responseErrorHandle(
                res,
                400,
                errorMessages.READER_TICKET_ALREADY_IN_USE
            );
        } else {
            const isNotUniqueEmail = await checkUniqueness.checkEmail(email);

            if (isNotUniqueEmail) {
                return helper.responseErrorHandle(
                    res,
                    400,
                    errorMessages.EMAIL_ADDRESS_ALREADY_IN_USE
                );
            } else {
                let status = userStatus.NEW;
                const registrationToken = uuidv4();
                await studentController.createStudent(
                    userRole,
                    email,
                    name,
                    readerTicket,
                    registrationToken,
                    generatePassword.cryptPassword(password),
                    status,
                    res
                );
            }
        }
    } catch (err) {
        helper.responseHandle(res, 400, errorMessages.SOMETHING_WENT_WRONG);
    }
};

exports.postCheckRegistrationToken = async (req, res, next) => {
    const token = req.body.registrationToken;

    if (!token) {
        return helper.responseErrorHandle(
            res,
            400,
            errorMessages.SOMETHING_WENT_WRONG
        );
    }

    try {
        const student = await Student.findOne({
            where: { registration_token: token }
        });
        await student.update({
            status: userStatus.ACTIVATED,
            registration_token: ''
        });
        const data = {
            isSuccessful: true,
            message: successMessages.SUCCESSFULLY_ACTIVATED
        };
        return helper.responseHandle(res, 200, data);
    } catch (err) {
        return helper.responseErrorHandle(
            res,
            400,
            errorMessages.SOMETHING_WENT_WRONG
        );
    }
};
