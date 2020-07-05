const Student = require('../models/student');
const User = require('../models/user');

const jwt = require('jsonwebtoken');
const secret_key = require('../config/secret_key');

const uuidv4 = require('uuid/v4');

const passport = require('passport');

const errorMessages = require('../constants/errorMessages');
const successMessages = require('../constants/successMessages');
const roles = require('../constants/roles');

const helper = require('../helper/responseHandle');
const generatePassword = require('../helper/generatePassword');
const imageHandle = require('../helper/imageHandle');

const sessionDuration = 3600 * 12;

const mailSender = require('../helper/mailSender');
const mailMessages = require('../constants/mailMessages');

exports.postLoginUser = (req, res) => {
    passport.authenticate('local', async (err, user) => {
        if (err || !user) {
            return helper.responseErrorHandle(res, 403, err);
        } else {
            user.image = imageHandle.convertToBase64(user.image);
            const userJWT = {
                id: user._id,
                email: user.email,
                role: user.role
            };
            const token = jwt.sign(userJWT, secret_key, {
                expiresIn: sessionDuration
            });
            jwt.verify(token, secret_key);
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

exports.getLogout = (req, res) => {
    req.logout();
    return res.send({
        message: successMessages.SUCCESSFULLY_LOGGED_OUT
    });
};

exports.postCreateUser = async (req, res) => {
    const studentId = req.body.studentId;
    const email = req.body.email;
    const name = req.body.name;
    const password = generatePassword.cryptPassword(req.body.password);
    if (!email || !password || !studentId || !name || !password)
        return helper.responseErrorHandle(res, 400, errorMessages.EMPTY_FIELDS);

    try {
        const isNotUniqueStudentId = !!(await Student.findOne({ studentId }));
        if (isNotUniqueStudentId) {
            return helper.responseErrorHandle(
                res,
                400,
                errorMessages.STUDENT_ID_ALREADY_IN_USE
            );
        } else {
            const isNotUniqueEmail = await User.findOne({ email });

            if (isNotUniqueEmail) {
                return helper.responseErrorHandle(
                    res,
                    400,
                    errorMessages.EMAIL_ADDRESS_ALREADY_IN_USE
                );
            } else {
                const active = false;
                const activationToken = uuidv4();
                const role = roles.STUDENT;
                const user = new User({
                    email,
                    password,
                    activationToken,
                    active,
                    role
                });
                await user.save();
                const student = new Student({
                    studentId,
                    name,
                    user: user._id
                });
                await student.save();
                await mailSender.sendMail(
                    email,
                    mailMessages.subjects.ACCOUNT_ACTIVATION,
                    mailMessages.generateActivationMessage(activationToken)
                );
                res.send({
                    message: successMessages.ACCOUNT_SUCCESSFULLY_CREATED
                });
            }
        }
    } catch (err) {
        helper.responseErrorHandle(
            res,
            400,
            errorMessages.SOMETHING_WENT_WRONG
        );
    }
};

exports.postCheckActivationToken = async (req, res) => {
    const token = req.body.activationToken;

    if (!token)
        return helper.responseErrorHandle(
            res,
            400,
            errorMessages.SOMETHING_WENT_WRONG
        );

    try {
        const user = await User.findOne({
            activationToken: token
        });
        if (!user)
            return helper.responseErrorHandle(
                res,
                400,
                errorMessages.SOMETHING_WENT_WRONG
            );
        await user.updateOne({
            active: true,
            activationToken: ''
        });
        res.send({ message: successMessages.SUCCESSFULLY_ACTIVATED });
    } catch (err) {
        return helper.responseErrorHandle(
            res,
            400,
            errorMessages.SOMETHING_WENT_WRONG
        );
    }
};

exports.checkStudentRegistration = async (req, res) => {
    const studentId = req.body.studentId;
    const email = req.body.email;
    try {
        const isNotUniqueId = !!(await Student.findOne({ studentId }));
        const isNotUniqueEmail = !!(await User.findOne({ email }));
        res.send({ isNotUniqueId, isNotUniqueEmail });
    } catch (err) {
        return helper.responseErrorHandle(
            res,
            500,
            errorMessages.SOMETHING_WENT_WRONG
        );
    }
};
