const Genre = require('../models/genre');

const helper = require('../helper/responseHandle');

const errorMessages = require('../constants/errorMessages');
const successMessages = require('../constants/successMessages');

exports.getGenres = async (req, res) => {
    try {
        const genres = await Genre.find();
        const data = {
            genres: genres,
            message: successMessages.SUCCESSFULLY_FETCHED
        };
        return res.send(data);
    } catch (error) {
        return helper.responseErrorHandle(res, 500, errorMessages.CANNOT_FETCH);
    }
};
