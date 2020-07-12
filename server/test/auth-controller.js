const expect = require('chai').expect;

const User = require('../models/user');
const Student = require('../models/student');
const AuthController = require('../controllers/auth');

const roles = require('../constants/roles');
const errorMessages = require('../constants/errorMessages');
const successMessages = require('../constants/successMessages');
const test = require('../constants/test');

const db = require('../helper/db');

describe('Auth controller', () => {
    const res = {
        statusCode: null,
        message: null,
        data: null,
        status: function (code) {
            this.statusCode = code;
            return this;
        },
        send: function (data) {
            this.message = data.message;
            this.data = data;
        }
    };

    before(async () => {
        await db.connect();
        const user = new User(test.user);
        await user.save();
        const student = new Student(test.student);
        await student.save();
    });

    describe('Registration', () => {
        const body = {
            studentId: '1234567890',
            email: 'email@mail.com',
            password: 'password',
            name: 'Name'
        };

        it('should throw an error if email or password or studentId ir name are empty', async () => {
            const errorRequest = { body: {} };
            await AuthController.postCreateUser(errorRequest, res);
            expect(res.statusCode).to.be.equal(400);
            expect(res.message).to.be.equal(errorMessages.EMPTY_FIELDS);
        });

        it('should throw an error if student have already existed with received studentId', async () => {
            await AuthController.postCreateUser({ body }, res);
            expect(res.statusCode).to.be.equal(400);
            expect(res.message).to.be.equal(
                errorMessages.STUDENT_ID_ALREADY_IN_USE
            );
        });

        it('should throw an error if student have already existed with received email', async () => {
            const errorRequest = {
                body: { ...body, studentId: '123456543' }
            };
            await AuthController.postCreateUser(errorRequest, res);
            expect(res.statusCode).to.be.equal(400);
            expect(res.message).to.be.equal(
                errorMessages.EMAIL_ADDRESS_ALREADY_IN_USE
            );
        });

        it('should check if email or student ID are unique', async () => {
            await AuthController.checkStudentRegistration({ body }, res);
            expect(res.data.isNotUniqueId).to.be.equal(true);
            expect(res.data.isNotUniqueEmail).to.be.equal(true);
        });

        it('should send successful message if account is created successfully', async () => {
            const successRequest = {
                body: {
                    ...body,
                    studentId: '1234565430',
                    email: 'test@test.com'
                }
            };
            await AuthController.postCreateUser(successRequest, res);
            expect(res.message).to.be.equal(
                successMessages.ACCOUNT_SUCCESSFULLY_CREATED
            );
        });
    });

    describe('Account activation', () => {
        const body = { activationToken: 'activation_token' };

        before(async () => {
            const user = new User({
                email: 'mail@mail.com',
                image: 'image',
                password: 'password',
                role: roles.STUDENT,
                active: true,
                activationToken: 'activation_token'
            });
            await user.save();
        });

        it('should throw an error if activation token is empty', async () => {
            const errorRequest = { body: {} };
            await AuthController.postCheckActivationToken(errorRequest, res);
            expect(res.statusCode).to.be.equal(400);
            expect(res.message).to.be.equal(errorMessages.CANNOT_FIND_TOKEN);
        });

        it('should throw an error if cannot find user with received token', async () => {
            const errorRequest = {
                body: {
                    ...body,
                    activationToken: 'my_activation_token'
                }
            };
            await AuthController.postCheckActivationToken(errorRequest, res);
            expect(res.statusCode).to.be.equal(400);
            expect(res.message).to.be.equal(errorMessages.SOMETHING_WENT_WRONG);
        });

        it('should send successful message if account is activated successfully', async () => {
            await AuthController.postCheckActivationToken({ body }, res);
            expect(res.message).to.be.equal(
                successMessages.SUCCESSFULLY_ACTIVATED
            );
        });
    });

    after(async () => {
        await User.deleteMany({});
        await Student.deleteMany({});
    });
});
