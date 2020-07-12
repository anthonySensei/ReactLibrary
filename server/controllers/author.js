const Author = require('../models/author');

const helper = require('../helper/responseHandle');

const errorMessages = require('../constants/errorMessages');
const successMessages = require('../constants/successMessages');

exports.getAuthors = async (req, res) => {
    try {
        const authors = await Author.find();
        return res.send({
            authors: authors,
            message: successMessages.SUCCESSFULLY_FETCHED
        });
    } catch (error) {
        return helper.responseErrorHandle(res, 500, errorMessages.CANNOT_FETCH);
    }
};

