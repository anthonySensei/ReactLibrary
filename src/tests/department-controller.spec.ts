import * as chai from 'chai';
import { Request } from 'express';

import Department, { IDepartment } from '../models/department';

import { getDepartments } from '../controllers/department';

import successMessages from '../constants/successMessages';
import test from '../constants/test';

import { connectTestDb, logError } from './helper/config';

describe('Department controller', () => {
    const res: any = {
        message: null,
        departments: [],
        send: function (data: any) {
            this.message = data.message;
            this.departments = data.departments;
        }
    };

    before(async () => {
        try {
            await connectTestDb();
            const department: IDepartment = new Department(test.department);
            await department.save();
        } catch (err) {
            logError(err);
        }
    });

    it('should send departments without errors', async () => {
        try {
            await getDepartments({} as Request, res);
            chai.expect(res.message).to.be.equal(
                successMessages.SUCCESSFULLY_FETCHED
            );
            chai.expect(res.departments.length).not.to.be.equal(0);
        } catch (err) {
            logError(err);
        }
    });

    after(async () => {
        try {
            await Department.deleteMany({});
        } catch (err) {
            logError(err);
        }
    });
});
