import * as chai from 'chai';
import { Request } from 'express';

import Department, { IDepartment } from '../models/department';

import { getDepartments } from '../controllers/department';

import successMessages from '../constants/successMessages';
import test from '../constants/test';

import { connectDb } from '../helper/db';

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
        await connectDb();
        const department: IDepartment = new Department(test.department);
        await department.save();
    });

    it('should send departments without errors', async () => {
        await getDepartments({} as Request, res);
        chai.expect(res.message).to.be.equal(
            successMessages.SUCCESSFULLY_FETCHED
        );
        chai.expect(res.departments.length).not.to.be.equal(0);
    });

    after(async () => {
        await Department.deleteMany({});
    });
});
