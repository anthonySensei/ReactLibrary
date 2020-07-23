const Department = require('../models/department');

const helper = require('../helper/responseHandle');

const errorMessages = require('../constants/errorMessages');
const successMessages = require('../constants/successMessages');

exports.getDepartments = async (req, res) => {
    try {
        const departments = await Department.find();
        res.send({
            departments: departments,
            message: successMessages.SUCCESSFULLY_FETCHED
        });
    } catch (err) {
        helper.responseErrorHandle(res, 500, errorMessages.CANNOT_FETCH);
    }
};
