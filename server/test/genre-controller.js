const expect = require('chai').expect;

const Genre = require('../models/genre');
const GenreController = require('../controllers/genre');

const successMessages = require('../constants/successMessages');
const test = require('../constants/test');

const db = require('../helper/db');

describe('Genre controller', () => {
    const res = {
        statusCode: null,
        message: null,
        genres: [],
        status: function (code) {
            this.statusCode = code;
            return this;
        },
        send: function (data) {
            this.message = data.message;
            this.genres = data.genres;
        }
    };

    before(async () => {
        await db.connect();
        const genre = new Genre(test.genre);
        await genre.save();
    });

    it('should send genres without errors', async () => {
        await GenreController.getGenres({}, res);
        expect(res.message).to.be.equal(successMessages.SUCCESSFULLY_FETCHED);
        expect(res.genres.length).not.to.be.equal(0);
    });

    after(async () => {
        await Genre.deleteMany({});
    });
});
