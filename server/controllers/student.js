const Student = require('../models/student');

const helper = require('../helper/responseHandle');

const errorMessages = require('../constants/errorMessages');
const successMessages = require('../constants/successMessages');

exports.getAllStudents = async (req, res) => {
    try {
        const students = await Student.find();
        const data = {
            message: successMessages.SUCCESSFULLY_FETCHED,
            students: students
        };
        return res.send(data);
    } catch (err) {
        return helper.responseErrorHandle(
            res,
            400,
            errorMessages.SOMETHING_WENT_WRONG
        );
    }
};
