import * as chai from 'chai';
import { Request } from 'express';

import User, { IUser } from '../models/user';
import Student, { IStudent } from '../models/student';

import {
    checkStudentRegistration,
    postCheckActivationToken,
    postCreateUser
} from '../controllers/auth';

import roles from '../constants/roles';
import errorMessages from '../constants/errorMessages';
import successMessages from '../constants/successMessages';
import test from '../constants/test';

import { connectDb } from '../helper/db';

describe('Auth controller', () => {
    const res: any = {
        statusCode: 200,
        message: null,
        data: null,
        status: function (code: number) {
            this.statusCode = code;
            return this;
        },
        send: function (data: any) {
            this.message = data.message;
            this.data = data;
        }
    };

    before(async () => {
        await connectDb();
        const user: IUser = new User(test.user);
        await user.save();
        const student: IStudent = new Student(test.student);
        await student.save();
    });

    describe('Registration', () => {
        const body = {
            studentId: '1234567890',
            email: 'email@mail.com',
            password: 'password',
            name: 'Name'
        };

        it('should throw an error if email or password or studentId or name are empty', async () => {
            const errorRequest = { body: {} };
            await postCreateUser(errorRequest as Request, res);
            chai.expect(res.statusCode).to.be.equal(400);
            chai.expect(res.message).to.be.equal(errorMessages.EMPTY_FIELDS);
        });

        it('should throw an error if student have already existed with received studentId', async () => {
            await postCreateUser({ body } as Request, res);
            chai.expect(res.statusCode).to.be.equal(400);
            chai.expect(res.message).to.be.equal(
                errorMessages.STUDENT_ID_ALREADY_IN_USE
            );
        });

        it('should throw an error if student have already existed with received email', async () => {
            const errorRequest = {
                body: { ...body, studentId: '123456543' }
            };
            await postCreateUser(errorRequest as Request, res);
            chai.expect(res.statusCode).to.be.equal(400);
            chai.expect(res.message).to.be.equal(
                errorMessages.EMAIL_ADDRESS_ALREADY_IN_USE
            );
        });

        it('should check if email or student ID are unique', async () => {
            await checkStudentRegistration({ body } as Request, res);
            chai.expect(res.data.isNotUniqueId).to.be.equal(true);
            chai.expect(res.data.isNotUniqueEmail).to.be.equal(true);
        });

        it('should send successful message if account is created successfully', async () => {
            const successRequest = {
                body: {
                    ...body,
                    studentId: '1234565430',
                    email: 'tests@tests.com'
                }
            };
            await postCreateUser(successRequest as Request, res);
            chai.expect(res.message).to.be.equal(
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
            await postCheckActivationToken(errorRequest as Request, res);
            chai.expect(res.statusCode).to.be.equal(400);
            chai.expect(res.message).to.be.equal(
                errorMessages.CANNOT_FIND_TOKEN
            );
        });

        it('should throw an error if cannot find user with received token', async () => {
            const errorRequest = {
                body: {
                    ...body,
                    activationToken: 'my_activation_token'
                }
            };
            await postCheckActivationToken(errorRequest as Request, res);
            chai.expect(res.statusCode).to.be.equal(400);
            chai.expect(res.message).to.be.equal(
                errorMessages.SOMETHING_WENT_WRONG
            );
        });

        it('should send successful message if account is activated successfully', async () => {
            await postCheckActivationToken({ body } as Request, res);
            chai.expect(res.message).to.be.equal(
                successMessages.SUCCESSFULLY_ACTIVATED
            );
        });
    });

    after(async () => {
        await User.deleteMany({});
        await Student.deleteMany({});
    });
});
