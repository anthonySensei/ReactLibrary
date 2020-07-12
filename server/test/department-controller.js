const expect = require('chai').expect;

const Department = require('../models/department');
const DepartmentController = require('../controllers/department');

const successMessages = require('../constants/successMessages');
const test = require('../constants/test');

const db = require('../helper/db');

describe('Department controller', () => {
    const res = {
        statusCode: null,
        message: null,
        departments: [],
        status: function (code) {
            this.statusCode = code;
            return this;
        },
        send: function (data) {
            this.message = data.message;
            this.departments = data.departments;
        }
    };

    before(async () => {
        await db.connect();
        const department = new Department(test.department);
        await department.save();
    });

    it('should send departments without errors', async () => {
        await DepartmentController.getDepartments({}, res);
        expect(res.message).to.be.equal(successMessages.SUCCESSFULLY_FETCHED);
        expect(res.departments.length).not.to.be.equal(0);
    });

    after(async () => {
        await Department.deleteMany({});
    });
});
